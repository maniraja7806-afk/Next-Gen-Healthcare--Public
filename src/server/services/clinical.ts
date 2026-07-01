import mongoose from 'mongoose';
import { MedicalRecord, IMedicalRecord, Appointment, IAppointment } from '../models/schemas.js';

export class MedicalRecordService {
  /**
   * "Time-Travel" Versioning: Updates a medical record by creating a new version
   * and linking the old version as `previousVersionId`.
   * Utilizes MongoDB transactions for data integrity.
   */
  static async updateRecordWithVersioning(
    recordId: string,
    updates: Partial<IMedicalRecord>,
    changeReason: string,
    providerId: string
  ): Promise<IMedicalRecord> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Fetch current active record
      const currentRecord = await MedicalRecord.findById(recordId).session(session);
      if (!currentRecord) throw new Error('Record not found');

      // 2. Map current record to a historical copy
      const historicalRecord = new MedicalRecord({
        patient: currentRecord.patient,
        provider: currentRecord.provider,
        notes: currentRecord.notes,
        diagnosis: currentRecord.diagnosis,
        version: currentRecord.version,
        changeReason: currentRecord.changeReason, // Reason it was previously changed (if any)
        createdAt: currentRecord.createdAt,       // Preserve original creation time
      });
      await historicalRecord.save({ session });

      // 3. Apply updates to the active record and bump version
      currentRecord.notes = updates.notes || currentRecord.notes;
      currentRecord.diagnosis = updates.diagnosis || currentRecord.diagnosis;
      currentRecord.provider = new mongoose.Types.ObjectId(providerId); // Who made the edit
      currentRecord.version += 1;
      currentRecord.previousVersionId = historicalRecord._id as mongoose.Types.ObjectId;
      currentRecord.changeReason = changeReason;

      await currentRecord.save({ session });

      await session.commitTransaction();
      return currentRecord;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Retrieves the full history timeline of a medical record
   */
  static async getRecordHistoryTimeline(currentRecordId: string): Promise<IMedicalRecord[]> {
    const timeline: IMedicalRecord[] = [];
    let currentId: mongoose.Types.ObjectId | undefined = new mongoose.Types.ObjectId(currentRecordId);

    // Traverse the linked list of versions backwards
    while (currentId) {
      const record = await MedicalRecord.findById(currentId).populate('provider', 'firstName lastName');
      if (!record) break;
      
      timeline.push(record);
      currentId = record.previousVersionId; // time-travel backwards
    }

    // Return chronological order (oldest first)
    return timeline.reverse();
  }
}

export class AppointmentService {
  /**
   * AI-Assisted Smart Scheduler Logic:
   * Checks for overlapping conflicts and evaluates no-show risk
   */
  static async createSmartAppointment(
    patientId: string,
    providerId: string,
    requestedStartTime: Date,
    durationMinutes: number
  ): Promise<IAppointment> {
    const endTime = new Date(requestedStartTime.getTime() + durationMinutes * 60000);

    // 1. Conflict Resolution Algorithm
    const overlapping = await Appointment.find({
      provider: providerId,
      status: { $in: ['SCHEDULED'] },
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: requestedStartTime } } // overlap condition
      ]
    });

    if (overlapping.length > 0) {
      // Suggest alternatives based on provider availability
      throw new Error('Overlapping appointment detected. Please select an alternate slot.');
    }

    // 2. Simulated AI Inference: Predict no-show risk based on history and demographics
    // In production, this would call a Python ML microservice or Vertex AI
    const simulatedRiskScore = Math.random(); 

    const appointment = new Appointment({
      patient: patientId,
      provider: providerId,
      startTime: requestedStartTime,
      endTime,
      noShowRiskScore: simulatedRiskScore,
      urgencyLevel: 'MEDIUM', // would be classified by NLP on patient chief complaint
    });

    return await appointment.save();
  }
}

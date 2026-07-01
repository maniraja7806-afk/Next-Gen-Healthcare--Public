import mongoose, { Document, Schema } from 'mongoose';

// ---------------------------------------------------------
// User Schema (with RBAC)
// ---------------------------------------------------------
export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  PATIENT = 'PATIENT',
}

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: Role;
  firstName: string;
  lastName: string;
  isActive: boolean;
  lastLogin?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);

// ---------------------------------------------------------
// Patient Schema (extends User conceptually, contains PHI)
// ---------------------------------------------------------
export interface IPatient extends Document {
  user: mongoose.Types.ObjectId;
  dateOfBirth: Date;
  ssnEncrypted: string; // Field-level encryption for PII
  bloodType: string;
  allergies: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

const patientSchema = new Schema<IPatient>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    dateOfBirth: { type: Date, required: true },
    ssnEncrypted: { type: String, required: true }, 
    bloodType: { type: String },
    allergies: [{ type: String }],
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
      relation: { type: String },
    },
  },
  { timestamps: true }
);

export const Patient = mongoose.model<IPatient>('Patient', patientSchema);

// ---------------------------------------------------------
// Medical Record Schema (with Versioning)
// ---------------------------------------------------------
export interface IMedicalRecord extends Document {
  patient: mongoose.Types.ObjectId;
  provider: mongoose.Types.ObjectId; // User ID of Doctor/Nurse
  notes: string;
  diagnosis: string[];
  version: number;
  previousVersionId?: mongoose.Types.ObjectId; // Pointer to older version ("Time-Travel")
  changeReason?: string; // Audit trail for why it was changed
  createdAt: Date;
}

const medicalRecordSchema = new Schema<IMedicalRecord>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    provider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    notes: { type: String, required: true },
    diagnosis: [{ type: String }],
    version: { type: Number, default: 1 },
    previousVersionId: { type: Schema.Types.ObjectId, ref: 'MedicalRecord' },
    changeReason: { type: String },
  },
  { timestamps: true }
);

// Index for efficient timeline fetching
medicalRecordSchema.index({ patient: 1, createdAt: -1 });

export const MedicalRecord = mongoose.model<IMedicalRecord>('MedicalRecord', medicalRecordSchema);

// ---------------------------------------------------------
// Appointment Schema
// ---------------------------------------------------------
export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  provider: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  noShowRiskScore?: number; // AI-assisted risk score
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    provider: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'], default: 'SCHEDULED' },
    noShowRiskScore: { type: Number, min: 0, max: 1 },
    urgencyLevel: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], default: 'LOW' },
  },
  { timestamps: true }
);

// Index to find overlapping appointments
appointmentSchema.index({ provider: 1, startTime: 1, endTime: 1 });

export const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);

// ---------------------------------------------------------
// Prescription Schema
// ---------------------------------------------------------
export interface IPrescription extends Document {
  patient: mongoose.Types.ObjectId;
  provider: mongoose.Types.ObjectId;
  medicationName: string;
  dosage: string;
  frequency: string;
  status: 'ACTIVE' | 'DISCONTINUED';
  interactionWarnings: string[]; // Filled by Smart Prescription DB
}

const prescriptionSchema = new Schema<IPrescription>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
    provider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    medicationName: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    status: { type: String, enum: ['ACTIVE', 'DISCONTINUED'], default: 'ACTIVE' },
    interactionWarnings: [{ type: String }],
  },
  { timestamps: true }
);

export const Prescription = mongoose.model<IPrescription>('Prescription', prescriptionSchema);

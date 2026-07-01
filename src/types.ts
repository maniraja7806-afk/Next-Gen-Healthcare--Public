export type PatientInfo = {
  id: string;
  name: string;
  dob: string;
  bloodType: string;
  allergies: string[];
};

export type AppointmentData = {
  id: number;
  time: string;
  patient: string;
  type: string;
  risk: number;
  status: string;
  alert?: string;
};

export type RecordTimelineNode = {
  id: string;
  version: number;
  date: string;
  provider: string;
  notes: string;
  diagnoses: string[];
  changeReason?: string;
};

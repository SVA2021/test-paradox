export interface Reminder {
  id: string; // uuid
  title: string;
  description: string | null;
  timestamp: number;
  withAlarm: boolean;
}

export interface Task {
    id: number;
  title: string;
  description: string;
  date: Date;
  isRecurring: boolean;
  recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
}

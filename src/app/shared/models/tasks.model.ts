export interface Task {
  id: number;
  name: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
  dueDate: Date;
}

import { Task } from "../../shared/models/tasks.model";

export const TASKS: Task[] = [
  { id: 1, name: 'Fix Bug #1', description: 'This is a description for task 1, involving optimization.', priority: 'Medium', status: 'Completed', assignedTo: 'Emily Davis', dueDate: new Date('2024-12-28') },
  { id: 2, name: 'Test API Endpoint #2', description: 'This is a description for task 2, involving testing.', priority: 'Low', status: 'In Progress', assignedTo: 'Jane Smith', dueDate: new Date('2025-01-02') },
  { id: 3, name: 'Fix Bug #3', description: 'This is a description for task 3, involving testing.', priority: 'Medium', status: 'In Progress', assignedTo: 'Alice Johnson', dueDate: new Date('2024-12-25') },
  { id: 4, name: 'Refactor Code for #4', description: 'This is a description for task 4, involving optimization.', priority: 'Medium', status: 'Completed', assignedTo: 'John Doe', dueDate: new Date('2024-12-20') },
  { id: 5, name: 'Implement Feature #5', description: 'This is a description for task 5, involving development.', priority: 'Low', status: 'Pending', assignedTo: 'Robert Brown', dueDate: new Date('2024-12-24') },
  { id: 6, name: 'Fix Bug #6', description: 'This is a description for task 6, involving documentation.', priority: 'Medium', status: 'Pending', assignedTo: 'Alice Johnson', dueDate: new Date('2024-12-12') },
  { id: 7, name: 'Refactor Code for #7', description: 'This is a description for task 7, involving testing.', priority: 'Low', status: 'In Progress', assignedTo: 'Robert Brown', dueDate: new Date('2024-12-12') },
  { id: 8, name: 'Refactor Code for #8', description: 'This is a description for task 8, involving optimization.', priority: 'Medium', status: 'Pending', assignedTo: 'Jane Smith', dueDate: new Date('2025-01-06') },
  { id: 9, name: 'Fix Bug #9', description: 'This is a description for task 9, involving development.', priority: 'Medium', status: 'Pending', assignedTo: 'Robert Brown', dueDate: new Date('2025-01-06') },
  { id: 10, name: 'Update Documentation for #10', description: 'This is a description for task 10, involving development.', priority: 'Medium', status: 'Pending', assignedTo: 'John Doe', dueDate: new Date('2025-01-04') },
  { id: 11, name: 'Fix Bug #49', description: 'This is a description for task 49, involving testing.', priority: 'High', status: 'In Progress', assignedTo: 'Robert Brown', dueDate: new Date('2024-12-29') },
  { id: 12, name: 'Test API Endpoint #50', description: 'This is a description for task 50, involving testing.', priority: 'Low', status: 'Completed', assignedTo: 'Alice Johnson', dueDate: new Date('2024-12-26') },
  { id: 13, name: 'Fix Bug #9', description: 'This is a description for task 9, involving development.', priority: 'Medium', status: 'Pending', assignedTo: 'Robert Brown', dueDate: new Date('2025-01-06') },
];

  
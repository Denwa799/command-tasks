import {ReactNode} from 'react';

export interface ITasksContext {
  createTaskIsLoading: boolean;
  deleteTaskIsLoading: boolean;
  updateTaskIsLoading: boolean;
  createTask: (
    projectId: number,
    text: string,
    responsible: string,
    status: 'overdue' | 'inProgress' | 'done',
    isUrgently: boolean,
    date: Date,
  ) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTask: (
    id: number,
    text: string,
    responsible: string,
    status: 'overdue' | 'inProgress' | 'done',
    isUrgently: boolean,
    date: Date,
  ) => Promise<void>;
}

export interface ITasksProvider {
  children: ReactNode;
}

import {ReactNode} from 'react';

export interface ITasksContext {
  createIsLoading: boolean;
  deleteIsLoading: boolean;
  updateIsLoading: boolean;
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

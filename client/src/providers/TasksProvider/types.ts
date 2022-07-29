import {ReactNode} from 'react';

export interface ITasksContext {
  createIsLoading: boolean;
  createTask: (
    projectId: number,
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

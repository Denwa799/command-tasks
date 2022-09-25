import {ITask} from 'models/ITasks';
import {ReactNode} from 'react';

export interface ITasksContext {
  tasks: ITask[] | null;
  tasksIsLoading: boolean;
  createTaskIsLoading: boolean;
  deleteTaskIsLoading: boolean;
  updateTaskIsLoading: boolean;
  fetchTasks: (projectId: number) => Promise<void>;
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

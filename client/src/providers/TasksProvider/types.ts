import {ITask} from 'models/ITasks';
import {ReactNode} from 'react';

export interface ITasksContext {
  tasksCount: number;
  tasks: ITask[] | null;
  loadedMoreTasks: ITask[];
  tasksIsLoading: boolean;
  moreTasksIsLoading: boolean;
  createTaskIsLoading: boolean;
  deleteTaskIsLoading: boolean;
  updateTaskIsLoading: boolean;
  fetchTasks: (
    projectId: number,
    skip?: number,
    take?: number,
  ) => Promise<void>;
  fetchMoreTasks: (
    projectId: number,
    skip?: number,
    take?: number,
  ) => Promise<void>;
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
  cleanMoreTasks: () => void;
}

export interface ITasksProvider {
  children: ReactNode;
}

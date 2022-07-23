export interface ITeam {
  id: number;
  name: string;
}

export interface IProject {
  id: number;
  name: string;
}

export interface ITask {
  id: number;
  text: string;
  status: 'notCompleted' | 'inProgress' | 'done';
  responsible: string;
}

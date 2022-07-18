export interface ITeam {
  id: string;
  name: string;
}

export interface IProject {
  id: string;
  name: string;
}

export interface ITask {
  id: string;
  text: string;
  status: 'notCompleted' | 'inProgress' | 'done';
  responsible: string;
}

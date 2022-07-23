import {ITeam} from 'models/ITasks';
import {ReactNode} from 'react';

export interface ITeamsContext {
  teams: ITeam[] | null;
  teamsIsLoading: boolean;
  createIsLoading: boolean;
  fetchTeams: () => Promise<void>;
  createTeam: (name: string) => Promise<void>;
  deleteTeam: (id: number) => Promise<void>;
}

export interface ITeamsProvider {
  children: ReactNode;
}

import {ITeam} from 'models/ITasks';
import {ReactNode} from 'react';

export interface ITeamsContext {
  teams: ITeam[] | null;
  team: ITeam | null;
  selectedTeamId: number;
  teamsIsLoading: boolean;
  teamIsLoading: boolean;
  createTeamIsLoading: boolean;
  deleteTeamIsLoading: boolean;
  updateTeamIsLoading: boolean;
  deleteUserInTeamIsLoading: boolean;
  fetchTeams: () => Promise<void>;
  fetchTeam: (id: number) => Promise<void>;
  createTeam: (name: string, creator: number, users: string[]) => Promise<void>;
  deleteTeam: (id: number) => Promise<void>;
  updateTeam: (id: number, name: string) => Promise<void>;
  setSelectedTeamId: (value: number) => void;
  deleteUserInTeam: (userId: number, teamId: number) => Promise<void>;
}

export interface ITeamsProvider {
  children: ReactNode;
}

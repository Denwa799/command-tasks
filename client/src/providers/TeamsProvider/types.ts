import {ITeam} from 'models/ITasks';
import {ReactNode} from 'react';

export interface ITeamsContext {
  teams: ITeam[] | null;
  teamsCount: number;
  loadedMoreTeams: ITeam[];
  team: ITeam | null;
  selectedTeamId: number;
  teamsIsLoading: boolean;
  moreTeamsIsLoading: boolean;
  teamIsLoading: boolean;
  createTeamIsLoading: boolean;
  deleteTeamIsLoading: boolean;
  updateTeamIsLoading: boolean;
  addUserInTeamIsLoading: boolean;
  deleteUserInTeamIsLoading: boolean;
  fetchTeams: (skip?: number, take?: number) => Promise<void>;
  fetchMoreTeams: (skip?: number, take?: number) => Promise<void>;
  cleanMoreTeams: () => void;
  fetchTeam: (id: number) => Promise<void>;
  createTeam: (name: string, creator: number, users: string[]) => Promise<void>;
  deleteTeam: (id: number) => Promise<void>;
  updateTeam: (id: number, name: string) => Promise<void>;
  addUserInTeam: (userId: number, teamId: number) => Promise<void>;
  setSelectedTeamId: (value: number) => void;
  deleteUserInTeam: (userId: number, teamId: number) => Promise<void>;
}

export interface ITeamsProvider {
  children: ReactNode;
}

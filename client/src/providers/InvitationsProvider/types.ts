import {IInvitations} from 'models/IInvitations';
import React from 'react';

export interface IInvitationsContext {
  checkedInvitationsId: number[];
  invitationsCount: number;
  invitations: IInvitations[] | null;
  loadedMoreInvitations: IInvitations[];
  teamInvitations: IInvitations[] | null;
  invitationsIsLoading: boolean;
  moreInvitationsIsLoading: boolean;
  createInvitationIsLoading: boolean;
  teamInvitationsIsLoading: boolean;
  deleteInvitationIsLoading: boolean;
  updateInvitationIsLoading: boolean;
  updateInvitationReadIsLoading: boolean;
  recreateInvitationIsLoading: boolean;
  fetchInvitations: (skip?: number, take?: number) => Promise<void>;
  fetchMoreInvitations: (skip?: number, take?: number) => Promise<void>;
  createInvitation: (
    message: string,
    teamId: number,
    userEmail: string,
  ) => Promise<void>;
  fetchTeamInvitations: (teamId: number) => Promise<void>;
  deleteInvitation: (id: number) => Promise<void>;
  updateInvitation: (id: number, isAccepted: boolean) => Promise<void>;
  updateInvitationRead: (id: number[]) => Promise<void>;
  recreateInvitation: (id: number) => Promise<void>;
  cleanMoreInvitations: () => void;
}

export interface IInvitationsProvider {
  children: React.ReactNode;
}

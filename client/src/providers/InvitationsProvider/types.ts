import {IInvitations} from 'models/IInvitations';
import React from 'react';

export interface IInvitationsContext {
  invitations: IInvitations[] | null;
  teamInvitations: IInvitations[] | null;
  checkedInvitationsId: number[];
  invitationsIsLoading: boolean;
  createInvitationIsLoading: boolean;
  teamInvitationsIsLoading: boolean;
  deleteInvitationIsLoading: boolean;
  updateInvitationIsLoading: boolean;
  updateInvitationReadIsLoading: boolean;
  recreateInvitationIsLoading: boolean;
  fetchInvitations: () => Promise<void>;
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
}

export interface IInvitationsProvider {
  children: React.ReactNode;
}

import {IInvitations} from 'models/IInvitations';
import React from 'react';

export interface IInvitationsContext {
  invitations: IInvitations[] | null;
  invitationsIsLoading: boolean;
  updateInvitationIsLoading: boolean;
  fetchInvitations: () => Promise<void>;
  updateInvitation: (id: number, isAccepted: boolean) => Promise<void>;
}

export interface IInvitationsProvider {
  children: React.ReactNode;
}

import {IInvitations} from 'models/IInvitations';
import React from 'react';

export interface IInvitationsContext {
  invitations: IInvitations[] | null;
  checkedInvitationsId: number[];
  invitationsIsLoading: boolean;
  updateInvitationIsLoading: boolean;
  updateInvitationReadIsLoading: boolean;
  fetchInvitations: () => Promise<void>;
  updateInvitation: (id: number, isAccepted: boolean) => Promise<void>;
  updateInvitationRead: (id: number[]) => Promise<void>;
}

export interface IInvitationsProvider {
  children: React.ReactNode;
}

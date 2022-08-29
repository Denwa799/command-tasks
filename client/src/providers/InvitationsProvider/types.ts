import {IInvitations} from 'models/IInvitations';
import React from 'react';

export interface IInvitationsContext {
  invitations: IInvitations[] | null;
  invitationsIsLoading: boolean;
  fetchInvitations: () => Promise<void>;
}

export interface IInvitationsProvider {
  children: React.ReactNode;
}

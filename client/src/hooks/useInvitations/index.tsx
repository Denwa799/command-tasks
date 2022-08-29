import {InvitationsContext} from 'providers/InvitationsProvider';
import {useContext} from 'react';

export const useInvitations = () => useContext(InvitationsContext);

import {TeamsContext} from 'providers/TeamsProvider';
import {useContext} from 'react';

export const useTeams = () => useContext(TeamsContext);

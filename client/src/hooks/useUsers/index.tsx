import {UsersContext} from 'providers/UsersProvider';
import {useContext} from 'react';

export const useUsers = () => useContext(UsersContext);

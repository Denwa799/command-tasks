import {useContext} from 'react';
import {TasksContext} from 'providers/TasksProvider';

export const useTasks = () => useContext(TasksContext);

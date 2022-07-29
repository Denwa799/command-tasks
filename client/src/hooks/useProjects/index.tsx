import {useContext} from 'react';
import {ProjectsContext} from 'providers/ProjectsProvider';

export const useProjects = () => useContext(ProjectsContext);

import React from 'react';
import {AuthProvider} from 'providers/AuthProvider';
import {AppNavigation} from 'navigation';
import {TeamsProvider} from 'providers/TeamsProvider';
import {ProjectsProvider} from 'providers/ProjectsProvider';
import {TasksProvider} from 'providers/TasksProvider';

const App = () => {
  return (
    <AuthProvider>
      <TeamsProvider>
        <ProjectsProvider>
          <TasksProvider>
            <AppNavigation />
          </TasksProvider>
        </ProjectsProvider>
      </TeamsProvider>
    </AuthProvider>
  );
};

export default App;

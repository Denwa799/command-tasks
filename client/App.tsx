import React from 'react';
import {AuthProvider} from 'providers/AuthProvider';
import {AppNavigation} from 'navigation';
import {TeamsProvider} from 'providers/TeamsProvider';
import {ProjectsProvider} from 'providers/ProjectsProvider';
import {TasksProvider} from 'providers/TasksProvider';
import {UsersProvider} from 'providers/UsersProvider';

const App = () => {
  return (
    <AuthProvider>
      <UsersProvider>
        <TeamsProvider>
          <ProjectsProvider>
            <TasksProvider>
              <AppNavigation />
            </TasksProvider>
          </ProjectsProvider>
        </TeamsProvider>
      </UsersProvider>
    </AuthProvider>
  );
};

export default App;

import React from 'react';
import {AuthProvider} from 'providers/AuthProvider';
import {AppNavigation} from 'navigation';
import {TeamsProvider} from 'providers/TeamsProvider';
import {ProjectsProvider} from 'providers/ProjectsProvider';

const App = () => {
  return (
    <AuthProvider>
      <TeamsProvider>
        <ProjectsProvider>
          <AppNavigation />
        </ProjectsProvider>
      </TeamsProvider>
    </AuthProvider>
  );
};

export default App;

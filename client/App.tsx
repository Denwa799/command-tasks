import React from 'react';
import {AuthProvider} from 'providers/AuthProvider';
import {AppNavigation} from 'navigation';
import {TeamsProvider} from 'providers/TeamsProvider';

const App = () => {
  return (
    <AuthProvider>
      <TeamsProvider>
        <AppNavigation />
      </TeamsProvider>
    </AuthProvider>
  );
};

export default App;

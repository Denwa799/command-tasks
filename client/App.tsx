import React from 'react';
import {AuthProvider} from 'providers/AuthProvider';
import {AppNavigation} from 'navigation';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;

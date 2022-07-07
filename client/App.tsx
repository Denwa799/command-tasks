import React from 'react';
import {AuthProvider} from 'providers/AuthProvider';
import {AuthScreen} from 'screens/Auth';

const App = () => {
  return (
    <AuthProvider>
      <AuthScreen />
    </AuthProvider>
  );
};

export default App;

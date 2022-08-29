import React from 'react';
import {AppNavigation} from 'navigation';
import {Providers} from 'providers';

const App = () => {
  return (
    <Providers>
      <AppNavigation />
    </Providers>
  );
};

export default App;

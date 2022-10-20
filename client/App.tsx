import React, {useEffect, useState} from 'react';
import {AppNavigation} from 'navigation';
import {Providers} from 'providers';
import {useNetInfo} from '@react-native-community/netinfo';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppLoader} from 'components/AppLoader';
import {AppNoInternetMessage} from 'components/AppNoInternetMessage';

const App = () => {
  const netInfo = useNetInfo();
  const [isNetConnected, setIsNetConnected] = useState(false);
  const [isNetConnectedLoading, setIsNetConnectedLoading] = useState(false);

  useEffect(() => {
    netInfo.isConnected === null
      ? setIsNetConnectedLoading(true)
      : setIsNetConnectedLoading(false);

    if (netInfo.isConnected === true) {
      setIsNetConnected(true);
      setIsNetConnectedLoading(false);
    }
  }, [netInfo]);

  return (
    <>
      {isNetConnectedLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          {isNetConnected ? (
            <Providers>
              <AppNavigation />
            </Providers>
          ) : (
            <AppNoInternetMessage />
          )}
        </>
      )}
    </>
  );
};

export default App;

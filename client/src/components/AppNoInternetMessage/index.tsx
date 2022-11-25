import React from 'react';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppTitle} from 'components/AppTitle';
import {AppContainer} from 'layouts/AppContainer';
import {styles} from './styles';

export const AppNoInternetMessage = () => {
  return (
    <AppContainer>
      <AppPositionContainer isCenter>
        <AppTitle level="2" style={styles.title}>
          Отсутствует подключение к интернету
        </AppTitle>
      </AppPositionContainer>
    </AppContainer>
  );
};

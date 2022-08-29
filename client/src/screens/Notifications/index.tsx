import {AppList} from 'components/AppList';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppTitle} from 'components/AppTitle';
import {useInvitations} from 'hooks/useInvitations';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const NotificationsScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {fetchInvitations, invitations, invitationsIsLoading} =
    useInvitations();

  useEffect(() => {
    fetchInvitations();
  }, []);

  const onRefresh = useCallback(() => {
    fetchInvitations();
  }, []);

  return (
    <View style={styles.notifications}>
      {invitationsIsLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          <AppList
            data={invitations}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            type="appMessageCard"
          />
          {(!invitations || invitations.length === 0) && (
            <AppPositionContainer isCenter isHorizontalCenter>
              <AppTitle level="2">Уведомлений нет</AppTitle>
            </AppPositionContainer>
          )}
        </>
      )}
    </View>
  );
};

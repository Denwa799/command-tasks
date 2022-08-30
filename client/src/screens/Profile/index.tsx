import {AppButton} from 'components/Btns/AppButton';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {useAuth} from 'hooks/useAuth';
import {AppContainer} from 'layouts/AppContainer';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {getUserName} from 'utils/getSession';
import {styles} from './styles';
import Anticon from 'react-native-vector-icons/AntDesign';
import {THEME} from 'constants/theme';
import {ModalEdit} from './ModalEdit';
import {useUsers} from 'hooks/useUsers';

export const ProfileScreen = () => {
  const [userName, setUserName] = useState('');
  const [userNameIsLoading, setUserNameIsLoading] = useState(false);
  const [editNameIsOpen, setEditNameIsOpen] = useState(false);

  const [userEmail, setUserEmail] = useState('');

  const {user, logout} = useAuth();
  const {updateUserIsLoading} = useUsers();

  useEffect(() => {
    const getName = async () => {
      setUserNameIsLoading(true);
      setUserName(await getUserName());
      setUserNameIsLoading(false);
    };
    getName();
  }, [updateUserIsLoading]);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

  const onEditName = useCallback(() => {
    setEditNameIsOpen(true);
  }, []);

  return (
    <View style={styles.profile}>
      {userNameIsLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          <View style={styles.header}>
            <View>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
            <TouchableHighlight onPress={onEditName} underlayColor="none">
              <Anticon name="edit" size={26} color={THEME.TEXT_COLOR} />
            </TouchableHighlight>
          </View>
          <ModalEdit
            isOpen={editNameIsOpen}
            setIsOpen={setEditNameIsOpen}
            name={userName}
          />
          <AppContainer style={styles.container}>
            <AppButton onPress={logout} title="Выйти" style={styles.logout} />
          </AppContainer>
        </>
      )}
    </View>
  );
};

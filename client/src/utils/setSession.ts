import EncryptedStorage from 'react-native-encrypted-storage';

export const setUserNameSession = async (name: string) => {
  const session = await EncryptedStorage.getItem('user_session');
  if (session) {
    const parseSession = JSON.parse(session);
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        id: parseSession.id,
        email: parseSession.email,
        name,
        access_token: parseSession.access_token,
        refresh_token: parseSession.refresh_token,
      }),
    );
    return parseSession;
  }
  return null;
};

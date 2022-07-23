import EncryptedStorage from 'react-native-encrypted-storage';

export const getAccessToken = async () => {
  const session = await EncryptedStorage.getItem('user_session');
  if (session) {
    const parseSession = JSON.parse(session);
    const tokenBearer = parseSession.access_token;
    return tokenBearer;
  }
  return null;
};

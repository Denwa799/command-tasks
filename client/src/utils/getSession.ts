import EncryptedStorage from 'react-native-encrypted-storage';

export const getSession = async () => {
  const session = await EncryptedStorage.getItem('user_session');
  if (session) {
    const parseSession = JSON.parse(session);
    return parseSession;
  }
  return null;
};

export const getAccessToken = async () => {
  const session = await EncryptedStorage.getItem('user_session');
  if (session) {
    const parseSession = JSON.parse(session);
    const tokenBearer = parseSession.access_token;
    return tokenBearer;
  }
  return null;
};

export const getUserName = async () => {
  const session = await EncryptedStorage.getItem('user_session');
  if (session) {
    const parseSession = JSON.parse(session);
    const name = parseSession.name;
    return name;
  }
  return null;
};

export const getUserEmail = async () => {
  const session = await EncryptedStorage.getItem('user_session');
  if (session) {
    const parseSession = JSON.parse(session);
    const email = parseSession.email;
    return email;
  }
  return null;
};

export const getUserId = async () => {
  const session = await EncryptedStorage.getItem('user_session');
  if (session) {
    const parseSession = JSON.parse(session);
    const id = parseSession.id;
    return id;
  }
  return null;
};

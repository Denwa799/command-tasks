import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {ITeam} from 'models/ITasks';
import {GetService} from 'api';
import {variables} from 'constants/variables';
import EncryptedStorage from 'react-native-encrypted-storage';

export const useTeams = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const teamsPath = `${variables.API_URL}${variables.TEAMS}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const session = await EncryptedStorage.getItem('user_session');
        if (session) {
          const parseSession = JSON.parse(session);
          const tokenBearer = parseSession.access_token;
          const response = await GetService(`${teamsPath}`, tokenBearer);
          setTeams(response.data);
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        Alert.alert('Ошибка загрузки списка команд');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {teams, isLoading};
};

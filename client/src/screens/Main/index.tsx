import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppList} from 'components/AppList';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {useTeams} from 'hooks/useTeams';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {TeamScreenNavigateType} from './types';

export const MainScreen = () => {
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<TeamScreenNavigateType>>();
  const {teams, isLoading} = useTeams();

  useEffect(() => {
    navigation.setOptions({
      title: 'Команды',
    });
  }, []);

  console.log(teams);

  return (
    <View style={styles.main}>
      {isLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <View>
          <AppList data={teams} />
        </View>
      )}
    </View>
  );
};

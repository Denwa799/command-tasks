import {AppCard} from 'components/AppCard';
import React, {FC} from 'react';
import {FlatList, View} from 'react-native';
import {IAppList} from './types';

export const AppList: FC<IAppList> = ({
  data,
  onOpen,
  style,
  onDelete,
  onChange,
  refreshing,
  onRefresh,
}) => {
  return (
    <View>
      <FlatList
        data={data}
        style={style}
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({item}) => (
          <AppCard
            id={item.id}
            text={item.name ? item.name : item.text}
            item={item}
            onOpen={onOpen}
            onDelete={onDelete}
            onChange={onChange}
          />
        )}
      />
    </View>
  );
};

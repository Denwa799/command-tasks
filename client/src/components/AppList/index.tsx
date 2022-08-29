import {AppCard} from 'components/AppCard';
import {AppMessageCard} from 'components/AppMessageCard';
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
  isColors,
  type = 'appCard',
  messageCardTextBtn,
  messageCardSecTextBtn,
  onPressMessageBtn,
  disabledMessagePressBtn,
}) => {
  const renderItem = ({item}) => {
    return (
      <>
        {type === 'appCard' && (
          <AppCard
            id={item?.id}
            text={item.name ? item.name : item.text}
            item={item}
            onOpen={onOpen}
            onDelete={onDelete}
            onChange={onChange}
            isColors={isColors}
            responsible={item?.responsible}
            status={item?.status}
            isUrgently={item?.isUrgently}
            date={item?.date}
          />
        )}
        {type === 'appMessageCard' && (
          <AppMessageCard
            id={item?.id}
            message={item?.message}
            isAccepted={item?.isAccepted}
            btnText={messageCardTextBtn}
            secondBtnText={messageCardSecTextBtn}
            onPress={onPressMessageBtn}
            disabled={disabledMessagePressBtn}
          />
        )}
      </>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        style={style}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={renderItem}
      />
    </View>
  );
};

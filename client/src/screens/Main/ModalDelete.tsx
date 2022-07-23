import {AppModal} from 'components/AppModal';
import {AppNativeButton} from 'components/AppNativeButton';
import React, {FC, useCallback} from 'react';
import {Text, View} from 'react-native';
import {IModalDelete} from './types';
import {styles} from './styles';
import {useTeams} from 'hooks/useTeams';

const ModalDelete: FC<IModalDelete> = ({isOpen, setIsOpen, id}) => {
  const {fetchTeams, deleteTeam} = useTeams();

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onDelete = useCallback(async () => {
    await deleteTeam(id);
    await fetchTeams();
    setIsOpen(false);
  }, [id]);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Text style={styles.modalText}>Удалить?</Text>
      <View style={styles.modalBtns}>
        <AppNativeButton
          title="Отменить"
          styleContainer={styles.modalBtn}
          onPress={onClose}
        />
        <AppNativeButton
          title="Удалить"
          styleContainer={styles.modalBtn}
          onPress={onDelete}
        />
      </View>
    </AppModal>
  );
};

export default ModalDelete;

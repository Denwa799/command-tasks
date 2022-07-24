import React, {FC} from 'react';
import {ModalChange} from './ModalChange';
import {ModalCreate} from './ModalCreate';
import ModalDelete from './ModalDelete';
import {IModals} from './types';

export const Modals: FC<IModals> = ({
  createIsOpen,
  setCreateIsOpen,
  id,
  deleteIsOpen,
  setDeleteIsOpen,
  changeIsOpen,
  setChangeIsOpen,
  text,
}) => {
  return (
    <>
      <ModalCreate isOpen={createIsOpen} setIsOpen={setCreateIsOpen} />
      <ModalDelete isOpen={deleteIsOpen} setIsOpen={setDeleteIsOpen} id={id} />
      <ModalChange
        isOpen={changeIsOpen}
        setIsOpen={setChangeIsOpen}
        id={id}
        text={text}
      />
    </>
  );
};

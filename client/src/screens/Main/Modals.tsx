import React, {FC} from 'react';
import {ModalCreate} from './ModalCreate';
import ModalDelete from './ModalDelete';
import {IModals} from './types';

export const Modals: FC<IModals> = ({
  createIsOpen,
  setCreateIsOpen,
  id,
  deleteIsOpen,
  setDeleteIsOpen,
}) => {
  return (
    <>
      <ModalCreate isOpen={createIsOpen} setIsOpen={setCreateIsOpen} />
      <ModalDelete isOpen={deleteIsOpen} setIsOpen={setDeleteIsOpen} id={id} />
    </>
  );
};

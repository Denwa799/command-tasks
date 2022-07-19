import React, {FC} from 'react';
import {ModalCreate} from './ModalCreate';
import {IModals} from './types';

export const Modals: FC<IModals> = ({createIsOpen, setCreateIsOpen}) => {
  return (
    <>
      <ModalCreate isOpen={createIsOpen} setIsOpen={setCreateIsOpen} />
    </>
  );
};

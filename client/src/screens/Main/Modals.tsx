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
  teamId,
  projectId,
  responsible,
  status,
  isUrgently,
  date,
}) => {
  return (
    <>
      <ModalCreate
        isOpen={createIsOpen}
        setIsOpen={setCreateIsOpen}
        teamId={teamId}
        projectId={projectId}
      />
      <ModalDelete
        isOpen={deleteIsOpen}
        setIsOpen={setDeleteIsOpen}
        id={id}
        teamId={teamId}
        projectId={projectId}
      />
      <ModalChange
        isOpen={changeIsOpen}
        setIsOpen={setChangeIsOpen}
        id={id}
        text={text}
        teamId={teamId}
        responsible={responsible}
        status={status}
        isUrgently={isUrgently}
        date={date}
        projectId={projectId}
      />
    </>
  );
};

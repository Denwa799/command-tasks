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
  responsibleEmail,
  status,
  isUrgently,
  date,
  onUpdateData,
}) => {
  return (
    <>
      <ModalCreate
        isOpen={createIsOpen}
        setIsOpen={setCreateIsOpen}
        teamId={teamId}
        projectId={projectId}
        onUpdateData={onUpdateData}
      />
      <ModalDelete
        isOpen={deleteIsOpen}
        setIsOpen={setDeleteIsOpen}
        id={id}
        teamId={teamId}
        projectId={projectId}
        onUpdateData={onUpdateData}
      />
      <ModalChange
        isOpen={changeIsOpen}
        setIsOpen={setChangeIsOpen}
        id={id}
        text={text}
        teamId={teamId}
        responsibleEmail={responsibleEmail}
        status={status}
        isUrgently={isUrgently}
        date={date}
        projectId={projectId}
        onUpdateData={onUpdateData}
      />
    </>
  );
};

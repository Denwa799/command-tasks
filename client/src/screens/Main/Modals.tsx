import React, {FC} from 'react';
import {ModalChange} from './ModalChange';
import {ModalCreate} from './ModalCreate';
import {ModalDialog} from './ModalDialog';
import {IModals} from './types';

export const Modals: FC<IModals> = ({
  id,
  teamId,
  projectId,
  text,
  responsibleEmail,
  dialogTitle,
  statusAction,
  createIsOpen,
  dialogIsOpen,
  changeIsOpen,
  isUrgently,
  date,
  status,
  onUpdateData,
  setChangeIsOpen,
  setDialogIsOpen,
  setCreateIsOpen,
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
      <ModalDialog
        id={id}
        teamId={teamId}
        projectId={projectId}
        title={dialogTitle}
        statusAction={statusAction}
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
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

import {AppModal} from 'components/AppModal';
import React from 'react';
import {DialogActions} from './DialogActions';
import {DialogButton} from './DialogButton';
import {DialogTitle} from './DialogTitle';
import {AppDialogType} from './types';

export const AppDialog = ({
  children,
  isOpen,
  style,
  setIsOpen,
}: AppDialogType) => {
  return (
    <AppModal isOpen={isOpen} style={style} setIsOpen={setIsOpen}>
      {children}
    </AppModal>
  );
};

AppDialog.Title = DialogTitle;
AppDialog.Actions = DialogActions;
AppDialog.Button = DialogButton;

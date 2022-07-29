export interface IAppDatePicker {
  date: Date;
  isOpen: boolean;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  title?: string;
}

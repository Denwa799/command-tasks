export interface IAppMessageCard {
  id: number;
  message: string;
  isAccepted: boolean;
  btnText?: string;
  secondBtnText?: string;
  onPress?: (id: number) => void;
  onSecondPress?: (id: number) => void;
  disabled?: boolean;
}

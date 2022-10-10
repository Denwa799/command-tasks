export interface IAppUserCard {
  id: number;
  name: string;
  email: string;
  btnText: string;
  isActive?: boolean;
  isBtnVisible?: boolean;
  isCreator?: boolean;
  isInvitation?: boolean;
  onPress: (id: number, email: string) => void;
  style?: Object;
  isDisabled?: boolean;
}

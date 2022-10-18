export interface IAppUserCard {
  id: number;
  name: string;
  email: string;
  btnText: string;
  isActive?: boolean;
  isBtnVisible?: boolean;
  isCreator?: boolean;
  isInvitation?: boolean;
  isDisabled?: boolean;
  style?: Object;
  onPress: (id: number, email: string) => void;
  onButtonTextPress: (id: number) => void;
}

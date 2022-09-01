export interface IAppTextButton {
  children: string | string[];
  onPress: () => void;
  style?: Object;
  containerStyle?: Object;
  isTextCenter?: boolean;
  numberOfLines?: number;
}

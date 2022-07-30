export interface IAppButton {
  onPress: () => void;
  title: string;
  colors?: [string, string];
  style?: Object;
}

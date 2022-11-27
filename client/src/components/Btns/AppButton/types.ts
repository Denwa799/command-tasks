export interface IAppButton {
  title: string;
  colors?: [string, string];
  style?: Object;
  onPress: () => void;
}

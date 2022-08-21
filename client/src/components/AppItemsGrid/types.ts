export interface IAppItemsGrid {
  items: string[];
  style?: Object;
  onDelete: (index: number) => void;
}

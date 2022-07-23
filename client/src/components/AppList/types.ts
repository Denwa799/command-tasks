export interface IAppList {
  data: any; //Необходим any, так как по итогу передается в FlatList, data которого равна any
  onOpen?: (item: any) => void;
  style?: Object;
  onDelete?: (id: number) => void;
  onChange?: (id: number, name: string) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

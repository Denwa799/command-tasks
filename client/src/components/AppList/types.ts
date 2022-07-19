export interface IAppList {
  data: any; //Необходим any, так как по итогу передается в FlatList, data которого равна any
  onOpen?: (item: any) => void;
  style?: Object;
  onDelete?: (_id: string) => void;
  onChange?: (_id: string, name: string) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

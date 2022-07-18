export interface IAppCard {
  id: string;
  text: string;
  status?: 'notCompleted' | 'inProgress' | 'done';
  responsible?: string;
  item: any;
  onOpen?: (item: any) => void;
  onDelete?: (_id: string) => void;
  onChange?: (_id: string, name: string) => void;
}

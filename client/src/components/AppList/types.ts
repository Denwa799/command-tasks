import {TaskStatusType} from 'models/ITasks';

export interface IAppList {
  data: any; //Необходим any, так как по итогу передается в FlatList, data которого равна any
  onOpen?: (item: any) => void;
  style?: Object;
  onDelete?: (id: number) => void;
  onChange?: (
    id: number,
    text: string,
    responsible: string | undefined,
    status: TaskStatusType | undefined,
    isUrgently: boolean | undefined,
    date: Date | undefined,
  ) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  isColors?: boolean;
  type?: 'appCard' | 'appMessageCard';
  messageCardTextBtn?: string;
  messageCardSecTextBtn?: string;
  onPressMessageBtn?: (id: number) => void;
  disabledMessagePressBtn?: boolean;
  creatorId?: number;
}

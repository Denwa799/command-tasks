import {TaskStatusType} from 'models/ITasks';

export interface IAppCard {
  id: number;
  text: string;
  status?: TaskStatusType;
  responsible?: string;
  item: any;
  onOpen?: (item: any) => void;
  onDelete?: (id: number) => void;
  onChange?: (
    id: number,
    text: string,
    responsible: string | undefined,
    status: TaskStatusType | undefined,
    isUrgently: boolean | undefined,
    date: Date | undefined,
  ) => void;
  isColors?: boolean;
  isUrgently?: boolean;
  date?: Date;
  creatorId?: number;
}

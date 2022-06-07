import { CategoryModel } from '@/models/category';
import { ClientModel } from '@/models/client';

export interface ProjectModel {
  id: string;
  code?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  client: ClientModel;
  categories: CategoryModel[];
}

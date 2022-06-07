import { ProjectModel } from '@/models/project';

export interface ClientModel {
  id: string;
  code?: string;
  name: string;
  projects: ProjectModel[];
}

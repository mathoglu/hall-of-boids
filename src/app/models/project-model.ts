import {ISkill} from "./skill-model";
export interface IProject {
  id?: number;
  employee_id: number;
  client: string;
  description: string;
  duration_from: Date;
  duration_to: Date;
}

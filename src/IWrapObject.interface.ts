import { HTTPMethod } from "./HTTPMethod.enum";

export interface IWrapObject {
  id: number;
  method: string;
  srcRoute: string;
  destRoute: string;
  params?: any;
}

import { HTTPMethod } from "./HTTPMethod.enum";

export interface IWrapObject {
  id: number;
  method: HTTPMethod;
  srcRoute: string;
  destRoute: string;
  params?: any;
}

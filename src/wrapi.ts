import { IWrapObject } from "./IWrapObject.interface";
import { IWrapiConfig } from "./IWrapiConfig.interface";
import * as express from "express";
import Axios from "axios";
import { HTTPMethod } from "./HTTPMethod.enum";

export class Wrapi {
  router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  add(wrapiConfig: IWrapiConfig) {
    wrapiConfig.api.forEach((api) => {
      switch (api.method) {
        case HTTPMethod.GET:
          this.generateGet(wrapiConfig.base_url, api);
          break;
      }
    });
  }

  generateGet(baseUrl: string, wrap: IWrapObject) {
    this.router.get(wrap.destRoute, (req, res) => {
      let extEndpoint = baseUrl.concat(
        this.paramsInjector(wrap.srcRoute, req.params)
      );

      Axios.get(extEndpoint)
        .then((result) => res.send(result.data))
        .catch((err) => res.send(err));
    });
  }

  paramsInjector(srcRoute: string, params: any) {
    let srcRouteSplitted = srcRoute.split("/");
    srcRouteSplitted = srcRouteSplitted.map((value: string) => {
      if (value.startsWith(":")) {
        value = value.substring(1);
        if (params[value]) return params[value];
        else throw new Error(`Missing params: "${value}"`);
      }
      return value;
    });
    return srcRouteSplitted.join("/");
  }
}

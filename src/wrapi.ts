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
      switch (api.method.toLowerCase()) {
        case "get":
          this.generateGet(wrapiConfig.base_url, api);
          break;
        case "post":
          this.generatePost(wrapiConfig.base_url, api);
          break;
        case "put":
          this.generatePut(wrapiConfig.base_url, api);
          break;
        case "delete":
          this.generateDelete(wrapiConfig.base_url, api);
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

  generatePost(baseUrl: string, wrap: IWrapObject) {
    this.router.post(wrap.destRoute, (req, res) => {
      let extEndpoint = baseUrl.concat(
        this.paramsInjector(wrap.srcRoute, req.params)
      );

      let data = req.body;

      Axios.post(extEndpoint, data)
        .then((result) => res.send(result.data))
        .catch((err) => res.send(err));
    });
  }

  generatePut(baseUrl: string, wrap: IWrapObject) {
    this.router.put(wrap.destRoute, (req, res) => {
      let extEndpoint = baseUrl.concat(
        this.paramsInjector(wrap.srcRoute, req.params)
      );

      let data = req.body;

      Axios.put(extEndpoint, data)
        .then((result) => res.send(result.data))
        .catch((err) => res.send(err));
    });
  }

  generateDelete(baseUrl: string, wrap: IWrapObject) {
    this.router.delete(wrap.destRoute, (req, res) => {
      let extEndpoint = baseUrl.concat(
        this.paramsInjector(wrap.srcRoute, req.params)
      );

      Axios.delete(extEndpoint)
        .then((result) => res.send(result))
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

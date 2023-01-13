import httpService from "../config/axios";
import type { Gateway } from "../types/gateway";

export const listGateways = async () =>
  httpService.get("/gateways").then((e) => e.data as Gateway[]);

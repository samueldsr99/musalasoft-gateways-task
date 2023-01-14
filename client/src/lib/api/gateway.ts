import httpService from "../config/axios";
import type { CreateGatewayRequest, Gateway } from "../types/gateway";

export const listGateways = async () =>
  httpService.get("/gateways").then((e) => e.data as Gateway[]);

export const deleteGateway = async (serialNumber: string) =>
  httpService
    .delete(`/gateways/${serialNumber}`)
    .then((e) => e.data as Gateway);

export const createGateway = async (data: CreateGatewayRequest) =>
  httpService.post("/gateways", data);

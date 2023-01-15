import httpService from "../config/axios";
import type {
  CreateGatewayRequest,
  Gateway,
  UpdateGatewayRequest,
} from "../types/gateway";

export const listGateways = async () =>
  httpService.get("/gateways").then((e) => e.data as Gateway[]);

export const readGateway = async (serialNumber: string) =>
  httpService.get(`/gateways/${serialNumber}`).then((e) => e.data as Gateway);

export const deleteGateway = async (serialNumber: string) =>
  httpService
    .delete(`/gateways/${serialNumber}`)
    .then((e) => e.data as Gateway);

export const createGateway = async (data: CreateGatewayRequest) =>
  httpService.post("/gateways", data);

export const updateGateway = async ({
  serialNumber,
  body,
}: UpdateGatewayRequest) =>
  httpService
    .patch(`/gateways/${serialNumber}`, body)
    .then((e) => e.data as Gateway);

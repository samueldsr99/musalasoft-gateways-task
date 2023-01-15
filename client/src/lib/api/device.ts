import httpService from "../config/axios";
import type { CreateDeviceBulkRequest, Device } from "../types/device";

export const createDeviceBulk = ({
  gatewaySerialNumber,
  devices,
}: CreateDeviceBulkRequest) =>
  httpService
    .post(`gateways/${gatewaySerialNumber}/device/bulk`, devices)
    .then((e) => e.data as Device[]);

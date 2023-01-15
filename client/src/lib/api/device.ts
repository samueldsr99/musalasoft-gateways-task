import httpService from "../config/axios";
import type {
  CreateDeviceBulkRequest,
  Device,
  DeleteDeviceRequest,
} from "../types/device";

export const createDeviceBulk = ({
  gatewaySerialNumber,
  devices,
}: CreateDeviceBulkRequest) =>
  httpService
    .post(`gateways/${gatewaySerialNumber}/devices/bulk`, devices)
    .then((e) => e.data as Device[]);

export const deleteDevice = ({
  gatewaySerialNumber,
  uuid,
}: DeleteDeviceRequest) =>
  httpService
    .delete(`/gateways/${gatewaySerialNumber}/devices/${uuid}`)
    .then((e) => e.data as Device);

import type { Device } from "./device";

export type Gateway = {
  id: string;
  name: string;
  serialNumber: string;
  address: string;
  devices: Device[];
};

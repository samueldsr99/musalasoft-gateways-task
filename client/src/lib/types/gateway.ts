import type { Device } from "./device";

export type Gateway = {
  id: string;
  name: string;
  address: string;
  devices: Device[];
};

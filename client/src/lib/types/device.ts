export type DeviceStatus = "online" | "offline";

export type Device = {
  uuid: number;
  vendor: string;
  status: DeviceStatus;
  createdAt: string;
};

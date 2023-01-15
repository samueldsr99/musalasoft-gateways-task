import { z } from "zod";

export const deviceStatusSchema = z.enum(["online", "offline"]);

export type DeviceStatus = z.infer<typeof deviceStatusSchema>;

export const deviceSchema = z.object({
  uuid: z.string(),
  vendor: z.string(),
  status: deviceStatusSchema,
  createdAt: z.string(),
});

export const createDeviceSchema = z.object({
  vendor: z.string().min(1),
  status: deviceStatusSchema,
});

export const createDeviceBulkSchema = z.object({
  devices: z.array(createDeviceSchema),
});

export const createDeviceBulkRequestSchema = z.object({
  gatewaySerialNumber: z.string(),
  devices: createDeviceBulkSchema,
});

export type Device = z.infer<typeof deviceSchema>;

export type CreateDevice = z.infer<typeof createDeviceSchema>;

export type CreateDeviceBulk = z.infer<typeof createDeviceBulkSchema>;

export type CreateDeviceBulkRequest = z.infer<
  typeof createDeviceBulkRequestSchema
>;

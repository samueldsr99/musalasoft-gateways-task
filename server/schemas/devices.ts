import { z } from "zod";

export const deviceStatusSchema = z.enum(["online", "offline"]);

export const deviceSchema = z.object({
  id: z.string(),
  uuid: z.string(),
  vendor: z.string(),
  createdAt: z.date().default(new Date()),
  status: deviceStatusSchema,
  gatewayId: z.string(),
});

export const createDeviceSchema = z.object({
  params: z.object({
    serialNumber: z.string(),
  }),
  body: z.object({
    vendor: z.string(),
    status: deviceStatusSchema,
  }),
});

export const createDeviceBulkSchema = z.object({
  params: z.object({
    serialNumber: z.string(),
  }),
  body: z.object({
    devices: z.array(
      z.object({
        vendor: z.string(),
        status: deviceStatusSchema,
      })
    ),
  }),
});

export const deleteDeviceSchema = z.object({
  params: z.object({
    uuid: z.string(),
  }),
});

import { z } from "zod";

export const deviceStatusSchema = z.enum(["online", "offline"]);

export type DeviceStatus = z.infer<typeof deviceStatusSchema>;

export const deviceSchema = z.object({
  uuid: z.string(),
  vendor: z.string(),
  status: deviceStatusSchema,
  createdAt: z.date(),
});

export type Device = z.infer<typeof deviceSchema>;

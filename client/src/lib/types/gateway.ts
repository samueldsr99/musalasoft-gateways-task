import { createDeviceSchema, deviceSchema } from "./device";
import { z } from "zod";
import { IPV4_ADDRESS_REGEX } from "../utils";

const ipv4Schema = z.string().regex(IPV4_ADDRESS_REGEX, "Invalid IPV4 Address");

export const gatewaySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  serialNumber: z.string(),
  address: ipv4Schema,
  devices: z.array(deviceSchema),
});

export const createGatewaySchema = z.object({
  serialNumber: z.string().optional(),
  name: z.string().min(1),
  address: ipv4Schema,
  devices: z.array(createDeviceSchema).default([]),
});

export const updateGatewaySchema = z.object({
  serialNumber: z.string(),
  body: z.object({
    name: z.string().optional(),
    address: ipv4Schema.optional(),
  }),
});

export type Gateway = z.infer<typeof gatewaySchema>;

export type CreateGatewayRequest = z.infer<typeof createGatewaySchema>;

export type UpdateGatewayRequest = z.infer<typeof updateGatewaySchema>;

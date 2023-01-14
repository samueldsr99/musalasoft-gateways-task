import { z } from "zod";
import { IPV4_ADDRESS_REGEX } from "../utils/constants";
import { deviceSchema } from "./devices";

const ipv4Schema = z.string().regex(IPV4_ADDRESS_REGEX);

export const gatewaySchema = z.object({
  id: z.string(),
  serialNumber: z.string(),
  name: z.string(),
  address: ipv4Schema,
});

export const createGatewaySchema = z.object({
  body: z.object({
    serialNumber: z.string().optional(),
    name: z.string(),
    address: ipv4Schema,
    devices: z.array(deviceSchema).default([]),
  }),
});

export const deleteGatewaySchema = z.object({
  params: z.object({
    serialNumber: z.string(),
  }),
});

export const readGatewaySchema = z.object({
  params: z.object({
    serialNumber: z.string(),
  }),
});

import { Device } from "@prisma/client";
import request from "supertest";

import app from "../../app";
import prisma from "../../config/prisma";
import { mockCreateGatewayRequests } from "../../mock-data/gateways";

beforeAll(async () => {
  await prisma.$connect();
});

describe("POST /devices", () => {
  let serialNumber: string;
  let devices: Device[];

  beforeAll(async () => {
    const createdGatewayRes = await request(app)
      .post("/gateways")
      .send(mockCreateGatewayRequests.validManyDevices)
      .expect(200);

    serialNumber = createdGatewayRes.body.serialNumber;
    devices = createdGatewayRes.body.devices;
  });

  it("Should not allow add device for a fulfilled gateway", async () => {
    await request(app)
      .post(`/gateways/${serialNumber}/devices/bulk`)
      .send([
        {
          vendor: "vendor",
          status: "online",
        },
      ])
      .expect(400);
  });

  it("Should allow add device if there is a slot", async () => {
    // delete some device
    await request(app)
      .delete(`/gateways/${serialNumber}/devices/${devices[0].uuid}`)
      .expect(200);

    // Insert new device
    await request(app)
      .post(`/gateways/${serialNumber}/devices`)
      .send({
        vendor: "vendor",
        status: "offline",
      })
      .expect(200);
  });
});

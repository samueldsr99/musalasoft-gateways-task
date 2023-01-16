import request from "supertest";

import app from "../../app";
import prisma from "../../config/prisma";
import { mockCreateGatewayRequests } from "../../mock-data/gateways";

beforeAll(async () => {
  await prisma.$connect();
});

describe("GET /gateways", () => {
  it("Should retrieve gateways", async () => {
    await request(app).get("/gateways").expect(200);
  });
});

describe("POST /gateways", () => {
  it("Should create gateway", async () => {
    await request(app)
      .post("/gateways")
      .send(mockCreateGatewayRequests.valid)
      .expect(200);
  });

  it("Should fail to create gateway with invalid ip address", async () => {
    await request(app)
      .post("/gateways")
      .send(mockCreateGatewayRequests.invalidAddress)
      .expect(400);
  });

  it("Should fail to create gateway with more than 10 devices", async () => {
    await request(app)
      .post("/gateways")
      .send(mockCreateGatewayRequests.manyDevices)
      .expect(400);
  });
});

describe("PATCH /gateways", () => {
  let serialNumber: string;

  beforeAll(async () => {
    // Create a valid Gateway
    const createdGatewayRes = await request(app)
      .post("/gateways")
      .send(mockCreateGatewayRequests.valid)
      .expect(200);

    serialNumber = createdGatewayRes.body.serialNumber;
  });

  it("Should patch update a gateway", async () => {
    // Try to update created gateway
    await request(app)
      .patch(`/gateways/${serialNumber}`)
      .send({
        name: "New name",
        address: "192.168.43.51",
      })
      .expect(200);
  });

  it("Should not patch invalid address", async () => {
    await request(app)
      .patch(`/gateways/${serialNumber}`)
      .send({
        name: "New name",
        address: "255.255.255.256",
      })
      .expect(400);
  });
});

describe("DELETE /gateways", () => {
  let serialNumber: string;

  beforeAll(async () => {
    const createdGatewayRes = await request(app)
      .post("/gateways")
      .send(mockCreateGatewayRequests.valid)
      .expect(200);

    serialNumber = createdGatewayRes.body.serialNumber;
  });

  it("Should not delete an unknown gateway", async () => {
    await request(app).delete("/gateways/123").expect(404);
  });

  it("Should delete a gateway", async () => {
    await request(app).delete(`/gateways/${serialNumber}`).expect(200);
  });
});

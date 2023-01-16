import request from "supertest";

import app from "../../app";

const mockGatewayRequests = {
  valid: {
    name: "Mock Gateway",
    address: "192.168.43.51",
  },
  invalidAddress: {
    name: "Invalid Address",
    address: "100.100.100.256",
  },
};

describe("GET /gateways", () => {
  it("Should retrieve gateways", async () => {
    const res = await request(app).get("/gateways");

    expect(res.statusCode).toEqual(200);
  });
});

describe("POST /gateways", () => {
  it("Should create gateway", async () => {
    const res = await request(app)
      .post("/gateways")
      .send(mockGatewayRequests.valid);

    expect(res.statusCode).toEqual(200);
  });

  it("Should fail to create gateway with invalid ip address", async () => {
    const res = await request(app)
      .post("/gateways")
      .send(mockGatewayRequests.invalidAddress);

    expect(res.statusCode).toEqual(400);
  });
});

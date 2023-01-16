export const mockCreateGatewayRequests = {
  valid: {
    name: "Mock Gateway",
    address: "192.168.43.51",
  },
  invalidAddress: {
    name: "Invalid Address",
    address: "100.100.100.256",
  },
  manyDevices: {
    name: "Many Devices Gateway",
    address: "199.199.199.199",
    devices: [
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
      {
        vendor: "vendor",
        status: "online",
      },
    ],
  },
};

const querykeys = {
  listGateways: () => ["list-gateways"],
  readGateway: (serialNumber: string) => ["read-gateway", serialNumber],
};

export default querykeys;

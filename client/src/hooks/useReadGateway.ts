import { useQuery } from "react-query";

import querykeys from "@/querykeys";
import { readGateway } from "@/lib/api/gateway";

export const useReadGateway = (serialNumber: string) =>
  useQuery(querykeys.readGateway(serialNumber), () =>
    readGateway(serialNumber)
  );

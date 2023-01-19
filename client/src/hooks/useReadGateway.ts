import type { UseQueryOptions } from "react-query";
import { useQuery } from "react-query";

import querykeys from "@/querykeys";
import { readGateway } from "@/lib/api/gateway";
import type { Gateway } from "@/lib/types/gateway";

export const useReadGateway = (
  serialNumber: string,
  options: UseQueryOptions<Gateway, Error, Gateway>
) =>
  useQuery<Gateway, Error, Gateway>(
    querykeys.readGateway(serialNumber),
    () => readGateway(serialNumber),
    options
  );

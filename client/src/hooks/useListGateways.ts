import { useQuery } from "react-query";

import querykeys from "@/querykeys";
import { listGateways } from "@/lib/api/gateway";

export const useListGateways = () =>
  useQuery(querykeys.listGateways(), () => listGateways());

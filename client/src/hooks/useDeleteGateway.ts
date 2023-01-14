import { useMutation } from "react-query";

import { deleteGateway } from "@/lib/api/gateway";
import queryClient from "@/lib/config/query-client";
import querykeys from "@/querykeys";

export const useDeleteGateway = () =>
  useMutation({
    mutationFn: (serialNumber: string) => deleteGateway(serialNumber),
    async onSuccess() {
      await queryClient.invalidateQueries(querykeys.listGateways());
    },
  });

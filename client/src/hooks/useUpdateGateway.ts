import { useMutation } from "react-query";

import { updateGateway } from "@/lib/api/gateway";
import queryClient from "@/lib/config/query-client";
import querykeys from "@/querykeys";
import type { UpdateGatewayRequest } from "@/lib/types/gateway";

export const useUpdateGateway = () =>
  useMutation({
    mutationFn: ({ serialNumber, body }: UpdateGatewayRequest) =>
      updateGateway({ serialNumber, body }),
    async onSuccess(_, { serialNumber }) {
      await queryClient.invalidateQueries(querykeys.listGateways());
      await queryClient.invalidateQueries(querykeys.readGateway(serialNumber));
    },
  });

import { useMutation } from "react-query";

import type { CreateGatewayRequest } from "@/lib/types/gateway";
import queryClient from "@/lib/config/query-client";
import querykeys from "@/querykeys";
import { createGateway } from "@/lib/api/gateway";

export const useCreateGateway = () =>
  useMutation({
    mutationFn: (data: CreateGatewayRequest) => createGateway(data),
    async onSuccess() {
      await queryClient.invalidateQueries(querykeys.listGateways());
    },
  });

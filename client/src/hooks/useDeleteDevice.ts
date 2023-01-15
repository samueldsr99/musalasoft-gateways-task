import { useMutation } from "react-query";

import { deleteDevice } from "@/lib/api/device";
import queryClient from "@/lib/config/query-client";
import querykeys from "@/querykeys";
import type { DeleteDeviceRequest } from "@/lib/types/device";

export const useDeleteDevice = () =>
  useMutation({
    mutationFn: ({ gatewaySerialNumber, uuid }: DeleteDeviceRequest) =>
      deleteDevice({ gatewaySerialNumber, uuid }),
    async onSuccess(_, { gatewaySerialNumber }) {
      await queryClient.invalidateQueries(querykeys.listGateways());
      await queryClient.invalidateQueries(
        querykeys.readGateway(gatewaySerialNumber)
      );
    },
  });

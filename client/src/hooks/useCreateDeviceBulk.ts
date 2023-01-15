import { useMutation } from "react-query";

import queryClient from "@/lib/config/query-client";
import querykeys from "@/querykeys";
import type { CreateDeviceBulkRequest } from "@/lib/types/device";
import { createDeviceBulk } from "@/lib/api/device";

export const useCreateDeviceBulk = () =>
  useMutation({
    mutationFn: ({ gatewaySerialNumber, devices }: CreateDeviceBulkRequest) =>
      createDeviceBulk({ gatewaySerialNumber, devices }),
    async onSuccess(_, { gatewaySerialNumber }) {
      await queryClient.invalidateQueries(
        querykeys.readGateway(gatewaySerialNumber)
      );
    },
  });

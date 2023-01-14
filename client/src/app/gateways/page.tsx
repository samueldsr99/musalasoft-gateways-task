"use client";

import Typography from "@/components/atom/typography";
import { useDeleteGateway } from "@/hooks/useDeleteGateway";
import { useListGateways } from "@/hooks/useListGateways";
import GatewaysTable from "./gateways-table";

const Gateways: React.FC = () => {
  const { data: gateways } = useListGateways();
  const { mutateAsync: deleteGateway } = useDeleteGateway();

  return (
    <div className="p-4 md:p-8">
      <Typography as="h1" weight="bold" className="text-center md:text-left">
        Gateways
      </Typography>
      <div className="mt-10 overflow-y-hidden overflow-x-scroll">
        <GatewaysTable gateways={gateways} onDelete={deleteGateway} />
      </div>
    </div>
  );
};

export default Gateways;

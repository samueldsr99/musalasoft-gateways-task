"use client";

import Button from "@/components/atom/button/button";
import Typography from "@/components/atom/typography";
import { useDeleteGateway } from "@/hooks/useDeleteGateway";
import { useListGateways } from "@/hooks/useListGateways";
import Link from "next/link";
import GatewaysTable from "./gateways-table";

const Gateways: React.FC = () => {
  const { data: gateways } = useListGateways();
  const { mutateAsync: deleteGateway } = useDeleteGateway();

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between">
        <Typography
          as="h1"
          weight="semibold"
          className="text-center md:text-left"
        >
          Gateways
        </Typography>
        <Link href="/gateways/new">
          <Button>New</Button>
        </Link>
      </div>
      <div className="mt-10 overflow-y-hidden overflow-x-scroll">
        <GatewaysTable gateways={gateways} onDelete={deleteGateway} />
      </div>
    </div>
  );
};

export default Gateways;

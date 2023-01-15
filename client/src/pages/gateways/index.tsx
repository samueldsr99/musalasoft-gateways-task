import Link from "next/link";

import Button from "@/components/atom/button/button";
import { useDeleteGateway } from "@/hooks/useDeleteGateway";
import { useListGateways } from "@/hooks/useListGateways";
import GatewaysTable from "./_gateways-table";
import BaseLayout from "@/layouts/base";
import { useUpdateGateway } from "@/hooks/useUpdateGateway";

const Gateways: React.FC = () => {
  const { data: gateways, isLoading, isRefetching } = useListGateways();
  const { mutateAsync: deleteGateway, isLoading: isDeletingGateway } =
    useDeleteGateway();
  const { mutateAsync: updateGateway, isLoading: isUpdatingGateway } =
    useUpdateGateway();

  return (
    <BaseLayout title="Gateways">
      <div className="flex justify-end">
        <Link href="/gateways/new">
          <Button>New</Button>
        </Link>
      </div>
      <div className="mt-2 overflow-y-hidden overflow-x-scroll">
        <GatewaysTable
          isLoading={
            isLoading || isRefetching || isDeletingGateway || isUpdatingGateway
          }
          gateways={gateways}
          onDelete={deleteGateway}
          onEdit={updateGateway}
        />
      </div>
    </BaseLayout>
  );
};

export default Gateways;

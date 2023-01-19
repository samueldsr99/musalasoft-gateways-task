import clsx from "classnames";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useReadGateway } from "../../../hooks/useReadGateway";
import BaseLayout from "@/layouts/base";
import type { Gateway } from "@/lib/types/gateway";
import DetailsTab from "./_details-tab";
import DevicesTab from "./_devices-tab";

type GatewayDetailsProps = {
  serialNumber: string;
};

type TabsSectionProps = {
  tab: "1" | "2";
  gateway: Gateway;
};

const TabsSection: React.FC<TabsSectionProps> = ({ gateway, tab }) => {
  return (
    <div className="mb-8 flex gap-20 border-b border-b-gray-500">
      <Link
        href={`/gateways/${gateway.serialNumber}?tab=1`}
        className={clsx(
          "py-3 px-2.5 font-medium",
          tab === "1" && "border-b-2 border-b-indigo-600 text-indigo-500"
        )}
      >
        Details
      </Link>
      <Link
        href={`/gateways/${gateway.serialNumber}?tab=2`}
        className={clsx(
          "py-3 px-2.5 font-medium",
          tab === "2" && "border-b-2 border-b-indigo-600 text-indigo-500"
        )}
      >
        Devices{" "}
        {gateway.devices?.length > 0 ? (
          <span className="ml-3 rounded-full bg-gray-800 py-0.5 px-2.5 text-xs md:inline-block">
            {gateway?.devices?.length ?? 0}
          </span>
        ) : null}
      </Link>
    </div>
  );
};

const GatewayDetails: NextPage<GatewayDetailsProps> = () => {
  const router = useRouter();
  const { serialNumber = null } = router.query;
  const { data: gateway } = useReadGateway(serialNumber as string, {
    enabled: !!serialNumber,
  });
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "1";

  if (!gateway) {
    return null;
  }

  return (
    <BaseLayout title="Details">
      <div className="mx-auto max-w-4xl overflow-x-scroll">
        <TabsSection tab={tab as "1" | "2"} gateway={gateway} />
        <div className="">
          {tab === "1" ? (
            <DetailsTab gateway={gateway} />
          ) : (
            <DevicesTab
              devices={gateway.devices}
              gatewaySerialNumber={gateway.serialNumber}
            />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default GatewayDetails;

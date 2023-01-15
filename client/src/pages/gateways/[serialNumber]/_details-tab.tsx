import type { Gateway } from "@/lib/types/gateway";

type DetailRowProps = {
  title?: string;
  value?: string | number;
};

const DetailRow: React.FC<DetailRowProps> = ({ title, value }) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
      <dt className="text-sm font-medium text-gray-700">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </div>
  );
};

export type DetailsTabProps = {
  gateway: Gateway;
};

const DetailsTab: React.FC<DetailsTabProps> = ({ gateway }) => {
  return (
    <div className="bg-zinc-400 sm:rounded-md">
      <div className="px-4 py-5 sm:overflow-hidden sm:p-6">
        <h3 className="text-xl font-medium leading-6 text-gray-900">
          Gateway Details
        </h3>
      </div>
      <div className="border-t border-gray-500 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-500">
          <DetailRow title="Serial Number" value={gateway?.serialNumber} />
          <DetailRow title="Name" value={gateway?.name} />
          <DetailRow title="IPV4 Address" value={gateway?.address} />
          <DetailRow title="Devices" value={gateway?.devices?.length} />
        </dl>
      </div>
    </div>
  );
};

export default DetailsTab;

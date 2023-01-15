import React from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";

import querykeys from "../../../querykeys";
import { readGateway } from "../../../lib/api/gateway";
import { useReadGateway } from "../../../hooks/useReadGateway";
import BaseLayout from "@/layouts/base";

type GatewayDetailsProps = {
  serialNumber: string;
  dehydratedState: object;
};

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

const GatewayDetails: NextPage<GatewayDetailsProps> = ({ serialNumber }) => {
  const { data: gateway } = useReadGateway(serialNumber);

  return (
    <BaseLayout title="Details">
      <div className="mx-auto max-w-4xl bg-zinc-400 sm:rounded-md">
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
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const serialNumber = ctx.params?.serialNumber as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(querykeys.readGateway(serialNumber), () =>
    readGateway(serialNumber)
  );

  return {
    props: {
      serialNumber,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default GatewayDetails;

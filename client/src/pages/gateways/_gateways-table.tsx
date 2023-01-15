import { memo, useCallback, useState } from "react";
import clsx from "classnames";
import {
  CheckIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import IconButton from "@/components/icon-button";
import Input from "@/components/atom/input";
import type { Gateway } from "@/lib/types/gateway";

export type GatewaysTableProps = {
  gateways?: Gateway[];
  onDelete?(serialNumber: string): Promise<unknown>;
  onEdit?(
    serialNumber: string,
    newData: {
      serialNumber?: string;
      name?: string;
      address?: string;
    }
  ): Promise<unknown>;
};

const GatewaysTable: React.FC<GatewaysTableProps> = ({
  gateways = [],
  onDelete,
  onEdit,
}) => {
  const [selected, setSelected] = useState<{
    gateway: Gateway;
    action: "delete" | "edit";
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = useCallback(
    (gateway: Gateway) => () =>
      setSelected({
        gateway,
        action: "delete",
      }),
    []
  );

  const handleEdit = useCallback(
    (gateway: Gateway) => () => setSelected({ gateway, action: "edit" }),
    []
  );

  const isEditing = useCallback(
    (gateway: Gateway) =>
      selected?.action === "edit" && selected.gateway.id === gateway.id,
    [selected]
  );

  const handleCancelSubmit = useCallback(() => setSelected(null), []);

  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    if (selected?.gateway) {
      selected?.action === "delete"
        ? onDelete?.(selected.gateway.serialNumber).finally(() =>
            setSubmitting(false)
          )
        : onEdit?.(selected.gateway.serialNumber, {}).finally(() =>
            setSubmitting(false)
          );
    }
  }, [selected, onDelete, onEdit]);

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-zinc-400">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Serial Number
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            IPV4 Address
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Devices
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {gateways?.map((gateway, index) => (
          <tr
            key={gateway.id}
            className={clsx(index % 2 === 0 ? "bg-zinc-100" : "bg-zinc-200")}
          >
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {isEditing(gateway) ? <Input /> : gateway.serialNumber}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {isEditing(gateway) ? <Input /> : gateway.name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {isEditing(gateway) ? <Input /> : gateway.address}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {gateway.devices?.length ?? 0}
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <div className="flex justify-end gap-1">
                {selected?.gateway?.id === gateway.id ? (
                  <>
                    <IconButton
                      variant="error"
                      onClick={handleCancelSubmit}
                      submitting={submitting}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </IconButton>
                    <IconButton
                      variant="success"
                      onClick={handleSubmit}
                      submitting={submitting}
                    >
                      <CheckIcon className="h-6 w-6" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      variant="error"
                      onClick={handleDelete(gateway)}
                      submitting={submitting}
                    >
                      <TrashIcon className="h-6 w-6" />
                    </IconButton>
                    <IconButton
                      variant="warning"
                      onClick={handleEdit(gateway)}
                      submitting={submitting}
                    >
                      <PencilSquareIcon className="h-6 w-6" />
                    </IconButton>
                    <IconButton variant="info" submitting={submitting}>
                      <Link href={`/gateways/${gateway.serialNumber}`}>
                        <EyeIcon className="h-6 w-6" />
                      </Link>
                    </IconButton>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(GatewaysTable);

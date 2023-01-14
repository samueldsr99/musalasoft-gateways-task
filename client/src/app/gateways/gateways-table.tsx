import { memo, useCallback, useState } from "react";
import {
  CheckIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import clsx from "classnames/bind";

import Spinner from "@/components/atom/spinner";
import Input from "@/components/atom/input";
import type { Gateway } from "@/lib/types/gateway";

type IconButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: "error" | "success" | "info" | "warning";
  submitting?: boolean;
};

const iconClasses = clsx.bind({
  error: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  info: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  success: "bg-green-500 hover:bg-green-600 active:bg-green-700",
  warning: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
});

const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant,
  submitting = false,
  ...props
}) => {
  return (
    <button
      disabled={submitting}
      className={iconClasses(
        "rounded-lg p-1 text-gray-100 outline-none",
        variant,
        submitting && "animate-pulse opacity-20"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

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
      <thead className="bg-gray-50">
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
        {gateways?.map((gateway) => (
          <tr key={gateway.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {isEditing(gateway) ? <Input /> : gateway.id}
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

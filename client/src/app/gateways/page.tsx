"use client";

import { useCallback, useState } from "react";
import clsx from "classnames/bind";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Input from "@/components/atom/input";
import type { Gateway } from "@/lib/types/gateway";

type IconButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: "error" | "success" | "info";
};

const iconClasses = clsx.bind({
  error: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  info: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  success: "bg-green-500 hover:bg-green-600 active:bg-green-700",
});

const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant,
  ...props
}) => {
  return (
    <button
      className={iconClasses(
        "rounded-lg p-1 text-gray-100 outline-none",
        variant
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Gateways: React.FC = () => {
  const gateways = [
    {
      id: "278sdc-2398-92873",
      name: "Gateway 1",
      address: "192.168.43.1",
      devices: [],
    },
    {
      id: "x7y6d3-2398-92873",
      name: "Gateway 2",
      address: "192.168.43.9",
      devices: [],
    },
  ] satisfies Gateway[];
  const [selected, setSelected] = useState<{
    gateway: Gateway;
    action: "delete" | "edit";
  } | null>(null);

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

  const handleCancelDelete = useCallback(() => setSelected(null), []);

  return (
    <div className="px-8 py-4">
      <h1>List Gateways</h1>
      <div className="overflow-x-scroll">
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
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {gateways.map((gateway) => (
              <tr key={gateway.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {gateway.id}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {isEditing(gateway) ? <Input /> : gateway.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {isEditing(gateway) ? <Input /> : gateway.address}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div className="flex justify-end gap-1">
                    {selected?.gateway?.id === gateway.id ? (
                      <>
                        <IconButton
                          variant="error"
                          onClick={handleCancelDelete}
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </IconButton>
                        <IconButton variant="success">
                          <CheckIcon className="h-6 w-6" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          variant="error"
                          onClick={handleDelete(gateway)}
                        >
                          <TrashIcon className="h-6 w-6" />
                        </IconButton>
                        <IconButton
                          variant="info"
                          onClick={handleEdit(gateway)}
                        >
                          <PencilSquareIcon className="h-6 w-6" />
                        </IconButton>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gateways;

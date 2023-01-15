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
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import IconButton from "@/components/icon-button";
import Input from "@/components/atom/input";
import type { Gateway, UpdateGatewayRequest } from "@/lib/types/gateway";
import { updateGatewaySchema } from "@/lib/types/gateway";

export type GatewaysTableProps = {
  gateways?: Gateway[];
  onDelete?(serialNumber: string): Promise<unknown>;
  onEdit?(data: UpdateGatewayRequest): Promise<unknown>;
};

type ConfirmActionsProps = {
  submitting: boolean;
  onCancel(): void;
  onSubmit?(): void;
};

type ActionsProps = {
  actionSetter: (gateway: Gateway, action: "delete" | "edit") => () => void;
  submitting: boolean;
  gateway: Gateway;
};

const ConfirmActions: React.FC<ConfirmActionsProps> = ({
  onCancel,
  submitting,
}) => {
  return (
    <>
      <IconButton variant="error" onClick={onCancel} submitting={submitting}>
        <XMarkIcon className="h-6 w-6" />
      </IconButton>
      <IconButton variant="success" submitting={submitting} type="submit">
        <CheckIcon className="h-6 w-6" />
      </IconButton>
    </>
  );
};

const Actions: React.FC<ActionsProps> = ({
  actionSetter,
  submitting,
  gateway,
}) => {
  return (
    <>
      <IconButton
        variant="error"
        onClick={actionSetter(gateway, "delete")}
        submitting={submitting}
      >
        <TrashIcon className="h-6 w-6" />
      </IconButton>
      <IconButton
        variant="warning"
        onClick={actionSetter(gateway, "edit")}
        submitting={submitting}
        type="button"
      >
        <PencilSquareIcon className="h-6 w-6" />
      </IconButton>
      <IconButton variant="info" submitting={submitting}>
        <Link href={`/gateways/${gateway.serialNumber}`}>
          <EyeIcon className="h-6 w-6" />
        </Link>
      </IconButton>
    </>
  );
};

type UpdateFormProps = UpdateGatewayRequest;

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
  const {
    getValues,
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateFormProps>({
    resolver: zodResolver(updateGatewaySchema),
  });
  console.log(selected);

  const handleSetAction = useCallback(
    (gateway: Gateway, action: "delete" | "edit") => () => {
      setSelected({ gateway, action });
      if (action === "edit") {
        setValue("body", {
          name: gateway.name,
          address: gateway.address,
        });
      }
    },
    [setValue]
  );

  const isEditing = useCallback(
    (gateway: Gateway) =>
      selected?.action === "edit" && selected.gateway.id === gateway.id,
    [selected]
  );

  const handleCancelSubmit = useCallback(() => {
    reset();
    setSelected(null);
  }, [reset]);

  const onSubmit: SubmitHandler<UpdateFormProps> = ({ serialNumber, body }) => {
    setSubmitting(true);
    if (selected?.gateway) {
      if (selected?.action === "delete") {
        onDelete?.(selected.gateway.serialNumber).finally(() =>
          setSubmitting(false)
        );
      } else {
        onEdit?.({
          serialNumber,
          body,
        }).finally(() => setSubmitting(false));
      }
      setSelected(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                {isEditing(gateway) ? (
                  <Controller
                    name="serialNumber"
                    control={control}
                    defaultValue={gateway.serialNumber}
                    render={() => <>{gateway.serialNumber}</>}
                  />
                ) : (
                  gateway.serialNumber
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {isEditing(gateway) ? (
                  <Controller
                    name="body.name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        enableEnterSubmit={false}
                        isError={!!errors.body?.name?.message}
                      />
                    )}
                  />
                ) : (
                  gateway.name
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {isEditing(gateway) ? (
                  <Controller
                    name="body.address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        enableEnterSubmit={false}
                        isError={!!errors.body?.address?.message}
                      />
                    )}
                  />
                ) : (
                  gateway.address
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {gateway.devices?.length ?? 0}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div className="flex justify-end gap-1">
                  {selected?.gateway?.id === gateway.id ? (
                    <ConfirmActions
                      submitting={submitting}
                      onCancel={handleCancelSubmit}
                      onSubmit={handleSubmit((d) => void onSubmit(d))}
                    />
                  ) : (
                    <Actions
                      actionSetter={handleSetAction}
                      submitting={submitting}
                      gateway={gateway}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default memo(GatewaysTable);

import { useCallback, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/atom/button";
import type { CreateDeviceBulk, Device } from "@/lib/types/device";
import { createDeviceBulkSchema } from "@/lib/types/device";
import AddMoreButton from "@/components/add-more-button";
import DeviceCard from "@/components/device-card";
import DeviceInput from "@/components/device-input";
import IconButton from "@/components/icon-button/icon-button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCreateDeviceBulk } from "@/hooks/useCreateDeviceBulk";
import ConfirmationModal from "@/components/confirmation-modal";
import { useDeleteDevice } from "@/hooks/useDeleteDevice";

export type DevicesTabProps = {
  devices?: Device[];
  gatewaySerialNumber: string;
};

type AddDevicesFormProps = {
  gatewaySerialNumber: string;
  currentDevicesAmount: number;
};

type CreateDeviceBulkProps = CreateDeviceBulk;

const AddDevicesForm: React.FC<AddDevicesFormProps> = ({
  currentDevicesAmount,
  gatewaySerialNumber,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDeviceBulkProps>({
    resolver: zodResolver(createDeviceBulkSchema),
  });
  const { fields, append, remove } = useFieldArray<CreateDeviceBulkProps>({
    name: "devices",
    control: control,
  });
  const { mutateAsync, isLoading } = useCreateDeviceBulk();

  const onSubmit: SubmitHandler<CreateDeviceBulkProps> = async (data) => {
    await mutateAsync({
      gatewaySerialNumber,
      devices: data,
    }).then(() => remove());
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {fields.length > 0 ? (
        <div className="flex items-center px-20" aria-hidden="true">
          <div className="w-full border-t border-gray-400 " />
        </div>
      ) : null}
      {fields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`devices.${index}`}
          render={({ field: { value, onChange } }) => (
            <div className="flex w-full items-center gap-2">
              <DeviceInput
                device={value}
                onChange={onChange}
                vendorError={errors?.devices?.[index]?.vendor?.message}
              />
              <IconButton variant="error" onClick={() => remove(index)}>
                <TrashIcon className="h-6 w-6" />
              </IconButton>
            </div>
          )}
        />
      ))}
      {fields.length > 0 ? (
        <div className="text-right">
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Submit
          </Button>
        </div>
      ) : null}
      {currentDevicesAmount + fields.length < 10 ? (
        <AddMoreButton
          onClick={() =>
            append({
              status: "offline",
              vendor: "",
            })
          }
        >
          Add Devices
        </AddMoreButton>
      ) : null}
    </form>
  );
};

const DevicesTab: React.FC<DevicesTabProps> = ({
  devices = [],
  gatewaySerialNumber,
}) => {
  const [selected, setSelected] = useState<Device | null>(null);
  const { mutateAsync, isLoading } = useDeleteDevice();

  const handleSelect = useCallback(
    (device: Device) => () => setSelected(device),
    []
  );

  const handleDeselect = useCallback(() => setSelected(null), []);

  const handleDeleteDevice = useCallback(async () => {
    if (selected) {
      await mutateAsync({ gatewaySerialNumber, uuid: selected.uuid });
      handleDeselect();
    }
  }, [gatewaySerialNumber, mutateAsync, selected, handleDeselect]);

  return (
    <div className="space-y-6">
      {devices.map((device) => (
        <div key={device.uuid} className="flex items-center gap-2">
          <DeviceCard device={device} />
          <IconButton variant="error" onClick={handleSelect(device)}>
            <TrashIcon className="h-6 w-6" />
          </IconButton>
        </div>
      ))}
      <AddDevicesForm
        currentDevicesAmount={devices.length}
        gatewaySerialNumber={gatewaySerialNumber}
      />
      <ConfirmationModal
        open={!!selected?.vendor}
        submitting={isLoading}
        onClose={handleDeselect}
        onCancel={handleDeselect}
        onConfirm={handleDeleteDevice}
        title="Delete device"
        content={
          <>
            Are you sure you want to delete{" "}
            <span className="text-sm font-bold">{selected?.vendor}</span>? This
            action cannot be undone
          </>
        }
      />
    </div>
  );
};

export default DevicesTab;

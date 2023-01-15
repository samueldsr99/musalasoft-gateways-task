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

export type DevicesTabProps = {
  devices: Device[];
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
  const { mutateAsync } = useCreateDeviceBulk();

  const onSubmit: SubmitHandler<CreateDeviceBulkProps> = async (data) => {
    await mutateAsync({
      gatewaySerialNumber,
      devices: data,
    });
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
      <div className="text-right">
        <Button type="submit">Submit</Button>
      </div>
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
  devices,
  gatewaySerialNumber,
}) => {
  return (
    <div className="space-y-6">
      {devices.map((device) => (
        <div key={device.uuid} className="flex items-center gap-2">
          <DeviceCard device={device} />
          <IconButton variant="error">
            <TrashIcon className="h-6 w-6" />
          </IconButton>
        </div>
      ))}
      <AddDevicesForm
        currentDevicesAmount={devices.length}
        gatewaySerialNumber={gatewaySerialNumber}
      />
      <div></div>
    </div>
  );
};

export default DevicesTab;

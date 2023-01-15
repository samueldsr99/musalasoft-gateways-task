import type { Device } from "@/lib/types/device";
import Input from "@/components/atom/input";
import Typography from "@/components/atom/typography";
import Toggle from "@/components/atom/toggle/toggle";
import type { ChangeEvent } from "react";

export type DeviceInputProps = {
  device?: Partial<Device>;
  isEditing?: boolean;
  vendorError?: string;
  onChange?(newDevice: Partial<Device>): void;
};

const DeviceInput: React.FC<DeviceInputProps> = ({
  device,
  vendorError,
  isEditing = false,
  onChange,
}) => {
  const handleChangeVendor = (e: ChangeEvent<HTMLInputElement>) => {
    console.log({
      ...device,
      vendor: e.target.value,
    });
    onChange?.({
      ...device,
      vendor: e.target.value,
    });
  };

  const handleChangeStatus = (e: boolean) => {
    console.log({
      ...device,
      status: e ? "online" : "offline",
    });
    onChange?.({
      ...device,
      status: e ? "online" : "offline",
    });
  };

  return (
    <div className="w-full cursor-pointer rounded-lg border-2 border-zinc-500 bg-transparent px-4 pt-2 pb-2.5 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        {isEditing ? (
          <div>
            <Input
              placeholder="vendor"
              value={device?.vendor ?? ""}
              onChange={handleChangeVendor}
              isError={!!vendorError}
            />
            <p className="text-sm text-red-500">{vendorError}</p>
          </div>
        ) : (
          <Typography as="p">{device?.vendor}</Typography>
        )}
        {isEditing ? (
          <div>
            <h1 className="text-sm text-gray-800">Status</h1>
            <Toggle
              checked={device?.status === "online"}
              onChange={handleChangeStatus}
            />
          </div>
        ) : (
          <Toggle checked={status === "online"} />
        )}
      </div>
    </div>
  );
};

export default DeviceInput;

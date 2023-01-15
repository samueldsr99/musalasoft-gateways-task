import type { Device } from "@/lib/types/device";
import Input from "@/components/atom/input";
import Toggle from "@/components/atom/toggle/toggle";
import type { ChangeEvent } from "react";

export type DeviceInputProps = {
  device?: Partial<Device>;
  vendorError?: string;
  onChange?(newDevice: Partial<Device>): void;
};

const DeviceInput: React.FC<DeviceInputProps> = ({
  device,
  vendorError,
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
    <div className="w-full rounded-md border border-gray-500 px-4 py-3.5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Input
            placeholder="vendor"
            value={device?.vendor ?? ""}
            onChange={handleChangeVendor}
            isError={!!vendorError}
          />
          <p className="text-sm text-red-500">{vendorError}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xs text-gray-200">Status</h1>
          <Toggle
            checked={device?.status === "online"}
            onChange={handleChangeStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceInput;

import type { Device } from "@/lib/types/device";
import Input from "@/components/atom/input";
import Typography from "@/components/atom/typography";
import Toggle from "@/components/atom/toggle/toggle";
import type { ChangeEvent } from "react";

export type DeviceCardProps = {
  device?: Partial<Device>;
  isEditing?: boolean;
  onChange?(newDevice: Partial<Device>): void;
};

const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
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
    <div className="w-full rounded-lg border px-4 py-2.5">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <Input
            placeholder="Vendor"
            value={device?.vendor ?? ""}
            onChange={handleChangeVendor}
          />
        ) : (
          <Typography as="p">{device?.vendor}</Typography>
        )}
        {isEditing ? (
          <Toggle
            checked={device?.status === "online"}
            onChange={handleChangeStatus}
          />
        ) : (
          <Toggle checked={status === "online"} />
        )}
      </div>
    </div>
  );
};

export default DeviceCard;

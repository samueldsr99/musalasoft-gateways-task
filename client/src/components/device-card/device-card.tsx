import { format } from "date-fns";
import Toggle from "@/components/atom/toggle";
import type { Device } from "@/lib/types/device";

export type DeviceCardProps = {
  device?: Device;
};

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  return (
    <div className="w-full rounded-md border border-gray-500 px-4 py-3.5">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="text-md font-bold text-white">{device?.vendor}</h2>
          <p className="text-xs font-normal text-gray-400">
            {device?.createdAt &&
              format(new Date(device?.createdAt), "hh:mm:ss aaa dd/MM/yyyy")}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs">Status</span>
          <Toggle checked={device?.status === "online"} />
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;

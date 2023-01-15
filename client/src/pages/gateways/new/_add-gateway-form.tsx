import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Typography from "@/components/atom/typography";
import IconButton from "@/components/icon-button";
import DeviceCard from "@/components/device-card";
import Label from "@/components/atom/label";
import Button from "@/components/atom/button";
import Input from "@/components/atom/input/input";
import FormControl from "@/components/atom/form-control";
import { useCreateGateway } from "@/hooks/useCreateGateway";
import type { CreateGatewayRequest } from "@/lib/types/gateway";
import { createGatewaySchema } from "@/lib/types/gateway";
import { useCallback, useMemo } from "react";

type FormProps = CreateGatewayRequest;

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-red-500">{children}</p>
);

const AddMoreButton: React.FC<JSX.IntrinsicElements["button"]> = (props) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        {props.disabled ? (
          <></>
        ) : (
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-gray-300 bg-zinc-200 px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
            {...props}
          >
            <PlusIcon
              className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            {props.children}
          </button>
        )}
      </div>
    </div>
  );
};

const AddGatewayForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormProps>({
    resolver: zodResolver(createGatewaySchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "devices",
    control,
  });

  const { mutateAsync } = useCreateGateway();
  const router = useRouter();

  const handleAddMore = useCallback(() => {
    append({ status: "offline", vendor: "" });
  }, [append]);

  const canAddMore = useMemo(() => {
    return fields.length < 10;
  }, [fields.length]);
  console.log({ canAddMore });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    await mutateAsync(data);
    router.push("/gateways");
  };

  return (
    <form className="mx-auto max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-zinc-400 px-4 py-5 sm:p-6">
          <Typography as="h2" size="xl" weight="extrabold">
            Details
          </Typography>
          <FormControl>
            <Label htmlFor="name">Gateway name*</Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input isError={!!errors.name} {...field} />
              )}
            />
            {errors.name?.message && (
              <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <Label htmlFor="address">IPV4 Address*</Label>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <Input
                  placeholder="xxx.xxx.xxx.xxx"
                  isError={!!errors.address}
                  {...field}
                />
              )}
            />
            {errors.address?.message && (
              <ErrorMessage>{errors.address.message}</ErrorMessage>
            )}
          </FormControl>
          <div className="mt-8 flex flex-col gap-2">
            <Typography as="h2" size="xl">
              Devices
            </Typography>
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`devices.${index}`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center gap-2">
                    <DeviceCard
                      isEditing
                      device={value}
                      onChange={onChange}
                      vendorError={errors?.devices?.[index]?.vendor?.message}
                    />
                    <IconButton variant="error" onClick={() => remove(index)}>
                      <TrashIcon className="w-h-7 h-7" />
                    </IconButton>
                  </div>
                )}
              />
            ))}
            <div className="mt-4 text-right">
              <AddMoreButton onClick={handleAddMore} disabled={!canAddMore}>
                Add Device
              </AddMoreButton>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 bg-zinc-500 px-4 py-3 sm:px-6">
          <Link href="/gateways">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddGatewayForm;

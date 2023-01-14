"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";

import Label from "@/components/atom/label";
import Button from "@/components/atom/button";
import Input from "@/components/atom/input/input";
import FormControl from "@/components/atom/form-control";
import { useCreateGateway } from "@/hooks/useCreateGateway";
import type { Device } from "@/lib/types/device";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createGatewaySchema } from "@/lib/types/gateway";
import React from "react";

type FormProps = {
  name: string;
  address: string;
  serialNumber: string;
  devices: Device[];
};

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-red-500">{children}</p>
);

const AddGatewayForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<FormProps>({
    resolver: zodResolver(createGatewaySchema),
  });
  const { mutateAsync } = useCreateGateway();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    await mutateAsync(data);
    router.push("/gateways");
  };

  return (
    <form className="mx-auto max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <FormControl>
            <Label htmlFor="serialNumber">Serial Number</Label>
            <Controller
              control={control}
              name="serialNumber"
              render={({ field }) => (
                <Input isError={!!errors.serialNumber} {...field} />
              )}
            />
            {errors.serialNumber?.message && (
              <ErrorMessage>{errors.serialNumber.message}</ErrorMessage>
            )}
          </FormControl>
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
        </div>
        <div className="flex justify-end gap-4 bg-gray-50 px-4 py-3 sm:px-6">
          <Link href="/gateways">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddGatewayForm;

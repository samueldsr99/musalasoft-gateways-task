import clsx from "classnames/bind";
import { forwardRef } from "react";

export type InputProps = JSX.IntrinsicElements["input"] & {
  variant?: "primary" | "secondary";
  isError?: boolean;
  sz?: "sm" | "md";
};

const classes = clsx.bind({
  root: "rounded-md outline-none",
  primary: "bg-gray-300 text-black",
  secondary: "bg-gray-700 text-gray-100",
  error: "border border-red-500",
  sm: "px-1.5 py-1 text-sm",
  md: "px-2.5 py-1.5",
});

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant = "primary", isError = false, sz = "md", ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={classes("root", variant, isError && "error", sz, className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;

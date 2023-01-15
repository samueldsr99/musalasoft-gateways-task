import clsx from "classnames/bind";

export type IconButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: "error" | "success" | "info" | "warning";
  submitting?: boolean;
};

const classes = clsx.bind({
  root: "rounded-lg p-1 text-zinc-800 outline-none transition-all hover:shadow-xl active:opacity-90 duration-300",
  error: "bg-red-500 hover:bg-red-600 active:bg-red-700",
  info: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  success: "bg-green-500 hover:bg-green-600 active:bg-green-700",
  warning: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700",
});

const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant,
  submitting = false,
  ...props
}) => {
  return (
    <button
      disabled={submitting}
      className={classes(
        "root",
        variant,
        submitting && "animate-pulse opacity-20"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;

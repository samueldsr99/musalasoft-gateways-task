import clsx from "classnames/bind";

export type InputProps = JSX.IntrinsicElements["input"] & {
  variant?: "primary" | "secondary";
};

const classes = clsx.bind({
  root: "px-2.5 py-1.5 rounded-md  outline-none",
  primary: "bg-gray-100 text-black",
  secondary: "bg-gray-700 text-gray-100",
});

const Input: React.FC<InputProps> = ({
  className,
  variant = "primary",
  ...props
}) => {
  return <input className={classes("root", variant, className)} {...props} />;
};

export default Input;

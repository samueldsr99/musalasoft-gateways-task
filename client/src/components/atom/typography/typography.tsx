import clsx from "classnames/bind";

export type TypographyProps = React.PropsWithChildren<{
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "pre";
  align?: "left" | "center";
  weight?:
    | "extrabold"
    | "bold"
    | "semibold"
    | "medium"
    | "normal"
    | "base"
    | "regular"
    | "light";
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}>;

const classes = clsx.bind({
  root: "text-gray-800",
  h1: "text-2xl md:text-3xl lg:text-4xl",
  h2: "text-xl md:text-2xl lg:text-3xl",
  h3: "text-lg md:text-xl lg:text-2xl",
  h4: "text-md md:text-lg lg:text-xl",
  h5: "text-sm md:text-md lg:text-lg",
  p: "text-md lg:text-lg",
  span: "",
  pre: "",

  "align-left": "text-left",
  "align-center": "text-center",

  primary: "text-gray-900",
  secondary: "text-gray-400",
});

const Typography: React.FC<TypographyProps> = ({
  as = "span",
  align = "left",
  weight = "base",
  size = "md",
  className,
  children,
}) => {
  const CustomTag = as as keyof JSX.IntrinsicElements;

  const alignValue = `align-${align}`;
  const fontValue = `font-${weight}`;
  const textSize = `text-${size}`;

  return (
    <CustomTag
      className={classes(
        "root",
        as,
        alignValue,
        fontValue,
        size && textSize,
        className
      )}
    >
      {children}
    </CustomTag>
  );
};

export default Typography;

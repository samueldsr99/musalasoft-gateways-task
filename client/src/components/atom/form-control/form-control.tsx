import clsx from "classnames";

export type FormControlProps = JSX.IntrinsicElements["div"];

const FormControl: React.FC<FormControlProps> = ({ className, children }) => {
  return (
    <div className={clsx("grid grid-cols-3", className)}>
      <div className="col-span-3 flex flex-col gap-1 sm:col-span-2 md:col-span-1">
        {children}
      </div>
    </div>
  );
};

export default FormControl;

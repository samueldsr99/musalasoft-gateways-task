export type LabelProps = JSX.IntrinsicElements["label"];

const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label className="block text-sm font-medium text-gray-700" {...props}>
      {children}
    </label>
  );
};

export default Label;

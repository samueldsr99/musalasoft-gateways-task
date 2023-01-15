import { PlusIcon } from "@heroicons/react/24/outline";

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

export default AddMoreButton;

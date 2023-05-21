import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Loader = ({ message }: { message: string }) => {
  return (
    <div
      role="status"
      className="flex flex-col text-center items-center gap-2 justify-center"
    >
      <div className="animate-spin w-6">
        <ArrowPathIcon width={24} />
      </div>
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default Loader;

import { useQuery } from "@tanstack/react-query";
import GeneralLayout from "../../shared/GeneralLayout";
import { useModal } from "../../shared/hooks/useModal";
import Modal from "../../shared/modal/Modal";
import StickyForm from "./StickyForm";
import { getSticky } from "@/src/helper/api/getSticky.api";
import randomColor from 'randomcolor';

const StickyWall = () => {
  const {
    isLoading,
    isError,
    data: stickyWall,
    error,
  } = useQuery({
    queryKey: ["sticky"],
    queryFn: getSticky,
  });
  const { isOpen, openModal, closeModal } = useModal();

  const getStickyColor = (type:any) => {
    if (type === "personal") return "bg-red-300";
    if (type === "work") return "bg-blue-300";
    // Add more conditions if needed
    return "bg-gray-300"; // Default color
  };

  return (
    <GeneralLayout>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Sticky Wall</h2>
        <div className="grid grid-cols-4 gap-3">
          {stickyWall?.map((sticky:any, index:any) => (
            <div
              key={index}
              className={` p-2 w-44 h-52 rounded-md flex flex-col space-y-12  cursor-pointer ${getStickyColor(sticky.type)}`}
              onClick={() => {
                // Handle click event if needed
              }}
            >
              <p className="text-sm font-bold">{sticky.title}</p>
              <p className="text-sm">{sticky.description}</p>
            </div>
          ))}
          <div
            onClick={openModal}
            className="bg-gray-200 p-2 w-44 h-52 rounded-md flex justify-center items-center cursor-pointer"
          >
            <p className="text-3xl text-center">+</p>
          </div>
        </div>
        <Modal onClose={closeModal} isOpen={isOpen}>
          <StickyForm />
        </Modal>
      </div>
    </GeneralLayout>
  );
};

export default StickyWall;

import { useQuery, useQueryClient } from "@tanstack/react-query";
import GeneralLayout from "../../shared/GeneralLayout";
import { useModal } from "../../shared/hooks/useModal";
import Modal from "../../shared/modal/Modal";
import StickyForm from "./StickyForm";
import { getSticky } from "@/src/helper/api/getSticky.api";
import randomColor from "randomcolor";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

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
  const queryClient = useQueryClient();
  const { isOpen, openModal, closeModal } = useModal();

  const getStickyColor = (type: any) => {
    if (type === "personal") return "bg-red-300";
    if (type === "work") return "bg-blue-300";
    return "bg-gray-300";
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://backend-productivepro-1.onrender.com/delete-stickywall/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Deleted", response);
    } catch (err) {
      console.log(err);
    }
    queryClient.invalidateQueries({ queryKey: ["sticky"] });
  };

  return (
    <GeneralLayout>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Sticky Wall</h2>
        <div className="grid grid-cols-4 gap-3">
          {stickyWall?.map((sticky: any, index: any) => (
            <div
              key={index}
              className={`relative p-2 w-44 h-52 rounded-md flex flex-col space-y-12  cursor-pointer ${getStickyColor(
                sticky.type
              )}`}
              onClick={() => {}}
            >
              <p className="text-sm font-bold">{sticky.title}</p>
              <p className="text-sm">{sticky.description}</p>
              <div className="absolute top-[-3rem] left-0 p-2 w-44 h-52 rounded-md bg-black bg-opacity-0 hover:bg-opacity-60 opacity-0 hover:opacity-100 transition duration-300 flex justify-center items-center">
                <MdOutlineDelete
                  onClick={() => handleDelete(sticky._id)}
                  className="text-2xl text-white"
                />
              </div>
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
          <StickyForm closeModal={closeModal} />
        </Modal>
      </div>
    </GeneralLayout>
  );
};

export default StickyWall;

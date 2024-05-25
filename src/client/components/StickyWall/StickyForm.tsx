import { AddSticky } from "@/src/helper/api/createSticky-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

interface StickyFormProps{
  closeModal: ()=>void
}

const StickyForm: React.FC<StickyFormProps> = ({closeModal}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customType, setCustomType] = useState("");

  const handleCustomTypeChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setCustomType(e.target.value);
  };
  const queryClient = useQueryClient();
  const { mutate: createSticky } = useMutation({
    mutationFn: AddSticky,
    onSuccess: () => {
      console.log("Sticky wall created successfully");
    },
    onError: () => {
      console.error("Failed to create sticky wall");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title, description, customType);
    try {
      createSticky({
        title: title,
        description: description,
        type: customType,
      });
      
    } catch (error) {
      console.log(error, "from Sticky");
    }
    queryClient.invalidateQueries({ queryKey: ["sticky"] });
    closeModal()
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md p-2 md:p-5 md:w-[30rem] space-y-3"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-bold">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-solid w-[70%] p-1 rounded-md outline-none"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-bold">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-solid w-[70%] p-1 rounded-md outline-none"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-bold">Type</label>
        <select
          className="border border-solid w-[70%] p-1 rounded-md outline-none"
          value={customType}
          onChange={handleCustomTypeChange}
        >
          <option value="">Select Type</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>

        <input
          type="text"
          placeholder="Enter custom type"
          className="border border-solid w-[70%] p-1 rounded-md outline-none"
          onChange={handleCustomTypeChange}
        />
      </div>
      <button type="submit" className="bg-yellow-300 p-2 w-32 rounded-md">
        Create
      </button>
    </form>
  );
};

export default StickyForm;

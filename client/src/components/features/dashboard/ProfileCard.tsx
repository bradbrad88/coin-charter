import { useState } from "react";
import { MdEdit } from "react-icons/md";
import useUserContext from "contexts/UserContext";
import ImageEditor from "features/image-editor/ImageEditor";
import Button from "common/Button";

import type { ChangeEventHandler } from "react";

const ProfileCard = () => {
  const { isLoggedIn, updateImage } = useUserContext();
  const [editImage, setEditImage] = useState<File | null>();

  const onImageEdit: ChangeEventHandler<HTMLInputElement> = (e) => {
    const image = e.target.files![0];
    if (!image) return;
    setEditImage(image);
  };

  const submitImage = (image: File, crop: any) => {
    if (!editImage) return;
    updateImage(image, crop);
  };

  return (
    <div className="grid grid-cols-1md:grid-cols-2 md:shadow-lg rounded-sm shadow-gray-400">
      {editImage && (
        <ImageEditor
          image={editImage}
          close={() => setEditImage(null)}
          submit={submitImage}
        />
      )}
      <div className="bg-gradient-to-b sm:bg-gradient from-indigo-800 md:from-white bg-opacity-80 flex justify-center p-5">
        <div className="relative block w-1/2 md:w-full h-fit max-w-[300px]">
          <img
            src="https://source.unsplash.com/random/?person/"
            className="aspect-[4/4] object-cover rounded-full border-white border-4"
          />
          {isLoggedIn && (
            <>
              <label
                htmlFor="avatar"
                className="absolute flex justify-center items-center right-[15%] bottom-[15%] w-8 h-8 rounded-full bg-[rgb(95,90,192)] border-white border-2 translate-x-1/2 translate-y-1/2"
              >
                <MdEdit color="rgb(255,255,255)" />
              </label>
              <input
                className="hidden"
                onChange={onImageEdit}
                type="file"
                id="avatar"
                accept="image/jpeg, image/png"
              />
            </>
          )}
        </div>
      </div>
      <div className="p-5 grid gap-2">
        <div className="flex justify-between gap-3">
          <h1 className="text-2xl break-all">Ben Teague</h1>
          <h3 className="self-end text-slate-500">coin horder</h3>
        </div>
        <div className="flex justify-between gap-5">
          <Button onClick={() => {}}>Message</Button>
          <Button onClick={() => {}}>Add Friend</Button>
          <Button onClick={() => {}}>...</Button>
        </div>
        <p className="italic">
          Description: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </p>
        <hr />
        <div className="flex justify-between gap-5 text-slate-500">
          <p>Friends: 100</p>
          <p>Posts: 50</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

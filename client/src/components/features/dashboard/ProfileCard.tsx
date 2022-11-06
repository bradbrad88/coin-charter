import { useState } from "react";
import { GrEdit } from "react-icons/gr";
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
    <div className="sm:p-5 rounded-sm md:shadow-lg shadow-gray-400 grid grid-cols-1 md:grid-cols-2">
      {editImage && (
        <ImageEditor
          image={editImage}
          close={() => setEditImage(null)}
          submit={submitImage}
        />
      )}
      <div className="bg-gradient-to-b from-indigo-800 opacity-80 flex justify-center p-5">
        <div className="relative block w-1/2">
          <img
            src="https://source.unsplash.com/random/?person/"
            className="aspect-[4/4] object-cover rounded-full border-white border-4"
          />
          {isLoggedIn && (
            <>
              <label
                htmlFor="avatar"
                className="absolute flex justify-center items-center right-0 bottom-0 w-8 h-8 rounded-full bg-white border-black border-2 -translate-x-1/2 -translate-y-1/2"
              >
                <GrEdit />
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
      <div className="md:border-l p-5 grid">
        <div className="flex justify-between gap-5">
          <h1 className="text-2xl break-all">Ben Teague</h1>
          <h3 className="self-end text-slate-500">coin horder</h3>
        </div>
        <p className="border-b pt-5 pb-4 italic">
          Description: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </p>
        <div className="flex justify-between gap-5 pt-3 text-slate-500">
          <p>Friends: 100</p>
          <p>Posts: 50</p>
        </div>
        <div className="flex justify-between gap-5 pt-5 row-start-2">
          <Button onClick={() => {}}>Message</Button>
          <Button onClick={() => {}}>Add Friend</Button>
          <Button onClick={() => {}}>...</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

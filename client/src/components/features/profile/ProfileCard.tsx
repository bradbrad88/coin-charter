import { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import useUserContext from "contexts/UserContext";
import ImageEditor from "features/image-editor/ImageEditor";
import Button from "common/Button";

import type { ChangeEventHandler } from "react";
import Container from "src/components/common/Container";

interface Proptypes {
  _id: string;
  username: string;
  subTitle: string;
  image?: string;
  bio: string;
  friendCount: number;
  postCount: number;
  edit?: boolean;
}

const ProfileCard = ({
  _id,
  username,
  subTitle,
  image,
  bio,
  friendCount,
  postCount,
  edit = false,
}: Proptypes) => {
  const { updateImage, addBio } = useUserContext();
  const [editImage, setEditImage] = useState<File | null>();
  const imageRef = useRef<HTMLInputElement>(null);
  const [editBio, setEditBio] = useState(false);
  const [newBio, setNewBio] = useState(bio || "");

  // Remove the file loaded in input element on every change - this allows the same file to be opened twice in a row
  useEffect(() => {
    if (imageRef.current) imageRef.current.value = "";
  }, [editImage]);

  const onImageEdit: ChangeEventHandler<HTMLInputElement> = (e) => {
    const image = e.target.files![0];
    if (!image) return;
    setEditImage(image);
  };

  const submitImage = (image: File, crop: any) => {
    if (!editImage) return;
    updateImage(image, crop);
    setEditImage(null);
  };

  // onclick of the Edit Profile Button open an input to fill in the bio
  const onBioEdit = () => {
    setEditBio(!editBio);
  };

  const onBioSubmit = () => {
    setEditBio(false);
    addBio(newBio);
  };

  return (
    <Container>
      <div className="grid grid-cols-1md:grid-cols-2">
        {editImage && (
          <ImageEditor
            image={editImage}
            close={() => setEditImage(null)}
            submit={submitImage}
          />
        )}
        <div className="bg-gradient-to-b sm:bg-gradient from-indigo-800 md:from-white bg-opacity-80 flex justify-center p-5">
          <div className="relative block w-1/2 md:w-[300px] h-fit">
            <img
              src={image}
              className="aspect-[4/4] w-full object-cover rounded-full border-white border-4"
            />
            {edit && (
              <>
                <label
                  htmlFor="avatar"
                  className="absolute flex justify-center items-center right-[15%] bottom-[15%] w-8 h-8 rounded-full bg-[rgb(95,90,192)] border-white border-2 translate-x-1/2 translate-y-1/2"
                >
                  <MdEdit color="rgb(255,255,255)" />
                </label>
                <input
                  ref={imageRef}
                  className="hidden"
                  onInput={onImageEdit}
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
            <h1 className="text-2xl break-all">{username}</h1>
            <h3 className="self-end text-slate-500">{subTitle}</h3>
          </div>
          <div className="flex justify-between gap-5">
            {edit ? (
              <Button onClick={onBioEdit}>Edit Bio</Button>
            ) : (
              <>
                <Button onClick={() => {}}>Message</Button>
                <Button onClick={() => {}}>Add Friend</Button>
              </>
            )}
          </div>
          {editBio ? (
            <div>
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your bio"
                onChange={(e) => setNewBio(e.target.value)}
                value={newBio}
              />
              <Button onClick={onBioSubmit}>Submit</Button>
            </div>
          ) : (
            <p className="italic">{newBio}</p>
          )}

          <hr />
          <div className="flex justify-between gap-5 text-slate-500">
            <p>Friends: {friendCount}</p>
            <p>Posts: {postCount}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileCard;

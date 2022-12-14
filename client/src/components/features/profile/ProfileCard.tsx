import { useEffect, useMemo, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import useUserContext from "contexts/UserContext";
import ImageEditor from "features/image-editor/ImageEditor";
import Button from "common/Button";
import Container from "src/components/common/Container";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FRIENDS, SEND_FRIEND_REQUEST } from "src/graphql/queries";
import { toast } from "react-toastify";

interface Proptypes {
  user: User;
  edit?: boolean;
}

interface Query {
  friends: { friend: User }[];
}

const ProfileCard = ({ user, edit = false }: Proptypes) => {
  const [sendRequest] = useMutation(SEND_FRIEND_REQUEST);
  const { data } = useQuery<Query>(GET_FRIENDS);
  const { _id, friendCount, postCount, subTitle, username, image } = user;
  const { updateImage, addBio, user: currentUser } = useUserContext();
  const [editImage, setEditImage] = useState<File | null>();
  const imageRef = useRef<HTMLInputElement>(null);
  const [editBio, setEditBio] = useState(false);
  const [newBio, setNewBio] = useState(user.bio || "");

  const isFriend = useMemo(() => {
    const friends = data?.friends || [];
    return friends.some((friend) => friend.friend._id === _id);
  }, [data, user]);

  // Remove the file loaded in input element on every change - this allows the same file to be opened twice in a row
  useEffect(() => {
    if (imageRef.current) imageRef.current.value = "";
  }, [editImage]);

  const onImageEdit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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

  const addFriendHandler = async () => {
    if (!currentUser) return;
    const { _id, username, bio, image, subTitle } = currentUser;
    const variables = {
      friendId: user._id,
      userId: _id,
      username,
      bio,
      image,
      subTitle,
    };
    const res = await sendRequest({ variables });
    if (!res) return toast.error("Unable to send request");
    toast.success("Friend request send");
  };

  return (
    <Container>
      <div className="relative grid grid-cols-1md:grid-cols-2">
        {editImage && (
          <ImageEditor
            image={editImage}
            close={() => setEditImage(null)}
            submit={submitImage}
          />
        )}
        <div className="bg-gradient-to-b sm:bg-gradient from-primary md:from-white bg-opacity-80 flex justify-center p-5">
          <div className="relative bg-blue-30 w-1/2 md:w-[300px] h-fit bg-white rounded-full">
            <img
              src={image}
              className="aspect-[4/4] w-full object-cover rounded-full border-white border-4 md:border-primary"
            />
            {edit && (
              <>
                <label
                  htmlFor="avatar"
                  className="absolute flex justify-center items-center right-[15%] bottom-[15%] w-8 h-8 rounded-full bg-[rgb(95,90,192)] border-white border-2 translate-x-1/2 translate-y-1/2 cursor-pointer"
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
                {/* <Button onClick={() => {}}>Message</Button> */}
                {isFriend ? (
                  <div className="italic">Friends</div>
                ) : (
                  <Button onClick={addFriendHandler}>Add Friend</Button>
                )}
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

import Button from "common/Button";

const ProfileCard = () => {
  return (
    <div className="sm:p-5 rounded-sm md:shadow-lg shadow-gray-400 grid grid-cols-1 md:grid-cols-2">
      <div className="bg-gradient-to-b from-indigo-800 opacity-80 flex justify-center p-5">
        <img
          src="https://source.unsplash.com/random/?person/"
          className="aspect-[4/4] object-cover block w-1/2 rounded-full border-white border-4"
        />
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

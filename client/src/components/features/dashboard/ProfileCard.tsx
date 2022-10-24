const ProfileCard = () => {
  return (
    <div className="grid grid-cols-[1fr,_2fr] w-[500px] p-5 rounded-sm gap-5 shadow-lg shadow-gray-400 mt-20 ml-72">
      <div className="">
        <img
          src="https://source.unsplash.com/random/?person/"
          className="aspect-[3/4] object-cover block w-full rounded-sm"
        />
      </div>
      <div className="border-l pl-5">
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
        <div className="flex justify-between gap-5 pt-5">
          <button className="border rounded-sm w-28 py-1 bg-opacity-80 bg-indigo-600 hover:bg-opacity-100 text-white transition-all duration-75">
            Message
          </button>
          <button className="border rounded-sm w-28 py-1 bg-opacity-80 bg-indigo-600 hover:bg-opacity-100 text-white transition-all duration-75">
            Add
          </button>
          {/* the above buttons will be condition if logged in and be replaced with an edit button*/}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

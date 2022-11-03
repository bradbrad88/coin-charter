const FriendsList = () => {
  //TODO SHOW PROFILE PIC, TITLE, NAME, AMOUNT FRIENDS, AND FAR RIGHT CAN SHOW MOST TOP RATED CHART THEY HAVE DONE
  return (
    <div className="flex flex-col rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-4/6 h-[600px]">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Friends List</h1>
        <h1>Friends: 2312</h1>
      </div>
      <ul className="flex flex-col gap-1 border-2 border-solid border-black-50 w-full h-full">
        {/* //? MAKE THIS SPOT SUPPOSED TO BE THE MAP */}
        {/* USERNAME, SUBTITLE, PROFILE PIC, BIO,  FRIENDS COUNT, NUM FAV COINS, NUM CHARTS MADE, NUM COMMENTS MADE*/}
        <li className="border-solid border-2 border-black w-full h-[100px]"></li>
      </ul>
    </div>
  );
};

export default FriendsList;

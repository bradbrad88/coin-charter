import type { User } from "contexts/UserContext";

interface Proptypes {
  friends: {
    friend: User;
  }[];
}

const FriendsList = ({ friends }: Proptypes) => {
  return (
    <div className="flex flex-col rounded-sm shadow-lg shadow-gray-400 p-5 m-4 mr-2 w-[95%] h-[500px] text-sm md:h-[600px] md:text-md md:w-4/6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Friends List</h1>
        <h1>Friends: 2312</h1>
      </div>
      <ul className="flex flex-col gap-1 w-full h-full overflow-y-auto">
        {friends.map(({ friend }) => (
          <li className="border-b w-full h-[100px] flex justify-start p-1">
            <div className="flex gap-1 w-full">
              <div className="flex w-2/6 gap-2">
                <img
                  src={friend.image}
                  className="h-[45px] w-[35px] rounded-lg md:h-[90px] md:w-[70px]"
                />
                <div className="flex flex-col leading-4 w-5/6">
                  <h1 className="font-bold text-md text-indigo-600 hover:text-indigo-200 hover:cursor-pointer">
                    {friend.username}
                  </h1>
                  <p className="italic text-sm">{friend.subTitle}</p>
                  <p className="hidden text-sm w-full leading-4 md:flex overflow-y-auto">
                    {friend.bio}
                  </p>
                </div>
              </div>
              <div className="flex w-2/6 hidden md:flex">
                <div className=" flex flex-col w-[100px] h-full justify-center items-center">
                  <p className="font-bold text-sm text-indigo-600">Friends #</p>
                  <p>{friend.friendCount}</p>
                </div>
                <div className=" flex flex-col w-[100px] h-full justify-center items-center">
                  <p className="font-bold text-sm text-indigo-600">Charts #</p>
                  <p>{friend.chartCount}</p>
                </div>
                <div className=" flex flex-col w-[100px] h-full justify-center items-center">
                  <p className="font-bold text-sm text-indigo-600">
                    Fav Coins #
                  </p>
                  <p>{friend.favCoinCount}</p>
                </div>
              </div>
              <div className=" w-3/6 md:w-2/6 h-full leading-4">
                <h1 className="font-bold text-md text-indigo-600">
                  Recent Activity
                </h1>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;

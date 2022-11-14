import { Link } from "react-router-dom";
import Container from "src/components/common/Container";

interface Proptypes {
  friends: {
    friend: User;
  }[];
}

const FriendsList = ({ friends }: Proptypes) => {
  return (
    <Container>
      <div className="flex flex-col p-5 w-full h-full md:h-[600px]">
        <ul
          className="order-1 grid gap-3 w-full h-full overflow-y-auto"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {friends.map(({ friend }) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </ul>
        {/* Header component below content so the sticky header will display above content without changing z-indexes (order-1 on ul component puts it back in the correct order) */}
        <div className="flex justify-between sticky top-0 bg-white p-5">
          <h1 className="text-xl font-bold">Friends List</h1>
          <h1>Friends: {friends.length}</h1>
        </div>
      </div>
    </Container>
  );
};

interface FriendProps {
  friend: User;
}

const FriendCard = ({ friend }: FriendProps) => {
  return (
    <li className="w-full aspect-[4/3]">
      <Link to={`/profile/${friend._id}`}>
        <article className="relative w-full h-full bg-white group p-2 text-black shadow-gray-300 shadow-md border-[1px] border-gray-100 hover:bg-primary hover:text-white rounded-md transition-all duration-300">
          {/* Divide top and bottom half */}
          <div className="h-full grid grid-rows-[min-content,_minmax(0,_1fr)] gap-3">
            {/* Break image and top right content */}
            <div className="grid grid-cols-2 w-full">
              {/* Image */}
              <div className="relative w-full group-hover:w-2/3 aspect-square rounded-full overflow-hidden transition-all shadow-lg shadow-gray-300 group-hover:shadow-none group-hover:border-primary duration-300 bg-white">
                <img
                  className="object-cover aspect-square"
                  src={friend.image}
                />
              </div>

              <div className="flex flex-col text-right justify-end text-gray-500 group-hover:text-indigo-100">
                <p>Friends: {friend.friendCount}</p>
                <p>Charts: {friend.chartCount}</p>
                <p>Fav Coins: {friend.favCoinCount}</p>
              </div>
            </div>
            <div className="grid grid-rows-[min-content,_minmax(0,_1fr)] h-full w-full bg-blue-3000">
              <div className="flex items-end gap-3">
                <h2 className="text-lg font-bold">{friend.username}</h2>
                <h2 className="text-primary group-hover:text-indigo-100">
                  {friend.subTitle}
                </h2>
              </div>

              <div className="h-full w-full overflow-hidden group-hover:overflow-y-auto">
                <p className="italic text-white pl-5 w-full opacity-0 group-hover:opacity-100 duration-500 delay-200">
                  {friend.bio}
                </p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default FriendsList;

import { useQuery } from "@apollo/client";
import { FRIEND_ACTIVITY } from "src/graphql/queries";

// ? for activity- Commented on a coin, commented on a chart, favourited a coin, newly added friend, upvoted/downvoted a comment, upvoted/downvoted a chart, posted a new chart, posted a new comment

interface Proptypes {
  friends: User[];
}

interface Query {
  recentActivity: Activity[];
}

interface Activity {
  username: string;
  createdAt: string;
  text: string;
  value: string;
  path: string;
}

const FriendsActivity = () => {
  const { data } = useQuery<Query>(FRIEND_ACTIVITY);
  const activity = data?.recentActivity || [];
  console.log(activity);
  return (
    <div className="flex flex-col rounded-sm gap-1 shadow-lg shadow-gray-400 m-4 p-5 w-[95%] md:w-2/6 h-[400px] md:h-[600px] ">
      <h1 className="text-xl font-bold">Friends Activity</h1>
      <ul className="w-full h-full flex flex-col overflow-y-auto">
        {activity.map((item) => (
          <li className="border-b flex w-full h-[40px] justify-between items-center group hover:bg-indigo-100 hover:cursor-pointer md:h-[80px]">
            <div className="flex flex-col">
              <h1 className="font-bold text-sm text-indigo-600 hover:cursor-pointer word-wrap">
                {item.username}
              </h1>
              <p className="text-xs text-gray-500">Date: {item.createdAt}</p>
            </div>

            <p className="text-sm">
              {item.text}
              {item.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsActivity;

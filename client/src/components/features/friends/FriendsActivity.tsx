import { useQuery } from "@apollo/client";
import Container from "src/components/common/Container";
import { FRIEND_ACTIVITY } from "src/graphql/queries";

// ? for activity- Commented on a coin, commented on a chart, favourited a coin, newly added friend, upvoted/downvoted a comment, upvoted/downvoted a chart, posted a new chart, posted a new comment

interface Proptypes {
  friends: User[];
}

interface Query {
  recentActivity: Activity[];
}

interface Activity {
  _id: string;
  username: string;
  createdAt: string;
  text: string;
  value: string;
  path: string;
  image: string;
}

const FriendsActivity = () => {
  const { data } = useQuery<Query>(FRIEND_ACTIVITY);
  const activity = data?.recentActivity || [];
  return (
    <Container>
      <div className="flex flex-col gap-1 p-5">
        <h1 className="text-xl font-bold">Friends Activity</h1>
        <ul className="w-full h-full flex flex-col overflow-y-auto">
          {activity.map((item) => (
            <li
              key={item._id}
              className="border-b flex w-full justify-between items-center group hover:bg-indigo-100 hover:cursor-pointer gap-2 p-2"
            >
              <div className="w-12 h-12 rounded-full border-2 border-primary bg-white overflow-hidden text-transparent shrink-0">
                <img
                  className="w-full h-full"
                  src={item.image}
                  alt={item.username}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-sm text-indigo-600 hover:cursor-pointer word-wrap">
                  {item.username}
                </h1>
                <p className="text-xs text-gray-500">{item.createdAt}</p>
              </div>
              <p className="text-sm ml-auto">
                {item.text}
                <span className="text-primary font-semibold ">
                  {item.value}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default FriendsActivity;

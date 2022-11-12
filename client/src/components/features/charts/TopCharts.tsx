import { useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import useUserContext from "contexts/UserContext";
import Container from "src/components/common/Container";
import {
  DOWNVOTE_CHART,
  QUERY_ALL_CHARTS,
  UPVOTE_CHART,
} from "src/graphql/queries";
import VoteWidget from "src/components/common/VoteWidget";

interface Query {
  charts: Chart[];
}

const MostRecent = () => {
  const { user } = useUserContext();
  const { data, refetch } = useQuery<Query>(QUERY_ALL_CHARTS);
  const [upVoteMutation] = useMutation(UPVOTE_CHART);
  const [downVoteMutation] = useMutation(DOWNVOTE_CHART);
  const ref = useRef<HTMLUListElement>(null);

  const topRated = useMemo(() => {
    if (!data || data.charts.length < 1) return null;
    return data.charts.reduce(function (prev: any, current: any) {
      return prev.upVotes > current.upVotes ? prev : current;
    });
  }, [data]);

  const topCharts = useMemo(() => {
    if (!data) return [];
    return [...data.charts]
      .sort((a, b) => b.upVotes.length - a.upVotes.length)
      .map((chart) => <ChartItem key={chart._id} info={chart} />);
  }, [data]);

  const upVote = useMemo(() => {
    if (!topRated) return false;
    return topRated.upVotes.some((vote) => vote._id === user?._id);
  }, [data]);

  const downVote = useMemo(() => {
    if (!topRated) return false;
    return topRated.downVotes.some((vote) => vote._id === user?._id);
  }, [data]);

  const handleUpVote = async (id: string, vote: boolean) => {
    await upVoteMutation({ variables: { id, vote } });
    refetch();
  };

  const handleDownVote = async (id: string, vote: boolean) => {
    await downVoteMutation({ variables: { id, vote } });
    refetch();
  };

  const slideLeft = () => {
    if (!ref.current) return;
    ref.current.scrollLeft = ref.current.scrollLeft - 300;
  };

  const slideRight = () => {
    if (!ref.current) return;
    ref.current.scrollLeft = ref.current.scrollLeft + 300;
  };

  if (!topRated) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="p-5">
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-center">Top Rated Charts</h1>
          <Link to={`/coin/${topRated.coinId}`} className="w-fit">
            <h1 className="text-lg font-semibold text-center hover:cursor-pointer w-fit">
              {topRated.coinName}
            </h1>
          </Link>
        </div>
        <div className="flex gap-3 items-center">
          <h1 className="font-bold text-md text-indigo-600">
            {topRated.chartTitle}
          </h1>
          <Link to={`/profile/${topRated.userId}`}>
            <p className="italic font-bold text-sm text-slate-500 hover:cursor-pointer">
              By {topRated.username}
            </p>
          </Link>
          <VoteWidget
            handleUpVote={(vote) => handleUpVote(topRated._id, vote)}
            handleDownVote={(vote) => handleDownVote(topRated._id, vote)}
            downVote={downVote}
            upVote={upVote}
            downVoteCount={topRated.downVotes.length}
            upVoteCount={topRated.upVotes.length}
          />
        </div>
        <p>{topRated.chartDescription}</p>
      </div>
      <Link to={`/chart/${topRated._id}`}>
        <div className="">
          <img
            src={topRated.imageMedium}
            className="max-h-[400px] w-full hover:brightness-50 hover:cursor-pointer"
          />
        </div>
      </Link>
      <div className="">
        <h1 className="font-bold text-lg text-center p-5 bg-white border-b border-t">
          Top Charts
        </h1>
        <div className="relative h-[240px]">
          <ul
            ref={ref}
            className="h-full w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth"
          >
            {topCharts}
          </ul>
          <TfiArrowCircleLeft
            onClick={slideLeft}
            className="absolute top-1/2 left-0 text-3xl text-white bg-primary rounded-full p-2 cursor-pointer hidden lg:block"
          />
          <TfiArrowCircleRight
            onClick={slideRight}
            className="absolute top-1/2 right-0 text-3xl text-white bg-primary rounded-full p-2 cursor-pointer hidden lg:block"
          />
        </div>
      </div>
    </Container>
  );
};

export default MostRecent;

interface ChartItemProps {
  info: Chart;
}

const ChartItem = ({ info }: ChartItemProps) => {
  const nav = useNavigate();

  const selectChart = () => {
    nav(`/chart/${info._id}`);
  };

  return (
    <li
      className="w-[300px] h-full inline-block p-2 cursor-pointer hover:bg-indigo-100 ease-in-out duration-300"
      onClick={() => selectChart()}
    >
      <div>
        <h1 className="truncate font-bold text-md text-indigo-600">
          {info.chartTitle}
        </h1>
        <div className="inline-flex">
          <div className="grid-flow-col">
            <h1 className="truncate font-bold text-sm">{info.coinName}</h1>
            <p className="truncate italic font-bold text-xs text-slate-500 w-[110px]">
              By {info.username}
            </p>
          </div>
          <div className="grid-flow-col">
            <p className="text-gray-500 text-xs whitespace-normal">
              Posted On: {info.createdAt}
            </p>
            <div className="flex justify-center gap-2">
              <div className="">
                <IoIosArrowRoundUp className="text-green-500" />
                <p className="text-[8px]">{info.upVotes.length}</p>
              </div>
              <div className="">
                <IoIosArrowRoundDown className="text-red-500" />
                <p className="text-[8px]">{info.downVotes.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={info.imageSmall}
        className="w-full h-[120px] rounded-sm snap-center"
      />
    </li>
  );
};

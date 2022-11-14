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
import ChartListItem from "./ChartListItem";

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
      .map((chart) => (
        <ChartListItem
          imageHeight={120}
          width={300}
          key={chart._id}
          chart={chart}
        />
      ));
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
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-lg font-bold text-center">Featured Chart</h1>
        </div>
        <ChartListItem chart={topRated} />
      </div>

      <div className="">
        <h1 className="font-bold text-lg text-center p-5 bg-white border-b border-t">
          Top Charts
        </h1>
        <div className="relative h-[240px]">
          <ul
            ref={ref}
            className="h-full w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-thin"
          >
            {topCharts}
          </ul>
          <TfiArrowCircleLeft
            onClick={slideLeft}
            className="absolute top-1/2 left-2 text-3xl text-white bg-primary rounded-full p-2 cursor-pointer hidden lg:block"
          />
          <TfiArrowCircleRight
            onClick={slideRight}
            className="absolute top-1/2 right-2 text-3xl text-white bg-primary rounded-full p-2 cursor-pointer hidden lg:block"
          />
        </div>
      </div>
    </Container>
  );
};

export default MostRecent;

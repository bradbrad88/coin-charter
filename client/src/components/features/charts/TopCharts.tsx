import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import Container from "src/components/common/Container";
import { QUERY_ALL_CHARTS } from "src/graphql/queries";
import ChartListItem from "./ChartListItem";
import SideScrollReel from "src/components/common/SideScrollReel";

interface Query {
  charts: Chart[];
}

const MostRecent = () => {
  const { data } = useQuery<Query>(QUERY_ALL_CHARTS);

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
        <SideScrollReel>{topCharts}</SideScrollReel>
      </div>
    </Container>
  );
};

export default MostRecent;

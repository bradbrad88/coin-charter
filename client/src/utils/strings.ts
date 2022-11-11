export const formatCurrency = (
  number: number,
  locale = "en-au",
  currency = "AUD",
) =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(number);

export const formatPercentage = (number: string | number, decimals = 2) => {
  return parseFloat(number.toString()).toFixed(decimals) + "%";
};

// toprated info
const nav = useNavigate();
const [topRated, setTopRated] = useState<any>();
const { loading, error, data } = useQuery(QUERY_ALL_CHARTS);

useEffect(() => {
  const info = data?.charts;
  if (info) {
    topRatedChart(info);
  }
}, [data]);

const topRatedChart = (info: any) => {
  const mostUpvotedChart = info.reduce(function (prev: any, current: any) {
    return prev.upVotes > current.upVotes ? prev : current;
  });
  setTopRated(mostUpvotedChart);
};

if (!topRated) {
  return <div>Loading...</div>;
}

const selectUser = () => {
  nav(`/profile/${topRated.userId}`);
};

// TopCharts in charts folder functionality
useEffect(() => {
  const chartData = data?.charts;

  if (chartData) {
    createTopRated(chartData);
  }
}, [data]);

const createTopRated = (chartData: ChartsDataTypes[]) => {
  let topRated = chartData
    .slice(0)
    .sort((a, b) => (a.upVotes > b.upVotes ? -1 : 1));
  setTopCharts(topRated);
};

const selectChart = (info: any) => {
  nav(`/chart/${info._id}`);
};

if (!topCharts) {
  return <div>Loading...</div>;
}

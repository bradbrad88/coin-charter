import Comments from "./Comments";

const CoinComments = () => {
  return (
    <div className="flex flex-col rounded-sm gap-1 shadow-lg shadow-gray-400 m-4 p-5 w-[95%] lg:w-[400px] h-screen">
      <div className="flex gap-3 items-center">
        <h1 className="text-lg font-bold">Comments</h1>
        <i className="fa-regular fa-comments text-lg"></i>
      </div>

      {/*  MAKE THIS SECTION SEPERATE COMPONENT AND MAP THE DATA THROUGH*/}
      <Comments />
    </div>
  );
};

export default CoinComments;

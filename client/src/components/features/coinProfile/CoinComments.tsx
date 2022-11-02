const CoinComments = () => {
  return (
    <div className="flex flex-col rounded-sm gap-1 shadow-lg shadow-gray-400 m-4 p-5 w-[400px] h-screen">
      <h1 className="text-lg font-bold">Comments</h1>
      <ul className="flex flex-col gap-1 overflow-y-scroll">
        <li className="border-black-50 border-solid border-2 flex gap-2 width-5/6 h-[100px]">
          <div className="flex flex-col items-center w-1/6 gap-1 p-1">
            <img
              src="https://source.unsplash.com/random/?person/"
              className="h-[50px] w-[50px] rounded"
            />
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <i className="fa-regular fa-thumbs-up text-[14px]"></i>
                <p className="text-[8px]">1230</p>
              </div>
              <div className="flex flex-col">
                <i className="fa-regular fa-thumbs-down text-[14px]"></i>
                <p className="text-[8px]">51230</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col w-5/6 h-5/6">
            <h3 className="font-bold text-sm">Jamie</h3>
            <p className="text-xs overflow-y-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </li>
        <li className="border-black-50 border-solid border-2 flex gap-2 width-5/6 h-[100px]">
          <div className="flex flex-col items-center w-1/6 gap-1 p-1">
            <img
              src="https://source.unsplash.com/random/?person/"
              className="h-[50px] w-[50px] rounded"
            />
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <i className="fa-regular fa-thumbs-up text-[14px]"></i>
                <p className="text-[8px]">1230</p>
              </div>
              <div className="flex flex-col">
                <i className="fa-regular fa-thumbs-down text-[14px]"></i>
                <p className="text-[8px]">51230</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col w-5/6 h-5/6">
            <h3 className="font-bold text-sm">Jamie</h3>
            <p className="text-xs overflow-y-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
          </div>
        </li>
        <li className="border-black-50 border-solid border-2 flex gap-2 width-5/6 h-[100px]">
          <div className="flex flex-col items-center w-1/6 gap-1 p-1">
            <img
              src="https://source.unsplash.com/random/?person/"
              className="h-[50px] w-[50px] rounded"
            />
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <i className="fa-regular fa-thumbs-up text-[14px]"></i>
                <p className="text-[8px]">1230</p>
              </div>
              <div className="flex flex-col">
                <i className="fa-regular fa-thumbs-down text-[14px]"></i>
                <p className="text-[8px]">51230</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col w-5/6 h-5/6">
            <h3 className="font-bold text-sm">Jamie</h3>
            <p className="text-xs overflow-y-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CoinComments;

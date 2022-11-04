// import { Button } from "src/components/common/Button";

const FriendsList = () => {
  //TODO SHOW PROFILE PIC, TITLE, NAME, AMOUNT FRIENDS, AND FAR RIGHT CAN SHOW MOST TOP RATED CHART THEY HAVE DONE
  return (
    <div className="flex flex-col rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-4/6 h-[600px]">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Friends List</h1>
        <h1>Friends: 2312</h1>
      </div>
      <ul className="flex flex-col gap-1 border-2 border-solid border-black-50 w-full h-full">
        {/* //? MAKE THIS SPOT SUPPOSED TO BE THE MAP */}
        {/* FRIENDS COUNT, NUM FAV COINS, NUM CHARTS MADE, NUM COMMENTS MADE*/}
        <li className="border-b w-full h-[100px] flex justify-start p-1">
          <div className="flex gap-1 w-full">
            <div className="flex w-2/6 gap-2">
              <img
                src="https://source.unsplash.com/random/?person/"
                className="h-[90px] w-[70px] rounded-lg"
              />
              <div className="flex flex-col leading-4 w-5/6">
                <h1 className="font-bold text-md text-indigo-600">Ben Smerd</h1>
                <p className="italic text-sm">Beginner trader</p>
                <p className="text-sm w-full leading-4 overflow-y-scroll">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi saepe similique harum obcaecati id repudiandae,
                  culpa, facere vel ratione cum odit provident ex autem iste.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi saepe similique harum obcaecati id repudiandae,
                  culpa, facere vel ratione cum odit provident ex autem iste.
                </p>
              </div>
            </div>
            <div className="flex w-2/6">
              <div className=" flex flex-col w-[100px] h-full justify-center items-center">
                <p className="font-bold text-sm text-indigo-600">Friends #</p>
                <p>1234</p>
              </div>
              <div className=" flex flex-col w-[100px] h-full justify-center items-center">
                <p className="font-bold text-sm text-indigo-600">Charts #</p>
                <p>12</p>
              </div>
              <div className=" flex flex-col w-[100px] h-full justify-center items-center">
                <p className="font-bold text-sm text-indigo-600">Fav Coins #</p>
                <p>347</p>
              </div>
            </div>
            <div className=" w-2/6 h-full leading-4">
              <h1 className="font-bold text-md text-indigo-600">
                Recent Activity
              </h1>
              {/* //TODO add links to the things*/}
              <ul className="flex flex-col">
                <li>Commented on coin: Ethereum</li>
                <li>Commented on chart: Binance</li>
                <li>New Friend: Sam March</li>
                <li>Added To Favourites: Cardano</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FriendsList;

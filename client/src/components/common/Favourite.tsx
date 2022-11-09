import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Proptypes {
  fav: boolean;
  onClick: () => void;
}

const Favourite = ({ fav, onClick }: Proptypes) => {
  const handleClick: React.PointerEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div onClick={handleClick}>
      {fav ? <AiFillStar fill="orange" /> : <AiOutlineStar />}
    </div>
  );
};

export default Favourite;

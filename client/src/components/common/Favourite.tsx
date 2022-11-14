import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Proptypes {
  fav: boolean;
  onClick: () => void;
}

const Favourite = ({ fav, onClick }: Proptypes) => {
  const handleClick: React.PointerEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  return (
    <div onClick={handleClick}>
      {fav ? (
        <AiFillStar fill="orange" size={20} />
      ) : (
        <AiOutlineStar size={20} />
      )}
    </div>
  );
};

export default Favourite;

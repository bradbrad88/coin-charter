import { useState } from "react";
import classnames from "classnames";

const Favourite = () => {
  const [fav, setFav] = useState(false);
  const onClick: React.PointerEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setFav(!fav);
  };
  const classes = classnames("fa-star", {
    "fa-solid": fav,
    "fa-regular": !fav,
  });
  return (
    <div onClick={onClick}>
      <i className={classes}></i>
    </div>
  );
};

export default Favourite;

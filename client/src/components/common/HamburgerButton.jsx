import { AiOutlineMenu } from "react-icons/ai";

const HamburgerButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <AiOutlineMenu />
    </button>
  );
};

export default HamburgerButton;

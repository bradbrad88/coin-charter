const HamburgerButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <i className="fa-solid fa-bars"></i>
    </button>
  );
};

export default HamburgerButton;

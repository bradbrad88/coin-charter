import { PropagateLoader } from "react-spinners";

interface Proptypes {
  children: React.ReactNode;
  onClick: React.PointerEventHandler<HTMLButtonElement>;
  loading?: boolean;
}

const Button = ({ children, onClick, loading }: Proptypes) => {
  const handleClick: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <button
      disabled={loading}
      className="h-10 bg-indigo-800 bg-opacity-80 text-white hover:bg-opacity-100 transition-colors p-2 rounded-sm"
      onClick={handleClick}
    >
      {loading ? (
        <PropagateLoader
          color="white"
          size={12}
          className="opacity-70"
          cssOverride={{ display: "block", height: 12 }}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

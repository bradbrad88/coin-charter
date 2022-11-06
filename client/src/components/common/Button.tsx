import { PropagateLoader } from "react-spinners";

interface Proptypes {
  children: React.ReactNode;
  onClick: React.PointerEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({ children, onClick, loading, disabled }: Proptypes) => {
  const handleClick: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (loading) return;
    onClick(e);
  };

  return (
    <button
      disabled={disabled}
      className="h-10 bg-primary text-white hover:bg-opacity-100 transition-colors p-2 rounded-sm disabled:bg-gray-400"
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

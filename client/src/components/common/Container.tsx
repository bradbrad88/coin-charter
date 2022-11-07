interface Proptypes {
  children: React.ReactNode;
}

const Container = ({ children }: Proptypes) => {
  return (
    <div className="md:shadow-lg rounded-sm shadow-gray-400">{children}</div>
  );
};

export default Container;

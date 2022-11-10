interface Proptypes {
  children: React.ReactNode;
}

const Container = ({ children }: Proptypes) => {
  return (
    <div className="md:shadow-2xl rounded-sm shadow-gray-900">{children}</div>
  );
};

export default Container;

interface Proptypes {
  children: React.ReactNode;
}

const Container = ({ children }: Proptypes) => {
  return (
    <div className="md:shadow-2xl rounded-sm shadow-gray-900 h-full w-full">
      {children}
    </div>
  );
};

export default Container;

interface Proptypes<T> {
  children: React.ReactNode;
  current: string;
  asc: T;
  desc: T;
  setOrder: (value: T) => void;
}

const FieldSorter = <T,>({
  children,
  current,
  asc,
  desc,
  setOrder,
}: Proptypes<T>) => {
  const _asc = current === asc;
  const _desc = current === desc;
  const neither = current !== asc && current !== desc;

  const onClick = () => {
    if (_asc) {
      setOrder(null as T);
    } else if (_desc) {
      setOrder(asc);
    } else {
      setOrder(desc);
    }
  };

  const styles: React.CSSProperties = {
    transform: `rotate(${_asc ? "180" : "0"}deg)`,
  };

  return (
    <div
      onClick={onClick}
      className="flex gap-2 text-center cursor-pointer justify-center"
    >
      <div>
        {!neither && (
          <i
            className={"fa-solid fa-sharp fa-caret-up transition-transform"}
            style={styles}
          ></i>
        )}
      </div>
      <div className="whitespace-nowrap">{children}</div>
    </div>
  );
};

export default FieldSorter;

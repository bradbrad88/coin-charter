import classnames from "classnames";

interface Proptypes {
  value: number;
  formatter?: (value: number) => string;
}

const NumberHighlight = ({
  value,
  formatter = (value) => value.toString(),
}: Proptypes) => {
  const classes = classnames({
    "text-green-700": value > 0,
    "text-rose-700": value < 0,
    "text-zinc-800": value === 0,
  });
  return <span className={classes}>{formatter(value)}</span>;
};

export default NumberHighlight;

import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

interface RowObject {
  url?: string;
  content: Array<React.ReactNode>;
}

type UrlGetter<T> = (item: T) => string;

export type HeaderObject<T> = {
  title: React.ReactNode;
  processor: (item: T) => React.ReactNode;
  alignRight?: boolean;
};

interface Proptypes<T> {
  headers: Array<HeaderObject<T>>;
  data: Array<T>;
  urlGetter?: UrlGetter<T>;
  working?: boolean;
}

const Table = <T extends {}>({
  headers,
  data,
  urlGetter,
  working = false,
}: Proptypes<T>) => {
  const nav = useNavigate();
  const body = mapTable(data, headers, urlGetter);

  const renderColumnHeaders = () => (
    <tr>
      {/* Map over headers array to create title row */}
      {headers.map((header, idx) => {
        // Header can be a string: render as is, or an object: render header.content
        const { title } = header;
        return (
          <th key={idx} className="py-3 px-5">
            {title}
          </th>
        );
      })}
    </tr>
  );

  const renderBody = () => {
    // Map over the table body
    return body.map(({ content, url }, idx) => {
      // If a url is provided make the rows navigatable
      const navigate = () => {
        if (url) nav(url);
      };

      return (
        <tr
          key={"body" + idx}
          className={`border-t-[1px] border-zinc-100  hover:bg-zinc-100 cursor-pointer`}
          onClick={navigate}
        >
          {content.map((column, cellIdx) => {
            // header for this column may be an object containing formatting options, extract with function
            const { alignRight } = headers[cellIdx];
            return (
              <td
                key={"cell" + idx + cellIdx}
                className={`${alignRight ? "text-right" : ""} py-3 px-5`}
              >
                {column}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div className="flex flex-col px-2">
      <table className="">
        <thead>{renderColumnHeaders()}</thead>
        <tbody>{renderBody()}</tbody>
      </table>
      {/* Display spinner while loading */}
      {working && (
        <div>
          <PropagateLoader
            size={12}
            color={"#0004"}
            cssOverride={{
              display: "block",
              textAlign: "center",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Table;

function mapTable<T>(
  data: Array<T>,
  headers: Array<HeaderObject<T>>,
  urlGetter?: UrlGetter<T>,
): RowObject[] {
  const rowOject = data.map((item, idx) => {
    const header = headers[idx];
    const url = urlGetter ? urlGetter(item) : undefined;
    const content = [] as Array<string | React.ReactNode>;
    headers.forEach(({ processor }) => {
      if (!processor) return content.push(null);
      content.push(processor(item));
    });
    return { content, url } as RowObject;
  });

  return rowOject as RowObject[];
}

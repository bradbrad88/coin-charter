import { useState } from "react";

interface Proptypes {
  componentList: Tab[];
}
interface Tab {
  component: React.ReactNode;
  title: string;
}

const TabComponent = ({ componentList }: Proptypes) => {
  const [component, setComponent] = useState(componentList[0].component);

  const renderTabs = () => {
    return componentList.map((item) => {
      const isSelected = item.component === component;
      return (
        <div
          key={item.title}
          className={`${
            isSelected ? "bg-primary" : "bg-indigo-900"
          } min-w-[100px] text-center px-4 py-2 rounded-t-sm cursor-pointer`}
          onClick={() => setComponent(item.component)}
        >
          {item.title}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex w-fit gap-1 text-white">{renderTabs()}</div>
      <div className="p-2 bg-primary h-full max-h-[520px]">
        <div className="overflow-y-auto h-full">{component}</div>
      </div>
    </div>
  );
};

export default TabComponent;

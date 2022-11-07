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
          className={`${
            isSelected ? "bg-primary" : "bg-indigo-900"
          } min-w-[100px] text-center px-4 py-2 rounded-t-md`}
          onClick={() => setComponent(item.component)}
        >
          {item.title}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="flex w-fit gap-10 text-white">{renderTabs()}</div>
      <div className="bg-primary">{component}</div>
    </div>
  );
};

export default TabComponent;

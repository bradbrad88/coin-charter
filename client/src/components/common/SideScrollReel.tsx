import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { useRef } from "react";

interface PropTypes {
  children: React.ReactNode;
}

const SideScrollReel = ({ children }: PropTypes) => {
  const ref = useRef<HTMLUListElement>(null);

  const slideLeft = () => {
    if (!ref.current) return;
    ref.current.scrollLeft = ref.current.scrollLeft - 300;
  };

  const slideRight = () => {
    if (!ref.current) return;
    ref.current.scrollLeft = ref.current.scrollLeft + 300;
  };

  return (
    <div className="relative h-[240px]">
      <ul
        ref={ref}
        className="space-x-3 h-full w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-thin"
      >
        {children}
      </ul>
      <TfiArrowCircleLeft
        onClick={slideLeft}
        className="absolute top-1/2 left-2 text-3xl text-white bg-primary rounded-full p-2 cursor-pointer hidden lg:block"
      />
      <TfiArrowCircleRight
        onClick={slideRight}
        className="absolute top-1/2 right-2 text-3xl text-white bg-primary rounded-full p-2 cursor-pointer hidden lg:block"
      />
    </div>
  );
};

export default SideScrollReel;

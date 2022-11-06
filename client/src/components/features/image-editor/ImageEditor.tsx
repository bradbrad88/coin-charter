import React, {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "src/components/common/Button";
import { GrClose } from "react-icons/gr";

interface Extract {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Proptypes {
  image: File;
  close: () => void;
  submit: (image: File, crop: Extract) => void;
}

const ImageEditor = ({ image, close, submit }: Proptypes) => {
  const [crop, setCrop] = useState<Crop>();
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const src = URL.createObjectURL(image);
    setImageSrc(src);
    return () => URL.revokeObjectURL(src);
  }, []);

  const handleResize = useCallback(() => {
    if (!ref.current) return;
    const { clientHeight, clientWidth } = ref.current;
    const aspectRatio = clientWidth / clientHeight;
    const height = window.innerHeight * 0.8;
    const maxWidth = window.innerWidth * 0.8;
    setWidth(Math.min(height * aspectRatio, maxWidth));
  }, []);

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    handleResize();
  };

  const onSubmit = () => {
    if (!crop) return;
    const cropWithoutUnits = {
      x: crop.x,
      y: crop.y,
      width: crop.width,
      height: crop.height,
    };
    submit(image, cropWithoutUnits);
  };

  return (
    <div onClick={close} className="fixed bg-black bg-opacity-70 inset-0 z-20">
      <div className="relative w-full h-full flex justify-center items-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col items-center bg-white border-indigo-600 border-2 rounded-md"
          style={{ width: width ? width : "auto" }}
        >
          <button onClick={close} className="absolute top-2 right-2">
            <GrClose />
          </button>
          <div>
            <h2 className="text-lg font-bold text-indigo-600">Crop Image</h2>
          </div>
          <div className="p-3">
            <ReactCrop
              crop={crop}
              onChange={(c, p) => setCrop(p)}
              circularCrop={true}
              aspect={1}
              className="border-2 border-gray-300"
            >
              {imageSrc && <img onLoad={onLoad} ref={ref} src={imageSrc} />}
            </ReactCrop>
          </div>
          <div className="p-3">
            <Button onClick={onSubmit}>Upload Image</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;

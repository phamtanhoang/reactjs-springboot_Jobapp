import { useState } from "react";
import Cropper from "react-easy-crop";

const CropEasy = ({ photoURL }) => {
const [crop, setCrop] = useState({x:0, y:0})
const [zoom, setZoom] = useState(1)
const [rotation, setRotation] = useState(0)

  return (
    <>
      <Cropper image={photoURL}
      crop={crop}
      zoom={zoom}
      rotaion={rotation} />
    </>
  );
};
export default CropEasy;

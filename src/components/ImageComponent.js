import React, { useState, useEffect } from "react";

export const imageStyle = {
    width: "150px",
    height: "auto",
  };

const ImageComponent = ({ src, ...rest }) => {
    const [imgSrc, setImgSrc] = useState(src)
    useEffect(() => {
      setImgSrc(src)
    }, [src])
    const fallBackSrc = () => setImgSrc("https://via.placeholder.com/150.jpg/000000/FFFFFF/?text=Movie+Poster")
    return (
      <img 
        src={imgSrc}
        onError={fallBackSrc}
        {...rest}
      />
    )
  }

  export default ImageComponent;
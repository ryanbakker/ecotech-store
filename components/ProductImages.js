/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 5px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 22px;
`;

const ImageButton = styled.div`
  ${(props) =>
    props.active
      ? `
    opacity: 1;
    `
      : `
    opacity: 0.8;
    `}

  border-radius: 5px;
  height: 70px;
  padding: 4px;
  cursor: pointer;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="Product Image" />
      </BigImageWrapper>

      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="Small Product Image" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}

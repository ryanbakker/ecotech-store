/* eslint-disable @next/next/no-img-element */
import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 0 0 100px 0;

  @media screen and (min-width: 768px) {
    padding: 50px 0;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2rem;

  @media screen and (min-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
  line-height: 1.2rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  img {
    max-width: 100%;
    max-height: 350px;
    border-radius: 10px;
  }

  div:nth-child(1) {
    order: 2;
  }

  div:nth-child(2) {
    margin: 0 auto;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    div:nth-child(1) {
      order: 0;
    }

    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/product/" + product._id}
                  outline={1}
                  white={1}
                >
                  Read more
                </ButtonLink>
                <Button primary onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]} alt="Featured Product" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

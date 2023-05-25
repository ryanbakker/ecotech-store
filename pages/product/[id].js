/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { styled } from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 40px;
`;

const ProductPrice = styled.h4`
  font-size: 1.3rem;
  font-weight: 400;
  font-family: "Roboto Mono", monospace;
  margin-top: 10px;
`;

const ProductDesc = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 30px;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <ProductPrice>${product.price.toLocaleString()}</ProductPrice>
            <ProductDesc>{product.description}</ProductDesc>

            <Button onClick={() => addProduct(product._id)} primary size={"l"}>
              <CartIcon /> Add to cart
            </Button>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  const { id } = context.query;

  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

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

const PageContent = styled.div`
  margin-bottom: 60px;
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProductInfoBox = styled.div`
  padding-bottom: 100px;

  @media screen and (min-width: 768px) {
    padding-bottom: 0;
  }
`;

const ProductTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 400;
  margin: 0;
  padding-top: 0;

  @media screen and (min-width: 768px) {
    padding-top: 20px;
  }
`;

// Product Price
const ProductPrice = styled.h4`
  font-size: 1.3rem;
  font-weight: 400;
  font-family: "Roboto Mono", monospace;
  margin-top: 10px;
`;

// Product Specs
const ProductSpecsBox = styled.div`
  margin: 30px 0;
  max-width: 100%;

  h5 {
    font-family: "Inter", sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0;
  }
`;

const ProductSpecsList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #aaa;
    font-weight: 300;
    text-transform: capitalize;

    span {
      min-width: 25%;
      font-weight: 500;
    }
  }
`;

// Product Description
const ProductDesc = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 30px;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  console.log({ product });

  return (
    <>
      <Header />
      <Center>
        <PageContent>
          <ColWrapper>
            <WhiteBox>
              <ProductImages images={product.images} />
            </WhiteBox>
            <ProductInfoBox>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>${product.price.toLocaleString()}</ProductPrice>
              <ProductSpecsBox>
                <h5>Specs</h5>
                <ProductSpecsList>
                  {/* If no value, hide */}
                  {product.properties.brand && (
                    <li>
                      Brand: <span>{product.properties.brand}</span>
                    </li>
                  )}

                  {product.properties.color && (
                    <li>
                      Colour: <span>{product.properties.color}</span>
                    </li>
                  )}

                  {product.properties.storage && (
                    <li>
                      Storage: <span>{product.properties.storage} GB</span>
                    </li>
                  )}

                  {product.properties.battery && (
                    <li>
                      Battery: <span>{product.properties.battery} Hrs</span>
                    </li>
                  )}

                  {product.properties.wireless && (
                    <li>
                      Wireless: <span>{product.properties.wireless}</span>
                    </li>
                  )}

                  {product.properties.noisecancelling && (
                    <li>
                      Noise Cancelling:{" "}
                      <span>{product.properties.noisecancelling}</span>
                    </li>
                  )}

                  {product.properties.microphone && (
                    <li>
                      Microphone: <span>{product.properties.microphone}</span>
                    </li>
                  )}

                  {product.properties.memory && (
                    <li>
                      Memory: <span>{product.properties.memory} GB</span>
                    </li>
                  )}

                  {product.properties.screensize && (
                    <li>
                      Screen: <span>{product.properties.screensize}&quot;</span>
                    </li>
                  )}

                  {product.properties.resolution && (
                    <li>
                      Resolution: <span>{product.properties.resolution}</span>
                    </li>
                  )}

                  {product.properties.touchscreen && (
                    <li>
                      touchscreen: <span>{product.properties.touchscreen}</span>
                    </li>
                  )}
                </ProductSpecsList>
              </ProductSpecsBox>
              <ProductDesc>{product.description}</ProductDesc>

              <Button
                onClick={() => addProduct(product._id)}
                primary
                size={"l"}
              >
                <CartIcon /> Add to cart
              </Button>
            </ProductInfoBox>
          </ColWrapper>
        </PageContent>
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

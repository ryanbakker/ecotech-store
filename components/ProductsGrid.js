import { styled } from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 40px;
  row-gap: 30px;
  padding-top: 20px;
  padding-bottom: 50px;

  @media screen and (min-width: 365px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
  );
}

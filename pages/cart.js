/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  padding-bottom: 30px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const Box = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 30px 0;
  max-width: 100px;

  h4 {
    font-weight: 500;
    max-width: 50%;
  }

  @media screen and (min-width: 768px) {
    max-width: 170px;

    h4 {
      font-weight: 500;
      max-width: 85%;
    }
  }
`;

const ProductImageBox = styled.div`
  width: 80px;
  height: 60px;
  padding: 4px;
  background-color: transparent;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* shadow-md shadow-black/10 */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  img {
    max-width: 100%;
    max-height: 100px;
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) {
    width: 120px;
    height: 100px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 8px;
  font-family: "Roboto Mono", monospace;
`;

const QuantityButton = styled.button`
  border-radius: 100%;
  border: none;
  background-color: #eee;
  height: 26px;
  width: 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const PersonalDetailsForm = styled.div`
  Button {
    margin-top: 10px;
  }
`;

const CheckboxContainer = styled.div`
  label {
    font-size: 0.7rem;
  }
`;

// End of styling

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);

  //   Form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      // Reset cart to no products
      setProducts([]);
    }
  }, [cartProducts]);

  //   Clear cart after Stripe payment
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  //   Increase / Decrease Product Amount

  function increaseProduct(id) {
    addProduct(id);
  }

  function decreaseProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      streetAddress,
      postalCode,
      city,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email once it has been processed.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          {/* Cart Items Summary */}
          <Box>
            <h2>Cart</h2>

            {/* Show table if we have products */}
            {!cartProducts?.length && <div>Your cart is empty.</div>}

            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="Product Image" />
                        </ProductImageBox>
                        <h4>{product.title}</h4>
                      </ProductInfoCell>
                      <td>
                        {/* Product Quantity */}

                        <QuantityButton
                          onClick={() => decreaseProduct(product._id)}
                        >
                          -
                        </QuantityButton>

                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>

                        <QuantityButton
                          onClick={() => increaseProduct(product._id)}
                        >
                          +
                        </QuantityButton>
                      </td>
                      <td>
                        $
                        {(
                          cartProducts.filter((id) => id === product._id)
                            .length * parseFloat(product.price)
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total:</td>
                    <td></td>
                    <td>${total.toLocaleString()}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <PersonalDetailsForm>
                <Input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Street address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="Postal code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Region / City"
                    value={city}
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                />

                <CheckboxContainer>
                  <input type="checkbox" id="termsCheckbox" />
                  <label htmlFor="termsCheckbox">
                    I agree to the Terms and Conditions
                  </label>
                </CheckboxContainer>

                <Button onClick={goToPayment} block primary>
                  Continue to payment
                </Button>
              </PersonalDetailsForm>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}

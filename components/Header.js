import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import { primary } from "@/lib/colors";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  z-index: 100;
  font-size: 1.2rem;
  color: #887dff;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0 10px 0;
  align-items: center;

  @media screen and (min-width: 768px) {
    padding: 20px 0;
  }
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
    transform: translateX(0);
  `
      : `
    display: block;
    transform: translateX(100%);
  `}

  z-index: 1;
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  padding-top: 50px;
  background-color: #222;
  transition: transform 0.3s ease-in-out;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
    transform: none;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #eee;
  text-decoration: none;
  padding: 20px 0;
  font-size: 1.2rem;

  &:hover {
    background-color: #1a1a1a;
  }

  @media screen and (min-width: 768px) {
    padding: 4px 10px;
    font-size: 1rem;
    border-radius: 4px;
    transition: 0.15s ease-out;

    &:hover {
      background-color: #1a1a1a;
    }
  }
`;

// Mobile Nav

const NavButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 40px;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 100;
  display: block;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>EcoTech</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>

          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

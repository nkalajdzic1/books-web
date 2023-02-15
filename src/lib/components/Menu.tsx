import { FunctionComponent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useOnClickOutside } from "lib/hooks";

export interface ICommonStyledMenuProps {
  disappearingWidth?: number;
  side?: "left" | "right";
  open?: boolean;
}

const MenuWrapper = styled.div<ICommonStyledMenuProps>`
  ${({ disappearingWidth }) =>
    disappearingWidth &&
    `@media (min-width: ${disappearingWidth}px) {
      display: none;
    }`};
`;

const StyledBurger = styled.button<ICommonStyledMenuProps>`
  position: absolute;
  top: 75px;
  ${({ side }) => (side === "left" ? "left" : "right")}: 55px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  &:focus {
    outline: none;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open, theme }) =>
      open ? theme.backgroundColor : theme.color};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }
    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const StyledMenu = styled.nav<ICommonStyledMenuProps>`
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.black};
  ${({ open }) => !open && "display: none;"};
  transform: ${({ open, side }) =>
    open ? "translateX(0%)" : `translateX(${side === "left" ? "-" : "+"}100%)`};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  ${({ side }) => (side === "left" ? "left" : "right")}: 0;
  transition: transform 0.3s ease-in-out;
  @media (max-width: 576px) {
    width: 100%;
  }
  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.white};
    text-decoration: none;
    transition: color 0.3s linear;
    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      color: ${({ theme }) => theme.gray};
    }
  }
`;

export interface IMenu {
  side: "left" | "right";
  links: Array<any>;
  disappearingWidth?: number;
}

export const Menu: FunctionComponent<IMenu> = ({
  side,
  links,
  disappearingWidth,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef();

  useOnClickOutside(menuRef, () => setOpen(false));

  return (
    <MenuWrapper disappearingWidth={disappearingWidth} ref={menuRef as any}>
      <StyledBurger side={side} open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <StyledMenu side={side} open={open}>
        {links.map((x: any, i: number) => (
          <Link key={`nav-menu-${i}`} to={x.href}>
            {x.name}
          </Link>
        ))}
      </StyledMenu>
    </MenuWrapper>
  );
};

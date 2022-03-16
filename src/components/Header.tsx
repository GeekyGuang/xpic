import { NavLink } from "react-router-dom"
import LogoUrl from './logo.svg'
import styled from 'styled-components'

const StyledHeader = styled.header`
  background: #343a40;
  padding: 20px;
  display: flex;
  align-items: center;

  > img {
    height: 30px;
  }

  > nav > a {
    text-decoration: none;
    color: #9a9787;
    margin-left: 16px;

    &:hover {
      color: #cccdb8;
    }

    &.active {
      position: relative;
    }

    &.active::after {
      content: '';
      display: block;
      height: 2px;
      width: 100%;
      position: absolute;
      left: 0;
      top: 28px;
      background: #2280ff;

    }
  }
`

export const Header:React.FC = () => {
  return (
    <StyledHeader>
      <img src={LogoUrl} alt="logo" />
      <nav>
        <NavLink to="/">首页</NavLink>
        <NavLink to="/history">上传历史</NavLink>
        <NavLink to="/about">关于</NavLink>
      </nav>
    </StyledHeader>
  )
}
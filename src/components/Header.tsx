import { NavLink } from 'react-router-dom'
import LogoUrl from './logo.svg'
import styled from 'styled-components'

const StyledHeader = styled.header`
  background: #343a40;
  padding: 14px 100px;
  display: flex;
  align-items: center;
  width: 100%;

  > img {
    height: 30px;
  }

  > nav > a {
    color: #9a9787;
    margin-left: 16px;
    padding: 0 4px;

    &:hover {
      color: #cccdb8;
    }

    &.active {
      position: relative;
      color: #cccdb8;
    }

    &.active::after {
      content: '';
      display: block;
      height: 2px;
      width: 100%;
      position: absolute;
      left: 0;
      top: 26px;
      background: #f082ac;
    }
  }
`

export const Header: React.FC = () => {
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

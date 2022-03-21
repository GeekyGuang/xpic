import { Link, NavLink, useNavigate } from 'react-router-dom'
import LogoUrl from './logo.svg'
import styled from 'styled-components'
import { Button } from 'antd'
import { useStore } from '../store'
import { observer } from 'mobx-react'
import { Auth } from '../models'

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

  @media (max-width: 700px) {
    padding: 14px 10px;

    > nav > a {
      margin-left: 8px;
      padding: 0 4px;
    }
  }
`

export const Header: React.FC = observer(() => {
  const { UserStore } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log('注销')
    Auth.logOut()
    UserStore.resetUser()
    navigate('/login')
  }

  return (
    <StyledHeader>
      <img src={LogoUrl} alt="logo" />
      <nav>
        <NavLink to="/">首页</NavLink>
        <NavLink to="/history">上传历史</NavLink>
        <NavLink to="/about">关于</NavLink>
      </nav>
      {UserStore.currentUser ? (
        <div style={{ marginLeft: 'auto' }}>
          <span style={{ color: 'white', marginRight: '8px' }}>
            {UserStore.currentUser.attributes.username}
          </span>
          <Button type="default" size="small" onClick={handleLogout}>
            注销
          </Button>
        </div>
      ) : (
        <div style={{ marginLeft: 'auto' }}>
          <Link to="/login">
            <Button type="default" size="small" style={{ marginRight: '8px' }}>
              登录
            </Button>
          </Link>
          <Link to="/register">
            <Button type="default" size="small">
              注册
            </Button>
          </Link>
        </div>
      )}
    </StyledHeader>
  )
})

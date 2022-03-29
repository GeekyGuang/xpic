import { Link, NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'
import { useStore } from '../store'
import { observer } from 'mobx-react'
import { Auth } from '../models'
import collapseIcon from '../assets/icons/collapse.svg'
import { useState } from 'react'

const StyledHeader = styled.header`
  background: #343a40;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .collapseIcon {
    display: none;
  }

  .container {
    display: flex;
    align-items: center;
    width: 100%;

    > a {
      font-weight: 500;
      line-height: 22px;
      font-size: 22px;
      color: white;
      margin-bottom: 0;
      margin-right: 8px;
      vertical-align: top;
      display: inline-block;
      padding-bottom: 2px;
    }

    > .nav-main {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      > nav {
        display: flex;
        align-items: center;

        > a {
          color: #9a9da0;
          margin-left: 16px;
          padding: 0 4px;

          &:hover {
            color: #cccecf;
          }

          &.active {
            position: relative;
            color: #cccecf;
          }

          &.active::after {
            content: '';
            display: block;
            height: 2px;
            width: 100%;
            position: absolute;
            left: 0;
            top: 26px;
            background: #1890ff;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 7px 16px;
    .container {
      justify-content: space-between;
      flex-wrap: wrap;

      .nav-main {
        display: none;
      }

      .nav-main.show {
        flex-basis: 100% !important;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;

        > nav {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 12px 0;

          > a {
            margin-left: 0;
            padding: 6px 4px;
            width: 100%;

            &.active::after {
              top: 32px;
            }
          }
        }
      }
    }
    .collapseIcon {
      display: inline-block;
      background: transparent;
      border: 1px solid #494e53;
      padding: 5px 14px;
      border-radius: 3px;
      cursor: pointer;

      &:active {
        border: 1px solid white;
      }

      > img {
        width: 30px;
        height: 30px;
      }
    }
  }

  @media (min-width: 980px) {
    .container {
      max-width: 92%;
    }
  }

  @media (min-width: 1200px) {
    .container {
      max-width: 78%;
    }
  }

  @media (min-width: 1470px) {
    .container {
      max-width: 72%;
    }
  }
`

export const Header: React.FC = observer(() => {
  const { UserStore, ImageStore, HistoryStore } = useStore()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const handleLogout = () => {
    console.log('注销')
    Auth.logOut()
    UserStore.resetUser()
    ImageStore.resetServerFile()
    HistoryStore.resetHistory()
    navigate('/login')
  }

  return (
    <StyledHeader>
      <div className="container">
        <a href="/">XPIC</a>
        <button className="collapseIcon" onClick={() => setShow(!show)}>
          <img src={collapseIcon} alt="" />
        </button>
        <div className={'nav-main ' + (show ? 'show' : '')}>
          <nav>
            <NavLink to="/">首页</NavLink>
            <NavLink to="/history">上传历史</NavLink>
            <NavLink to="/about">关于</NavLink>
          </nav>
          {UserStore.currentUser ? (
            <div className="checkout">
              <span style={{ color: 'white', marginRight: '8px' }}>
                {UserStore.currentUser.username}
              </span>
              <Button type="default" size="small" onClick={handleLogout}>
                注销
              </Button>
            </div>
          ) : (
            <div className="checkout">
              <Link to="/login">
                <Button
                  type="default"
                  size="small"
                  style={{ marginRight: '8px' }}
                >
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
        </div>
      </div>
    </StyledHeader>
  )
})

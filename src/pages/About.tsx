import laugh from '../assets/icons/laugh.svg'
import angry from '../assets/icons/angry.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const H1 = styled.h1`
  font-size: 48px;
  line-height: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #d9d9d9;
  @media (max-width: 768px) {
    font-size: 25px;
    line-height: 25px;
  }
`

const Container = styled.div`
  font-size: 16px;
  img {
    width: 24px;
    height: 24px;
    margin-bottom: 2px;
  }

  > .about {
    background: #c3f5cf;
    border: 1px solid #7ee281;
    color: #155724;
    padding: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
    border-radius: 3px;
    line-height: 30px;

    > a {
      color: #155724;
      background-color: #97e4a9;
      border-radius: 3px;
      margin-right: 5px;
      margin-left: 8px;
      font-size: 14px;
      padding: 3px 5px;
      text-decoration: none;
    }
  }

  > .warning {
    background-color: #fcc;
    color: #841c1c;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #f7aeae;

    h2 {
      display: block;
      color: #841c1c;
      font-size: 18px;
      line-height: 30px;
      font-weight: normal;
      > img {
        margin-right: 8px;
        margin-bottom: 4px;
      }
    }

    ul {
      display: block;
      list-style-type: disc;
      padding-left: 50px;
    }
  }

  > .link {
    background-color: #c4e3ff;
    padding: 10px;
    margin-top: 20px;
    border: 1px solid #a6cef3;
    border-radius: 3px;
    text-align: center;
    color: #2b557c;

    > a {
      color: #155724;
      background-color: #90caff;
      border-radius: 3px;
      margin: 0px 5px;
      font-size: 14px;
      padding: 2px 9px;
      text-decoration: none;
    }
  }
`

const About: React.FC = () => {
  return (
    <>
      <Container>
        <H1>关于 XPIC 图床</H1>
        <p className="about">
          <img src={laugh} alt="" />
          <Link to="/">XPIC</Link>
          免费图床仅供分享图片使用，我们保留随时删除图片并举报上传违规图片者的权利
        </p>
        <div className="warning">
          <h2>
            <img src={angry} alt="" />
            严禁上传及分享如下类型的图片：
          </h2>
          <ul>
            <li>含有色情、暴力、宣扬恐怖主义的图片</li>
            <li>侵犯版权、未经授权的图片</li>
            <li>其他违反中华人民共和国法律的图片</li>
            <li>其他违反香港法律的图片</li>
          </ul>
        </div>
        <div className="link">
          本 Demo 使用 React + React Router 6 + LeanCloud + antd 技术栈
        </div>
      </Container>
    </>
  )
}

export default About

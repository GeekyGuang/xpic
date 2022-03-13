import { Link } from "react-router-dom"

export const Header:React.FC = () => {
  return (
    <>
    <div>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/history">上传历史</Link>
        <Link to="/about">关于</Link>
      </nav>
    </div>
    </>
  )
}
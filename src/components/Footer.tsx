import styled from 'styled-components'

const StyledFooter = styled.footer`
  padding: 20px;
  width: 100%;
  text-align: center;
  color: #586874;
  font-size: 14px;
`

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return <StyledFooter>xpic &copy; {year} Created by Travis</StyledFooter>
}

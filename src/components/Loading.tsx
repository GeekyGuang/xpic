import styled, { keyframes } from 'styled-components'

const wave = keyframes`
  0% {width: 0; height: 0; opacity: 1;}
  100% {width: 100px; height: 100px; opacity: 0;}
`

const StyledLoading = styled.div`
  position: relative;
  margin: 100px auto;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: #b4b8f9;
    border-radius: 50%;
    animation: ${wave} 1.5s infinite linear;
  }

  &::after {
    animation-delay: 0.75s;
  }
`

const Loading: React.FC = () => {
  return <StyledLoading />
}

export default Loading

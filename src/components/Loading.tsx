import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  0% {
    stroke-dasharray: 1 98;
    stroke-dashoffset: -105;
  }
  50% {
    stroke-dasharray: 80 10;
    stroke-dashoffset: -160;
  }
  100% {
    stroke-dasharray: 1 98;
    stroke-dashoffset: -300;
  }
`

const Container = styled.div`
  margin: 60px auto;
  width: 60px;
  height: 60px;

  #spinner {
    transform-origin: center;
    animation-name: ${animation};
    animation-duration: 1.2s;
    animation-timing-function: cubic-bezier;
    animation-iteration-count: infinite;
  }
`

const Loading: React.FC = () => {
  return (
    <Container id="container">
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#40a9ff"
            />
          </filter>
        </defs>
        <circle
          id="spinner"
          style={{
            fill: 'transparent',
            stroke: '#40a9ff',
            strokeWidth: '7px',
            strokeLinecap: 'round',
            filter: 'url(#shadow)',
          }}
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </Container>
  )
}

export default Loading

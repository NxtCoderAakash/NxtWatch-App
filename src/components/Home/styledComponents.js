import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  background-color: ${props => (props.lightMode ? '#f9f9f9' : '#0f0f0f')};
`
export const MainContainer = styled.div`
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: ${props => (props.lightMode ? 'black' : 'white')};
  background-color: ${props => (props.lightMode ? '#f9f9f9' : '#181818')};
`
export const SuperContainer = styled.div`
  background-color: ${props => (props.lightMode ? '#f9f9f9' : '#0f0f0f')};
`
export const InputElement = styled.input`
  outline: none;
  cursor: pointer;
  width: 300px;
  border: 1px solid lightgray;
  height: 30px;
  color: ${props => (props.lightMode ? 'black' : 'white')};
  background-color: ${props => (props.lightMode ? 'lightgrey' : '#0f0f0f')};
`
export const Banner = styled.div`
  height: 200px;
  border: none !important;
  color: black !important;

  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
`

export const HeadToggle = styled.h1`
  color: ${props => (props.lightMode ? 'black' : 'white')};
`

export const ParaNoToggle = styled.p`
  color: grey;
`
// export const FailureImage = styled.img`
//   height: 250px;
//   width: 250px;
// `

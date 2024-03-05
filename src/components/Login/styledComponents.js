import styled from 'styled-components'

export const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.lightMode ? 'white' : 'black')};
`

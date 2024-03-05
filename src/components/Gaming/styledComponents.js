import styled from 'styled-components'

export const GamingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: ${props => (props.lightMode ? 'black' : 'white')};
  background-color: ${props => (props.lightMode ? '#f9f9f9' : '#0f0f0f')};
`

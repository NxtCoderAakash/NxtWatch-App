import styled from 'styled-components'

export const LeftContainer = styled.div`
  display: flex;
  height: 94vh;
  flex-direction: column;
  justify-content: space-between;

  width: 170px;
  background-color: ${props => (props.lightMode ? 'white' : 'black')};
`
export const ContactContainer = styled.div`
  font-weight: 500;
  padding: 10px;
  color: ${props => (props.lightMode ? 'black' : 'white')};
`

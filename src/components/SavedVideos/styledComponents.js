import styled from 'styled-components'

export const SavedContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #f1f1f1;
  color: ${props => (props.lightMode ? 'black' : 'white')};
  background-color: ${props => (props.lightMode ? '#f9f9f9' : '#0f0f0f')};
`
export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 50px;
  justify-content: flex-start;
  background-color: ${props => (props.lightMode ? '#f1f1f1' : '#1e293b')};
`

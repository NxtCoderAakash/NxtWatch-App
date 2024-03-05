import styled from 'styled-components'

export const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: ${props => (props.lightMode ? 'black' : 'white')};
  background-color: ${props => (props.lightMode ? '#f9f9f9' : '#0f0f0f')};
`
export const SavedVideoTitle = styled.p`
  font-weight: 500;
  margin: 0px;
  color: ${props => (props.lightMode ? 'black' : 'white')};
`
export const RetryButton = styled.button`
  cursor: pointer;
  padding: 5px;
  width: 70px;
  background-color: #4f46e5;
  color: #ffffff;
  border-radius: 5px;
  border: none;
`

import styled from 'styled-components'

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  color: ${props => (props.lightMode ? 'black' : 'white')};
  background-color: ${props => (props.lightMode ? 'white' : '#0f0f0f')};
`
export const LikeButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: ${props => (props.like ? '#2563eb' : '#64748b')};
`

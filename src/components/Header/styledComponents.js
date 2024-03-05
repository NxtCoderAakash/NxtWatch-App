import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 10px;
  color: ${props => (props.lightMode ? 'black' : 'white')};
  background-color: ${props => (props.lightMode ? 'white' : 'black')};
`
export const PopupContainer = styled.div`
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  font-weight: 500;
  color: ${props => (props.lightMode ? 'black' : 'white')};
  background-color: ${props => (props.lightMode ? 'white' : '#1e293b')};
`
export const LogoutButton = styled.button`
  padding: 5px;
  cursor: pointer;
  background-color: transparent;
  color: ${props => (props.lightMode ? '#3b82f6' : 'white')};
  border: 3px solid ${props => (props.lightMode ? '#3b82f6' : 'white')};
  width: 70px;
  border-radius: 5px;
  font-weight: bold;
`

export const ModeButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: ${props => (props.lightMode ? 'black' : 'white')};
`
// export const CancelButton=styled.button`

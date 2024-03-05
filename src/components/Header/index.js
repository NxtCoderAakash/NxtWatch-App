import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import './index.css'
import {FaMoon} from 'react-icons/fa'
import {BiSun} from 'react-icons/bi'
import VideoContext from '../../VideoContext'
import {
  ModeButton,
  HeaderContainer,
  PopupContainer,
  LogoutButton,
} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onClickLogo = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <VideoContext.Consumer>
      {value => {
        const {changeMode, lightMode} = value
        return (
          <HeaderContainer lightMode={lightMode}>
            <button className="home-button" type="button" onClick={onClickLogo}>
              <Link to="/">
                <img
                  className="header-logo-image"
                  src={
                    lightMode
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="website logo"
                />
              </Link>
            </button>

            <div className="logout-container">
              <ModeButton
                type="button"
                onClick={changeMode}
                lightMode={lightMode}
                data-testid="theme"
              >
                {lightMode ? <FaMoon size={20} /> : <BiSun size={25} />}
              </ModeButton>
              <img
                className="profile-image"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                alt="profile"
              />
              <Popup
                modal
                trigger={
                  <LogoutButton type="button" lightMode={lightMode}>
                    Logout
                  </LogoutButton>
                }
              >
                {close => (
                  <PopupContainer lightMode={lightMode}>
                    <div>
                      <p>Are you sure, you want to logout</p>
                    </div>
                    <button
                      type="button"
                      className="trigger-button-cancel"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="trigger-button-confirm"
                      onClick={() => {
                        close()
                        onClickLogout()
                      }}
                    >
                      Confirm
                    </button>
                  </PopupContainer>
                )}
              </Popup>
            </div>
          </HeaderContainer>
        )
      }}
    </VideoContext.Consumer>
  )
}

export default withRouter(Header)

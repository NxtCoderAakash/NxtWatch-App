import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
import {LoginContainer} from './styledComponents'
import VideoContext from '../../VideoContext'

class Login extends Component {
  state = {showPass: false, username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    // this.getLogin()
    const {history} = this.props
    const {username, password} = this.state

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    if (response.ok) {
      const data = await response.json()
      Cookies.set('jwt_token', data.jwt_token, {expires: 50})
      history.replace('/')
    } else {
      const data = await response.json()
      this.setState({errorMsg: data.error_msg})
    }
  }

  onTogglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPass: !prevState.showPass,
    }))
  }

  render() {
    const {username, password, errorMsg, showPass} = this.state
    const savedCookies = Cookies.get('jwt_token')
    if (savedCookies !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <VideoContext.Consumer>
        {value => {
          const {lightMode} = value
          return (
            <LoginContainer lightMode={lightMode}>
              <form onSubmit={this.onSubmitLogin} className="form">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  className="login-logo-image"
                />
                <label className="label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  placeholder="Username"
                  onChange={this.onChangeUsername}
                  id="username"
                  type="text"
                  value={username}
                  className="input-element"
                />
                <label className="label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  placeholder="Password"
                  onChange={this.onChangePassword}
                  id="password"
                  value={password}
                  type={showPass ? 'text' : 'password'}
                  className="input-element"
                />
                <div className="show-password-container">
                  <input
                    id="show-Password"
                    type="checkbox"
                    onClick={this.onTogglePasswordVisibility}
                  />
                  <label className="show-pass-label" htmlFor="show-Password">
                    Show Password
                  </label>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {errorMsg && <p>*{errorMsg}</p>}
              </form>
            </LoginContainer>
          )
        }}
      </VideoContext.Consumer>
    )
  }
}

export default Login

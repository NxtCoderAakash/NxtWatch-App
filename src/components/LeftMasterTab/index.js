import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaGamepad, FaSave} from 'react-icons/fa'
import {ImFire} from 'react-icons/im'
import './index.css'
import VideoContext from '../../VideoContext'
import {LeftContainer, ContactContainer} from './styledComponents'

// const masterList=[{
//     displayText:"Home",
//     id:"home",link:"/"
// },{
//     displayText:"Trending",
//     id:"trending",link:"/trending"
// },{
//     displayText:"Gaming",
//     id:"gaming",link:"/gaming"
// },{
//     displayText:"Saved Videos",
//     id:"saved Videos",link:"/saved-videos"
// }
// ]

const LeftMasterTab = props => (
  <VideoContext.Consumer>
    {value => {
      const {tabSelected, onClickTab, lightMode} = value
      console.log(tabSelected)
      const onClickHome = () => {
        onClickTab('Home')
        const {history} = props
        history.push('/')
      }

      const onClickTrending = () => {
        onClickTab('Trending')
        const {history} = props
        history.push('/trending')
      }

      const onClickGaming = () => {
        onClickTab('Gaming')
        const {history} = props
        history.push('/gaming')
      }

      const onClickSaved = () => {
        onClickTab('Saved')
        const {history} = props
        history.push('/saved')
      }
      return (
        <LeftContainer lightMode={lightMode}>
          <ul className="home-left-section-upper-container">
            <li>
              <Link style={{textDecoration: 'none'}} to="/">
                <button
                  type="button"
                  className={`tab-button ${
                    tabSelected === 'Home' ? 'highlighted' : ''
                  }`}
                  onClick={onClickHome}
                >
                  <span
                    className={`icon ${
                      tabSelected === 'Home' ? 'icon-highlighted' : ''
                    }`}
                  >
                    <AiFillHome />
                  </span>
                  Home
                </button>
              </Link>
            </li>

            <li>
              <Link style={{textDecoration: 'none'}} to="/trending">
                <button
                  type="button"
                  className={`tab-button ${
                    tabSelected === 'Trending' ? 'highlighted' : ''
                  }`}
                  onClick={onClickTrending}
                >
                  <span
                    className={`icon ${
                      tabSelected === 'Trending' ? 'icon-highlighted' : ''
                    }`}
                  >
                    <ImFire />
                  </span>
                  Trending
                </button>
              </Link>
            </li>
            <li>
              <Link style={{textDecoration: 'none'}} to="/gaming">
                <button
                  type="button"
                  className={`tab-button ${
                    tabSelected === 'Gaming' ? 'highlighted' : ''
                  }`}
                  onClick={onClickGaming}
                >
                  <span
                    className={`icon ${
                      tabSelected === 'Gaming' ? 'icon-highlighted' : ''
                    }`}
                  >
                    <FaGamepad />
                  </span>
                  Gaming
                </button>
              </Link>
            </li>
            <li>
              <Link style={{textDecoration: 'none'}} to="/saved-videos">
                <button
                  type="button"
                  className={`tab-button ${
                    tabSelected === 'Saved' ? 'highlighted' : ''
                  }`}
                  onClick={onClickSaved}
                >
                  <span
                    className={`icon ${
                      tabSelected === 'Saved' ? 'icon-highlighted' : ''
                    }`}
                  >
                    <FaSave />
                  </span>
                  Saved videos
                </button>
              </Link>
            </li>
          </ul>
          <ContactContainer lightMode={lightMode}>
            <p>CONTACT US</p>
            <div className="share-container">
              <button type="button" className="social-buttons">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="share-icon-images"
                />
              </button>

              <button type="button" className="social-buttons">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="share-icon-images"
                />
              </button>

              <button type="button" className="social-buttons">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="share-icon-images"
                />
              </button>
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </ContactContainer>
        </LeftContainer>
      )
    }}
  </VideoContext.Consumer>
)

export default withRouter(LeftMasterTab)

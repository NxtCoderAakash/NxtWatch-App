import Header from '../Header'
import LeftMasterTab from '../LeftMasterTab'
import VideoContext from '../../VideoContext'
import {HeadToggle, HomeContainer, ParaNoToggle} from '../Home/styledComponents'

const NotFound = () => (
  <VideoContext.Consumer>
    {value => {
      const {lightMode} = value
      return (
        <div>
          <Header />
          <HomeContainer lightMode={lightMode}>
            <LeftMasterTab />
            <div className="home-right-section-container">
              <div className="no-saved-container">
                <img
                  className="no-saved-image"
                  src={
                    lightMode
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                  }
                  alt="not found"
                />
                <HeadToggle lightMode={lightMode}> Page Not Found</HeadToggle>
                <ParaNoToggle>
                  we are sorry, the page you requested could not be found.
                </ParaNoToggle>
              </div>
            </div>
          </HomeContainer>
        </div>
      )
    }}
  </VideoContext.Consumer>
)

export default NotFound

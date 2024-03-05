import {Link} from 'react-router-dom'
import {ImFire} from 'react-icons/im'

import {AiOutlineClose} from 'react-icons/ai'
import SavedVideoItem from '../SavedVideoItem'
import LeftMasterTab from '../LeftMasterTab'
import './index.css'
import Header from '../Header'
import VideoContext from '../../VideoContext'
import {SavedContainer, ContentHeader} from './styledComponents'
import {
  HomeContainer,
  Banner,
  HeadToggle,
  ParaNoToggle,
} from '../Home/styledComponents'

const SavedVideos = () => {
  const showSubscription = onClickCloseSubscription => (
    <Banner data-testid="banner" className="subscription-section">
      <div className="subscription-section-sub-container">
        <img
          className="home-subscription-logo-image"
          alt=""
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        />
        <button
          onClick={onClickCloseSubscription}
          type="button"
          className="close-button"
        >
          <AiOutlineClose />
        </button>
      </div>
      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
      <button type="button" className="button-get-it-now">
        GET IT NOW
      </button>
    </Banner>
  )

  return (
    <VideoContext.Consumer>
      {value => {
        const {savedList, lightMode, onClickCloseSubscription, showSubs} = value

        return (
          <div>
            <Header />
            <HomeContainer data-testid="savedVideos" lightMode={lightMode}>
              <LeftMasterTab />
              <SavedContainer lightMode={lightMode}>
                {/* <div className="subscription-section">
         
        </div> */}
                {showSubs && showSubscription(onClickCloseSubscription)}
                {savedList.length !== 0 && (
                  <>
                    <ContentHeader lightMode={lightMode}>
                      <button type="button" className="icon-button">
                        <ImFire size={30} />
                      </button>

                      <h1>Saved Videos</h1>
                    </ContentHeader>

                    <ul className="video-item-ul">
                      {savedList.map(eachSaved => (
                        <Link
                          style={{textDecoration: 'none'}}
                          to={`/videos/${eachSaved.id}`}
                        >
                          <SavedVideoItem key={eachSaved.id} data={eachSaved} />
                        </Link>
                      ))}
                    </ul>
                  </>
                )}

                {savedList.length === 0 && (
                  <div className="no-saved-container">
                    <img
                      className="no-saved-image"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                    />
                    <HeadToggle lightMode={lightMode}>
                      {' '}
                      No saved videos found
                    </HeadToggle>
                    <ParaNoToggle lightMode={lightMode}>
                      You can save your videos while watching them
                    </ParaNoToggle>
                  </div>
                )}
              </SavedContainer>
            </HomeContainer>
          </div>
        )
      }}
    </VideoContext.Consumer>
  )
}

export default SavedVideos

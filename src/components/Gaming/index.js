import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGamepad} from 'react-icons/fa'

import {AiOutlineClose} from 'react-icons/ai'
import GameItem from '../GameItem'
import LeftMasterTab from '../LeftMasterTab'
import './index.css'
import Header from '../Header'
import {GamingContainer} from './styledComponents'
import VideoContext from '../../VideoContext'
import {HomeContainer, Banner} from '../Home/styledComponents'
import {ContentHeader} from '../SavedVideos/styledComponents'

const stateConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    gamingList: [],
    isLoading: stateConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getCamelData = data => {
    const camelData = data.videos.map(item => ({
      id: item.id,
      thumbnailUrl: item.thumbnail_url,
      title: item.title,
      viewCount: item.view_count,
    }))
    return camelData
  }

  getData = async () => {
    this.setState({isLoading: stateConstants.loading})
    const token = Cookies.get('jwt_token')
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    const response = await fetch('https://apis.ccbp.in/videos/gaming', options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = this.getCamelData(data)
      console.log(formattedData)
      this.setState({
        gamingList: formattedData,
        isLoading: stateConstants.success,
      })
    } else {
      this.setState({isLoading: stateConstants.failure})
      console.log('data not fetched')
    }
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <VideoContext.Consumer>
      {value => {
        const {lightMode} = value
        return (
          <div className="no-saved-container">
            <img
              className="no-saved-image"
              src={
                lightMode
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              }
              alt="failure view"
            />
            <h1> Oops! Something Went Wrong</h1>
            <p>We are having some trouble to complete your request.</p>
            <p>Please try again</p>
            <button type="button" onClick={this.onClickTryAgainFailure}>
              Retry
            </button>
          </div>
        )
      }}
    </VideoContext.Consumer>
  )

  renderResult = () => {
    const {gamingList} = this.state

    return (
      <ul className="game-item-ul">
        {gamingList.map(eachVideo => (
          <GameItem key={eachVideo.id} data={eachVideo} />
        ))}
      </ul>
    )
  }

  checkStateForRender = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case 'LOADING':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderResult()
      case 'FAILURE':
        return this.renderFailure()

      default:
        return this.renderFailure()
    }
  }

  showSubscription = onClickCloseSubscription => (
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

  render() {
    const {isLoading} = this.state
    return (
      <VideoContext.Consumer>
        {value => {
          const {lightMode, showSubs, onClickCloseSubscription} = value
          return (
            <div>
              <Header />
              <HomeContainer data-testid="gaming" lightMode={lightMode}>
                <LeftMasterTab />
                <GamingContainer lightMode={lightMode}>
                  {showSubs && this.showSubscription(onClickCloseSubscription)}
                  {isLoading === 'SUCCESS' && (
                    <ContentHeader lightMode={lightMode}>
                      <button type="button" className="icon-button">
                        <FaGamepad size={30} />
                      </button>
                      <h1 className="gaming-head">Gaming</h1>
                    </ContentHeader>
                  )}
                  {this.checkStateForRender()}
                </GamingContainer>
              </HomeContainer>
            </div>
          )
        }}
      </VideoContext.Consumer>
    )
  }
}

export default Gaming

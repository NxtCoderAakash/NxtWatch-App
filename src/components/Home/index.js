import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import {AiOutlineClose} from 'react-icons/ai'
import VideoItemHome from '../VideoItemHome'
import LeftMasterTab from '../LeftMasterTab'
import './index.css'
import Header from '../Header'
import {
  HomeContainer,
  MainContainer,
  InputElement,
  Banner,
} from './styledComponents'
import VideoContext from '../../VideoContext'
import {RetryButton} from '../Trending/styledComponents'

const stateConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    allVideosList: [],
    isLoading: stateConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getData()
  }

  getCamelData = data => {
    //   this.setState({isLoading:stateConstants.loading})
    const camelData = data.videos.map(item => ({
      channel: {
        name: item.channel.name,
        profileImageUrl: item.channel.profile_image_url,
      },
      id: item.id,
      publishedAt: item.published_at,
      thumbnailUrl: item.thumbnail_url,
      title: item.title,
      viewCount: item.view_count,
    }))
    return camelData
  }

  getData = async () => {
    this.setState({isLoading: stateConstants.loading})
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searchInput}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const formattedData = this.getCamelData(data)
      console.log(formattedData)
      this.setState({
        allVideosList: formattedData,
        isLoading: stateConstants.success,
      })
    } else {
      this.setState({isLoading: stateConstants.failure})
      console.log('data not fetched')
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchResult = () => {
    this.setState({isLoading: stateConstants.loading}, this.getData)
  }

  onClickTryAgain = () => {
    // this.setState({searchInput: ''})
    const {history} = this.props
    history.push('/')
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
    const {allVideosList} = this.state
    return (
      <>
        {allVideosList.length !== 0 && (
          <ul className="home-video-item-ul">
            {allVideosList.map(eachVideo => (
              <VideoItemHome key={eachVideo.id} data={eachVideo} />
            ))}
          </ul>
        )}

        {allVideosList.length === 0 && (
          <div className="no-saved-container">
            <img
              className="no-saved-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <h1> No Search results found</h1>
            <p>Try different key words or remove search filter</p>
            <RetryButton type="button" onClick={this.getData}>
              Retry
            </RetryButton>
          </div>
        )}
      </>
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
          alt="nxt watch logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        />
        <button
          onClick={onClickCloseSubscription}
          type="button"
          className="close-button"
          data-testid="close"
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
    const {searchInput} = this.state

    return (
      <VideoContext.Consumer>
        {value => {
          const {lightMode, showSubs, onClickCloseSubscription} = value
          return (
            <div data-testid="home">
              <Header />
              <HomeContainer lightMode={lightMode}>
                <LeftMasterTab />
                <MainContainer data-testid="home" lightMode={lightMode}>
                  {showSubs && this.showSubscription(onClickCloseSubscription)}

                  <div className="right-container-below">
                    <div className="input-container">
                      <InputElement
                        lightMode={lightMode}
                        onChange={this.onChangeSearchInput}
                        type="search"
                        placeholder="Search"
                        value={searchInput}
                      />
                      <button
                        data-testid="searchButton"
                        className="search-button"
                        type="button"
                        onClick={this.getSearchResult}
                      >
                        <FaSearch />
                      </button>
                    </div>
                    {this.checkStateForRender()}
                  </div>
                </MainContainer>
              </HomeContainer>
            </div>
          )
        }}
      </VideoContext.Consumer>
    )
  }
}

export default Home

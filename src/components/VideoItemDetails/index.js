import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNowStrict} from 'date-fns'
import Loader from 'react-loader-spinner'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {FcAddDatabase} from 'react-icons/fc'
import ReactPlayer from 'react-player'

import LeftMasterTab from '../LeftMasterTab'

import './index.css'
import Header from '../Header'
import VideoContext from '../../VideoContext'
import {HomeContainer} from '../Home/styledComponents'
import {VideoContainer, LikeButton} from './styledComponents'
import {SavedVideoTitle} from '../Trending/styledComponents'

const stateConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: [],
    isLoading: stateConstants.initial,
    like: false,
    dislike: false,
  }

  componentDidMount() {
    this.getData()
  }

  onClickLike = () => {
    this.setState({like: true, dislike: false})
  }

  onClickDislike = () => {
    this.setState({dislike: true, like: false})
  }

  getCamelData = data => {
    const camelData = {
      channel: {
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.subscriber_count,
      },
      id: data.video_details.id,
      videoUrl: data.video_details.video_url,
      publishedAt: data.video_details.published_at,
      thumbnailUrl: data.video_details.thumbnail_url,
      title: data.video_details.title,
      viewCount: data.video_details.view_count,
      description: data.video_details.description,
    }
    return camelData
  }

  getData = async () => {
    this.setState({isLoading: stateConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const token = Cookies.get('jwt_token')
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    console.log(options)
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = this.getCamelData(data)
      console.log(formattedData)
      this.setState({
        videoDetails: formattedData,
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
    const {videoDetails, like, dislike} = this.state
    const {
      channel,
      id,
      publishedAt,

      videoUrl,
      title,
      viewCount,
      description,
    } = videoDetails
    const {profileImageUrl, name, subscriberCount} = channel

    return (
      <VideoContext.Consumer>
        {value => {
          const {saveVideoInList, savedList, lightMode} = value
          const onClickSave = () => {
            saveVideoInList(videoDetails)
          }
          return (
            <VideoContainer
              data-testid="videoItemDetails"
              lightMode={lightMode}
            >
              <div className="video-section">
                <ReactPlayer height={600} width={1400} url={videoUrl} />
              </div>
              <SavedVideoTitle lightMode={lightMode}>{title}</SavedVideoTitle>
              <div className="action-section">
                <p className="para">
                  {viewCount} views .{' '}
                  {formatDistanceToNowStrict(new Date(publishedAt), {
                    unit: 'year',
                    roundingMethod: 'ceil',
                  })}{' '}
                  ago
                </p>
                <div className="action-container">
                  <LikeButton
                    type="button"
                    like={like}
                    onClick={this.onClickLike}
                  >
                    <AiOutlineLike size={25} />

                    <span className="action-para">Like</span>
                  </LikeButton>

                  <LikeButton
                    like={dislike}
                    type="button"
                    onClick={this.onClickDislike}
                  >
                    <AiOutlineDislike size={25} />
                    <span className="action-para">Dislike</span>
                  </LikeButton>

                  <button
                    onClick={onClickSave}
                    type="button"
                    className={`action-button ${
                      savedList.some(video => video.id === id) ? 'red' : ''
                    }`}
                  >
                    <FcAddDatabase size={25} />

                    <span className="action-para">
                      {savedList.some(video => video.id === id)
                        ? 'Saved'
                        : 'Save'}
                    </span>
                  </button>
                </div>
              </div>

              <hr className="line" />

              <div className="comment-section">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="icon-image-comment"
                />
                <div>
                  <SavedVideoTitle lightMode={lightMode}>
                    {name}
                  </SavedVideoTitle>
                  <p className="para">
                    {subscriberCount} <span>Subscribers</span>
                  </p>
                  <br />
                  <SavedVideoTitle lightMode={lightMode}>
                    {description}
                  </SavedVideoTitle>
                </div>
              </div>
            </VideoContainer>
          )
        }}
      </VideoContext.Consumer>
    )
  }

  checkStateForRender = () => {
    // func('Trending')
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

  render() {
    return (
      <VideoContext.Consumer>
        {value => {
          const {lightMode} = value
          return (
            <div>
              <Header />
              <HomeContainer lightMode={lightMode}>
                <LeftMasterTab />
                {this.checkStateForRender()}
              </HomeContainer>
            </div>
          )
        }}
      </VideoContext.Consumer>
    )
  }
}

export default VideoItemDetails

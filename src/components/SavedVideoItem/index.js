import {formatDistanceToNowStrict} from 'date-fns'
import './index.css'
import {SavedVideoTitle} from '../Trending/styledComponents'
import VideoContext from '../../VideoContext'

const SavedVideoItem = props => {
  const {data} = props
  const {channel, publishedAt, thumbnailUrl, title, viewCount} = data
  const {name} = channel

  return (
    <VideoContext.Consumer>
      {value => {
        const {lightMode} = value
        return (
          <li className="saved-video-item-card">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="saved-video-image"
            />

            <div className="saved-card-description-container">
              <div>
                <SavedVideoTitle lightMode={lightMode}>{title}</SavedVideoTitle>
                <p className="saved-card-para">{name}</p>
                <p className="saved-card-para">{viewCount} views .</p>
                <p>
                  {formatDistanceToNowStrict(new Date(publishedAt), {
                    unit: 'year',
                    roundingMethod: 'ceil',
                  })}{' '}
                  ago
                </p>
              </div>
            </div>
          </li>
        )
      }}
    </VideoContext.Consumer>
  )
}

export default SavedVideoItem

import {Link} from 'react-router-dom'
import {formatDistanceToNowStrict} from 'date-fns'
import './index.css'
import {SavedVideoTitle} from '../Trending/styledComponents'
import VideoContext from '../../VideoContext'

const VideoItemHome = props => {
  const {data} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = data
  const {profileImageUrl, name} = channel
  return (
    <VideoContext.Consumer>
      {value => {
        const {lightMode} = value
        return (
          <Link style={{textDecoration: 'none'}} to={`/videos/${id}`}>
            <li className="home-video-item-card">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="home-video-image"
              />
              <div className="card-description-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="icon-image"
                />
                <div>
                  <SavedVideoTitle lightMode={lightMode}>
                    {title}
                  </SavedVideoTitle>
                  <p className="card-para">{name}</p>
                  <p className="card-para">
                    {viewCount} .{' '}
                    {formatDistanceToNowStrict(new Date(publishedAt), {
                      unit: 'year',
                      roundingMethod: 'ceil',
                    })}{' '}
                    ago
                  </p>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </VideoContext.Consumer>
  )
}

export default VideoItemHome

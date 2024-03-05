import {Link} from 'react-router-dom'
import './index.css'
import {SavedVideoTitle} from '../Trending/styledComponents'
import VideoContext from '../../VideoContext'

const GameItem = props => {
  const {data} = props
  const {id, thumbnailUrl, title, viewCount} = data

  return (
    <VideoContext.Consumer>
      {value => {
        const {lightMode} = value
        return (
          <Link style={{textDecoration: 'none'}} to={`/videos/${id}`}>
            <li className="game-card">
              <img
                alt="video thumbnail"
                className="game-item-image"
                src={thumbnailUrl}
              />
              <SavedVideoTitle lightMode={lightMode}>{title}</SavedVideoTitle>
              <p>{viewCount} Watching WorldWide</p>
            </li>
          </Link>
        )
      }}
    </VideoContext.Consumer>
  )
}

export default GameItem

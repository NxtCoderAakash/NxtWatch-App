import './index.css'

const VideoItem = props => {
  const {data} = props
  const {channel, thumbnailUrl, title} = data
  const {profileImageUrl, name} = channel
  return (
    <li className="video-item-card">
      <img src={thumbnailUrl} alt="1" className="video-image" />
      <div className="card-description-container">
        <img src={profileImageUrl} alt="2" className="icon-image" />
        <div>
          <p className="card-para">{title}</p>
          <p className="card-para">{name}</p>
          <p className="card-para">1.4K Views . 2 years Ago</p>
        </div>
      </div>
    </li>
  )
}

export default VideoItem

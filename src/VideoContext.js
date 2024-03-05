import React from 'react'

const VideoContext = React.createContext({
  saveVideoInList: () => {},
  savedList: [],
  tabSelected: 'Home',
  onClickTab: () => {},
  lightMode: true,
  changeMode: () => {},
  showSubs: true,
  onClickCloseSubscription: () => {},
})

export default VideoContext

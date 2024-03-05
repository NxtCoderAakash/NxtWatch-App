import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'

import './App.css'

import Login from './components/Login'
import VideoContext from './VideoContext'

// Replace your code here
class App extends Component {
  state = {savedList: [], tabSelected: 'Home', lightMode: true, showSubs: true}

  saveVideoInList = item => {
    this.setState(prevState => {
      if (prevState.savedList.some(element => element.id === item.id)) {
        const newList = prevState.savedList.filter(
          video => video.id !== item.id,
        )
        return {savedList: newList}
      }
      return {savedList: [...prevState.savedList, item]}
    })
  }

  onClickTab = value => {
    this.setState({tabSelected: value})
  }

  changeMode = () => {
    this.setState(prevState => ({lightMode: !prevState.lightMode}))
  }

  onClickCloseSubscription = () => {
    this.setState(prevState => ({showSubs: !prevState.showSubs}))
  }

  render() {
    const {savedList, tabSelected, lightMode, showSubs} = this.state

    return (
      <VideoContext.Provider
        value={{
          savedList,
          saveVideoInList: this.saveVideoInList,
          tabSelected,
          onClickTab: this.onClickTab,
          lightMode,
          changeMode: this.changeMode,
          showSubs,
          onClickCloseSubscription: this.onClickCloseSubscription,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </VideoContext.Provider>
    )
  }
}

export default App

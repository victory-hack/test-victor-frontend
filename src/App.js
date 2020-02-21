import React, { Component } from 'react';
import './scss/App.scss';
import ContentEmail from './components/ContentEmail';
import ContentEmailList from './components/ContentEmailList';
import { addToList, toggleSidebar, updateBadge } from './lib/actionCreators';
import { connect } from 'react-redux';


class App extends Component {

  componentWillMount() {
    this.props.updateBadge()

    this.interval = setInterval(() => {
      this.props.addToList()
      this.props.updateBadge()
    }, 3000);

    this.menu = setTimeout(() => {
      this.props.toggleSidebar()
    }, 1500);
  }

  componentDidUpdate() {
    if (this.props.inboxMails.length >= 5) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div className="App-container">
        <div className={this.props.sidebarOpen == true ? 'App-left-side open' : 'App-left-side'}>
          <ContentEmailList />
        </div>
        <div className="App-right-side">
          <ContentEmail />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inboxMails: state.inboxMails,
    sidebarOpen: state.sidebarOpen    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToList(mail) {
      dispatch(addToList(mail))
    },

    toggleSidebar() {
      dispatch(toggleSidebar())
    },

    updateBadge() {
      dispatch(updateBadge())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

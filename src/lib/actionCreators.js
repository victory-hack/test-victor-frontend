import config from '../config/variables.json'
import axios from 'axios';

const addToList = () => {
  return dispatch => {
    axios.get(config.url_server + config.service_get_email)
    .then( response => {
      dispatch({
          type: "ADD_TO_LIST",
          mail: response.data
      })
    })
  }
}

const updateBadge = () => {
  return {
    type: "UPDATE_BADGE"
  }
}

const addToViewer = (idMail, typeMail, viewList) => {
  return {
    type: "ADD_TO_VIEWER",
    idMail,
    typeMail,
    viewList
  }
}

const searchList = (text) => {
  return {
    type: "SEARCH",
    text
  }
}


const showImbox = mail => {
  return {
    type: "SHOW_IMBOX",
    mail
  }
}

const showTrash = mail => {
  return {
    type: "SHOW_TRASH",
    mail
  }
}

const showSpam = mail => {
  return {
    type: "SHOW_SPAM",
    mail
  }
}

const chageView = (currentView, viewList) => {
  return {
    type: "CHANGE_VIEW",
    currentView,
    viewList
  }
}

const actionButons = (current, typeMail, mailViewer, viewList) => {
  return {
    type: typeMail,
    current,
    mailViewer,
    viewList
  }
}

const toggleSidebar = () => {
  return {
    type: "TOGGLE_SIDEBAR"
  }
}

export { addToList, updateBadge, addToViewer, showImbox, showTrash, showSpam, actionButons, 
  chageView, searchList, toggleSidebar }

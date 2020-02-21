import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

const reducer = (state, action) => {

  const updateList = currentView => {
    return currentView == 2
      ? state.trashMails
      : currentView == 3
        ? state.spanMails
        : state.inboxMails;
  };

  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        inboxMails: state.inboxMails.map( email => {
            if(Object.keys(email).some( key => {
              if(typeof email[key] === 'string' || email[key] instanceof String){
                if(email[key].includes(action.text)){
                  console.log(email[key])
                  return true;
                }
              }
            }
            )){
              email.isFiltered = true;
              return email;
            }else{
              email.isFiltered = false;
              return email;
            }
          }),
          spanMails: state.spanMails.map( email => {
            if(Object.keys(email).some( key => {
              if(typeof email[key] === 'string' || email[key] instanceof String){
                if(email[key].includes(action.text)){
                  console.log(email[key])
                  return true;
                }
              }
            }
            )){
              email.isFiltered = true;
              return email;
            }else{
              email.isFiltered = false;
              return email;
            }
          }),
          trashMails: state.trashMails.map( email => {
            if(Object.keys(email).some( key => {
              if(typeof email[key] === 'string' || email[key] instanceof String){
                if(email[key].includes(action.text)){
                  console.log(email[key])
                  return true;
                }
              }
            }
            )){
              email.isFiltered = true;
              return email;
            }else{
              email.isFiltered = false;
              return email;
            }
          })
      };
    case "MOVE_TO_INBOX":
      if (action.viewList === "Spam") {
        const moveTo = {
          ...state,
          inboxMails: state.inboxMails.concat(action.mailViewer),
          spanMails: state.spanMails.filter(
            (mail, index) => index !== action.current
          ),
          mailViewer: []
        };
        return moveTo;
      }

      if (action.viewList === "Trash") {
        const moveTo = {
          ...state,
          inboxMails: state.inboxMails.concat(action.mailViewer),
          trashMails: state.trashMails.filter(
            (mail, index) => index !== action.current
          ),
          mailViewer: []
        };
        return moveTo;
      };
    case "ADD_TO_LIST":
      return {
        ...state,
        inboxMails: state.inboxMails.concat(action.mail)
      };
    case "UPDATE_BADGE":
      return {
        ...state,
        badge: state.inboxMails.reduce(
          (a, b) => (a + (b.isReaded == false ? 1 : 0)), 2)
      };
    case "ADD_TO_VIEWER":
      return {
        ...state,
        mailViewer: state.inboxMails.filter((mail, index) => {
          return index === action.idMail;
        }),
        inboxMails: state.inboxMails.map(
          (mail, i) =>
            i === action.idMail ? { ...mail, isReaded: true } : mail
        ),
        current: { idMail: action.idMail, typeMail: action.typeMail },
        badge: state.inboxMails.reduce((a, b) => (a + (b.isReaded == false ? 1 : 0)), 0)
      };
    case "MOVE_TO_TRASH":
      if (action.viewList !== "Spam") {
        const moveTo = {
          ...state,
          trashMails: state.trashMails.concat(action.mailViewer),
          inboxMails: state.inboxMails.filter(
            (mail, index) => index !== action.current
          ),
          mailViewer: []
        };
        return moveTo;
      }

      if (action.viewList === "Spam") {
        const moveTo = {
          ...state,
          trashMails: state.trashMails.concat(action.mailViewer),
          spanMails: state.spanMails.filter(
            (mail, index) => index !== action.current
          ),
          mailViewer: []
        };
        return moveTo;
      }
    case "MOVE_TO_SPAM":
      if (action.viewList !== "Trash") {
        const moveTo = {
          ...state,
          spanMails: state.spanMails.concat(action.mailViewer),
          inboxMails: state.inboxMails.filter(
            (mail, index) => index !== action.current
          ),
          mailViewer: []
        };
        return moveTo;
      }

      if (action.viewList === "Trash") {
        const moveTo = {
          ...state,
          spanMails: state.spanMails.concat(action.mailViewer),
          trashMails: state.trashMails.filter(
            (mail, index) => index !== action.current
          ),
          mailViewer: []
        };
        return moveTo;
      }
    case "CHANGE_VIEW":
      return {
        ...state,
        viewList: action.viewList,
        mailViewer: []
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: state.sidebarOpen === false ? true : false
      };
    default:
      return state;
  }
};

const logger = store => next => action => {
  console.log('dispatching', action);
  console.log('current state', store.getState());
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

export default createStore(reducer, {
  viewList: "Inbox",
  listMails: [],

  inboxMails: [],
  spanMails: [],
  trashMails: [],

  tempInboxSearch: [],
  tempSpanSearch: [],
  tempTrashSearch: [],

  mailViewer: [],
  current: [],
  currentView: 1,
  badge: 0,

  sidebarOpen: false,
  loadingShow: false,
}, applyMiddleware(logger, thunk));

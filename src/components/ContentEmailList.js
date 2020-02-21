import React from 'react';
import '../scss/EmailList.scss';
import { connect } from 'react-redux';

import SelectorFilter from './SelectorFilter';
import ListEmails from './ListEmails';
import SearchEmails from './SearchEmails';

const ContentEmailList = ({ listMails, currentView, viewList, badge, current, inboxMails, trashMails, spanMails }) => {

  var listMaster
  switch (viewList) {
    case 'Trash':
      listMaster = trashMails
      break;
    case 'Spam':
      listMaster = spanMails
      break;
    default:
      listMaster = inboxMails
  }
  
  return (
    <div className="List-container">
      <header className="List-header">
        <div className="left-menu-list">
          <h3 className="List-title">Inbox <span className="badge">{badge}</span></h3>
        </div>
        <div className="rigth-menu-list">
          <SelectorFilter />
        </div>
      </header>
      <SearchEmails />
      <ListEmails dataMail={listMaster} type={currentView} currentIdMail={current} viewList= {viewList} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    listMails: state.listMails,
    spanMails: state.spanMails,
    trashMails: state.trashMails,
    inboxMails: state.inboxMails,
    current: state.current,
    currentView: state.currentView,
    badge: state.badge,
    viewList: state.viewList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToViewer2(idMail, typeMail) {
      dispatch(addToViewer2(idMail, typeMail))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentEmailList);

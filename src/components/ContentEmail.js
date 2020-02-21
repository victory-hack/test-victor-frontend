import '../scss/Content.scss';
import React from 'react';
import { connect } from 'react-redux';
import { actionButons } from '../lib/actionCreators';
import ButtonCustom from './ButtonCustom';

const ContentEmail = ({ mailViewer, actionButons, current, viewList }) => {

  return (
    <div className="Content-first">
      {
        mailViewer.length < 1 ?
          <div className="Content-empty">
            {/* <i className="far fa-envelope mail-icon"></i> */}
          </div> 
        :
        <div className="contentBody">
          <header>
            <div className="left-menu-header">
              <div className="">
                {
                  viewList !== 'Trash' && 
                  <ButtonCustom customClass={'deleteMailButton'}
                    textBtn='Delete'
                    click={
                      () => actionButons(current.idMail, 'MOVE_TO_TRASH', mailViewer, viewList)
                    }
                  />
                }
              </div>
              <div className="">
                {
                  viewList !== 'Spam' && 
                  <ButtonCustom customClass={'spamMailButton'}
                    textBtn='Spam'
                    click={
                      () => actionButons(current.idMail, 'MOVE_TO_SPAM', mailViewer, viewList)
                    }
                  />
                }
              </div>
            </div>
            <div className="rigth-menu-header">
              <div className="">
                <ButtonCustom
                  customClass={'unreadMailButton'}
                  textBtn='Mark as unread'
                  click={
                    () => actionButons(current.idMail, 'MOVE_TO_INBOX', mailViewer, viewList)
                  }
                />
              </div>
            </div>
          </header>
          <div className={(mailViewer.length > 0 && mailViewer != undefined) ? "Content open" : "Content"}>
            {
              mailViewer.map(
                (item, index) =>
                <div className="Wrapper-content" key={index}>
                  <div className="Content-header">
                    <div className="left-menu">
                      <h5 className="Content-title">{item.from}</h5>
                    </div>
                  </div>
                  <div className="content-section">
                    <div className="left-tags">
                      <div className="tags">Tags</div>
                    </div>
                    <div className="rigth-tags">
                      <div className="item-tags">{item.tag}</div>
                    </div>
                  </div>
                  <div className="Content-container">
                    <div className="Wrapper-header">
                      <div className="Mail-text">{item.body}</div>
                    </div>
                    <div className="content-footer">
                      <div className="icon-footer">
                        <i className="fas fa-paperclip"></i>
                      </div>
                      <div className="replay-footer">Replay</div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      }
    </div>
  );
  //}
}
const mapStateToProps = state => {
  return {
    mailViewer: state.mailViewer,
    current: state.current,
    viewList: state.viewList,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actionButons(current, typeMail, mailViewer, viewList) {
      dispatch(actionButons(current, typeMail, mailViewer, viewList))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEmail);

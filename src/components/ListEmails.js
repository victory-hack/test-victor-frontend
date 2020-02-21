import React from "react";
import { addToViewer } from "../lib/actionCreators";
import { connect } from "react-redux";

const ListEmails = ({ dataMail, type, addToViewer, current, viewList }) => {

  return (
    <div className={ dataMail.length < 1 ? "text-center-flex" : "content-list" }>
      {
        dataMail.length < 1 && (
          <div className="text-center-flex">
            <h2 className="text-empty">
              {"Lista de " +
                (viewList === undefined ? "mensajes" : viewList) +
                " vacia"}
            </h2>
          </div>
        )
      }
      { 
        dataMail.length > 0 && (
        <div className="List-custom">
          {
            dataMail.map((item, index) => {
              if(item.isFiltered != false){
                return (
                  <div
                    className={
                      item.isReaded == true && current.idMail != index
                        ? "item-custom"
                        : current.idMail === index && item.isReaded == true
                          ? "item-custom active"
                          : "item-custom new"
                    }
                    key={index}
                    onClick={() => addToViewer(index, type)}
                  >
                    <div className="col-user">
                      <div className="item-name">{item.from}</div>
                      <div className="item-description">{item.body}</div>
                    </div>
                    <div className="col-date">
                      <div className="item-date">
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit"
                        }).format(new Date(item.date))}
                      </div>
                      <i className="fas fa-paperclip" />
                    </div>
                  </div>
                )
              } 
            })
          }
        </div>
        )
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    listMails: state.listMails,
    spanMails: state.spanMails,
    trashMails: state.trashMails,
    inboxMails: state.inboxMails,
    current: state.current,
    currentView: state.currentView,
    badge: state.badge,
    viewList: state.viewList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToViewer(idMail, typeMail) {
      dispatch(addToViewer(idMail, typeMail));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ListEmails);

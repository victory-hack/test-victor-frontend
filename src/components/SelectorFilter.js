import React, { Component } from 'react';
import { chageView, currentView } from '../lib/actionCreators';
import store from '../lib/store';

const options = [ "Order by", "Inbox", "Trash", "Spam"];

class SelectorFilter extends Component {

	constructor(props) {
    super(props);
    this.chageView = this.chageView.bind(this);
    this.state = { value: 'Filter by'};
    this.chageView(0)
  }

  onChange(e) {
    if(e.target.value > 0){
      this.chageView(e.target.value, options[e.target.value])
    }
  }

  render() {
    return (
      <div className="selector">
        <select  value={this.state.currentView} onChange={(e) => this.onChange(e)} className="selector-control">
          {options.map((option, index) => {
              return index === 0 ? 
              <option value={index} key={index} disabled>Filter by</option> :
              <option value={index} key={index} >{option}</option>
            }
          )}
        </select>
      </div>
    )
  }

  chageView(currentView, viewList) {
    store.dispatch(chageView(currentView, viewList))
  }

}

export default SelectorFilter;

import React, { Component } from "react";
import { searchList } from "../lib/actionCreators";
import store from "../lib/store";

class SearchEmails extends Component {
  
  constructor(props) {
    super(props);
    this.searchList = this.searchList.bind(this);
  }

  onChange(e) {
    this.searchList(e.target.value);
  }

  render() {
    return (
      <div className="search-list">
        <form>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-search"
              placeholder="Search"
              onChange={e => this.onChange(e)}
            />
          </fieldset>
        </form>
      </div>
    );
  }
  
  searchList(text) {
    store.dispatch(searchList(text));
  }

}
export default SearchEmails;

import React, { Component } from 'react';

class PasswordValidator extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <h4>
        {this.props.isChecked && (<i className="fa fa-check-square-o" aria-hidden="true"></i>)}
        {!this.props.isChecked && (<i className="fa fa-square-o" aria-hidden="true"></i>)}
        {this.props.sentence}
      </h4>
    )
  }
}

export default PasswordValidator;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requestPasswords } from '../actions/passwordActions';
import PasswordModal from './PasswordModal';
import PasswordItem from './PasswordItem';

const mapStateToProps = (state) => ({
  passwords: state.passwordReducer.passwords,
});

const mapDispatchToProps = (dispatch) => ({
  requestPasswords: () => dispatch(requestPasswords()),
});

class PasswordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordModalShow: false,
    };
    this.showPasswordModal = this.showPasswordModal.bind(this);
    this.hidePasswordModal = this.hidePasswordModal.bind(this);
  }

  componentDidMount() {
    this.props.requestPasswords();
  }

  showPasswordModal() {
    this.setState({
      passwordModalShow: true,
    });
  }

  hidePasswordModal() {
    this.setState({
      passwordModalShow: false,
    });
  }

  render() {
    const passwords = this.props.passwords;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <input type="text" name="keyword" placeholder="Search by URL" className="form-control search-text-box"/>
          </div>
          <div className="pull-right">
            <button className="btn btn-primary margin-bot-right-15" onClick={ this.showPasswordModal }>
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          </div>
        </div>
        {
          (passwords.length) ?
            (
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>URL</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.passwords.map((password, index) => {
                        return (
                          <PasswordItem password={ password } key={ index }/>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            ) :
            (
              <div className="alert alert-info text-center">No data to show</div>
            )
        }
        <PasswordModal
          show={ this.state.passwordModalShow }
          onHide={ this.hidePasswordModal } />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordList);

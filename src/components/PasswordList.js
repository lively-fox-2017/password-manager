import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestPasswords,
  fetchSearches
} from '../actions/passwordActions';
import PasswordModal from './PasswordModal';
import EditPasswordModal from './EditPasswordModal';
import PasswordItem from './PasswordItem';

const mapStateToProps = (state) => ({
  searches: state.passwordReducer.searches,
  passwords: state.passwordReducer.passwords,
});

const mapDispatchToProps = (dispatch) => ({
  requestPasswords: () => dispatch(requestPasswords()),
  fetchSearches: (searches) => dispatch(fetchSearches(searches)),
});

class PasswordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordModalShow: false,
      editPasswordModalShow: false,
      password: {
        id: null,
        url: '',
        username: '',
        password: '',
        created_at: '',
        updated_at: '',
      },
      keyword: '',
    };
    this.changePasswordValue = this.changePasswordValue.bind(this);
    this.search = this.search.bind(this);
    this.showPasswordModal = this.showPasswordModal.bind(this);
    this.hidePasswordModal = this.hidePasswordModal.bind(this);
    this.showEditPasswordModal = this.showEditPasswordModal.bind(this);
    this.hideEditPasswordModal = this.hideEditPasswordModal.bind(this);
  }

  changePasswordValue(key, value) {
    const password = this.state.password;

    password[key] = value;

    this.setState({
      password
    });
  }

  componentDidMount() {
    this.props.requestPasswords();
  }

  search(e) {
    this.setState({ keyword: e.target.value }, () => {
      const searches = this.props.passwords.filter((password) => {
        const regex = new RegExp("[a-z]*(" + this.state.keyword.toLowerCase() + ")[a-z]*", "ig");
        return regex.test(password.url.toLowerCase());
      });

      this.props.fetchSearches(searches);
    });
  }

  showPasswordModal() {
    this.setState({
      passwordModalShow: true
    });
  }

  hidePasswordModal() {
    this.setState({
      passwordModalShow: false,
    });
  }

  showEditPasswordModal(password = this.state.password) {
    this.setState({
      editPasswordModalShow: true,
      password: password,
    });
  }

  hideEditPasswordModal() {
    this.setState({
      editPasswordModalShow: false,
      password: {
        id: null,
        url: '',
        username: '',
        password: '',
        created_at: '',
        updated_at: '',
      },
    });
  }

  render() {
    const passwords = this.state.keyword.length ?
                      this.props.searches :
                      this.props.passwords;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <input type="text" name="keyword" placeholder="Search by URL" className="form-control search-text-box" onChange={ this.search }/>
          </div>
          <div className="pull-right">
            <button className="btn btn-primary margin-bot-right-15" onClick={ () => this.showPasswordModal('create') }>
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
                      passwords.map((password) => {
                        return (
                          <PasswordItem
                            showEditPasswordModal={ this.showEditPasswordModal }
                            password={ password }
                            key={ password.id }/>
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
        <EditPasswordModal
          password={ this.state.password }
          changePasswordValue={ this.changePasswordValue }
          show={ this.state.editPasswordModalShow }
          onHide={ this.hideEditPasswordModal }/>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordList);

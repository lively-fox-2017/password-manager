import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { destroyCredential } from './../actions/CredentialActions';

const mapStateToProps = (state) => ({
  credentials: state.CredentialReducer.credentials
});

const mapDispatchToProps = (dispatch) => ({
  destroyCredential: id => dispatch(destroyCredential(id))
});


export class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: ''
    }
  }

  updateKeyword(e) {
    this.setState({ keyword: e.target.value })
  }

  destroy(id, e) {
    this.props.destroyCredential(id);
  }

  render() {
    const credentials = this.props.credentials
    .filter(cred => cred.url.includes(this.state.keyword) || cred.username.includes(this.state.keyword))
    .map(cred => (
      <div key={cred.id}>
        <p>URL: {cred.url}</p>
        <p>USERNAME: {cred.username}</p>
        <p>PASSWORD: {cred.password}</p>
        <button><Link to={`/edit/${cred.id}`}>Edit</Link></button>
        <button onClick={(e) => this.destroy(cred.id, e)}>Delete</button>
        <hr/>
      </div>
    ));

    return (
      <div>
        <div id='search'>
          <br/>
          <label>Search</label>
          <input type="text" onChange={ e => this.updateKeyword(e) }/>
          <br/>
        </div>
        <div id='credentialList'>
          { credentials }
        </div>
      </div>
    )
  }
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected;
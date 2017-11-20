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
  }

  destroy(id, e) {
    this.props.destroyCredential(id);
  }

  render() {
    const credentials = this.props.credentials.map(cred => (
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
      { credentials }
      </div>
    )
  }
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected;
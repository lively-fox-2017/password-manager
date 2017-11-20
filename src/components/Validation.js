import React from 'react'
import { connect } from 'react-redux'
import User from '../reducers/UserReduce'
class Validation extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <ul>
          <li>[{ this.props.validPass.uppercase }] Password harus memmiliki setidaknya satu karakter huruf besar (upper-case)</li>
          <li>[{this.props.validPass.lowercase}] Password harus memmiliki setidaknya satu karakter huruf kecil (lower-case)</li>
          <li>[{this.props.validPass.symbols}] Password harus memmiliki setidaknya satu karakter special (#$@!&%...)</li>
          <li>[{this.props.validPass.digits}] Password harus memmiliki setidaknya satu angka</li>
          <li>[{this.props.validPass.min}] Password harus memmiliki panjang (length) lebih dari 5 karakter</li>
        </ul>
      </div>
    )
  }
}
const mapState = (state) => {
  return { validPass: state.UserReduce.passValid }
}
const validConnect = connect(mapState)(Validation)
export default validConnect
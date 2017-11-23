import React, { Component } from 'react'

class SearchResult extends Component {

    render() {
        return (
            <tbody>
                {this.props.data_result.map((password) => {
                    return (
                        <tr className="warning" key={password.id}>
                            <td>{password.id}</td>
                            <td>{password.data_url}</td>
                            <td>{password.username}</td>
                            <td>{password.password}</td>
                            <td>{password.createdAt}</td>
                            <td>{password.updatedAt}</td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }
}

export default SearchResult
import React, { Component } from 'react'
import { 
    getSearchData, 
    destroyDataToEdit, 
    clearAllSearch 
} from '../actions/PasswordActions'
import { connect } from 'react-redux'
import SearchResult from './SearchResult'
import PasswordTable from './SavedPassword'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            keyword: ''
        }
        this.handleKeyWordChange = this.handleKeyWordChange.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
    }

    componentDidMount() {
        this.props.destroyDataToEdit()
        this.props.clearAllSearch()
    }

    render() {
        return (
            <div>
                <h1 className="h1center">Search Password</h1>
                <form onSubmit={this.submitSearch} className="form-horizontal">
                    <div className="form-group">
                        <div className="col-md-5 col-md-offset-3">
                            <input 
                            onChange={this.handleKeyWordChange} 
                            value={this.state.keyword} 
                            type="text" 
                            className="form-control" 
                            placeholder="Search here" />
                        </div>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>
                <hr />
                <h4 className="h1center">Search Result: </h4>
                <hr />
                {this.showPassSearch.call(this)}
                <hr />
                <h4 className="h1center">All Password</h4>
                <hr />
                <table className="table table-striped table-hover ">
                    <thead>
                        <tr className="active">
                            <th>ID</th>
                            <th>URL</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <PasswordTable />
                </table>
            </div>
        )
    }

    showPassSearch () {
        if (this.props.searchPass.length === 0) {
            return <p>Nothing to Show</p>
        } else {
            return (
                <table className="table table-striped table-hover" style={{'align':'center'}}>
                    <thead>
                        <tr className="active">
                            <th>ID</th>
                            <th>URL</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <SearchResult data_result={this.props.searchPass} />
                </table>
            )
        }
    }

    handleKeyWordChange(e) {
        this.setState({ keyword: e.target.value })
    }

    submitSearch(e) {
        e.preventDefault()
        this.props.getSearchData(this.state.keyword)
        this.setState({ keyword: '' })
    }
}

const mapState = (state) => {
    return {
        searchPass: state.passReducer.searchPass
    }
}

const mapActions = (dispatch) => {
    return {
        getSearchData: (searchVal) => dispatch(getSearchData(searchVal)),
        destroyDataToEdit: () => dispatch(destroyDataToEdit()),
        clearAllSearch: () => dispatch(clearAllSearch())
    }
}

const SearchResultComp = connect(
    mapState, 
    mapActions
)(Search)


export default SearchResultComp
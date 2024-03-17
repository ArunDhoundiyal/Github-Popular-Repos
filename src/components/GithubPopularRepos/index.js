import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    language: languageFiltersData[0].id,
    allRepoData: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {language} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${language}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const repoData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
        startsCount: eachRepo.stars_count,
      }))
      console.log(repoData, data)
      this.setState({
        allRepoData: repoData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  getFilterDataId = id => {
    this.setState({language: id}, this.getData)
  }

  renderGithubPopularRepo = () => {
    const {language} = this.state
    return (
      <ul className="languageFiltersData-container">
        {languageFiltersData.map(filterData => (
          <LanguageFilterItem
            key={filterData.id}
            getFilterDataId={this.getFilterDataId}
            filterData={filterData}
            isActiveButton={language === filterData.id}
          />
        ))}
      </ul>
    )
  }

  fetchingDataInProgress = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositoryItem = () => {
    const {allRepoData} = this.state
    return (
      <ul className="repositoryItemContainer">
        {allRepoData.map(eachRepoData => (
          <RepositoryItem key={eachRepoData.id} eachRepoData={eachRepoData} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  checkFetchingData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.fetchingDataInProgress()
      case apiStatusConstant.success:
        return this.renderRepositoryItem()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="bg-container">
        <h1 className="top-heading">Popular</h1>
        {this.renderGithubPopularRepo()}
        {this.checkFetchingData()}
      </div>
    )
  }
}

export default GithubPopularRepos

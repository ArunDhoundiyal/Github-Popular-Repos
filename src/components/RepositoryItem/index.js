import './index.css'

const RepositoryItem = props => {
  const {eachRepoData} = props
  const {name, avatarUrl, forksCount, issuesCount, startsCount} = eachRepoData
  return (
    <li className="repo-list-item">
      <div className="logo-heading-container">
        <img src={avatarUrl} alt={name} className="img-style" />
        <h1 className="item-name">{name}</h1>
      </div>
      <div className="count-container">
        <div className="align-image">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
            className="img-logo"
            alt="stars"
          />
        </div>

        <p className="count">{startsCount} stars</p>
      </div>
      <div className="count-container">
        <div className="align-image">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            className="img-logo"
            alt="forks"
          />
        </div>

        <p className="count">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <div className="align-image">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            className="img-logo"
            alt="open issues"
          />
        </div>

        <p className="count">{issuesCount} opens issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

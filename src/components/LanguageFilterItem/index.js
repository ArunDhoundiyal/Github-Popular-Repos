import './index.css'

const LanguageFilterItem = props => {
  const {filterData, getFilterDataId, isActiveButton} = props
  const {id, language} = filterData
  const onClickLanguageButton = () => {
    getFilterDataId(id)
  }

  const isActive = isActiveButton ? 'hight-light-button' : 'button-style'

  return (
    <li>
      <button
        className={isActive}
        type="button"
        onClick={onClickLanguageButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

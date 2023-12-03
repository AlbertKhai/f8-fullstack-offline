const ColumnFooter = ({ addingCard, addNewCard, handleCancelAddCard, handleAddNewCard }) => {
  return (
    <footer className='column-footer'>
      {addingCard ? (
        <div className='wrap__action-adding-card'>
          <button onClick={addNewCard} className='btn__add-card'>
            <span className='text'>
              <i className='fa-solid fa-note-medical'></i>
              Thêm thẻ
            </span>
          </button>
          <button onClick={handleCancelAddCard} className='btn-cancel__add-card'>
            <span className='text'>
              <i className='fa-solid fa-xmark'></i>
            </span>
          </button>
        </div>
      ) : (
        <button onClick={handleAddNewCard} className='btn-open__add-card'>
          <span className='text'>
            <i className='fa-solid fa-plus'></i>
            Thêm thẻ mới
          </span>
        </button>
      )}
    </footer>
  )
}

export default ColumnFooter

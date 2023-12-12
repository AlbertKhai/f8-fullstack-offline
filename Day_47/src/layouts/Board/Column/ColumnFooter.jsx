const ColumnFooter = ({ addingCard, addNewCard, onCancelAddCard, onOpenAddNewCard }) => {
  return (
    <footer className='column-footer'>
      {addingCard ? (
        <div className='wrap__action-adding-card'>
          <button onMouseDown={addNewCard} className='btn__add-card'>
            <span className='text'>
              <i className='fa-solid fa-plus'></i>
              Thêm thẻ
            </span>
          </button>
          <button onMouseDown={onCancelAddCard} className='btn-cancel__add-card'>
            <span className='text'>
              <i className='fa-solid fa-xmark'></i>
            </span>
          </button>
        </div>
      ) : (
        <button onClick={onOpenAddNewCard} className='btn-open__add-card'>
          <span className='text'>
            <i className='fa-solid fa-note-medical'></i>
            Thêm thẻ mới
          </span>
        </button>
      )}
    </footer>
  )
}

export default ColumnFooter

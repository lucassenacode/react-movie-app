import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; 
  }

  return (
    <div className="pagination-container">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // Desabilita se estiver na primeira página
      >
        &larr; Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Desabilita se estiver na última página
      >
        Próximo &rarr;
      </button>
    </div>
  );
};

export default Pagination;
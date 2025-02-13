import ActionButton from "../components/ActionButton";

/**
 * Navigation component for mobile card view
 * Handles next/previous navigation between cards
 */
const Pagination = ({ currentIndex, totalItems, onNext, onPrev }) => (
    <>
      <div className="flex justify-center space-x-4 mt-4">
        <ActionButton
          label=""
          iconClass="fas fa-chevron-left"
          onClick={onPrev}
          className={`px-4 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentIndex === 0}
        />
        <ActionButton
          label=""
          iconClass="fas fa-chevron-right"
          onClick={onNext}
          className={`px-4 ${currentIndex === totalItems - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentIndex === totalItems - 1}
        />
      </div>
      <div className="text-center mt-2 text-sm text-gray-600">
        {currentIndex + 1} of {totalItems}
      </div>
    </>
  );

  export default Pagination;
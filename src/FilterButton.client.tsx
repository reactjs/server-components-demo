import {useLocation} from './LocationContext.client';
import {useTransition} from 'react';

const FilterButton: React.FC = () => {
  const {location, setLocation} = useLocation();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="button favorite-button"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          setLocation &&
            setLocation((loc) => ({
              selectedId: loc.selectedId,
              isEditing: loc.isEditing,
              searchText: loc.searchText,
              filterFavorites: !loc.filterFavorites,
            }));
        });
      }}>
      <img
        src={location.filterFavorites ? 'filter-fill.svg' : 'filter-line.svg'}
        alt="toggle-filter"
      />
    </button>
  );
};

export default FilterButton;

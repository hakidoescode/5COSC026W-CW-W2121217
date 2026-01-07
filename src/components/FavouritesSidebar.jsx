import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavourites, removeFavourite, clearAllFavourites } from '../utils/favourites';
import './FavouritesSidebar.css';

function FavouritesSidebar({ allProperties }) {
  const [favouriteIds, setFavouriteIds] = useState([]);

  // Load favourites on mount and listen for changes
  useEffect(() => {
    loadFavourites();

    // Listen for changes from other components
    const handleFavouritesChange = () => loadFavourites();
    window.addEventListener('favouritesChanged', handleFavouritesChange);

    return () => {
      window.removeEventListener('favouritesChanged', handleFavouritesChange);
    };
  }, []);

  const loadFavourites = () => {
    setFavouriteIds(getFavourites());
  };

  const handleRemove = (propertyId) => {
    removeFavourite(propertyId);
    loadFavourites();
    window.dispatchEvent(new Event('favouritesChanged'));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favourites?')) {
      clearAllFavourites();
      loadFavourites();
      window.dispatchEvent(new Event('favouritesChanged'));
    }
  };

  // Get full property objects for favourite IDs
  const favouriteProperties = allProperties.filter(prop =>
    favouriteIds.includes(prop.id)
  );

  return (
    <div className="favourites-sidebar">
      <h3>
        <span className="star-icon">★</span> Favourites ({favouriteIds.length})
      </h3>

      {favouriteProperties.length === 0 ? (
        <p className="empty-message">
          <span className="empty-star">☆</span>
          No favourites yet. Click the star on properties to add them!
        </p>
      ) : (
        <>
          <div className="favourites-list">
            {favouriteProperties.map(property => (
              <div key={property.id} className="favourite-item">
                <img src={property.images[0]} alt={property.shortDescription} />
                <div className="favourite-info">
                  <p className="favourite-price">£{property.price.toLocaleString()}</p>
                  <p className="favourite-location">{property.locationLabel}</p>
                  <Link to={`/property/${property.id}`} className="favourite-link">
                    View Details
                  </Link>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(property.id)}
                  title="Remove from favourites"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {favouriteProperties.length > 0 && (
            <button className="btn-danger clear-btn" onClick={handleClearAll}>
              Clear All Favourites
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default FavouritesSidebar;

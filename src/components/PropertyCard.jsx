import { Link } from 'react-router-dom';
import { isFavourite, addFavourite, removeFavourite } from '../utils/favourites';
import { useState, useEffect } from 'react';
import './PropertyCard.css';

function PropertyCard({ property }) {
  const [favourite, setFavourite] = useState(false);

  // Check if property is in favourites on load
  useEffect(() => {
    setFavourite(isFavourite(property.id));
  }, [property.id]);

  // Toggle favourite status
  const handleFavouriteClick = (e) => {
    e.preventDefault();

    if (favourite) {
      removeFavourite(property.id);
      setFavourite(false);
    } else {
      addFavourite(property.id);
      setFavourite(true);
    }

    // Trigger a custom event to update favourites sidebar
    window.dispatchEvent(new Event('favouritesChanged'));
  };

  return (
    <div className="property-card card">
      <div className="card-image">
        <img src={property.images[0]} alt={property.shortDescription} />
        <button
          className={`favourite-btn ${favourite ? 'active' : ''}`}
          onClick={handleFavouriteClick}
          title={favourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          ★
        </button>
      </div>

      <div className="card-content">
        <p className="price">£{property.price.toLocaleString()}</p>
        <p className="property-type">
          {property.bedrooms} bed {property.type}
        </p>
        <p className="description">{property.shortDescription}</p>
        <p className="location">{property.locationLabel} · {property.postcodeArea}</p>

        <Link to={`/property/${property.id}`} className="btn-primary view-btn">
          View Property
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;

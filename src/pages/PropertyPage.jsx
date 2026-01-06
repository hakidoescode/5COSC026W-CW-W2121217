import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isFavourite, addFavourite, removeFavourite } from '../utils/favourites';
import propertiesData from '../data/properties.json';
import './PropertyPage.css';

function PropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [favourite, setFavourite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    // Find the property by ID
    const foundProperty = propertiesData.properties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
      setFavourite(isFavourite(id));
    }
  }, [id]);

  const handleFavouriteClick = () => {
    if (favourite) {
      removeFavourite(id);
      setFavourite(false);
    } else {
      addFavourite(id);
      setFavourite(true);
    }
    window.dispatchEvent(new Event('favouritesChanged'));
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  if (!property) {
    return (
      <div className="container">
        <p>Property not found</p>
        <button onClick={() => navigate('/')}>Back to Search</button>
      </div>
    );
  }

  return (
    <div className="property-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Search
        </button>

        {/* Image Gallery */}
        <div className="gallery-section">
          <div className="main-image">
            <img
              src={property.images[0]}
              alt="Main property view"
              onClick={() => openLightbox(0)}
            />
            <button className="view-all-btn" onClick={() => openLightbox(0)}>
              View All Images ({property.images.length})
            </button>
          </div>

          <div className="thumbnails">
            {property.images.slice(1, 7).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Property view ${index + 2}`}
                onClick={() => openLightbox(index + 1)}
              />
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="property-info">
          <div className="property-header">
            <div>
              <h1 className="price">£{property.price.toLocaleString()}</h1>
              <p className="property-details">
                {property.bedrooms} Bedroom {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </p>
              <p className="location">{property.locationLabel} · {property.postcodeArea}</p>
            </div>
            <button
              className={`favourite-btn-large ${favourite ? 'active' : ''}`}
              onClick={handleFavouriteClick}
            >
              ★ {favourite ? 'Remove from Favourites' : 'Add to Favourites'}
            </button>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <div className="tab-buttons">
              <button
                className={activeTab === 'description' ? 'active' : ''}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={activeTab === 'floorplan' ? 'active' : ''}
                onClick={() => setActiveTab('floorplan')}
              >
                Floor Plan
              </button>
              <button
                className={activeTab === 'map' ? 'active' : ''}
                onClick={() => setActiveTab('map')}
              >
                Map
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="tab-panel">
                  <h3>Property Description</h3>
                  <p>{property.longDescription}</p>
                </div>
              )}

              {activeTab === 'floorplan' && (
                <div className="tab-panel">
                  <h3>Floor Plan</h3>
                  <img src={property.floorPlanImage} alt="Floor plan" className="floorplan-img" />
                </div>
              )}

              {activeTab === 'map' && (
                <div className="tab-panel">
                  <h3>Location</h3>
                  <iframe
                    src={property.mapEmbedUrl}
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                    loading="lazy"
                    title="Property location map"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Simple Lightbox */}
        {lightboxOpen && (
          <div className="lightbox" onClick={closeLightbox}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
            <img
              src={property.images[lightboxIndex]}
              alt={`Property view ${lightboxIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
            <div className="lightbox-counter">{lightboxIndex + 1} / {property.images.length}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyPage;

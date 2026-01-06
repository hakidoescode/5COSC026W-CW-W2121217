import PropertyCard from './PropertyCard';
import './ResultsList.css';

function ResultsList({ properties }) {
  if (properties.length === 0) {
    return (
      <div className="no-results">
        <h3>No properties found</h3>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="results-section">
      <h3 className="results-count">
        {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
      </h3>

      <div className="results-grid">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default ResultsList;

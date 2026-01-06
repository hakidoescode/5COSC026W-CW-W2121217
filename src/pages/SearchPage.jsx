import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import ResultsList from '../components/ResultsList';
import FavouritesSidebar from '../components/FavouritesSidebar';
import { filterProperties } from '../utils/searchFilter';
import propertiesData from '../data/properties.json';
import './SearchPage.css';

function SearchPage() {
  const [allProperties] = useState(propertiesData.properties);
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);

  // Get unique postcode areas for the dropdown
  const postcodeAreas = [...new Set(allProperties.map(prop => prop.postcodeArea))];

  // Handle search
  const handleSearch = (filters) => {
    const results = filterProperties(allProperties, filters);
    setFilteredProperties(results);
  };

  return (
    <div className="search-page">
      <div className="container">
        <header className="page-header">
          <h1>Property Search</h1>
          <p>Find your perfect home from our selection of properties</p>
        </header>

        <SearchForm onSearch={handleSearch} postcodeAreas={postcodeAreas} />

        <div className="results-container">
          <ResultsList properties={filteredProperties} />
          <FavouritesSidebar allProperties={allProperties} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;

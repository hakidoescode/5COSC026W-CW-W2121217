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
          <div className="header-overlay"></div>
          <div className="header-content">
            <div className="brand-name">Haven Properties</div>
            <h1>Find Your Perfect Home</h1>
            <p>Browse our curated collection of houses and flats across London</p>
          </div>
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

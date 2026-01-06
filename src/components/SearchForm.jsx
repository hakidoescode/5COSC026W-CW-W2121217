import { useState } from 'react';
import { DropdownList, NumberPicker, DatePicker } from 'react-widgets';
import 'react-widgets/styles.css';
import './SearchForm.css';

function SearchForm({ onSearch, postcodeAreas }) {
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: null,
    maxPrice: null,
    minBeds: null,
    maxBeds: null,
    dateMode: 'after',
    dateFrom: null,
    dateTo: null,
    postcodeArea: ''
  });

  const propertyTypes = ['any', 'house', 'flat'];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  // Handle filter changes
  const updateFilter = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Properties</h2>

      <div className="form-grid">
        {/* Property Type */}
        <div className="form-group">
          <label>Property Type</label>
          <DropdownList
            data={propertyTypes}
            value={filters.type}
            onChange={(value) => updateFilter('type', value)}
          />
        </div>

        {/* Min Price */}
        <div className="form-group">
          <label>Min Price (£)</label>
          <NumberPicker
            value={filters.minPrice}
            onChange={(value) => updateFilter('minPrice', value)}
            min={0}
            step={10000}
            placeholder="No minimum"
          />
        </div>

        {/* Max Price */}
        <div className="form-group">
          <label>Max Price (£)</label>
          <NumberPicker
            value={filters.maxPrice}
            onChange={(value) => updateFilter('maxPrice', value)}
            min={0}
            step={10000}
            placeholder="No maximum"
          />
        </div>

        {/* Min Bedrooms */}
        <div className="form-group">
          <label>Min Bedrooms</label>
          <NumberPicker
            value={filters.minBeds}
            onChange={(value) => updateFilter('minBeds', value)}
            min={0}
            max={10}
            placeholder="No minimum"
          />
        </div>

        {/* Max Bedrooms */}
        <div className="form-group">
          <label>Max Bedrooms</label>
          <NumberPicker
            value={filters.maxBeds}
            onChange={(value) => updateFilter('maxBeds', value)}
            min={0}
            max={10}
            placeholder="No maximum"
          />
        </div>

        {/* Postcode Area */}
        <div className="form-group">
          <label>Postcode Area</label>
          <DropdownList
            data={['', ...postcodeAreas]}
            value={filters.postcodeArea}
            onChange={(value) => updateFilter('postcodeArea', value)}
            placeholder="Any area"
          />
        </div>

        {/* Date Mode */}
        <div className="form-group date-mode">
          <label>Date Added</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="dateMode"
                value="after"
                checked={filters.dateMode === 'after'}
                onChange={(e) => updateFilter('dateMode', e.target.value)}
              />
              After date
            </label>
            <label>
              <input
                type="radio"
                name="dateMode"
                value="between"
                checked={filters.dateMode === 'between'}
                onChange={(e) => updateFilter('dateMode', e.target.value)}
              />
              Between dates
            </label>
          </div>
        </div>

        {/* From Date */}
        <div className="form-group">
          <label>From Date</label>
          <DatePicker
            value={filters.dateFrom}
            onChange={(value) => updateFilter('dateFrom', value)}
            placeholder="Select date"
          />
        </div>

        {/* To Date (only show in 'between' mode) */}
        {filters.dateMode === 'between' && (
          <div className="form-group">
            <label>To Date</label>
            <DatePicker
              value={filters.dateTo}
              onChange={(value) => updateFilter('dateTo', value)}
              placeholder="Select date"
            />
          </div>
        )}
      </div>

      <button type="submit" className="btn-primary search-btn">
        Search Properties
      </button>
    </form>
  );
}

export default SearchForm;

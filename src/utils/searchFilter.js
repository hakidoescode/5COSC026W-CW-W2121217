// Filter properties based on search criteria
export function filterProperties(properties, filters) {
  return properties.filter(property => {
    // Type filter: skip if type doesn't match (unless 'any')
    if (filters.type !== 'any' && property.type.toLowerCase() !== filters.type.toLowerCase()) {
      return false;
    }

    // Price filter: check min and max price
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    // Bedrooms filter: check min and max bedrooms
    if (filters.minBeds && property.bedrooms < filters.minBeds) {
      return false;
    }
    if (filters.maxBeds && property.bedrooms > filters.maxBeds) {
      return false;
    }

    // Date filter: check if property was added after or between dates
    if (filters.dateFrom) {
      const propDate = new Date(property.dateAdded);
      const fromDate = new Date(filters.dateFrom);

      if (propDate < fromDate) {
        return false;
      }

      // If in 'between' mode, also check the 'to' date
      if (filters.dateMode === 'between' && filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        if (propDate > toDate) {
          return false;
        }
      }
    }

    // Postcode filter: exact match on postcode area
    if (filters.postcodeArea && property.postcodeArea !== filters.postcodeArea) {
      return false;
    }

    // Property passed all filters
    return true;
  });
}

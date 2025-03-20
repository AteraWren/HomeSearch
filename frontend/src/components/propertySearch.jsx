// src/components/PropertySearch.jsx
import React, { useState } from 'react';
import { getPropertiesByAddress } from '../zillowService';
import '../styles/propertySearch.css'; // Import the CSS file

const PropertySearch = () => {
  const [query, setQuery] = useState('');
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await getPropertiesByAddress(query);
      console.log('Property data:', data); // Log the property data
      setProperty(data); // Set the property object
      setCurrentPhotoIndex(0); // Reset the photo index
    } catch (error) {
      setError('Error searching properties');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : property.originalPhotos.length - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex < property.originalPhotos.length - 1 ? prevIndex + 1 : 0));
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="property-search-container">
      <h1 className="property-search-title">Search for Properties</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for properties"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="property-search-input"
        />
        <button type="submit" className="property-search-button">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {property ? (
        <div>
          {property.originalPhotos && property.originalPhotos.length > 0 && (
            <div className="property-search-img-container">
              <button className="property-search-img-button property-search-img-button-left" onClick={handlePreviousPhoto}>
                &#8249;
              </button>
              <img
                src={property.originalPhotos[currentPhotoIndex].mixedSources.jpeg[0].url}
                alt="Property"
                className="property-search-img"
                onClick={handleImageClick}
              />
              <button className="property-search-img-button property-search-img-button-right" onClick={handleNextPhoto}>
                &#8250;
              </button>
            </div>
          )}
          <p>{property.description}</p> {/* Added property description */}
          <p>City: {property.city}</p>
          <p>State: {property.state}</p>
          <p>Street Address: {property.streetAddress}</p>
          <p>Zipcode: {property.zipcode}</p>
          <p>Price: ${property.price}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Bathrooms: {property.bathrooms}</p>
          <p>Living Area: {property.livingArea} sqft</p>
          <p>Year Built: {property.yearBuilt}</p>
          {/* Add more property details as needed */}
        </div>
      ) : (
        <p>No properties found</p>
      )}

      {isModalOpen && (
        <div className="modal" style={{ display: isModalOpen ? 'block' : 'none' }} onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img
              src={property.originalPhotos[currentPhotoIndex].mixedSources.jpeg[0].url}
              alt="Property"
              className="modal-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
"use client";
import React, { ReactElement, useEffect, useState } from 'react';
import { geoLocation } from "@/utils/geolocation";

export default function GeolocationTest() :ReactElement {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const { refresh } = geoLocation();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (err) => {
        setError(`Geolocation error: ${err.message}`);
      }
    );
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  // Render your component here, using the location variable as needed

  return (
    <div>
      Your location is {location.latitude}, {location.longitude}
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
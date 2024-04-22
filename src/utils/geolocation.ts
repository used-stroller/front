// "use client";
// import { useState, useEffect } from 'react';

// export function geoLocation() {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   const refresh = () => {
//     setLocation(null);
//     setError(null);
//   };

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by this browser.');
//       return;
//     }

//     function handleSuccess(position) {
//       const { latitude, longitude } = position.coords;
//       setLocation({ latitude, longitude });
//     }

//     function handleError(error) {
//       setError(error.message);
//     }

//     navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
//   }, []);

//   return { location, error, refresh };
// }
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("❌ Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject("❌ You denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            reject("⚠️ Location information is unavailable.");
            break;
          case error.TIMEOUT:
            reject("⏰ The request to get user location timed out.");
            break;
          default:
            reject("⚠️ An unknown error occurred while fetching location.");
            break;
        }
      }
    );
  });
};

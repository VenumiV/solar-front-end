import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";

const useWeather = (latitude = null, longitude = null) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const getLocation = async () => {
      // If coordinates are provided, use them
      if (latitude !== null && longitude !== null) {
        setCoords({ latitude, longitude });
        return;
      }

      // Otherwise, try to get browser geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {
            // Fallback to default coordinates (Sri Lanka) if geolocation fails
            setCoords({ latitude: 7.75, longitude: 80.75 });
          }
        );
      } else {
        // Fallback to default coordinates if geolocation is not supported
        setCoords({ latitude: 7.75, longitude: 80.75 });
      }
    };

    getLocation();
  }, [latitude, longitude]);

  useEffect(() => {
    if (coords.latitude === null || coords.longitude === null) {
      return; // Wait for coordinates
    }

    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          hourly: ["temperature_2m", "wind_speed_10m"],
          timezone: "auto",
          past_days: 7,
          wind_speed_unit: "ms",
        };

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);

        // Process first location
        const response = responses[0];

        // Get timezone offset
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const hourly = response.hourly();

        // Helper function to form time ranges
        const range = (start, stop, step) =>
          Array.from(
            { length: (Number(stop) - Number(start)) / step },
            (_, i) => new Date((Number(start) + i * step + utcOffsetSeconds) * 1000)
          );

        // Process hourly data - time values are in seconds
        const timeRange = range(
          hourly.time(),
          hourly.timeEnd(),
          hourly.interval()
        );

        const temperatures = hourly.variables(0).valuesArray();
        const windSpeeds = hourly.variables(1).valuesArray();

        // Get the most recent data (last index, which should be current or most recent hour)
        const currentIndex = temperatures.length - 1;
        const currentTemperature = temperatures[currentIndex];
        const currentWindSpeed = windSpeeds[currentIndex]; // in m/s

        // Convert wind speed from m/s to km/h (1 m/s = 3.6 km/h)
        const currentWindSpeedKmh = (currentWindSpeed * 3.6).toFixed(1);

        setWeatherData({
          temperature: currentTemperature.toFixed(1),
          windSpeed: currentWindSpeedKmh,
          timestamp: timeRange[currentIndex],
          fullData: {
            time: timeRange,
            temperature_2m: temperatures,
            wind_speed_10m: windSpeeds,
          },
        });
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err.message || "Failed to fetch weather data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();

    // Optionally refresh every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [coords.latitude, coords.longitude]);

  return { weatherData, isLoading, error };
};

export default useWeather;


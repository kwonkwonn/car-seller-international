/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useRef, useState } from "react";
import type { Dealership, Coordinates } from "./types";
import {
  GOOGLE_MAPS_API_KEY,
  NAVER_MAPS_CLIENT_ID,
  GOOGLE_MAPS_MAP_ID,
} from "./config";

// Make Google/Naver map objects available on the window
declare global {
  interface Window {
    google: any;
    naver: any;
    initMap?: () => void;
    navermap_authFailure?: () => void;
  }
}

interface MapProps {
  country: string;
  center: Coordinates;
  zoom: number;
  markers: Dealership[];
  selectedMarker: Dealership | null;
}

const loadScript = (src: string, id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
};

export function Map({
  country,
  center,
  zoom,
  markers,
  selectedMarker,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstances = useRef<any[]>([]);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    if (country === "USA") {
      // Validate Google Maps API key
      if (!GOOGLE_MAPS_API_KEY) {
        console.error(
          "Google Maps API key is not configured. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file."
        );
        return;
      }
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker`,
        "google-maps-script"
      )
        .then(() => setScriptsLoaded(true))
        .catch((err) =>
          console.error("Failed to load Google Maps script:", err)
        );
    } else if (country === "South Korea") {
      // Validate Naver Maps API key
      if (!NAVER_MAPS_CLIENT_ID) {
        console.error(
          "Naver Maps Client ID is not configured. Please set VITE_NAVER_MAPS_CLIENT_ID in your .env file."
        );
        return;
      }

      // UPDATED: Use the latest Naver Maps API format (2025)
      // Key changes: ncpClientId → ncpKeyId, openapi → oapi
      const naverMapUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAPS_CLIENT_ID}`;

      console.log("🚨 LATEST Naver Maps API Info:");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📋 Console: https://console.ncloud.com/maps");
      console.log("🔧 API URL: oapi.map.naver.com (NEW!)");
      console.log("🔑 Parameter: ncpKeyId (was ncpClientId)");
      console.log("📖 Guide: Maps > Application 등록 후 Client ID 발급");
      console.log("🌐 Domain: Application에서 허용 도메인 등록 필요");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      // Set up authentication failure callback
      window.navermap_authFailure = function () {
        console.error("🚨 NAVER MAPS AUTHENTICATION FAILED!");
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌ Authentication Error Detected");
        console.error("");
        console.error("🔧 Quick Fix Steps:");
        console.error("1. Go to: https://console.ncloud.com/maps");
        console.error("2. Create new 'Application' (not API Gateway app)");
        console.error("3. Select 'Dynamic Map' API");
        console.error("4. Add domains:");
        console.error("   - http://localhost:5173");
        console.error("   - http://127.0.0.1:5173");
        console.error("   - https://localhost:5173");
        console.error("   - https://127.0.0.1:5173");
        console.error("5. Copy the Application's Client ID");
        console.error("6. Update VITE_NAVER_MAPS_CLIENT_ID in .env file");
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      };

      loadScript(naverMapUrl, "naver-maps-script")
        .then(() => {
          console.log("✅ Naver Maps script loaded successfully");
          setScriptsLoaded(true);
        })
        .catch((err) => {
          console.error("❌ Failed to load Naver Maps script:", err);
          console.error(
            "🚨 TROUBLESHOOTING - Check the authentication callback above!"
          );
        });
    }
  }, [country]);

  // Initialize map
  useEffect(() => {
    if (!scriptsLoaded || !mapRef.current) return;

    try {
      if (country === "USA" && window.google) {
        if (!GOOGLE_MAPS_MAP_ID) {
          console.warn(
            "Google Maps Map ID is not configured. Some features may not work properly."
          );
        }
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapId: GOOGLE_MAPS_MAP_ID, // Required for Advanced Markers
          disableDefaultUI: true,
        });
      } else if (country === "South Korea" && window.naver) {
        console.log("✅ Initializing Naver Map...");
        mapInstance.current = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(center.lat, center.lng),
          zoom,
          disableDefaultUI: true,
          // Additional options for better stability
          logoControl: false,
          mapDataControl: false,
          zoomControl: true,
          zoomControlOptions: {
            style: window.naver.maps.ZoomControlStyle.SMALL,
            position: window.naver.maps.Position.TOP_RIGHT,
          },
        });
        console.log("✅ Naver Map initialized successfully!");
      }
    } catch (error) {
      console.error("Failed to initialize map:", error);
      if (country === "South Korea") {
        console.error("🚨 Map initialization failed - check authentication!");
      }
    }

    // Cleanup on unmount
    return () => {
      mapInstance.current = null;
    };
  }, [country, scriptsLoaded]);

  // Update map center and zoom
  useEffect(() => {
    if (!mapInstance.current) return;
    if (country === "USA" && window.google) {
      mapInstance.current.panTo(center);
      mapInstance.current.setZoom(zoom);
    } else if (country === "South Korea" && window.naver) {
      mapInstance.current.panTo(
        new window.naver.maps.LatLng(center.lat, center.lng)
      );
      mapInstance.current.setZoom(zoom);
    }
  }, [center, zoom, country]);

  // Update markers when results change
  useEffect(() => {
    // Clear previous markers
    markerInstances.current.forEach((m: any) => {
      try {
        m.setMap(null);
      } catch (error) {
        console.warn("Failed to clear marker:", error);
      }
    });
    markerInstances.current = [];

    if (!mapInstance.current || !markers) return;

    try {
      if (country === "USA" && window.google) {
        markers.forEach((markerInfo) => {
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: { lat: markerInfo.latitude, lng: markerInfo.longitude },
            map: mapInstance.current,
            title: markerInfo.dealershipName,
          });
          (marker as any).dealershipName = markerInfo.dealershipName; // Store name for matching
          markerInstances.current.push(marker);
        });
      } else if (country === "South Korea" && window.naver) {
        markers.forEach((markerInfo) => {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(
              markerInfo.latitude,
              markerInfo.longitude
            ),
            map: mapInstance.current,
            title: markerInfo.dealershipName,
            // Add custom icon for better visibility
            icon: {
              content:
                '<div style="background-color: #007BFF; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
              anchor: new window.naver.maps.Point(10, 10),
            },
          });
          markerInstances.current.push(marker);
        });
      }
    } catch (error) {
      console.error("Failed to create markers:", error);
    }
  }, [markers, country, scriptsLoaded]);

  // Update selected marker style
  useEffect(() => {
    if (!mapInstance.current) return;

    try {
      if (country === "USA" && window.google) {
        markerInstances.current.forEach((marker: any) => {
          const isSelected =
            selectedMarker?.dealershipName === marker.dealershipName;
          const pinElement = marker.content;
          if (pinElement) {
            // AdvancedMarkerElement content is a DOM node
            if (isSelected) {
              pinElement.style.setProperty("--gm-pin-background", "#FF5722");
              pinElement.style.setProperty("--gm-pin-border-color", "#FFFFFF");
            } else {
              pinElement.style.setProperty("--gm-pin-background", "#007BFF");
              pinElement.style.setProperty("--gm-pin-border-color", "#FFFFFF");
            }
          }
        });
      } else if (country === "South Korea" && window.naver) {
        markerInstances.current.forEach((marker: any) => {
          const isSelected =
            selectedMarker?.dealershipName === marker.getTitle();
          const selectedColor = isSelected ? "#FF5722" : "#007BFF";
          marker.setIcon({
            content: `<div style="background-color: ${selectedColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            anchor: new window.naver.maps.Point(10, 10),
          });
        });
      }
    } catch (error) {
      console.error("Failed to update marker styles:", error);
    }
  }, [selectedMarker, country]);

  return (
    <div className="map-container" aria-label="Map of dealerships">
      <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

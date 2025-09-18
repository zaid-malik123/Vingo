import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setLocation, setUserAddress } from "../redux/mapSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const RecenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location?.lat && location?.lon) {
      map.setView([location.lat, location.lon], 16, { animate: true });
    }
  }, [location, map]);
  return null;
};

const Checkout = () => {
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_GEOPIFY_API_KEY;
  const { location, address } = useSelector((state) => state.mapSlice);
  const [addressInput, setAddressInput] = useState("");
  const dispatch = useDispatch();

  // Drag marker -> update lat/lng + address
  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`
      );
      dispatch(setUserAddress(res?.data?.features[0]?.properties?.formatted));
    } catch (error) {
      console.log(error);
    }
  };

  const getLatLngByAddress = async () => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${API_KEY}`
      );
      const { lat, lon } = res.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
      getAddressByLatLng(lat, lon);
    } catch (error) {
      console.log(error);
    }
  };

  // 📍 Get Current Location (Blue Button)
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          dispatch(setLocation({ lat, lon }));
          getAddressByLatLng(lat, lon);
        },
        (err) => {
          console.log("Error getting current location:", err);
          alert("Unable to fetch your location. Please enable GPS.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2
          text-orange-600 font-medium hover:text-orange-700 transition-all"
      >
        <IoArrowBackOutline size={20} />
        <span>Back</span>
      </button>

      {/* Checkout Card */}
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

        {/* Delivery Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <FaLocationDot size={16} className="text-[#ff4d2d]" />
            Delivery Location
          </h2>

          {/* Address Input */}
          <div className="flex gap-2 mb-4">
            <input
              placeholder="Enter your delivery address"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm 
                focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] transition-all"
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <button
              onClick={getLatLngByAddress}
              className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg 
                flex items-center justify-center shadow-md transition-all"
            >
              <IoIosSearch size={17} />
            </button>
            <button
              onClick={getCurrentLocation} // ✅ Added Function
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg 
                flex items-center justify-center shadow-md transition-all"
            >
              <TbCurrentLocation size={17} />
            </button>
          </div>

          {/* Map */}
          <div className="rounded-xl border overflow-hidden shadow-md">
            <div className="h-72 w-full flex items-center justify-center">
              <MapContainer
                className="w-full h-full"
                zoom={16}
                center={[location?.lat, location?.lon]}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                  position={[location?.lat, location?.lon]}
                ></Marker>
              </MapContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;

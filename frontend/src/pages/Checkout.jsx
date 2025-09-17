import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setLocation } from "../redux/mapSlice";

const RecenterMap = ({ location }) => {
  const map = useMap();
  if (location?.lat && location?.lon) {
    map.setView([location.lat, location.lon], 16, { animate: true });
  }
  return null;
};


const Checkout = () => {
  const navigate = useNavigate();
  const { location, address } = useSelector((state) => state.mapSlice);
  const dispatch = useDispatch()
  const onDragEnd = (e)=>{
   const {lat, lng} = e.target._latlng
   dispatch(setLocation({lat, lon:lng}))
   const map = useMap()
   map.setView([lat, lng], 16,{animate:true})
  }

  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 
                   text-orange-600 font-medium
                   hover:text-orange-700 transition-all duration-200"
      >
        <IoArrowBackOutline size={20} />
        <span>Back</span>
      </button>
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
            <FaLocationDot size={16} className="text-[#ff4d2d]" />
            Delivery Location
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              placeholder="Enter your delivery address"
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]"
              type="text"
              value={address}
            />
            <button className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg flex items-center justify-center">
              <IoIosSearch size={17} />
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center">
              <TbCurrentLocation size={17} />
            </button>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full flex items-center justify-center">
              <MapContainer
                className="w-full h-full"
                zoom={16}
                center={[location?.lat, location?.lon]}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location}/>
                <Marker draggable eventHandlers={{dragend:onDragEnd}} position={[location?.lat, location?.lon]}></Marker>
              </MapContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;

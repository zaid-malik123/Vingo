import scooter from "../assets/scooter.png";
import home from "../assets/home.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

const deliveryBoyIcon = new L.icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const CustomerIcon = new L.icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const DeliveryBoyMapping = ({ currentOrder }) => {
  console.log(currentOrder)  
  const deliveryBoyLat = currentOrder.deliveryBoyLocation.lat;
  const deliveryBoyLon = currentOrder.deliveryBoyLocation.lon;
  const customerLat = currentOrder.customerLocation.lat;
  const customerLon = currentOrder.customerLocation.lon;

const path = [
  [deliveryBoyLat, deliveryBoyLon],
  [customerLat, customerLon],
];


  const center = [deliveryBoyLat, deliveryBoyLon];

  return (
    <div className="w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md">
      <MapContainer
        className="w-full h-full"
        zoom={16}
        center={center}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[deliveryBoyLat, deliveryBoyLon]} icon={deliveryBoyIcon}>
          <Popup>Delivery Boy</Popup>
        </Marker>
        <Marker position={[customerLat, customerLon]} icon={CustomerIcon}>
          <Popup>Customer Home</Popup>
        </Marker>
        <Polyline positions={path} weight={4}/>
      </MapContainer>
    </div>
  );
};

export default DeliveryBoyMapping;

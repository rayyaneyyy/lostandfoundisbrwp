import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { ref, onValue } from "firebase/database";

const categoryColors = {
  CNIC: "bg-rose-200 text-rose-800",
  Wallet: "bg-blue-200 text-blue-800",
  Phone: "bg-green-200 text-green-800",
  Keys: "bg-yellow-200 text-yellow-800",
  "ATM Card": "bg-purple-200 text-purple-800",
  Documents: "bg-pink-200 text-pink-800",
  Other: "bg-gray-200 text-gray-800",
};

const locations = [
  "G-5","G-6","G-7","G-8","G-9","G-10","G-11","G-12","G-13","G-14","G-15","G-16",
  "F-5","F-6","F-7","F-8","F-9","F-10","F-11","F-12","F-13","F-14","F-15",
  "H-8","H-9","H-10","H-11","H-12",
  "I-8","I-9","I-10","I-11","I-12","I-14","I-15","I-16",
  "D-12","E-11","E-10","E-9","E-8",
  "Saddar","Committee Chowk","Khurram Colony","Muslim Town","Satellite Town",
  "Faizabad","Marrir","Peshawar Road","Chaklala","Tench Bhatta","Commercial Market",
  "DHA Phase 1","DHA Phase 2","DHA Phase 3","DHA Phase 4","DHA Phase 5",
  "Bahria Town Phase 1","Bahria Town Phase 2","Bahria Town Phase 3","Bahria Town Phase 4",
  "Bahria Town Phase 5","Bahria Town Phase 6","Bahria Town Phase 7","Bahria Town Phase 8",
  "PWD","Media Town","Pakistan Town","Soan Gardens","Gulraiz","Ghauri Town",
  "CUST","NUST","FAST","COMSATS","Air University","Bahria University",
  "Roots International (G-8)","Roots Millennium (PWD)","Beaconhouse (F-10)",
  "Shifa International","PIMS","Holy Family","Benazir Bhutto Hospital","Maroof Hospital","Ali Medical (F-8)",
  "F-9 Park","Lake View Park","Ayub Park","Giga Mall","Centaurus","Safa Gold","Amazon Mall","Rabi Center","Panorama Center",
  "Other"
];

export default function Items() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const itemsRef = ref(db, "items");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedItems = Object.values(data).reverse();
        setItems(loadedItems);
      }
    });
  }, []);

  const filteredItems = items.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.sector.toLowerCase().includes(search.toLowerCase());

    const matchCategory = filterCategory ? item.category === filterCategory : true;
    const matchLocation = filterLocation ? item.sector === filterLocation : true;
    const matchType = filterType ? item.type === filterType : true;

    return matchSearch && matchCategory && matchLocation && matchType;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 p-6 pt-28">
      <h2 className="text-3xl font-bold text-center text-rose-600 dark:text-rose-300 mb-6">
        Lost & Found Items
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search items..."
          className="p-2 border rounded w-full sm:w-1/4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/4"
        >
          <option value="">Category of Item</option>
          {Object.keys(categoryColors).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/4"
        >
          <option value="">Location / Place</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/4"
        >
          <option value="">Lost / Found</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                  {item.title}
                </h3>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    categoryColors[item.category] || "bg-gray-300 text-gray-800"
                  }`}
                >
                  {item.category}
                </span>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-1">
                <strong>Type:</strong> {item.type}
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-1">
                <strong>Location:</strong> {item.sector}
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                {item.description}
              </p>
              {item.whatsapp && (
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  <strong>WhatsApp:</strong> {item.whatsapp}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-zinc-500 dark:text-zinc-400 col-span-full">
            No items match your filters.
          </p>
        )}
      </div>
    </div>
  );
}

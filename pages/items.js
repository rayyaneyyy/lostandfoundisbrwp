import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { ref, onValue, set } from "firebase/database";

export default function Items() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const itemsRef = ref(db, "items");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedItems = Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));
        setItems(loadedItems.reverse());
      } else {
        setItems([]);
      }
    });
  }, []);

  const handleClaimToggle = async (item) => {
    const newStatus = item.status === "claimed" ? "lost" : "claimed";
    const itemRef = ref(db, `items/${item.id}`);
    await set(itemRef, { ...item, status: newStatus });
  };

  const filtered = items
    .filter((item) => {
      const textMatch = (
        item.title +
        item.category +
        item.sector +
        item.description
      )
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "all" ? true : item.status === statusFilter;

      const sectorMatch =
        sectorFilter === "all"
          ? true
          : item.sector.toLowerCase() === sectorFilter.toLowerCase();

      return textMatch && statusMatch && sectorMatch;
    })
    .slice(0, visibleCount);

  const getCategoryColor = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("wallet")) return "bg-yellow-200 text-yellow-800";
    if (cat.includes("id") || cat.includes("card")) return "bg-blue-200 text-blue-800";
    if (cat.includes("phone")) return "bg-green-200 text-green-800";
    if (cat.includes("keys")) return "bg-red-200 text-red-800";
    if (cat.includes("bag")) return "bg-purple-200 text-purple-800";
    if (cat.includes("usb")) return "bg-pink-200 text-pink-800";
    if (cat.includes("charger")) return "bg-orange-200 text-orange-800";
    if (cat.includes("jewel")) return "bg-amber-200 text-amber-800";
    return "bg-gray-200 text-gray-800";
  };

  const allSectors = Array.from(new Set(items.map((i) => i.sector))).sort();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Lost & Found Items</h1>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search title, category, sector..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded w-full"
        />

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Sectors</option>
          {allSectors.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          {["all", "lost", "found", "claimed"].map((type) => (
            <button
              key={type}
              onClick={() => setStatusFilter(type)}
              className={`px-3 py-2 rounded text-sm ${
                statusFilter === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No matching items.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`border p-4 rounded-lg shadow-sm bg-white relative ${
                item.status === "claimed" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-semibold text-blue-700">{item.title}</h2>
                <span
                  className={`px-2 py-1 text-sm rounded ${getCategoryColor(item.category)}`}
                >
                  {item.category}
                </span>
              </div>
              <p className="text-gray-700"><strong>Sector:</strong> {item.sector}</p>
              <p className="text-gray-700"><strong>Description:</strong> {item.description}</p>
              <p className="text-green-600">
                <strong>WhatsApp:</strong>{" "}
                <a
                  href={`https://wa.me/${item.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.whatsapp}
                </a>
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Status:{" "}
                <span
                  className={`font-medium ${
                    item.status === "lost"
                      ? "text-red-500"
                      : item.status === "found"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {item.status?.toUpperCase() || "N/A"}
                </span>{" "}
                • {new Date(item.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => handleClaimToggle(item)}
                className="absolute top-3 right-3 text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                {item.status === "claimed" ? "Unclaim" : "Mark Claimed"}
              </button>
            </div>
          ))}
        </div>
      )}

      {filtered.length < items.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

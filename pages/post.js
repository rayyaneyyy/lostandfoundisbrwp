import { useState } from "react";
import { db } from "../firebase-config";
import { push, ref as dbRef } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

export default function Post() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    sector: "",
    description: "",
    whatsapp: "",
    type: "Lost",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemId = uuidv4();

    const newItem = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    await push(dbRef(db, "items"), newItem);
    alert("Item posted successfully!");
    setFormData({
      title: "",
      category: "",
      sector: "",
      description: "",
      whatsapp: "",
      type: "Lost",
    });
  };

  const categories = [
    "CNIC", "Wallet", "Phone", "Keys", "ATM Card", "Documents", "Other"
  ];

  const locations = [
    // Islamabad sectors
    ...["G-5","G-6","G-7","G-8","G-9","G-10","G-11","G-12","G-13","G-14","G-15","G-16"],
    ...["F-5","F-6","F-7","F-8","F-9","F-10","F-11","F-12","F-13","F-14","F-15"],
    ...["H-8","H-9","H-10","H-11","H-12"],
    ...["I-8","I-9","I-10","I-11","I-12","I-14","I-15","I-16"],
    ...["D-12","E-11","E-10","E-9","E-8"],

    // Rawalpindi areas
    "Saddar", "Committee Chowk", "Khurram Colony", "Muslim Town", "Satellite Town",
    "Faizabad", "Marrir", "Peshawar Road", "Chaklala", "Tench Bhatta", "Commercial Market",

    // DHA/Bahria phases
    ...["DHA Phase 1","DHA Phase 2","DHA Phase 3","DHA Phase 4","DHA Phase 5"],
    ...["Bahria Town Phase 1","Bahria Town Phase 2","Bahria Town Phase 3","Bahria Town Phase 4","Bahria Town Phase 5","Bahria Town Phase 6","Bahria Town Phase 7","Bahria Town Phase 8"],

    // Societies
    "PWD", "Media Town", "Pakistan Town", "Soan Gardens", "Gulraiz", "Ghauri Town",

    // Universities/Colleges
    "CUST", "NUST", "FAST", "COMSATS", "Air University", "Bahria University",
    "Roots International (G-8)", "Roots Millennium (PWD)", "Beaconhouse (F-10)",

    // Hospitals (branches)
    "Shifa International", "PIMS", "Holy Family", "Benazir Bhutto Hospital", "Maroof Hospital", "Ali Medical (F-8)",

    // Parks/Malls
    "F-9 Park", "Lake View Park", "Ayub Park", "Giga Mall", "Centaurus", "Safa Gold", "Amazon Mall", "Rabi Center", "Panorama Center",

    // Other
    "Other"
  ];

  return (
    <div className="max-w-xl mx-auto p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-rose-700 dark:text-rose-300">
        Post Lost or Found Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <input
          type="text"
          name="title"
          placeholder="Item Title"
          onChange={handleChange}
          value={formData.title}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Category of Item</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Location / Place</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp Number"
          onChange={handleChange}
          value={formData.whatsapp}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-rose-600 text-white px-4 py-2 rounded w-full hover:bg-rose-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

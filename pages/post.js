import { useState } from "react";
import { db } from "../firebase-config";
import { push, ref as dbRef } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const categories = [
  "CNIC", "Wallet", "Phone", "Keys", "ATM Card", "Documents", "Other"
];

const locations = [
  "G-6", "G-7", "G-8", "G-9", "G-10", "G-11", "G-12", "G-13", "G-14",
  "F-6", "F-7", "F-8", "F-9", "F-10", "F-11", "F-12",
  "E-7", "E-8", "E-9", "E-10", "E-11", "E-12",
  "I-8", "I-9", "I-10", "I-11", "I-12", "I-14",
  "H-8", "H-9", "H-10", "H-11", "H-12",
  "PWD", "Media Town", "Bahria Town Phase 1-8", "DHA Phase 1-6",
  "Saddar", "Satellite Town", "Khurram Colony", "Muslim Town",
  "CUST", "FAST", "NUST", "COMSATS", "Air University",
  "Centaurus Mall", "Giga Mall", "Safa Gold Mall", "Amazon Mall",
  "Faisal Mosque", "Lake View Park", "Fatima Jinnah Park",
  "Other"
];

export default function Post() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    sector: "",
    description: "",
    whatsapp: "",
    type: "",
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
      id: itemId,
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
      type: "",
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 p-6">
      <h2 className="text-3xl font-bold text-center text-rose-600 dark:text-rose-300 mb-6">
        Post a Lost or Found Item
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Item Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white"
        >
          <option value="">Select Type (Lost / Found)</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white"
        >
          <option value="">Category of Item</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white"
        >
          <option value="">Location / Place</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white"
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp Number"
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full p-3 border rounded dark:bg-zinc-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

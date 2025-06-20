import { useState } from "react";
import { db, storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { push, ref as dbRef } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

export default function Post() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    sector: "",
    description: "",
    whatsapp: "",
    status: "lost",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemId = uuidv4();
    let imageUrl = "";

    if (formData.image) {
      const imageRef = ref(storage, `items/${itemId}`);
      const snapshot = await uploadBytes(imageRef, formData.image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const newItem = {
      ...formData,
      imageUrl,
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
      status: "lost",
      image: null,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Post Lost or Found Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Item Title"
          onChange={handleChange}
          value={formData.title}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Wallet, ID)"
          onChange={handleChange}
          value={formData.category}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="sector"
          placeholder="Sector (e.g. F-10)"
          onChange={handleChange}
          value={formData.sector}
          className="w-full p-2 border rounded"
          required
        />

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

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

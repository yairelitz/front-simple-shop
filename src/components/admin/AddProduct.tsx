// import { useState } from "react";
// import { createProduct } from "../../services/admin.service";
// import { useNavigate } from "react-router-dom";

// function AddProduct() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     sku: "",
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     category: "",
//     image: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await createProduct({
//         ...form,
//         price: Number(form.price),
//         stock: Number(form.stock),
//       });

//       // חזרה לטבלה אחרי יצירה
//       navigate("/admin/products");
//     } catch (err) {
//       console.error(err);
//     }
//   };

// return (
  
//   <div className="add-product-page">
//     <div className="add-product-card">
//       <h2 className="add-product-title">Add Product</h2>

//       <form className="add-product-form" onSubmit={handleSubmit}>

//         <div className="add-product-row">
//           <label>SKU</label>
//           <input
//             name="sku"
//             placeholder="SKU"
//             value={form.sku}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="add-product-row">
//           <label>Name</label>
//           <input
//             name="name"
//             placeholder="Product name"
//             value={form.name}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="add-product-row">
//           <label>Description</label>
//           <input
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="add-product-row">
//           <label>Price</label>
//           <input
//             name="price"
//             placeholder="Price"
//             value={form.price}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="add-product-row">
//           <label>Stock</label>
//           <input
//             name="stock"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="add-product-row">
//           <label>Category</label>
//           <input
//             name="category"
//             placeholder="Category"
//             value={form.category}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="add-product-row">
//           <label>Image URL</label>
//           <input
//             name="image"
//             placeholder="https://..."
//             value={form.image}
//             onChange={handleChange}
//           />
//         </div>

//         <button className="add-product-submit" type="submit">
//           Create Product
//         </button>
//       </form>
//     </div>
//   </div>
// );
// }

// export default AddProduct;

import { useState } from "react";
import { createProduct } from "../../services/admin.service";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sku: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const uploadImage = async (file: File) => {
    const data = new FormData();

    data.append("file", file);
    data.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const result = await response.json();

    return result.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUploading(true);

      let imageUrl = form.image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await createProduct({
        ...form,
        image: imageUrl,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">

        <h2 className="add-product-title">
          Add Product
        </h2>

        <form
          className="add-product-form"
          onSubmit={handleSubmit}
        >

          <div className="add-product-row">
            <label>SKU</label>

            <input
              name="sku"
              placeholder="SKU"
              value={form.sku}
              onChange={handleChange}
            />
          </div>

          <div className="add-product-row">
            <label>Name</label>

            <input
              name="name"
              placeholder="Product name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="add-product-row">
            <label>Description</label>

            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="add-product-row">
            <label>Price</label>

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="add-product-row">
            <label>Stock</label>

            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <div className="add-product-row">
            <label>Category</label>

            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          {/* Image upload */}
          <div className="add-product-row">
            <label>Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {preview && (
              <div className="product-image-preview">
                <img
                  src={preview}
                  alt="Product preview"
                />
              </div>
            )}
          </div>

          <button
            className="add-product-submit"
            type="submit"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Create Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;

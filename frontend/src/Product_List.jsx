import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://product-demo-1.onrender.com/product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải sản phẩm...</p>;

  return (
    <div style={styles.container}>
      {products.length === 0 ? (
        <p>Không có sản phẩm nào</p>
      ) : (
        products.map((p) => (
          <div key={p.product_id} style={styles.card}>
            <img src={p.image_url} alt={p.name} style={styles.image} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>
              <b>Giá:</b> {p.price.toLocaleString()} VNĐ
            </p>
            <p>
              <b>Tồn kho:</b> {p.stock}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    background: "#fff",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
  },
};

export default ProductList;

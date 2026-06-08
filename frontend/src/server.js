export const server =
  process.env.REACT_APP_BACKEND_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://e-shop-project-8ajp.onrender.com/api/v2"
    : "http://localhost:8000/api/v2");
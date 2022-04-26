import axios from "axios";
const PORT = process.env.PORT || 5000;

export default axios.create({
  // baseURL: `http://localhost:${PORT}/api/v1/restaurants`,
  baseURL:
    "https://ap-southeast-1.aws.data.mongodb-api.com/app/restaurant-reviews-mkyrn/endpoint/",
  headers: {
    "Content-type": "application/json",
  },
});

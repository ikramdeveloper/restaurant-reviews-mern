import api from "../axiosApi";

class RestaurantDataService {
  getAll(page = 0) {
    // return api.get(`?page=${page}`);
    return api.get(`restaurants?page=${page}`);
  }

  get(id) {
    // return api.get(`/id/${id}`);
    return api.get(`/restaurant?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    // return api.get(`?${by}=${query}&page=${page}`);
    return api.get(`restaurants?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    // return api.post("/review", data);
    return api.post("/add_review", data);
  }

  updateReview(data) {
    // return api.put("/review", data);
    return api.put("/edit_review", data);
  }

  deleteReview(id) {
    // return api.delete(`/review?id=${id}`);
    return api.delete(`/delete_review?id=${id}`);
  }

  getCuisines() {
    return api.get("/cuisines");
  }
}

export default new RestaurantDataService();

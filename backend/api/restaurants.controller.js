import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
  static async apiGetRestaurants(req, resp) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      });

    let response = {
      restaurants: restaurantsList,
      page,
      filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    };
    resp.json(response);
  }

  static async apiGetRestaurantById(req, resp) {
    try {
      let id = req.params.id || {};
      let restaurant = await RestaurantsDAO.getRestaurantById(id);
      if (!restaurant) {
        return resp.status(404).json({ error: "Not found" });
      }
      resp.json(restaurant);
    } catch (err) {
      console.log(`api: ${err}`);
      resp.status(500).json({ error: err });
    }
  }

  static async apiGetRestaurantCuisines(req, resp) {
    try {
      const cuisines = await RestaurantsDAO.getCuisines();
      resp.json(cuisines);
    } catch (err) {
      console.log(`api ${err}`);
      resp.status(500).json({ error: err });
    }
  }
}

import { useState, useEffect } from "react";
import RestaurantDataService from "../services/Restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    zip: "",
    cuisine: "",
  });
  const [searchValue, setSearchValue] = useState({ query: "", by: "" });
  const [searchPage, setSearchPage] = useState(0);
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  useEffect(() => {
    findByPage();
  }, [searchPage]);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchQuery({ ...searchQuery, name: searchName });
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchQuery({ ...searchQuery, zip: searchZip });
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchQuery({ ...searchQuery, cuisine: searchCuisine });
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((resp) => {
        console.log(resp.data);
        setRestaurants(resp.data.restaurants);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((resp) => {
        console.log(resp.data);
        setCuisines((prev) => prev.concat(resp.data));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by, page) => {
    RestaurantDataService.find(query, by, page)
      .then((resp) => {
        console.log(resp.data);
        setRestaurants(resp.data.restaurants);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const findByName = () => {
    find(searchQuery.name, "name");
    setSearchValue({ ...searchValue, query: searchQuery.name, by: "name" });
  };

  const findByZip = () => {
    find(searchQuery.zip, "zipcode");
    setSearchValue({ ...searchValue, query: searchQuery.zip, by: "zipcode" });
  };

  const findByCuisine = () => {
    if (searchQuery.cuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchQuery.cuisine, "cuisine");
      setSearchValue({
        ...searchValue,
        query: searchQuery.cuisine,
        by: "cuisine",
      });
    }
  };

  const findByPage = () => {
    find(searchValue.query, searchValue.by, searchPage);
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search By Name"
            value={searchQuery.name}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search By Zip"
            value={searchQuery.zip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine, index) => (
              <option key={index} value={cuisine}>
                {cuisine.substring(0, 20)}
              </option>
            ))}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1" key={restaurant._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine} <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={`/restaurants/${restaurant._id}`}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      href={"https://www.google.com/maps/place/" + address}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row">
        <div className="col-lg-4 pb-1 d-flex justify-content-center">
          <button
            className="btn btn-primary mx-1"
            value="0"
            onClick={(e) => {
              setSearchPage(e.target.value);
            }}
          >
            0
          </button>
          <button
            className="btn btn-primary mx-1"
            value="1"
            onClick={(e) => {
              setSearchPage(e.target.value);
            }}
          >
            1
          </button>
          <button
            className="btn btn-primary mx-1"
            value="2"
            onClick={(e) => {
              setSearchPage(e.target.value);
            }}
          >
            2
          </button>
          <button
            className="btn btn-primary mx-1"
            value="3"
            onClick={(e) => {
              setSearchPage(e.target.value);
            }}
          >
            3
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsList;

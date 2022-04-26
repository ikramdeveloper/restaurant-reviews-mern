import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/Restaurant";
import { Link, useParams } from "react-router-dom";

const Restaurant = ({ user }) => {
  const { id } = useParams();

  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = (restId) => {
    RestaurantDataService.get(restId)
      .then((resp) => {
        console.log(resp.data);
        setRestaurant(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId)
      .then((resp) => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1);
          return { ...prevState };
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      {restaurant.name ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>
            {restaurant.cuisine} <br />
            <strong>Address: </strong>
            {restaurant.address.building} {restaurant.address.street},{" "}
            {restaurant.address.zipcode}
          </p>
          <Link to={`/restaurants/${id}/review`} className="btn btn-primary">
            Add Review
          </Link>
          <h4>Reviews</h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => (
                <div className="col-lg-4 pb-1" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">
                        {review.text} <br />
                        <strong>User: </strong>
                        {review.name} <br />
                        <strong>Date: </strong>
                        {review.date}
                      </p>
                      {user && user.id === review.user_id && (
                        <div className="row">
                          <button
                            onClick={() => deleteReview(review._id, index)}
                            className="btn btn-primary  col-lg-5 mx-1 mb-1"
                          >
                            Delete
                          </button>
                          <Link
                            className="btn btn-primary col-lg-5 mx-1 mb-1"
                            to={`/restaurants/${id}/review`}
                            state={{ currentReview: review }}
                          >
                            Edit
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant found</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;

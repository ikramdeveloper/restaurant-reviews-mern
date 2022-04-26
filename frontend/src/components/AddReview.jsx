import { useState, useEffect } from "react";
import RestaurantDataService from "../services/Restaurant";
import { Link, useParams, useLocation } from "react-router-dom";

const AddReview = ({ user }) => {
  const { id } = useParams();
  const location = useLocation();

  let initialReviewState = "";
  let editing = false;

  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setReview(initialReviewState);
  }, [initialReviewState]);

  const handleInputChange = (e) => {
    setReview(e.target.value);
  };

  const saveReview = (e) => {
    e.preventDefault();

    const data = {
      text: review,
      name: user.name,
      user_id: user.id,
      restaurant_id: id,
    };

    if (editing) {
      data.review_id = location.state.currentReview._id;
      RestaurantDataService.updateReview(data)
        .then((resp) => {
          setSubmitted(true);
          console.log(resp.data);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then((resp) => {
          setSubmitted(true);
          console.log(resp.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <div>
      {user ? (
        <div>
          {submitted ? (
            <div>
              <h4>You submitted successfully</h4>
              <Link to={`/restaurants/${id}`} className="btn btn-success">
                Back to restaurant
              </Link>
            </div>
          ) : (
            <form className="submit-form" onSubmit={saveReview}>
              <div className="form-group">
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  name="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-success mt-2">
                Submit
              </button>
            </form>
          )}
        </div>
      ) : (
        <div>
          <p className="mt-5">Plese login </p>
        </div>
      )}
    </div>
  );
};

export default AddReview;

import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, resp) {
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };

      const date = new Date();

      const reviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date
      );
      resp.json({ status: "success" });
    } catch (err) {
      resp.status(500).json({ err: err.message });
    }
  }

  static async apiUpdateReview(req, resp) {
    try {
      const reviewId = req.body.review_id;
      const text = req.body.text;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        text,
        date
      );

      const { error } = reviewResponse;
      if (error) {
        resp.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review");
      }

      resp.json({ status: "success" });
    } catch (err) {
      resp.status(500).json({ error: err.message });
    }
  }

  static async apiDeleteReview(req, resp) {
    try {
      const reviewId = req.query.id;
      console.log(reviewId);
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      resp.json({ status: "success" });
    } catch (err) {
      resp.status(500).json({ err: err.message });
    }
  }
}

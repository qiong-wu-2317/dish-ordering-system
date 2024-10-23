import express from 'express';
import * as db from "../db/api.js";


const router = express.Router();


/* GET home page. */
router.get("/", async function (req, res, next) {
    res.redirect("/restaurants");
});

// http://localhost:3000/references?pageSize=24&page=3&q=John
router.get("/restaurants", async (req, res, next) => {
    const query = req.query.query || "";
    const currentPage = +req.query.currentPage || 1;
    const pageSize = +req.query.pageSize || 12;
    const msg = req.query.msg || null;
    try {
      let total = await db.getRestaurantCount(query);
      let restaurants = await db.getRestaurants(query, currentPage, pageSize);
      res.render("./pages/restaurants", {
        restaurants,
        query,
        msg,
        currentPage,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      });
    } catch (err) {
      next(err);
    }
});

  

export default router;
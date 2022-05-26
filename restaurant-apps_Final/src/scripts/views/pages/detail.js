/* eslint-disable quotes */
/* eslint-disable operator-linebreak */
import UrlParser from "../../routes/url-parser";
import ResrtaurentSource from "../../data/restaurant-source";
import { createRestaurantDetailTemplate } from "../templates/creator-template";
import LikeButtonPresenter from "../../utils/like-button-presenter";

const Detail = {
  async render() {
    return `
      <div id="loading"></div>
      <div id="restaurant" class="restaurant container"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const loading = document.querySelector("#loading");
    const restaurantContainer = document.querySelector("#restaurant");
    loading.innerHTML = '<div class="loader"></div>';

    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await ResrtaurentSource.detailRestaurant(url.id);
      restaurantContainer.innerHTML =
        createRestaurantDetailTemplate(restaurant);

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector("#likeButtonContainer"),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          city: restaurant.city,
          address: restaurant.address,
          description: restaurant.description,
          menus: restaurant.menus,
          customerReview: restaurant.customerReview,
        },
      });
      loading.style.display = "none";
    } catch (err) {
      loading.style.display = "none";
      restaurantContainer.innerHTML = `Error: ${err}, swipe up to refresh!`;
    }
  },
};

export default Detail;

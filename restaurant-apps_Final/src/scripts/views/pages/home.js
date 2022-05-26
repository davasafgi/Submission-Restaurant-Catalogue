/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
import RestaurantResource from "../../data/restaurant-source";
import { createRestaurantItemTemplate } from "../templates/creator-template";

const Home = {
  async render() {
    return `
    <section id="hero">
        <div class="hero-content">
            <h1 class="hero-title">Spoon & Fork Catalogue</h1>
            <p class="hero-tag">Explore and Find The Best Restaurant For You</p>
        </div>
    </section>

    <div class="container">
      <div id="loading">
      
      </div>
      <section id="post-list" class="post-list">

      </section>
    </div>
    `;
  },

  async afterRender() {
    const loading = document.querySelector("#loading");
    const restaurantsContainer = document.querySelector("#post-list");

    loading.innerHTML = '<div class="loader"></div>';

    try {
      const restaurants = await RestaurantResource.listRestaurants();
      restaurants.forEach((Restaurant) => {
        restaurantsContainer.innerHTML +=
          createRestaurantItemTemplate(Restaurant);
      });
      loading.style.display = "none";
    } catch (err) {
      loading.style.display = "none";
      restaurantsContainer.innerHTML = `Error: ${err}, swipe up to refresh!`;
    }
  },
};

export default Home;

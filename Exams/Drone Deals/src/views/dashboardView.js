import { renderMain, html } from "../lib/lit-html.js";

import { getAllStock } from "../api/dataApi.js";

const template = (droneStockArr) => html`
 <!-- Dashboard page -->
 <h3 class="heading">Marketplace</h3>
      <section id="dashboard">
      ${droneStockArr.map(drone => html`
    <!-- Display a div with information about every post (if any)-->
    <div class="drone">
          <img src=${drone.imageUrl} alt=${drone.item} />
          <h3 class="model">${drone.model}</h3>
          <div class="drone-info">
            <p class="price">Price: €${drone.price}</p>
            <p class="condition">Condition: ${drone.condition}</p>
            <p class="weight">Weight: ${drone.weight}g</p>
          </div>
          <a class="details-btn" href="/details/${drone._id}">Details</a>
        </div>
      </section>
    `)}
        ${droneStockArr.length === 0
    ? html`
      <!-- Display an h2 if there are no posts -->
      <h3 class="no-drones">No Drones Available</h3>
          `
    : ''
  }
`;

export default async function dashBoardView() {
  const droneStockArr = await getAllStock();

  renderMain(template(droneStockArr));
}

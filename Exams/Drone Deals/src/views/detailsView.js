import { renderMain, html } from "../lib/lit-html.js";

import { getOne } from "../api/dataApi.js";
import { getUserData } from "../utils/userUtils.js";

const template = (drone, isOwner) => html`
<!-- Details page -->

<section id="details">
        <div id="details-wrapper">
          <div>
            <img id="details-img" src=${drone.imageUrl} alt=${drone.item} />
            <p id="details-model">${drone.model}</p>
          </div>
          <div id="info-wrapper">
            <div id="details-description">
              <p class="details-price">Price: €${drone.price}</p>
              <p class="details-condition">Condition: ${drone.condition}</p>
              <p class="details-weight">Weight: ${drone.weight}g</p>
              <p class="drone-description">${drone.description}</p>
              <p class="phone-number">Phone: ${drone.phone}</p>
            </div>
            <!--Edit and Delete are only for creator-->
            ${isOwner
                ? html`
                <div class="buttons">
              <a href="/edit/${drone._id}" id="edit-btn">Edit</a>
              <a href="/delete/${drone._id}" id="delete-btn">Delete</a>
            </div>
                `
                : ''
            }
          </div>
        </div>
      </section>
`;

export default async function detailsView(ctx) {
    const { itemId } = ctx.params;
    const { userId } = getUserData();

    const drone = await getOne(itemId);
    const isOwner = drone._ownerId === userId;
    
    renderMain(template(drone, isOwner));
}
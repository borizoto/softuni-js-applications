import { renderMain, html } from "../lib/lit-html.js";

import { getOne } from "../api/dataApi.js";
import { getUserData } from "../utils/userData.js";

const template = (item, isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <div>
              <img id="details-img" src=${item.imageUrl} alt=${item.item} />
              <p id="details-title">${item.item}</p>
            </div>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="details-price">Price: €${item.price}</p>
                <p class="details-availability">${item.availability}</p>
                <p class="type">Type: ${item.type}</p>
                <p id="item-description">${item.description}</p>
              </div>
              <!--Edit and Delete are only for creator-->

              ${isOwner
                ? html`
                <div id="action-buttons">
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a href="/delete/${item._id}" id="delete-btn">Delete</a>
              </div>
                `
                : ''
              }
            </div>
          </div>
        </section>
`;

export default async function detailsView(ctx) {
    const {itemId} = ctx.params
    const {userId} = getUserData();

    const item = await getOne(itemId)

    const isOwner = item._ownerId === userId;
    renderMain(template(item, isOwner));
}
import { renderMain, html } from "../lib/lit-html.js";

import { getAll } from "../api/dataApi.js";

const template = (items) => html`
     <!-- Dashboard page -->
     <h3 class="heading">Market</h3>

        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
           ${items.map(item => html`
            <div class="item">
            <img src=${item.imageUrl} alt="example1" />
            <h3 class="model">${item.item}</h3>
            <div class="item-info">
              <p class="price">Price: €${item.price}</p>
              <p class="availability">${item.availability}</p>
              <p class="type">Type: ${item.type}</p>
            </div>
            <a class="details-btn" href="/details/${item._id}">Uncover More</a>
          </div>
        </section>`)}
        ${items.length === 0
        ? html`<!-- Display an h2 if there are no posts -->
                <h3 class="empty">No Items Yet</h3>`
        : ''
    }
        
`;

export default async function dashboardView(ctx) {
    const items = await getAll();

    renderMain(template(items));
}

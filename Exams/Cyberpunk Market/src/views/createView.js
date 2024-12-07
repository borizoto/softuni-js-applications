import { renderMain, html } from "../lib/lit-html.js";
import notificator from "../lib/notificator.js";

import { create } from "../api/dataApi.js";

const template = (onSubmit) => html`
      <!-- Create Page (Only for logged-in users) -->
      <section id="create">
          <div class="form form-item">
            <h2>Share Your item</h2>
            <form @submit=${onSubmit} class="create-form">
              <input type="text" name="item" id="item" placeholder="Item" />
              <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" />
              <input type="text" name="price" id="price" placeholder="Price in Euro" />
              <input type="text" name="availability" id="availability" placeholder="Availability Information" />
              <input type="text" name="type" id="type" placeholder="Item Type" />
              <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50"></textarea>
              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;

export default function createView(ctx) {
    renderMain(template(createHandler.bind(ctx)));
}

async function createHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!Object.values(data).every(value => !!value)) {
        // return alert("All fields are required!");
        return notificator('All fields are required!');
    }

    try {
        await create(data);
        this.page.redirect('/dashboard');
    } catch (error) {
        alert(error.message)
    }
}
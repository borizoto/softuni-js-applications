import { renderMain, html } from "../lib/lit-html.js";
import notification from "../lib/notificator.js";

import { create } from "../api/dataApi.js";

const template = (onSubmit) => html`
   <!-- Create Page (Only for logged-in users) -->
   <section id="create">
        <div class="form form-item">
          <h2>Add Drone Offer</h2>
          <form @submit=${onSubmit} class="create-form">
            <input type="text" name="model" id="model" placeholder="Drone Model" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="number" name="price" id="price" placeholder="Price" />
            <input type="number" name="weight" id="weight" placeholder="Weight" />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
            <input type="text" name="condition" id="condition" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description"></textarea>
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
        // return alert('All fields must be filled!');
        return notification('All fields must be filled!');
    }

    try {
        await create(data);

        this.page.redirect('/dashboard');
    } catch (error) {
        alert(error.message);
    }
}
import { renderMain, html } from "../lib/lit-html.js";
import notification from "../lib/notificator.js";

import { edit, getOne } from "../api/dataApi.js";

const template = (drone, onSubmit) => html`
<!-- Edit Page (Only for logged-in users) -->
      <section id="edit">
        <div class="form form-item">
          <h2>Edit Offer</h2>
          <form @submit=${onSubmit} class="edit-form">
            <input type="text" value= ${drone.model} name="model" id="model" placeholder="Drone Model" />
            <input type="text" value= ${drone.imageUrl} name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="number" value= ${drone.price} name="price" id="price" placeholder="Price" />
            <input type="number" value= ${drone.weight} name="weight" id="weight" placeholder="Weight" />
            <input type="number" value= ${drone.phone} name="phone" id="phone" placeholder="Phone Number for Contact" />
            <input type="text" value= ${drone.condition} name="condition" id="condition" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description">${drone.description}</textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
`;

export default async function editView(ctx) {
    const { itemId } = ctx.params;
    const drone = await getOne(itemId);

    renderMain(template(drone, editHandler.bind(ctx)));
}

async function editHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!Object.values(data).every(value => !!value)) {
        // return alert('All fields must be filled!');
        return notification('All fields are required!');
    }
    
    try {
        const { itemId } = this.params;
        await edit(data, itemId);

        this.page.redirect(`/details/${itemId}`);
    } catch (error) {
        alert(error.message);
    }
}
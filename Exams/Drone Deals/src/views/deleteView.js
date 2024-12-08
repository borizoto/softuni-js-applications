import { deleteDrone } from "../api/dataApi.js";

export default async function deleteView(ctx) {

    const droneModel = document.getElementById('details-model').textContent;
    const isConfirmed = confirm(`Are you sure you want to delete ${droneModel}?`);

    if (!isConfirmed) {
        return;
    }

    const { itemId } = ctx.params;
    await deleteDrone(itemId);

    ctx.page.redirect('/dashboard');
}
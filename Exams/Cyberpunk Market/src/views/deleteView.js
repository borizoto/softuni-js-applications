import { deleteItem } from "../api/dataApi.js";

export default async function deleteView(ctx) {
    try {
        const {itemId} = ctx.params;
        const itemName = document.getElementById('details-title').textContent;

        const confirmDelete = confirm(`Are you sure you want to delete ${itemName}?`);

        if (!confirmDelete) {
            return;
        }

        await deleteItem(itemId);
        
        ctx.page.redirect('/dashboard');
    } catch (error) {
        alert(error.message);
    }
}
import { render as baseRender, html} from '../../node_modules/lit-html/lit-html.js';

const mainElementRef = document.getElementById('main-element');

export const renderMain = (template) => baseRender(template, mainElementRef);

export {html, baseRender};
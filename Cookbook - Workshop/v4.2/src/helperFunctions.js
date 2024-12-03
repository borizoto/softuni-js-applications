export function elementFactory(type, attributes, ...children) {
    const element = document.createElement(type);

    for (const key in attributes) {
        if (key.startsWith("on") && typeof attributes[key] === "function") {
            const eventType = key.slice(2).toLowerCase(); 
            element.addEventListener(eventType, attributes[key]);
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }

    children.forEach(child => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });

    return element;
}
function getInfo() {
    const inputRef = document.getElementById('stopId');
    const displayDivRef = document.getElementById("stopName");
    const unorderedListRef = document.getElementById("buses");

    unorderedListRef.textContent = "";

    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputRef.value}`;

    fetch(url)
        .then(response => response.json())
        .then(dataObj => {
            const stopName = dataObj.name;
            const busesInfo = Object.entries(dataObj.buses);

            displayDivRef.textContent = stopName;
            busesInfo.forEach(bus => {
                const busId = bus[0];
                const arrivalTime = bus[1];

                const liElement = document.createElement('li');
                liElement.textContent = `Bus ${busId} arrives in ${arrivalTime} minutes`;

                unorderedListRef.appendChild(liElement);
            });
        })
        .catch(error => displayDivRef.textContent = "Error");

    inputRef.value = "";
}
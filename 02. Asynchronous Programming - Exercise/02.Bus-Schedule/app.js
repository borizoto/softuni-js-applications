function solve() {

    const infoBoxRef = document.querySelector('.info');
    const departBtnRef = document.getElementById('depart');
    const arriveBtnRef = document.getElementById('arrive');

    const currentStopObj = { next: "depot" };

    function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${currentStopObj.next}`;

        fetch(url)
            .then(response => response.json())
            .then(dataObj => {
                currentStopObj.next = dataObj.next;
                currentStopObj.name = dataObj.name;

                infoBoxRef.textContent = `Next stop: ${currentStopObj.name}`;
                departBtnRef.disabled = true;
                arriveBtnRef.disabled = false;
            })
    }

    function arrive() {
        infoBoxRef.textContent = `Arriving at: ${currentStopObj.name}`;

        departBtnRef.disabled = false;
        arriveBtnRef.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
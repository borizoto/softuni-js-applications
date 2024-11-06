function attachEvents() {
    const refreshBtnRef = document.getElementById("refresh");
    const sendBtnRef = document.getElementById("submit");
    const textAreaRef = document.getElementById("messages");

    const url = " http://localhost:3030/jsonstore/messenger";

    refreshBtnRef.addEventListener("click", loadMessages);
    sendBtnRef.addEventListener("click", sendMessage)

    async function loadMessages() {
        const response = await fetch(url);
        const dataObj = await response.json();

        const messagesArr = Object.values(dataObj).map(({ author, content }) => `${author}: ${content}`).join("\n");
        textAreaRef.textContent = messagesArr;
    }

    async function sendMessage() {
        const nameInputRef = document.getElementsByName("author")[0];
        const messageInputRef = document.getElementsByName("content")[0];

        if (nameInputRef.value !== "" && messageInputRef.value !== "") {
            await fetch(url, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    author: nameInputRef.value,
                    content: messageInputRef.value
                })
            })
            
        nameInputRef.value = "";
        messageInputRef.value = ""
        }
    }
}

attachEvents();
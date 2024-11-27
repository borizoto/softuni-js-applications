import elementFactory from "./helperFunctions.js";

function home() {
    const mainRef = document.querySelector("main");
    const mainFormRef = document.querySelector(".new-topic-border form");
    const topicTitleRef = document.querySelector(".topic-title");
    const newTopicFormRef = document.querySelector(".new-topic-border");
    const allTopicsContainerRef = document.querySelector(".topic-title");
    const url = `http://localhost:3030/jsonstore/collections/myboard`;

    let allTopicsObj = {};

    topicTitleRef.innerHTML = "";

    mainFormRef.addEventListener("submit", createTopic);

    function createTopic(event) {
        event.preventDefault();
        const actionOnBtn = event.submitter.textContent

        if (actionOnBtn === "Cancel") {
            event.target.reset();
        } else if (actionOnBtn === "Post") {
            const formData = new FormData(event.target);
            const { postText, topicName, username } = Object.fromEntries(formData);

            if (!postText || !topicName || !username) {
                return alert("All fields must be fullfilled!");
            }

            const now = new Date();

            const day = String(now.getDate()).padStart(2, "0");
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const year = now.getFullYear();

            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");

            const date = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

            fetch(`${url}/posts`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    postText,
                    topicName,
                    username,
                    date
                })
            })
                .then(response => response.json())
                .then(dataObj => {
                    event.target.reset();
                    loadAllTopics();
                })
        }
    }

    function loadAllTopics() {
        fetch(`${url}/posts`)
            .then(response => response.json())
            .then(dataObj => {
                topicTitleRef.innerHTML = "";
                allTopicsObj = dataObj;
                Object.entries(dataObj).forEach(([id, obj]) => {

                    const topicContainer = elementFactory("div", { "class": "topic-container", id });
                    const topicNameWrapper = elementFactory("div", { "class": "topic-name-wrapper" });
                    const topicName = elementFactory("div", { "class": "topic-name" });
                    const a = elementFactory("a", { "class": "normal" })
                    const heading = elementFactory("h2", undefined, obj.topicName)

                    a.appendChild(heading);
                    topicName.appendChild(a);

                    const columns = elementFactory("div", { "class": "columns" });
                    const innerDiv = elementFactory("div");
                    const dateParagraph = elementFactory("p", undefined, "Date: ");
                    const timeElement = elementFactory("time", undefined, obj.date)

                    dateParagraph.appendChild(timeElement);

                    const nickNameDiv = elementFactory("div", { "class": "nick-name" });
                    const usernameParagraph = elementFactory("p", undefined, "Username: ");
                    const usernameSpan = elementFactory("span", undefined, obj.username)

                    usernameParagraph.appendChild(usernameSpan);
                    nickNameDiv.appendChild(usernameParagraph);
                    innerDiv.appendChild(dateParagraph);
                    innerDiv.appendChild(nickNameDiv);
                    columns.appendChild(innerDiv);
                    topicName.appendChild(columns);
                    topicNameWrapper.appendChild(topicName);
                    topicContainer.appendChild(topicNameWrapper);

                    topicContainer.addEventListener("click", openCurTopic)
                    topicTitleRef.appendChild(topicContainer);
                })
            })
    }

    function openCurTopic(event) {
        const clickedHtmlElement = event.currentTarget;
        const curTopicId = clickedHtmlElement.id;
        const curObj = allTopicsObj[curTopicId]

        newTopicFormRef.style.display = "none";
        allTopicsContainerRef.style.display = "none";

        const themeContentDiv = elementFactory("div", { "class": "theme-content" })
        const themeTitleDiv = elementFactory("div", { "class": "theme-title" })
        const themeNameWrapperDiv = elementFactory("div", { "class": "theme-name-wrapper" })
        const themeNameDiv = elementFactory("div", { "class": "theme-name" })
        const h2 = elementFactory("h2", undefined, curObj.topicName)

        themeNameDiv.appendChild(h2);
        themeNameWrapperDiv.appendChild(themeNameDiv);
        themeTitleDiv.appendChild(themeNameWrapperDiv);
        themeContentDiv.appendChild(themeTitleDiv);
        mainRef.appendChild(themeContentDiv);

        //Create OpenedTopic/comments
        const commentDiv = elementFactory("div", { "class": "comment" })
        const headerDiv = elementFactory("div", { "class": "header", "id": curTopicId })
        const img = elementFactory("img", { "src": "/static/profile.png", "alt": "avatar" })

        headerDiv.appendChild(img);

        const userInfoP = elementFactory("p");
        const userSpan = elementFactory("span", undefined, curObj.username);

        userInfoP.appendChild(userSpan);

        const textNode = document.createTextNode(" posted on ");
        userInfoP.appendChild(textNode);

        const time = elementFactory("time", undefined, curObj.date);

        userInfoP.appendChild(time);
        headerDiv.appendChild(userInfoP);

        const postContentP = elementFactory("p", { "class": "post-content" }, curObj.postText);

        headerDiv.appendChild(postContentP);
        commentDiv.appendChild(headerDiv);

        //add FORM!!!
        const addCommentDiv = elementFactory("div", { "class": "answer-comment" });
        const userCommentP = elementFactory("p");
        const commentUserSpan = elementFactory("span", undefined, "currentUser");

        userCommentP.appendChild(commentUserSpan);
        userCommentP.appendChild(document.createTextNode(" comment:"));
        addCommentDiv.appendChild(userCommentP);

        const answerDiv = elementFactory("div", { "class": "answer" });
        const addCommentForm = elementFactory("form");
        const textarea = elementFactory("textarea", { "name": "postText", "id": "comment", "cols": 30, "rows": 10 });

        addCommentForm.appendChild(textarea);

        const div = elementFactory("div");
        const label = elementFactory("label", { "for": "username" }, "Username ");
        const span = elementFactory("span", { "class": "red" }, "*");

        label.appendChild(span);

        const input = elementFactory("input", { "type": "text", "name": "username", "id": "username" });

        div.appendChild(label);
        div.appendChild(input);
        addCommentForm.appendChild(div);

        const button = elementFactory("button", undefined, "Post");

        addCommentForm.appendChild(button);

        addCommentForm.addEventListener("submit", addComment);

        answerDiv.appendChild(addCommentForm);
        addCommentDiv.appendChild(answerDiv);
        themeContentDiv.appendChild(commentDiv);
        themeContentDiv.appendChild(addCommentDiv);

        loadAllCommentsForPost();
    }

    function addComment(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { postText, username } = Object.fromEntries(formData);
        const ownerId = document.querySelector(".comment .header").id;

        const now = new Date();

        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        const date = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        fetch(`${url}/comments`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                postText,
                username,
                ownerId,
                date
            })
        })
            .then(response => response.json())
            .then(dataObj => {
                event.target.reset();

                const headerEl = document.querySelector(".comment .header");
                const commentElements = document.querySelector(".comment").children;

                Array.from(commentElements).forEach(child => {
                    if (child !== headerEl) {
                        child.remove();
                    }
                })

                loadAllCommentsForPost();
            })
    }

    function loadAllCommentsForPost() {
        fetch(`${url}/comments`)
            .then(response => response.json())
            .then(dataObj => {
                const post = document.querySelector(".comment .header");
                console.log(post.id)
                Object.values(dataObj).forEach(comment => {

                    if (comment.ownerId !== post.id) return;
                    // Create the main container div with ID "user-comment"
                    const userCommentDiv = elementFactory("div", { "id": "user-comment" });
                    const topicNameWrapperDiv = elementFactory("div", { "class": "topic-name-wrapper" });
                    const topicNameDiv = elementFactory("div", { "class": "topic-name" });
                    const commentParagraph = elementFactory("p");
                    const commenterStrong = elementFactory("strong", undefined, comment.username);

                    commentParagraph.appendChild(commenterStrong);
                    commentParagraph.appendChild(document.createTextNode(" commented on "));

                    const commentTime = elementFactory("time", undefined, comment.date);

                    commentParagraph.appendChild(commentTime);

                    const postContentDiv = elementFactory("div", { "class": "post-content" });
                    const commentContentParagraph = elementFactory("p", undefined, comment.postText);

                    postContentDiv.appendChild(commentContentParagraph);
                    topicNameDiv.appendChild(commentParagraph);
                    topicNameDiv.appendChild(postContentDiv);
                    topicNameWrapperDiv.appendChild(topicNameDiv);
                    userCommentDiv.appendChild(topicNameWrapperDiv);
                    document.querySelector(".comment").appendChild(userCommentDiv);
                })
            })
    }
    loadAllTopics();
}

home();
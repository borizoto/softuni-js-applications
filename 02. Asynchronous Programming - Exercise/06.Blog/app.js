function attachEvents() {
    const loadBtnRef = document.getElementById("btnLoadPosts");
    const viewBtnRef = document.getElementById("btnViewPost");
    const h1TitleRef = document.getElementById("post-title");
    const pBodyRef = document.getElementById("post-body");
    const ulCommentsRef = document.getElementById("post-comments");
    const postsRef = document.getElementById("posts");

    const postsUrl = "http://localhost:3030/jsonstore/blog/posts";
    const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";

    let postsObjCopy = {};

    loadBtnRef.addEventListener("click", async function () {
        const response = await fetch(postsUrl);
        const postsObj = await response.json();

        postsObjCopy = postsObj;

        postsRef.innerHTML = "";

        for (const key in postsObj) {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = postsObj[key].title;

            postsRef.appendChild(option);
        }
    })

    viewBtnRef.addEventListener("click", async function () {
        const response = await fetch(commentsUrl);
        const commentsObj = await response.json();
        
        const selectedPost = document.getElementById("posts").value;

        ulCommentsRef.innerHTML = "";

        for (const key in commentsObj) {
            if (commentsObj[key].postId === postsObjCopy[selectedPost].id) {
                const curComentLi = document.createElement("li");
                curComentLi.id = commentsObj[key].id;
                curComentLi.textContent = commentsObj[key].text;

                ulCommentsRef.appendChild(curComentLi);
            }
        }

        const curTitle = postsObjCopy[selectedPost].title;
        const curBody = postsObjCopy[selectedPost].body;

        h1TitleRef.textContent = curTitle;
        pBodyRef.textContent = curBody;
    })
}

attachEvents();
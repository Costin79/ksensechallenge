// Get the users.
 const fetchUsers = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if(!response.ok)
    {
        console.log(`Error ${response.status}`);
    }
    const users = await response.json();
    return users;
}


// Fill the table.
const fillTheTable = (users) => {
    users.forEach(user => addRow(user.id, user.name, user.username));
}

// Create a table row.
const addRow = (id, name, username) =>{
    
    const theTable = document.querySelector('.table');

    const nameText = document.createTextNode(name);
    const nameParagraph = document.createElement('p');
    nameParagraph.appendChild(nameText);

    const userNameText = document.createTextNode(username);
    const userNameParagraph = document.createElement('p');
    userNameParagraph.appendChild(userNameText);

    const userRow = document.createElement('div');
    userRow.id = id;
    userRow.classList.add("user");
    userRow.appendChild(nameParagraph);
    userRow.appendChild(userNameParagraph);

    userRow.addEventListener('click',() => displayPosts(id, name));

    theTable.appendChild(userRow);

}

// The displayPosts function called by the onClick event listener attached to the userRow div in the add row function.
const displayPosts = async (id, name) => {

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    if(!response.ok)
    {
        console.log(`Error ${response.status}`);
    }
    const postsData = await response.json();
    console.log(postsData);

    const postsContainer = document.querySelector(".noDisplay");
    const table = document.querySelector(".tableContainer")
    table.className = "noDisplay";
    postsContainer.className = "postsContainer";

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "x";
    closeBtn.className = "closeBtn";
    closeBtn.addEventListener('click', () => {
        // Get postsContainer's children nodes and put them in an array. 
        const childList = [...postsContainer.children];
        console.log(childList);
        // Remove the children nodes from the DOM.
        childList.forEach(child => postsContainer.removeChild(child));
        postsContainer.className = "noDisplay";
        table.className = "tableContainer";
        
    });
    postsContainer.appendChild(closeBtn);

    const postsTitle = document.createElement("h5");
    postsTitle.classList.add("postsTitle");
    const titleContent = document.createTextNode(`${name} posts`);
    postsTitle.appendChild(titleContent);
    postsContainer.appendChild(postsTitle);
    
    const posts = document.createElement("div");
    posts.classList.add("posts");

    // Create the post divs and add them to the posts div.
    postsData.forEach(post => {
        const postDiv = createPost(post);
        posts.appendChild(postDiv);
    });

    postsContainer.appendChild(posts);

}// End of displayPosts.


// Create a post.
const createPost = (post) => {
    
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    const postTitle = document.createElement("h6")
    postTitle.classList.add("postTitle");
    const titleText = document.createTextNode(post.title);
    postTitle.appendChild(titleText);

    const postContentDiv = document.createElement("div");
    postContentDiv.className = "noDisplay";
    const postBody = document.createElement("p");
    postBody.appendChild(document.createTextNode(post.body));
    postContentDiv.appendChild(postBody);

    const toggle = document.createElement("button");
    toggle.textContent = "show";
    toggle.className = "toggle";
    
    toggle.addEventListener('click', () => {
        if(toggle.textContent === "hide")
        {
            postContentDiv.className = "noDisplay";
            toggle.textContent = "show";
        }
        else
        {
            toggle.textContent = "hide";
            postContentDiv.className = "postContent";
        } 
    });

    postDiv.appendChild(postTitle);
    postDiv.appendChild(postContentDiv);
    postDiv.appendChild(toggle);

    return postDiv;
}


// The main function.
const main = async () =>{
    const users = await fetchUsers();
    fillTheTable(users);
}

// Call the main function.
main();
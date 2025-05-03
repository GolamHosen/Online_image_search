let accessKey = "qttEmBxgdhpvg6yWqlx3GfciabVf7FeBQ0_gT0vHjTQ";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");
const searchButton = document.getElementById("search-button")

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results
    if(page===1){
        searchResults.innerHTML=" ";
    }

    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img');
        image.src = result.urls.small
        image.alt = result.alt_description
        imagelink = document.createElement('a');
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imagelink);
        searchResults.appendChild(imageWrapper);

    });

    page++;
    if(page>1){
        showMoreButton.style.display="block";

    }
}

formElement.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
});

searchButton.addEventListener("click",(e)=>{
    e.preventDefault()
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click",()=>{
    searchImages();
})
// Selectors
const cardContainer = document.querySelector(".cards-container");
const newsCard = document.querySelector(".card");
const API_Key = "593ff62579844a65870504f8a99fae69";
const url = "https://newsapi.org/v2/everything?q=";
const nav1 = document.querySelector("#sports");
const btn = document.querySelector(".search-btn");

const newsCardTemplate = document.getElementById("template-news-card");
let input = document.querySelector(".search-box");



// news fetching
window.addEventListener("load",() => fetchNews("ethereum"));

async function fetchNews(name){
    let api = await fetch(`${url}${name}&apiKey=${API_Key}`);
    let jason =  await api.json();
    // console.log(jason.articles);
    let articles = jason.articles;
    bindData(articles);
}

// creating news cards.
function bindData(articles){
    cardContainer.innerHTML ="";
    articles.forEach((articles) =>{
        if (!articles.urlToImage) {
        return;
        }
        else{
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone,articles);
            cardContainer.appendChild(cardClone);  
        }
    })
}

// Data filling in card
function fillDataInCard(cloneCards,articles){
    const cardImg = cloneCards.querySelector("#newsImg");
    const heading = cloneCards.querySelector("#news-header");
    const newsSource = cloneCards.querySelector("#news-source");
    const newsDesc = cloneCards.querySelector("#news-desc");
    
    cardImg.src = articles.urlToImage;
    heading.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;
   

    const date = new Date(articles.publishedAt).toLocaleString("en-US",{timeZone : "Asia/Jakarta",});

    newsSource.innerHTML = `${articles.source.name}·${date}`;
    cloneCards.firstElementChild.addEventListener("click" ,() => {
        window.open(articles.url,"_blank");
    })
}

function onNavItem(id){
    fetchNews(id);
}

btn.addEventListener("click",() =>{
    let value = input.value;
    fetchNews(value);
})
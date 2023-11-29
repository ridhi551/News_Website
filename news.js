const API_KEY = "ae7a441c25e84e8ba515d037bcb5f63b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));
function reload()
{
   window.location.reload();
}
async function  fetchNews(query)
{
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
//    console.log(data);
   bindData(data.articles);
}
function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newscardtemplate = document.getElementById('temp_card');

    cardContainer.innerHTML = " ";
articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardClone = newscardtemplate.content.cloneNode(true);
    fillDataincard( cardClone , article);
    cardContainer.appendChild(cardClone);
});
}
 function fillDataincard(cardClone, article)
 {
 const newsImg = cardClone.querySelector('#news-img');
 const newsTitle = cardClone.querySelector('#news-title');
 const newsDescription = cardClone.querySelector('#news-desc');
 const newsSource = cardClone.querySelector('#news-souce');

 newsImg.src = article.urlToImage;
 newsTitle.innerHTML = article.title;
 newsDescription.innerHTML = article.description;
 // time zone 
 const date = new Date(article.publishedAt).toLocaleString("en-US",{
    timezone:"Asia/Jakarta"
 });
 newsSource.innerHTML=`${article.source.name} ${date}`;
 cardClone.firstElementChild.addEventListener("click",()=>{
 window.open(article.url,"_blank");
 });
 }
 let curSelectedNav = null;
  function onNavitemclick(id){
   fetchNews(id);
   const navItem = document.getElementById(id);
   curSelectedNav?.classList.remove('active');
   curSelectedNav = navItem;
   curSelectedNav.classList.add('active');
  }
  const searchButton = document.getElementById("search-button");
  const searchText = document.getElementById("news-input");

  searchButton.addEventListener("click",()=>{
   const query = searchText.value;
   if(!query)return;
   fetchNews(query);
   curSelectedNav?.classList.remove('active');
   curSelectedNav = null;
  })
  
  searchText.addEventListener("keyup", function (event) {
   const query = searchText.value;
   if (event.key === "Enter") {
       fetchNews(query);
   }
});
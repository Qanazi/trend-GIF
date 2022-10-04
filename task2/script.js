 function view () {
    document.getElementById("gifArea").style.display = "flex";
}

function hide () {
    document.getElementById("gifArea").style.display = "none";
}

var menu = document.getElementById('search')
var menuConterner = document.getElementById('gifArea')
var imgsConterner = document.getElementById('gifContainer')
let Searchedword = ""
let isSearching = false
let i = 0;
var json
//menuConterner.removeChild(menu)
var isMenuOn = false


/*function findagifBTclick(){
    if(!isMenuOn)
    {
        getTrendGifs()
        menuConterner.appendChild(menu)
        isMenuOn = true  
    }
    else{
        menuConterner.removeChild(menu)
        isMenuOn = false
        json = null
    } 
}*/

function getTrendGifs(){
    let trendingGifApi = `https://api.giphy.com/v1/gifs/trending?api_key=GpQlUZ6vfw0EackYIYzGay4UsDpB8vQm&limit=3&offset=${i}`
    fetch(trendingGifApi).then(Response => {   
        return Response.json();
    }).then(apijson => {
        json = apijson
        for(index = 0; index < 3 ; index++)
            {
                var img = document.createElement('img')
                img.src = json.data[index].images.original.url
                img.classList.add("gifs")
                imgsConterner.appendChild(img)
            }
        })
        i = i + 3;
}

function infinityscroll(){
    let lastScrollTop = 0;
    imgsConterner.onscroll = (e)=>{
if (imgsConterner.scrollTop < lastScrollTop){
      return;
   } 
   lastScrollTop = imgsConterner.scrollTop <= 0 ? 0 : imgsConterner.scrollTop;
    if (imgsConterner.scrollTop + imgsConterner.offsetHeight>= imgsConterner.scrollHeight ){
        if(isSearching){
            searchGifs()
        }
        else{
            getTrendGifs()
        }
            
    }
}
}

function storetypedtext(e)
{
    clearimgcon()
    Searchedword = e.value
    i = 0
    console.log(Searchedword)
    if(Searchedword == "")
    {
        getTrendGifs()
        isSearching = false
        return
    }
    else
    {
        isSearching = true 
        searchGifs()
    }
      
}

function searchGifs()
{
    let searchGifApi = `https://api.giphy.com/v1/gifs/search?q=${Searchedword}&api_key=GpQlUZ6vfw0EackYIYzGay4UsDpB8vQm&limit=3&offset=${i}`
    fetch(searchGifApi).then(Response => {   
        console.log(Response)
        return Response.json();
    }).then(apijson => {
        json = apijson
        for(index = 0; index < 3 ; index++)
            {
                var img = document.createElement('img')
                img.src = json.data[index].images.original.url
                img.classList.add("gifs")
                imgsConterner.appendChild(img)
            }
        }).catch(error => {
            imgsConterner.innerHTML = "no img found"
        })
        i = i + 3;
}

function clearimgcon(){
    imgsConterner.innerHTML = ""
}




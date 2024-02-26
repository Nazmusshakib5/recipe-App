const searchRecipe=document.getElementById('searchRecipe');
const searchRecipeBtn=document.getElementById('searchRecipeBtn');
const spinner=document.getElementById('spinner');
const recipeItemCard=document.getElementById('recipeItem');
const cardContainer=document.getElementById('cardContainer');
const  modalInfo=document.getElementById('modal-info');
const  toTheTop=document.getElementById('toTheTop');

//first time loading data
window.addEventListener("load",getdata);

//serach button event
searchRecipeBtn.addEventListener("click",getdata)

//enter button event
searchRecipe.addEventListener("keypress",(event)=>{
    if (event.key == "Enter") {
        getdata();
    }
})

function getdata(){
    spinner.classList.remove('hidden');
    const foodName=searchRecipe.value;
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(url)
    .then((res)=>res.json())   // if res.json on the next line .it should be returned.
    .then((data)=>{
        spinner.classList.add('hidden');
        showCard(data);
    })
    .catch((err)=>{
        console.log(err);
    })

}

function showCard(data){
    if(data.meals == null){  //if(!data){ same work}
        return recipeItemCard.innerHTML=`<div><h1>Food is unavailable</h1></div>`;    
    }
    let cards="";
    for(let i of data.meals){
        let{strMealThumb,strMeal,strInstructions,idMeal}=i; //object destructure  //bg-white/90 in card title
        let card=`<div class="card card-compact w-auto bg-base-100 shadow-xl">
        <figure><img src=${strMealThumb} class="h-60 w-full" alt="Shoes" /></figure>
        <div class="card-body"> 
            <h2 class="card-title">${strMeal}</h2>
            <p>${strInstructions.slice(0,100)}</p>
            <div class="card-actions justify-end">
            <label for="my_modal_6" class="btn bg-yellow-300">
            <p onclick="showModal(${idMeal})">Buy Now</p>
            </label>
        </div>
        </div>
        </div>`;
        cards=cards+card;
    }

    recipeItemCard.innerHTML=cards;
}

function showModal(id){
    if(!id){
        return modalInfo.innerHTML="Error network.Please Try again after a refresh";
    }
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then((res)=>res.json())  
    .then((data)=>{
        modalInfo.innerHTML="";
        let modalDetails=`
        <div class="card-body"> 
        <img src=${data.meals[0].strMealThumb}>
        </div>
        <h3 class="font-bold text-lg">${data.meals[0].strMeal}</h3>
        <p class="py-4">${data.meals[0].strInstructions}</p>
        <div class="modal-action">
            <label for="my_modal_6" class="btn bg-yellow-300">Close!</label>
        </div>`
        modalInfo.innerHTML=modalDetails;
    })
    .catch((err)=>{
        console.log(err);
    })
}


//scrolling feature toTheTop button
window.onscroll = function()
{
    let val=window.scrollY
    if(val >= 300)
    {
        toTheTop.style.visibility="visible";
    }else
    {
        toTheTop.style.visibility="hidden";
    }
};

toTheTop.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})




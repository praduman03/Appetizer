const randomCard=document.getElementById("random-food")
const ingredeintsCard=document.getElementById("ing")

randomCard.onclick=()=>{
    ingredeintsCard.classList.remove("hide")
}
ingredeintsCard.onclick=()=>{
    ingredeintsCard.classList.add("hide")
}

function randomFood(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((data)=>{
        return data.json();
    }).then((completeData)=>{
        console.log(completeData)
        let random='';
        let random2='';
        random=`<div class="food-card">
                    <div>
                        <img src=${completeData.meals[0].strMealThumb} alt="">
                    </div>
                    <h3>${completeData.meals[0].strMeal}</h3>
                </div>`

        random2=`<div class="ingredeints">
                    <h3>${completeData.meals[0].strMeal}</h3>
                    <h3>${completeData.meals[0].strCategory}</h3>
                    <h3>ingredeints</h3>
                    <p>${completeData.meals[0].setIngredient1} <br> ${completeData.meals[0].setIngredient2} <br>${completeData.meals[0].setIngredient3} <br>${completeData.meals[0].setIngredient4}</p>
                </div>`;
    document.getElementById("random-food").innerHTML=random;
    document.getElementById("ing").innerHTML=random2;
    }).catch((error)=>{
        console.log(error)
    })
}
randomFood()
var search=document.getElementById("searchBox")
function SearchedFood(){
    var input=search.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`)
    .then((data)=>{
        return data.json();
    }).then((completeData)=>{
        console.log(completeData)
        let random='';
        for(i=0;i<(completeData.meals).length;i++){
        random+=`<div class="food-card">
        <div>
            <img src=${completeData.meals[i].strMealThumb} alt="">
        </div>
        <h3>${completeData.meals[i].strMeal}</h3>
        </div>`
        }
    document.getElementById("searched-food").innerHTML=random;
    }).catch((error)=>{
        console.log(error)
    })
}
document.getElementById("searchBox").addEventListener("keydown",(e)=>{
    if(e.code=="Enter"){
        SearchedFood()
    }
})
// Getting document for CSS modal
const randomCard=document.getElementById("random-food")
const ingredeintsCard=document.getElementById("ing")
const recipebutton=document.querySelector(".recipe-btn")
const recipeCard=document.getElementById("texting")





// Onclick to card to show ingredeints
randomCard.onclick=()=>{
    ingredeintsCard.classList.remove("hide")
}
ingredeintsCard.onclick=()=>{
    ingredeintsCard.classList.add("hide")
}





// Function to show random food of the day
function randomFood(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((data)=>{
        return data.json();
    }).then((completeData)=>{
// console.log(completeData)
        let random='';
        let random2='';
        //adding food card details in the card
        random=`<div class="food-card">
                    <div>
                        <img src=${completeData.meals[0].strMealThumb} alt="">
                    </div>
                    <h3>${completeData.meals[0].strMeal}</h3>
                </div>`
        //adding ingredeints details in the ingredeints card
        random2=`<div class="ingredeints">
                    <h3>${completeData.meals[0].strMeal}</h3>
                    <h3>Category</h3>
                    <h3>${completeData.meals[0].strCategory}</h3>
                    <h3>ingredeints</h3>
                    <p>${completeData.meals[0].strIngredient1} <br> ${completeData.meals[0].strIngredient2} <br>${completeData.meals[0].strIngredient3}
                     <br>${completeData.meals[0].strIngredient4}<br>${completeData.meals[0].strIngredient5}<br>${completeData.meals[0].strIngredient6}<br>${completeData.meals[0].strIngredient7}
                     <br>${completeData.meals[0].strIngredient8}<br>${completeData.meals[0].strIngredient9}<br>${completeData.meals[0].strIngredient10}</p>
                </div>`;
    //adding them in the innerhtml
    document.getElementById("random-food").innerHTML=random;
    document.getElementById("ing").innerHTML=random2;
    // console.log if there is any error
    }).catch((error)=>{
        console.log(error)
    })
}
// calling random meal function 
randomFood()

// function for the searched category dish
var search=document.getElementById("searchBox")
function SearchedFood(){
    document.getElementById("searchheading").classList.remove("hide")
    var input=search.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`)
    .then((data)=>{
        return data.json();

    }).then((completeData)=>{
        console.log(completeData)
        let random='';
        if(completeData.meals){
                completeData.meals.forEach((meal)=>{
                random+=`<div class="food-card" data-id="${meal.idMeal}">
                <div>
                    <img src=${meal.strMealThumb} alt="">
                </div>
                <h3>${meal.strMeal}</h3>
                <p id="recipe-btn">Get Recipe</p>
                </div>`
           })
        }
        else{
                random= `<h3 class="notfound">category "${input}" not found</h3>`
            }
    document.getElementById("searched-food").innerHTML=random;
    }).catch((error)=>{
        console.log(error)
    })
    }

    // function to show ingredeints when we click on searched category
    document.getElementById("searched-food").addEventListener('click', getMealRecipe);
    function getMealRecipe(e){
            let mealItem = e.target.parentElement;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then((meal)=>{
                console.log(meal)
                meal= meal.meals[0];
                document.getElementById("texting").innerHTML=`<div class="Recipe">
                <h3>${meal.strMeal}</h3>
                <img src=${meal.strMealThumb} >
                <h3>Category</h3>
                <p>${meal.strCategory}</p>
                <h3>ingredeints</h3>
                <p>${meal.strIngredient1} &nbsp ${meal.strIngredient2} &nbsp ${meal.strIngredient3}
                 <br>${meal.strIngredient4} &nbsp ${meal.strIngredient5} &nbsp ${meal.strIngredient6} &nbsp ${meal.strIngredient7}
                 <br>${meal.strIngredient8} &nbsp ${meal.strIngredient9} &nbsp ${meal.strIngredient10}</p>
                 <div class="watchRecipe-btn"><a   href=${meal.strYoutube}>Watch recipe</a></div><br>
                 <div id="closeRecipe">close</div>
            </div>`;
                
                document.querySelector(".recipeDiv").style.display ="block"
                document.getElementById("closeRecipe").onclick=()=>{
                    document.querySelector(".recipeDiv").style.display ="none"
                }
            });
        }
// Code for calling searched food function if we type enter in the keyboard
document.getElementById("searchBox").addEventListener("keydown",(e)=>{
    if(e.code=="Enter"){
        SearchedFood()
    }
})


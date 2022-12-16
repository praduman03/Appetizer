// Getting document for CSS modal
const randomCard=document.getElementById("random-food")
const ingredeintsCard=document.getElementById("ing")

// Onclick to card to show ingredeints
randomCard.onclick=()=>{
    ingredeintsCard.classList.remove("hide")
}
ingredeintsCard.onclick=()=>{
    ingredeintsCard.classList.add("hide")
}

// Function to show random food of the day
function randomFood(){
//fetching data
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
//converting it to object
    .then((data)=>{
        return data.json();
    }).then((completeData)=>{
console.log(completeData)
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
//adding them in the html file
    document.getElementById("random-food").innerHTML=random;
    document.getElementById("ing").innerHTML=random2;
// console.log if there is any error
    }).catch((error)=>{
        console.log(error)
    })
}

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
                for(i=0;i<(completeData.meals).length;i++){
                random+=`<div class="food-card">
                <div>
                    <img src=${completeData.meals[i].strMealThumb} alt="">
                </div>
                <h3>${completeData.meals[i].strMeal}</h3>
                </div>`
            }
        }
        else{
                random= `<h3 class="notfound">category "${input}" not found</h3>`
            }

    document.getElementById("searched-food").innerHTML=random;
    }).catch((error)=>{
        console.log(error)
    })
    }

// Code for calling searched food function if we type enter in the keyboard
document.getElementById("searchBox").addEventListener("keydown",(e)=>{
    if(e.code=="Enter"){
        SearchedFood()
    }
})

//Calling functions
randomFood()
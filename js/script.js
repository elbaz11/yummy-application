let sideBarWidth = $('.side-bar').outerWidth(true)
console.log(sideBarWidth);

$('.side-bar').animate({left:`-${sideBarWidth}`},10)
$('.beside').animate({left:0},10)

$('.closeIcon, .openIcon').click(function() {
    let sideBarWidth = $('.side-bar').outerWidth();

    if ($('.side-bar').css('left') === '0px') {
       
        $('.side-bar').animate({ left: `-${sideBarWidth}px` }, 500);
        $('.beside').animate({ left: '0' }, 500);
        $('.closeIcon').addClass('d-none');
        $('.openIcon').removeClass('d-none');
    } else {
        
        $('.side-bar').animate({ left: '0px' }, 500);
        $('.beside').animate({ left: `${sideBarWidth}px` }, 500);
        $('.openIcon').addClass('d-none');
        $('.closeIcon').removeClass('d-none');
    }
});


function showSpinner() {
    document.querySelector('.spinner-container').style.display = 'flex';
}

function hideSpinner() {
    document.querySelector('.spinner-container').style.display = 'none';
}



async function getMeals(){
    showSpinner()
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let response = await result.json()
    hideSpinner()
    displayMeals(response.meals)
    // console.log(response.meals);
}
getMeals()

function displayMeals(arr) {
    cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div onclick='displayDetails(${arr[i].idMeal})' class="col-md-3 mt-4">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                <div class="meal-effect position-absolute d-flex align-items-center text-black p-2">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `;
    }
    document.querySelector('.row').innerHTML = cartona;
}

async function displayDetails(idMeal) {
    showSpinner()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let data = await response.json();
    // console.log(data);
    
    let meal = data.meals[0];

    
    let cartona = `
    <div class="HiddenDiv">
        <div class="container ">
            <div class="recipe-image">
                <img class=" w-100 " src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="recipe-details">
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
                <h3>Area: <span>${meal.strArea}</span></h3>
                <h3>Category: <span>${meal.strCategory}</span></h3>
                <h3>Recipes:</h3>
            <div class="recipe-tags">`;

    
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            cartona += `<span>${measure} ${ingredient}</span>`;
        }
    }

    cartona += `
                </div>
                <h3>Tags:</h3>
                <div class="tags">
                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                     <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
                </div>
            </div>
        </div>
    </div>
    `;

   
    document.querySelector('.row').innerHTML = cartona;
    hideSpinner()
}



let category = document.querySelector('.category');
category.addEventListener('click', getCategories);

async function getCategories() {
    showSpinner()
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await result.json();
    console.log(response.categories);
    displayCategories(response.categories);
}

function displayCategories(arr) {
    let box = ``;
    for (let i = 0; i < arr.length; i++) {
        box += `<div onclick='CategoryImgs("${arr[i].strCategory}")' class="col-md-3 mt-4">
                    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" >
                        <div class="meal-effect position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strCategory}</h3>
                        </div>
                    </div>
                </div>`;
    }
    document.querySelector('.row').innerHTML = box;
    hideSpinner()
}

async function CategoryImgs(Category) {
    showSpinner()
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    let response = await result.json();
    console.log(response.meals);
    displayCategoriesImgs(response.meals);
}

function displayCategoriesImgs(arr) {
    let box = ``;
    for (let i = 0; i < arr.length; i++) {
        box += `<div onclick='displayDetails(${arr[i].idMeal})' class="col-md-3 mt-4">
                    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="" >
                        <div class="meal-effect position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`;
    }
    document.querySelector('.row').innerHTML = box;
    hideSpinner()
}

let area = document.querySelector('.area');
area.addEventListener('click', getAreas);

async function getAreas() {
    showSpinner()
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let response = await result.json();
    console.log(response.meals);
    
    displayAreas(response.meals);
}

function displayAreas(arr) {
    let box = ``;
    for (let i = 0; i < arr.length; i++) {
        box +=`
        <div class="col-md-3">
                <div onclick='AreaImgs("${arr[i].strArea}")' class="rounded-2 text-center ">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `;
    }
    document.querySelector('.row').innerHTML = box;
    hideSpinner()
}

async function AreaImgs(Area) {
    showSpinner()
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
    let response = await result.json();    
    displayAreaImgs(response.meals);
}

function displayAreaImgs(arr) {
    let box = ``;
    for (let i = 0; i < arr.length; i++) {
        box += `<div onclick='displayDetails(${arr[i].idMeal})' class="col-md-3 mt-4">
                    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="" >
                        <div class="meal-effect position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`;
    }
    document.querySelector('.row').innerHTML = box;
    hideSpinner()
}

let ingredient = document.querySelector('.ingredient');
ingredient.addEventListener('click', getIngredients);

async function getIngredients() {
    showSpinner()
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let response = await result.json();
    console.log(response.meals);
    displayIngredients(response.meals);
}

function displayIngredients(arr) {
    let box = ``;
    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
            <div onclick='IngredientImgs("${arr[i].strIngredient}")' class="rounded-2 text-center">
                <i class="fa-solid fa-utensils fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription ? arr[i].strDescription.split(" ").slice(0, 10).join(" ") + "..." : ""}</p>
            </div>
        </div>
        `;
    }
    document.querySelector('.row').innerHTML = box;
    hideSpinner()
}

async function IngredientImgs(ingredient) {
    showSpinner()
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let response = await result.json();
    displayIngredientImgs(response.meals);
}

function displayIngredientImgs(arr) {
    let box = ``;
    for (let i = 0; i < arr.length; i++) {
        box += `<div onclick='displayDetails(${arr[i].idMeal})' class="col-md-3 mt-4">
                    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                        <div class="meal-effect position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`;
    }
    document.querySelector('.row').innerHTML = box;
    hideSpinner()
}

let searchLink = document.querySelector('.searchLink')

searchLink.addEventListener('click', function(){
    
    $('.forSearch').removeClass('d-none')
    
})

let nameInput = document.querySelector('.nameInput');
let letterInput = document.querySelector('.letterInput');

nameInput.addEventListener('input', function() {
    let nameInputVal = nameInput.value;
    searchByName(nameInputVal);
});

letterInput.addEventListener('input', function() {
    let letterInputVal = letterInput.value;
    if (letterInputVal.length === 1) { 
        searchByLetter(letterInputVal);
    } else {
        document.querySelector('.myRow').innerHTML = ""; 
    }
});

async function searchByName(name) {
    showSpinner()
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let response = await result.json();
    displaySearchMeals(response.meals);
    hideSpinner()
}

async function searchByLetter(letter) {
    showSpinner()
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let response = await result.json();
    displaySearchMeals(response.meals);
    hideSpinner()
}

function displaySearchMeals(arr) {
    let box = ``;
    for (let i = 0; i < arr.length; i++) {
        box += `
        <div onclick='displayMyDetails(${arr[i].idMeal})' class="col-md-3 mt-4">
                    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                        <div class="meal-effect position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`;
    }
    document.querySelector('.myRow').innerHTML = box;
    document.body.style.overflow = 'hidden';
}

async function displayMyDetails(idMeal) {
    showSpinner()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let data = await response.json();
    let meal = data.meals[0];

    let cartona = `
    <div class="HiddenDiv">
        <div class="container">
            <div class="recipe-image">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="recipe-details">
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
                <h3>Area: <span>${meal.strArea}</span></h3>
                <h3>Category: <span>${meal.strCategory}</span></h3>
                <h3>Recipes:</h3>
            <div class="recipe-tags">`;

    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            cartona += `<span>${measure} ${ingredient}</span>`;
        }
    }

    cartona += `
                </div>
                <h3>Tags:</h3>
                <div class="tags">
                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                    <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
                </div>
            </div>
        </div>
    </div>
    `;

    document.querySelector('.myRow').innerHTML = cartona;
    hideSpinner()
}

function forinp(){
    $('.contact').click(function(){
        $('.input-cont').removeClass('d-none')
    })
    
    let listItems = document.querySelectorAll('li:not(.searchLink):not(.contact)');
    
    listItems.forEach((item) => {
        item.addEventListener('click', function () {
            document.querySelector('.forSearch').classList.add('d-none');
            document.querySelector('.input-cont').classList.add('d-none');
        });
    });
    
    $('.searchLink').click(function(){
        $('.input-cont').addClass('d-none')
    
    })

}
forinp()




let submitButton = document.querySelector('.btn');
let nameeInput = document.querySelector('input[placeholder="Enter Your Name"]');
let emailInput = document.querySelector('input[placeholder="Enter Your Email"]');
let phoneInput = document.querySelector('input[placeholder="Enter Your Phone"]');
let ageInput = document.querySelector('input[placeholder="Enter Your Age"]');
let passwordInput = document.querySelector('input[placeholder="Enter Your Password"]');
let repasswordInput = document.querySelector('input[placeholder="Repassword"]');

const regex = {
    name: /^[a-zA-Z\s]+$/, 
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  
    phone: /^[0-9]+$/,  
    age: /^(100|[1-9]?[0-9])$/,  
    pass: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/  
};

nameeInput.addEventListener('input', () => validateAllInputs(nameeInput, 'name'));
emailInput.addEventListener('input', () => validateAllInputs(emailInput, 'email'));
phoneInput.addEventListener('input', () => validateAllInputs(phoneInput, 'phone'));
ageInput.addEventListener('input', () => validateAllInputs(ageInput, 'age'));
passwordInput.addEventListener('input', () => validateAllInputs(passwordInput, 'pass'));
repasswordInput.addEventListener('input', () => validateAllInputs(repasswordInput, 'repass'));


function validateAllInputs(elem, type) {
    if (regex[type] && regex[type].test(elem.value)) {
        document.getElementById(type + "Alert").classList.add('d-none');
    } else {
        document.getElementById(type + "Alert").classList.remove('d-none');
    }
    
    
    if (type === 'repass') {
        if (elem.value === passwordInput.value) {
            document.getElementById('repassAlert').classList.add('d-none');
        } else {
            document.getElementById('repassAlert').classList.remove('d-none');
        }
    }

   
    checkAllValidations();
}


function checkAllValidations() {
    let allValid = regex.name.test(nameeInput.value) &&
                   regex.email.test(emailInput.value) &&
                   regex.phone.test(phoneInput.value) &&
                   regex.age.test(ageInput.value) &&
                   regex.pass.test(passwordInput.value) &&
                   repasswordInput.value === passwordInput.value;

    submitButton.disabled = !allValid; 
}

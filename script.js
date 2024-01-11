const input = document.querySelector('#search');
const serBtn = document.querySelector('#search-btn');
const resultContainer = document.querySelector('.result');
const mainContainer = document.querySelector('.main-content');
const heading = document.querySelector('.heading');
const serRes = document.querySelector('#sear');
const respCon = document.querySelector('.recipe-content');
const list = document.querySelectorAll('.cat-list-value')


function inputValue() {
    let value = input.value;
    return value;
}

const getData = async (value) => {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
    const response = await fetch(url)
    try {
        const data = await response.json();
        apiData(data['meals']);
        apiId(data.idMeal);
    } catch (error) {
        return error
    }
}


serBtn.addEventListener('click', async () => {
    const inputVal = inputValue();
    if (inputVal.toLowerCase() === 'pork') {
        resultContainer.innerHTML = '';
        serRes.innerHTML = `IT'S HARAM BRO`;
        return;
    }
    if (inputVal !== '') {
        await getData(inputVal);
        nothing();
    } else {
        return;
    }
})


function apiData(value) {
    heading.style.display = `block`
    let data = '';
    if (value !== null) {
        resultContainer.innerHTML = '';
        value.forEach((value) => {
            data += `
            <div class="box">
            <div class="img">
                <img src="${value.strMealThumb}"
                    alt="${value.strMeal}">
            </div>
            <div class="text flex">
                <h2>${value.strMeal}</h2>
                <button class="getRec">Get Recipe</button>
                <div  style="display: none;" class="mealId">${value.idMeal}</div>
            </div>
        </div>`
        });
        if (serRes.innerHTML = 'Sorry.....Not Found') {
            serRes.innerHTML = 'Your Search Results:'
            serRes.classList.remove('notFound');
        }
        resultContainer.innerHTML = data;
        mainContainer.appendChild(resultContainer);
    } else {
        mainContainer.firstElementChild.nextElementSibling.innerHTML = '';
        serRes.innerHTML = 'Sorry.....Not Found';
        serRes.classList.add('notFound');
    }

}

async function respDetails(value) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`
    const response = await fetch(url);
    const data = await response.json();
    return data.meals[0];
}

async function nothing() {
    const ids = document.querySelectorAll('.mealId');
    for (const value of ids) {
        try {
            const data = await respDetails(value.innerHTML);
            if (data.strCategory.toLowerCase() === 'pork') {
                value.parentNode.parentNode.remove();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}


resultContainer.addEventListener('click', async (event) => {
    if (event.target.matches('.getRec')) {
        respCon.classList.remove('dispN')
        const mainData = document.querySelector('.mainDet')
        const id = event.target.nextElementSibling.innerHTML;
        const data = await respDetails(id);
        mainData.innerHTML = '';
        mainData.innerHTML = `
        <h1>${data['strMeal']}</h1>
                <div class="keyingredient">
                    <p>${data['strCategory']}</p>
                </div>
                <div class="instruction flex">
                    <h3>Instruction:</h3>
                    <p>${data['strInstructions']}</p>
                </div>
                <div class="watch-video">
                    <div class="logo-img">
                        <img src="${data['strMealThumb']}" alt="logo">
                    </div>
                    <a href="${data['strYoutube']}" target="_main">Watch Video</a>
                </div>
        `
    }
})

document.querySelector('.mark').addEventListener('click', () => {
    if (!respCon.classList.contains('dispN')) {
        respCon.classList.add('dispN')
    }
})

list.forEach(value => {
    value.addEventListener('click', (event) => {
        let value = event.target.innerHTML;
        getData(value);
    })
})



const goUpArrow = document.querySelector('.to-Up');


window.addEventListener('scroll', (event) => {
    const totalScrollHeight = document.documentElement.scrollHeight;
    (scrollY >= 2020 && scrollY <= totalScrollHeight) ?
        (goUpArrow.style.opacity = '1')
        : (goUpArrow.style.opacity = '0');
})
goUpArrow.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})
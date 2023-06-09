// Logo-----
const logo = document.getElementById("logo-img")

logo.addEventListener('mouseenter', function() {
    logo.src = '../Images/logo2.png';
  });
  
logo.addEventListener('mouseleave', function() {
    logo.src = '../Images/Logo1.png';
  });

logo.addEventListener("click",function(){
    window.location.href = "/index.html";    
})



// const userUrl = "https://mockerapi.onrender.com/user";
let mainSection = document.querySelector("#data-list-wrapper");
let paginationWrapper = document.getElementById("pagination-wrapper");

window.addEventListener('load', async () => {
    fetchData()
})



async function fetchData(pageNumber) {

    try {
        let res = await fetch(`https://mockerapi.onrender.com/user?_limit=10&_page=${pageNumber}`);
        let totalPosts = res.headers.get("X-Total-Count");

        let totalButtons = Math.ceil(totalPosts / 2);

        paginationWrapper.innerHTML = null;
        for (let i = 1; i <= totalButtons; i++) {
            paginationWrapper.append(getAsButton(i, i));
        }

        let data = await res.json();
        console.log(data);
        getCards(data)


    } catch (error) {
        console.log(error);
    }

}

function getCards(data) {
    mainSection.innerHTML = '';
    let courseList = document.createElement('div')
    courseList.className = 'card-list';


    mainSection.append(courseList);
    data.forEach((item) => {
        courseList.append(createCards(item));
        // console.log(item);
    })


}

function createCards(data) {

    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', data.id);

    // image div
    let imgContainer = document.createElement('div');
    imgContainer.className = "card-image";
    let img = document.createElement('img');
    img.src = `${data.image}`
    img.setAttribute('alt', "error")
    imgContainer.append(img);

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    // console.log(imgContainer);

    let cardTitle = document.createElement('h4');
    cardTitle.className = 'card-title';
    cardTitle.textContent = data.title;
    //   console.log(cardTitle);

    let subHeading = document.createElement('p');
    subHeading.textContent = data.subHeading;
    subHeading.className = 'sub-heading';
    // console.log(subHeading);

    let coursePrice = document.createElement('span');
    coursePrice.className = 'course-price';
    coursePrice.textContent = `₹${data.price}`

    let spanLabel = document.createElement('span');
    spanLabel.className = 'span-tag';
    spanLabel.textContent = ' for 3 months ( 24 classes)'


    let middleInfo = document.createElement('div');
    middleInfo.className = 'mid-info'

    let ageKey = document.createElement('span');
    ageKey.className = 'key';
    ageKey.textContent = 'Age group: ';

    let ageValue = document.createElement('span');
    ageValue.className = 'value';
    ageValue.textContent = `${data.ageGroup} Years`;
    let br = document.createElement('br')


    let courseKey = document.createElement('span');
    courseKey.className = 'key';
    courseKey.textContent = 'Course: ';

    let courseValue = document.createElement('span');
    courseValue.className = 'value';
    courseValue.textContent = '24 sessions in 3 months for';
    let br1 = document.createElement('br')

    let durationKey = document.createElement('span');
    durationKey.className = 'key';
    durationKey.textContent = 'Duration: ';

    let durationValue = document.createElement('span');
    durationValue.className = 'value';
    durationValue.textContent = 'beginner level';

    let br2 = document.createElement('br')

    let formateKey = document.createElement('span');
    formateKey.className = 'key';
    formateKey.textContent = 'Format: ';

    let formateValue = document.createElement('span');
    formateValue.className = 'value';
    formateValue.textContent = 'Group or Individual classes';

    // var br = document.createElement('br')


    middleInfo.append(ageKey, ageValue, br, courseKey, courseValue, br1, durationKey, durationValue, br2, formateKey, formateValue)

    //  console.log(middleInfo);

    let enrolBtn = document.createElement('button')
    enrolBtn.className = 'enrollBtn'
    enrolBtn.textContent = 'Enroll Now';

    enrolBtn.addEventListener('click',()=>{
        window.location.href = '../html/admission.html'
    })




    cardBody.append(cardTitle, subHeading, coursePrice, spanLabel, middleInfo, enrolBtn)
    // console.log(cardBody);

    card.append(imgContainer, cardBody);
    return card
}

// create button for pagination

function getAsButton(text, dataId) {
    let btn = document.createElement("button");
    btn.setAttribute("data-id", dataId);
    btn.innerText = text;
    btn.className = 'paginationBtn'

    btn.addEventListener("click", function (e) {
        fetchData(e.target.dataset.id);
        // console.log(e.target.dataset.id);
    });

    return btn;
}

const optionMenu = document.querySelector(".select-menu"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;

        filterData(selectedOption)



        sBtn_text.innerText = selectedOption;

        optionMenu.classList.remove("active");
    });
});

async function filterData(selectedOption) {
    let res = await fetch('https://mockerapi.onrender.com/user');
    let data = await res.json()

    data = data.filter((item) => {
        console.log(item.category);
        if (item.category === selectedOption) {
            return true;
        }
    })
    console.log(data);
    getCards(data) 
    
    

}
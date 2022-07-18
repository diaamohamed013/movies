//setting variables
let navWidth = $(".navLinks").innerWidth();
let movieContainer = [];
let mainRow = document.getElementById("mainRow");
let mLinlk = document.querySelectorAll(".movieLink");
let wordSearch = document.getElementById("wordSearch");
let searchRow = document.getElementById("searchRow");
let searchInp = document.getElementById("searchInp");
let userName = document.getElementById("name");
let mail = document.getElementById("mail");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let pass = document.getElementById("pass");
let repass = document.getElementById("repass");
let p1 = document.querySelector(".validate1")
let p2 = document.querySelector(".validate2")
let p3 = document.querySelector(".validate3")
let p4 = document.querySelector(".validate4")
let p5 = document.querySelector(".validate5")
let p6 = document.querySelector(".validate6")



// start js code for sliding nav bar

$(".fa-bars").click(function () {
    $(".navLinks").animate({ left: 0 }, 1000);
    $(".navOption").animate({ left: navWidth - 1 }, 1000);
    $(".fa-xmark").removeClass("hide").addClass("show");
    $(".fa-bars").removeClass("show").addClass("hide");
    $(".navBar .navLinks li").eq(0).animate({ paddingTop: "25px", opacity: "1" }, 1000);
    $(".navBar .navLinks li").eq(1).animate({ paddingTop: "25px", opacity: "1" }, 1200);
    $(".navBar .navLinks li").eq(2).animate({ paddingTop: "25px", opacity: "1" }, 1300);
    $(".navBar .navLinks li").eq(3).animate({ paddingTop: "25px", opacity: "1" }, 1400);
    $(".navBar .navLinks li").eq(4).animate({ paddingTop: "25px", opacity: "1" }, 1500);
    $(".navBar .navLinks li").eq(5).animate({ paddingTop: "25px", opacity: "1" }, 1600);

});

$(".fa-xmark").click(function () {
    $(".navLinks").animate({ left: -navWidth }, 1000);
    $(".navOption").animate({ left: 0 }, 1000);
    $(".fa-bars").removeClass("hide").addClass("show");
    $(".fa-xmark").removeClass("show").addClass("hide");
    $(".navBar .navLinks li").eq(0).animate({ paddingTop: "500px", opacity: "0" }, 1000);
    $(".navBar .navLinks li").eq(1).animate({ paddingTop: "500px", opacity: "0" }, 1200);
    $(".navBar .navLinks li").eq(2).animate({ paddingTop: "500px", opacity: "0" }, 1300);
    $(".navBar .navLinks li").eq(3).animate({ paddingTop: "500px", opacity: "0" }, 1400);
    $(".navBar .navLinks li").eq(4).animate({ paddingTop: "500px", opacity: "0" }, 1500);
    $(".navBar .navLinks li").eq(5).animate({ paddingTop: "500px", opacity: "0" }, 1600);
});

// end js code for sliding nav bar


// start js code for display movies

async function getMovie(q) {
    if (q == `trending`) {
        let res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        let finalRes = await res.json();
        movieContainer = finalRes.results;
        displayMovie(movieContainer);
        // console.log(movieContainer);
    }
    else {
        let res = await fetch(`https://api.themoviedb.org/3/movie/${q}?api_key=c259800f17162ab5e5a6fa0da3f52860&language=en-US&page=1`);
        let finalRes = await res.json();
        movieContainer = finalRes.results;
        displayMovie(movieContainer);
        // console.log(movieContainer);
    }
};

getMovie(`now_playing`);

// start js code for getting the text of link

for (let i = 0; i < mLinlk.length; i++) {
    mLinlk[i].addEventListener("click", function (e) {
        let link = e.target.innerText.toLowerCase();
        if (link == `top rated`) {
            link = `top_rated`;
            getMovie(link);
        } else if (link == `now playing`) {
            link = `now_playing`;
            getMovie(link);
        }
        else {
            getMovie(link);
        }
    });
}

// end js code for getting the text of link

async function movieByWord(n) {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c259800f17162ab5e5a6fa0da3f52860&language=en-US&query=${n}&page=1&include_adult=false`);
    let finalRes = await res.json();
    movieContainer = finalRes.results;
    displayMovie(movieContainer);
    // console.log(movieContainer);
};

function display(s) {
    let cartona = ``;
    for (let i = 0; i < s.length; i++) {
        cartona += `<div class="col-lg-4 col-md-6 shadow-lg paddCard mb-4">
                    <div class="card">
                        <div class="card-img">
                            <img src="https://image.tmdb.org/t/p/w500${s[i].poster_path}" class="w-100 d-block" alt="">
                        </div>
                        <div class="card-body text-center overflow-hidden">
                            <h3>
                                ${s[i].original_title ? s[i].original_title : s[i].original_name}
                            </h3>
                            <p>
                                ${s[i].overview ? s[i].overview.split(" ").splice(0, 25).join(" ") : "Not Found Yet"}
                            </p>
                            <p>
                                rate: <span>${s[i].vote_average ? s[i].vote_average : "0"}</span>
                            </p>
                            <p>
                                ${s[i].release_date ? s[i].release_date : s[i].first_air_date}
                            </p>
                        </div>
                    </div>
                </div>`
    }
    searchRow.innerHTML = cartona;
}

function displayMovie(x) {
    let cartona = ``;
    for (let i = 0; i < x.length; i++) {
        if (x[i].poster_path != null) {
            cartona += `<div class="col-lg-4 col-md-6 shadow-lg paddCard">
                    <div class="card">
                        <div class="card-img">
                            <img src="https://image.tmdb.org/t/p/w500${x[i].poster_path}" class="w-100 d-block" alt="">
                        </div>
                        <div class="card-body text-center overflow-hidden">
                            <h3>
                                ${x[i].original_title ? x[i].original_title : x[i].original_name}
                            </h3>
                            <p>
                                ${x[i].overview != null ? x[i].overview.split(" ").splice(0, 25).join(" ") : "Not Found Yet"}
                            </p>
                            <p>
                                rate: <span>${x[i].vote_average ? x[i].vote_average : "0"}</span>
                            </p>
                            <p>
                                ${x[i].release_date ? x[i].release_date : x[i].first_air_date}
                            </p>
                        </div>
                    </div>
                </div>`
        }
        else if (x[i].poster_path == null) {
            cartona += `<div class="col-lg-4 col-md-6 shadow-lg paddCard">
                    <div class="card h-100">
                        <div class="card-img h-100">
                            <img src="images/dummy-image-square.jpg" class="w-100 h-100 d-block" alt="">
                        </div>
                        <div class="card-body text-center overflow-hidden">
                            <h3>
                                ${x[i].original_title ? x[i].original_title : x[i].original_name}
                            </h3>
                            <p>
                                ${x[i].overview != null ? x[i].overview.split(" ").splice(0, 25).join(" ") : "Not Found Yet"}
                            </p>
                            <p>
                                rate: <span>${x[i].vote_average ? x[i].vote_average : "0"}</span>
                            </p>
                            <p>
                                ${x[i].release_date ? x[i].release_date : x[i].first_air_date}
                            </p>
                        </div>
                    </div>
                </div>`
        }
    }
    mainRow.innerHTML = cartona;
}

wordSearch.addEventListener("keyup", function () {
    movieByWord(this.value);
});

function search(w) {
    let seachItems = [];
    for (let i = 0; i < movieContainer.length; i++) {
        if (movieContainer[i].original_title.toLowerCase().includes(w.toLowerCase())) {
            seachItems.push(movieContainer[i]);
            // console.log(seachItems);
            display(seachItems);
            displayMovie(movieContainer);
        }
    }
};

searchInp.addEventListener("keyup", function () {
    search(this.value);
});

// end js code for display movies


// start js code for checking the validation of user info

function validateUSerName() {
    let regx = /^[a-zA-Z0-9]{4,30}$/
    if (regx.test(userName.value)) {
        p1.classList.add("hide");
        return true;
    }
    else {
        p1.classList.replace("hide", "show");
        return false;
    }
};

function validatemail() {
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (regx.test(mail.value)) {
        p2.classList.add("hide");
        return true;
    }
    else {
        p2.classList.replace("hide", "show");
        return false;
    }
};

function validatephone() {
    let regx = /^(01)[0-2][0-9]{8}$/
    if (regx.test(phone.value)) {
        p3.classList.add("hide");
        return true;
    }
    else {
        p3.classList.replace("hide", "show");
        return false;
    }
};

function validateage() {
    let regx = /^(1[89]|[2-9]\d)$/
    if (regx.test(age.value)) {
        p4.classList.add("hide");
        return true;
    }
    else {
        p4.classList.replace("hide", "show");
        return false;
    }
};

function validatepass() {
    let regx = /^(?=.*\d)(?=.*[a-z])(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/
    if (regx.test(pass.value)) {
        p5.classList.add("hide");
        return true;
    }
    else {
        p5.classList.replace("hide", "show");
        return false;
    }
};

function validaterepass() {
    if (repass.value == pass.value) {
        p6.classList.add("hide");
        return true;
    }
    else {
        p6.classList.replace("hide", "show");
        return false;
    }
};

userName.addEventListener("keyup", function () {
    validateUSerName();
});

mail.addEventListener("keyup", function () {
    if (validateUSerName()) {
        validatemail();
    }
    else {
        validateUSerName();
        validatemail();
    }
});

phone.addEventListener("keyup", function () {
    if (validatemail() && validateUSerName()) {
        validatephone();
    }
    else {
        validateUSerName();
        validatemail();
        validatephone();
    }
});

age.addEventListener("keyup", function () {
    if (validatephone() && validateUSerName() && validatephone()) {
        validateage();
    }
    else {
        validateUSerName();
        validatemail();
        validatephone();
        validateage();
    }

});

pass.addEventListener("keyup", function () {
    if (validatephone() && validateUSerName() && validatephone() && validateage()) {
        validatepass();
    }
    else {
        validateUSerName();
        validatemail();
        validatephone();
        validateage();
        validatepass();
    }

});

repass.addEventListener("keyup", function () {
    if (validatephone() && validateUSerName() && validatephone() && validateage() && validatepass()) {
        validaterepass();
    }
    else {
        validateUSerName();
        validatemail();
        validatephone();
        validateage();
        validatepass();
        validaterepass();
    }

});

// end js code for checking the validation of user info
var display_text = document.getElementById("display-text");
var word_hint = document.getElementById("word-hint");
var refresh_btn = document.getElementById("refresh-btn");
var check_btn = document.getElementById("check-btn");
var user_input = document.getElementById("user-input");
var timer_text = document.getElementById("timer");

var correct_word;
var timer;  


function timer_func(maxTime) {
    clearInterval(timer);  
    timer_text.innerText = maxTime;

    timer = setInterval(function () {
        if (maxTime > 0) {
            maxTime--;
            timer_text.innerText = maxTime;
        } else {
            clearInterval(timer);
            alert("Time Off! '" + correct_word + "' is the Correct Word.");
            game(); 
        }
    }, 1000);
}

function game() {
    timer_func(30);  

    var word_obj = words[Math.floor(Math.random() * words.length)];
    var word_array = word_obj.word.split("");

    for (let i = word_array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [word_array[i], word_array[j]] = [word_array[j], word_array[i]];
    }

    display_text.innerText = word_array.join(" ").toUpperCase();
    word_hint.innerText = word_obj.hint;
    correct_word = word_obj.word;
    user_input.value = "";
    user_input.setAttribute("maxlength", word_array.length);
}

function check_word() {
    var user_word = user_input.value.toLowerCase().trim();

    if (user_word !== "") {
        if (user_word === correct_word) {
            alert("Congrats! '" + user_word + "' is the Correct Word.");
            game();
        } else {
            alert("Oops! '" + user_word + "' is Not the Correct Word.");
        }
    } else {
        alert("Input field is empty!");
    }
}

refresh_btn.onclick = function () {
    game();
};

check_btn.onclick = function () {
    check_word();
};

game();

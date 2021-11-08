//사용 변수
const SETTING_TIME = 7;
let words = [];
let time;
let isReady = false;
let isPlaying = false;
let score = 0;

const url = "https://random-word-api.herokuapp.com/word?number=100";
const wordDisplay = document.querySelector(".word-display");
const wordInput = document.querySelector(".word-input");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

const level1 = document.querySelector(".level1");
const level2 = document.querySelector(".level2");
const level3 = document.querySelector(".level3");

time = 20;

//functions
const getWords = () => {
    axios.get(url).then(res => {
        words = res.data.filter(word => word.length < 7)
        button.innerText = '게임시작'
        button.classList.remove('loading');
        isReady = true;
    }).catch(err => log(err))
}


const init = () => {
    //최초의 실행이 되면
    time = SETTING_TIME;
    getWords();
}

/* const levelUP = () => {
    level1.addEventListener('click',() => {
        alert("난이도 쫄보!")
    })
}
 */


const countDown = () => {
    if (time > 0) {
        time--;
    } else {
        clearInterval(timeInterval);
        isPlaying = false;
    }
    timeDisplay.innerText = time;
}


const run = () => {
    if (isReady === false) {
        return;
    }
    timeInterval = setInterval(countDown, 1000)
    //초기화
    wordInput.value = ""
    score = 0;
    scoreDisplay.innerText = score
    isPlaying = true;
}

const checkMatch = () => {
    if (!isPlaying) {
        return; //만약 isPlaying false면 return하지마!
    }
    /* toUpperCase() //문자열을 대문자로 변환 
    toLowerCase() //문자열을 소문자로 변환
    */
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        score++
        time = SETTING_TIME
        wordInput.value = ""
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    } //성공했을때 

    scoreDisplay.innerText = score;
}

//event handler
wordInput.addEventListener("input", checkMatch)

//getting ready
init()
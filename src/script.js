let l = console.log;
let cvGame = document.getElementById('myCanvas');
let ctxGame = cvGame.getContext('2d');
let cvBullet = document.getElementById('myCanvas2');
let ctxBullet = cvBullet.getContext('2d');
let cvIntro = document.getElementById('myCanvas3');
let ctxIntro = cvIntro.getContext('2d');
const CTRL_KEY = 17;
const SPACE_KEY = 32;
const LEFT_ARROW_KEY = 37;
const UP_ARROW_KEY = 38;
const RIGHT_ARROW_KEY = 39;
const DOWN_ARROW_KEY = 40;
const DELAY_TIME = 0;

//hàm để chọn ngẫu nhiên các số từ 0 đến 255
function getRandomHex() {
    return Math.floor(Math.random() * 255);
}

//hàm để chọn ngẫu nhiên màu (rgb('red','green','blue') dựa vào mã ngẫu nhiên (0-255) đã chọn ở trên
function getRandomColor() {
    let red = getRandomHex();
    let green = getRandomHex();
    let blue = getRandomHex();
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function playReady() {
    countDown(3);
}

function countDown(time) {
    if (time > 0) {
        introGame(time);
        setTimeout(function () {
            countDown(time - 1)
        }, 1000);
    } else {
        ctxIntro.clearRect(0,0,CV_WIDTH,CV_HEIGHT);
        newGame()
    }
}

function playReset() {
    cvGame.style.webkitFilter = "blur(0px)";
    ctxGame.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    ctxIntro.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    ctxBullet.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    game = new Game();
    obstacles = [];
    scores = 0;
    document.getElementById('scores').innerHTML = scores;
    // window.clearTimeout(game.timeOut_Start);
    // window.cancelAnimationFrame(callAgainGameStart)
}

function newGame() {
    //new Game
    game = new Game();
    //khởi tạo mảng chướng ngại vật
    //hiện thị player
    game.player.show();
    obstacles = [];
    //reset điểm
    game.createMultipleObstacles();
    //hiển thị chướng ngại vật
    game.drawMultipleObstacles();
    scores = 0;
    document.getElementById('scores').innerHTML = scores;
    //khởi tạo các chướng ngại vật
    //game bắt đầu
    game.start();
}
function introGame(time) {
    cvGame.style.webkitFilter = "blur(0px)";
    ctxIntro.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    ctxIntro.textAlign = "center";
    ctxIntro.font = "150px Comic Sans MS";
    ctxIntro.fillStyle = 'green';
    ctxIntro.fillText(time, CV_WIDTH / 2, CV_HEIGHT / 2);
}
function outroGame(text1, text2) {
    cvGame.style.webkitFilter = "blur(2px)";
    ctxIntro.textAlign = "center";
    ctxIntro.font = "bold 40px Comic Sans MS";
    ctxIntro.fillStyle = 'green';
    ctxIntro.fillText(text1, CV_WIDTH / 2, CV_HEIGHT / 2);
    ctxIntro.fillText(text2, CV_WIDTH / 2, CV_HEIGHT / 2);
}

let game = new Game();
let obstacles = [];
let scores = 0;
let callAgainBulletMove;
let callAgainGameStart;
// window.addEventListener('keydown', function (e) {
//     if (game.end()) {
//         return;
//     } else {
//         if (e.keyCode == CTRL_KEY) {
//             game.player.shoot();
//         }
//     }
// });
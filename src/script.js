let l = console.log;
let cvGame = document.getElementById('myCanvas');
let ctxGame = cvGame.getContext('2d');
let cvBullet = document.getElementById('myCanvas2');
let ctxBullet = cvBullet.getContext('2d');
let cvIntro = document.getElementById('myCanvas3');
let ctxIntro = cvIntro.getContext('2d');
let cvExplosive = document.getElementById('myCanvas4');
let ctxExplosive = cvExplosive.getContext('2d');
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
        cvGame.style.webkitFilter = "blur(0px)";
        ctxGame.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
        ctxIntro.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
        ctxBullet.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
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
    // document.getElementById('scores').innerHTML = scores;
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
    // document.getElementById('scores').innerHTML = scores;
    //khởi tạo các chướng ngại vật
    //game bắt đầu
    musicBackground=new Sound('./sounds/background4.m4a');
    musicBackground.play();
    callBackMusicBackground=setInterval(function(){
        musicBackground.stop();
        musicBackground=new Sound('./sounds/background4.m4a');
        musicBackground.play();
    } ,132000);
    game.start();
}
function introGame(time) {
    cvGame.style.webkitFilter = "blur(0px)";
    ctxIntro.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
    ctxIntro.textAlign = "center";
    ctxIntro.font = "bold 140px Impact ";
    ctxIntro.fillStyle = 'yellow';
    ctxIntro.fillText(time, CV_WIDTH / 2, CV_HEIGHT / 2);
}
function outroGame() {
    cvGame.style.webkitFilter = "blur(2px)";
    ctxIntro.textAlign = "center";
    ctxIntro.font = "bold 80px Impact ";
    ctxIntro.fillStyle = 'yellow';
    ctxIntro.fillText("Game Over", CV_WIDTH / 2, CV_HEIGHT / 2);
    ctxIntro.font = "20px Impact";
    ctxIntro.fillStyle = 'red';
    ctxIntro.fillText('Press Enter to continute...', CV_WIDTH / 2, CV_HEIGHT / 1.4);
}

let game = new Game();
let musicBackground;
let soundGameOver=new Sound('./sounds/gameOver3.mp3');
let soundShoot=new Sound('./sounds/chiu.mp3');
let soundExplosive=new Sound('./sounds/Explosion+1.mp3');
let obstacles = [];
let scores = 0;
let callAgainBulletMove;
let callAgainGameStart;
let callBackMusicBackground;
ctxIntro.textAlign = "center";
ctxIntro.font = " 30px Arial ";
ctxIntro.fillStyle = 'wheat';
ctxIntro.fillText("GAME", CV_WIDTH / 2, CV_HEIGHT / 3);
ctxIntro.font = " bold 80px Impact ";
ctxIntro.fillStyle = 'yellow';
ctxIntro.fillText("SAVE THE WORLD", CV_WIDTH / 2, CV_HEIGHT / 2);
ctxIntro.font = " bold 20px Arial ";
ctxIntro.fillStyle = 'red';
ctxIntro.fillText("PRESS ENTER TO PLAY", CV_WIDTH / 2, CV_HEIGHT / 1.4);
// window.addEventListener('keydown', function (e) {
//     if (game.end()) {
//         return;
//     } else {
//         if (e.keyCode == CTRL_KEY) {
//             for (let i=0;i<obstacles.length;i++){
//                 game.obstacles[i].shoot();
//             }
//         }
//     }
// });
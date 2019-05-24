const EASY_SPEED = 0.5;
const MEDIUM_SPEED = 2;
const HARD_SPEED = 4;
const INCREASE_SPEED = 2;
const NUMBERS_OBSTACLES = 10;
const OBSTACLES_SIZE = 50;
const OBSTACLES_RATIO=0.4;
//khai báo lớp Chướng ngại vật
let Obstacles = function () {
    let self=this;
    this.x = Math.floor(Math.random() * (CV_WIDTH - OBSTACLES_SIZE * 2) + OBSTACLES_SIZE); //việc -150 và +100 là để tránh sinh chướng ngại vật gần điểm xuất phát của ô tô
    this.y = Math.floor(Math.random() * (-CV_HEIGHT));
    this.img=new Image();
    this.setType=function (name) {
        this.img.src=name;
        // this.width=this.img.naturalWidth*OBSTACLES_RATIO;
        // this.height=this.img.naturalHeight*OBSTACLES_RATIO;
        this.width=OBSTACLES_SIZE;
        this.height=OBSTACLES_SIZE;
        this.hp=1;

    }
    this.draw = function () {
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxGame.shadowColor='white'  //getRandomColor();
        ctxGame.shadowBlur=10;
        ctxGame.drawImage(self.img, x, y, width, height);
    }
    this.setSpeed = function () {
        let easy = document.getElementById('easy').checked;
        let medium = document.getElementById('medium').checked;
        let hard = document.getElementById('hard').checked;
        if (easy) {
            this.speed = EASY_SPEED;
        } else if (medium) {
            this.speed = MEDIUM_SPEED;
        } else {
            this.speed = HARD_SPEED;
        }
    }
    this.move = function () {
        this.y += this.speed;
    }
    this.isDestroyed=function (index) {
        //xóa obstacle khi hết máu (hp=0) bằng cách remove phần tử đó (dựa vào index truyền vào) trong mảng Obstacles
        //sau đó sinh lại 1 obstacle bù lại vào mảng
        if (obstacles[index].hp==0) {
            let removeItem = obstacles.splice(index, 1);
            let obstacle = new Obstacles();
            let color=getRandomColor();
            obstacle.setType('./images/ufo'+Math.floor(Math.random()*NUMBERS_UFO_IMAGES)+'.png')
            obstacle.setSpeed();
            obstacles.push(obstacle);
            scores++;
            // document.getElementById('scores').innerHTML=scores;
        }
    }
};
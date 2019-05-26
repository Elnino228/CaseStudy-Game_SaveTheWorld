const NUMBERS_UFO_IMAGES = 10;

//khai báo lớp Game
let Game = function () {
    let self = this;
    this.over = false;
    this.ready = true;
    this.player = new Player();
    this.bullet = new Bullet();
    //khởi tạo nhiều chướng ngại vật và lưu vào mảng đc khai báo Global
    this.createMultipleObstacles = function () {
        for (let i = 0; i < NUMBERS_OBSTACLES; i++) {
            this.obstacle = new Obstacles();
            let link = './images/ufo' + Math.floor(Math.random() * NUMBERS_UFO_IMAGES) + '.png';
            this.obstacle.setType(link, OBSTACLES_SIZE, EASY_SPEED)
            obstacles.push(this.obstacle);
        }

        this.obstacles = obstacles;
    };
    this.drawMultipleObstacles = function () {
        for (let i = 0; i < self.obstacles.length; i++) {
            self.obstacles[i].draw();
        }
    }
    //phương thức sẽ được gọi liên tục cho đến khi game over
    this.start = function () {
        if (self.over) {
            musicBackground.stop();
            window.clearInterval(callBackMusicBackground);
            soundGameOver.play();
            cancelAnimationFrame(callBackBulletMove);
            outroGame();
            self.ready = false;
            return; //nếu game over thì thoát
        }
        callBackGameStart = requestAnimationFrame(self.start);
        ctxGame.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
        ctxBullet.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
        self.player.move();
        self.player.show();
        //vẽ và move các obstacle
        for (let i = 0; i < self.obstacles.length; i++) {
            self.obstacles[i].move();
            if (self.obstacles[i].y >= CV_HEIGHT) {
                self.obstacles[i].x = Math.floor(Math.random() * (CV_WIDTH - 150) + 100);
                self.obstacles[i].y = Math.floor(Math.random() * (-CV_HEIGHT));
            }
            self.obstacles[i].draw();
        }
        //ghi lại trạng thái máu và điểm số
        self.record()
        //kiểm tra game đã over chưa
        self.end();
    };
    this.end = function () {
        for (let i = 0; i < self.obstacles.length; i++) {
            //điều ện chuẩn để player chết
            // let playerCollideObstacle = this.player.x + this.player.width >= this.obstacles[i].x &&
            //     this.player.x <= this.obstacles[i].x + this.obstacles[i].width &&
            //     this.player.y <= this.obstacles[i].y + this.obstacles[i].height;
            //sửa lại cho khó chết hơn
            let playerCollideObstacle = this.player.x + this.player.width / 2 >= this.obstacles[i].x &&
                this.player.x + this.player.width / 2 <= this.obstacles[i].x + this.obstacles[i].width &&
                this.player.y + this.player.height / 2 <= this.obstacles[i].y + this.obstacles[i].height;
            let obstacleCollideBottomEdge = this.obstacles[i].y + this.obstacles[i].height >= CV_HEIGHT;
            if (playerCollideObstacle || obstacleCollideBottomEdge) {
                this.over = true;
            }
        }
    }
    this.record = function () {
        ctxGame.textAlign = "center";
        ctxGame.font = "30px Impact";
        ctxGame.fillStyle = 'white';
        ctxGame.fillText('SCORES: ' + scores, 170, 30);
        ctxGame.font = "30px Impact";
        ctxGame.fillStyle = 'red';
        ctxGame.fillText('HP: ' + self.player.hp, 50, 30);
    }
};

//khai báo lớp Audio
let Sound = function (src) {
    let self = this;
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        self.sound.play();
    }
    this.stop = function () {
        self.sound.pause();
    }
}
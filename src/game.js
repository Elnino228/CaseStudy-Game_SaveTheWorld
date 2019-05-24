const NUMBERS_UFO_IMAGES=10;
//khai báo lớp Game
let Game = function () {
    let self = this;
    this.player = new Player();
    this.bullet=new Bullet();
    //khởi tạo nhiều chướng ngại vật và lưu vào mảng đc khai báo Global
    this.createMultipleObstacles = function () {
        for (let i = 0; i < NUMBERS_OBSTACLES; i++) {
            this.obstacle = new Obstacles();
            let color=getRandomColor();
            this.obstacle.setType('./images/ufo'+Math.floor(Math.random()*NUMBERS_UFO_IMAGES)+'.png')

            this.obstacle.setSpeed();
            obstacles.push(this.obstacle);
        }
        this.obstacles = obstacles;
    };
    this.drawMultipleObstacles=function () {
        for (let i=0;i<self.obstacles.length;i++){
            self.obstacles[i].draw();
        }
    }
    this.start = function () {
        if (self.end()) {
            outroGame('Game Over');
            return; //nếu game over thì thoát
        }
        callAgainGameStart=requestAnimationFrame(self.start);
        ctxGame.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
        ctxBullet.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
        self.player.move();
        self.player.show();
        // self.bullet.move();
        for (let i = 0; i < self.obstacles.length; i++) {
            self.obstacles[i].move();
            if (self.obstacles[i].y >= CV_HEIGHT) {
                self.obstacles[i].x = Math.floor(Math.random() * (CV_WIDTH - 150) + 100);
                self.obstacles[i].y = Math.floor(Math.random() * (-CV_HEIGHT));
            }
            self.obstacles[i].draw();
        }
        self.recordScores()
    };
    this.end = function () {
        for (let i = 0; i < self.obstacles.length; i++) {
            let playerTouchObstacle = this.player.x + this.player.width >= this.obstacles[i].x &&
                this.player.x <= this.obstacles[i].x + this.obstacles[i].width &&
                this.player.y <= this.obstacles[i].y + this.obstacles[i].height;
            let wallTouchObstacle = this.obstacles[i].y + this.obstacles[i].height >= CV_HEIGHT;
            if (playerTouchObstacle || wallTouchObstacle) {

                return true;
            }
        }
    }
    this.recordScores=function () {
        document.getElementById('scores').innerHTML=scores;
    }
    this.x=0;
    this.y=0;
    this.background=function (top,left,size) {
        
    }
    // this.animate = function () {
    //     this.top = top;
    //     this.left = left;
    //     this.size = size;
    //     this.speed = speed;
    //     //phương thức tạo thẻ insert ảnh trong html
    //     this.getCarElement = function () {
    //         return '<image width="' + this.sizeWidth + '" height="' + this.sizeHeight + '"' +
    //             ' src="' + this.image + '"' +
    //             ' style="top:' + this.top + 'px' + ';left:' + this.left + 'px' + ';position: absolute"' + ' />';
    //     }
    // };
};

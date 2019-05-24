const BULLET_SIZE = 30;
const BULLET_SPEED = 8;
const BULLET_RATIO = 0.1;


//khai báo lớp Đạn
let Bullet = function () {
    let self = this;
    this.x;
    this.y;
    this.img=new Image();
    this.setType = function (name) {
        this.name = name;
        this.speed = 4;
        this.damage = 1;
    }
    this.draw = function () {
        this.img.src=this.name;
        this.width=this.img.naturalWidth*BULLET_RATIO;
        this.height=this.img.clientWidth*BULLET_RATIO;
        l(self.img.width)
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxBullet.save();
        ctxBullet.drawImage(self.img, x, y, width, height);
    }
    this.move = function () {
        if (self.destroy()) {
            return;
        }
        callAgainBulletMove = requestAnimationFrame(self.move)
        ctxBullet.clearRect(self.x, self.y, self.width , self.height )
        self.y -= self.speed;
        self.draw();
        // setTimeout(self.move, DELAY_TIME);
    }
    this.destroy = function () {
        let bulletTouchTopWall = this.y + this.size <= 0;
        //khi đạn chạm vào cạnh trên Canvas thì xóa đạn
        if (bulletTouchTopWall) {
            ctxBullet.clearRect(self.x, self.y, self.width , self.height );
            return true;
        }
        ;
        for (let i = 0; i < obstacles.length; i++) {
            let bulletTouchObstacle = (this.x + this.width >= obstacles[i].x &&
                this.x <= obstacles[i].x + obstacles[i].width &&
                this.y  <= obstacles[i].y + obstacles[i].height);
            //khi đạn chạm vào chướng ngại vật thì hủy chướng ngại vật
            if (bulletTouchObstacle) {
                obstacles[i].hp--;
                obstacles[i].isDestroyed(i);
                ctxBullet.clearRect(self.x, self.y, self.width , self.height );
                return true;
            }
        }
    }
}
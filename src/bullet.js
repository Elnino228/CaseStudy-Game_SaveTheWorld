const BULLET_SIZE = 30;
const BULLET_SPEED = 8;
const BULLET_RATIO = 0.08;

let bulletTouchPlayer = false;
let Bullet_Type = function (name, link, size, speed, damage) {
    this.name = name;
    this.link = link;
    this.size = size;
    this.speed = speed;
    this.damage = damage;
}
//khai báo lớp Đạn
let Bullet = function () {
    let self = this;
    this.x;
    this.y;
    this.img = new Image();
    this.setType = function (name, link, size, speed, damage) {
        this.type = new Bullet_Type(name, link, size, speed, damage)
        this.img.src = this.type.link;
        if (this.type.speed <= 0) {
            this.width = this.type.size / 3;
            this.height = this.type.size;
        } else {
            this.width = this.type.size / 4;
            this.height = this.type.size / 2;
        }
    }
    this.draw = function () {
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxBullet.drawImage(self.img, x, y, width, height);
    }
    this.move = function () {
        if (self.destroy() || game.over) {
            ctxBullet.clearRect(self.x, self.y, self.width, self.height)
            return;
        }
        if (game.over) {
            this.ready = false;
            // musicBackground.stop();
            // soundGameOver.play();
            cancelAnimationFrame(callAgainBulletMove);
        }
        callAgainBulletMove = requestAnimationFrame(self.move)
        ctxBullet.clearRect(self.x, self.y, self.width, self.height)
        self.y += self.type.speed;
        self.draw();
        // setTimeout(self.move, DELAY_TIME);
    }
    this.destroy = function () {
        if (this.type.name == 'bulletOfPlayer') {
            let bulletTouchTopWall = this.y <= 0;
            //khi đạn chạm vào cạnh trên Canvas thì xóa đạn
            if (bulletTouchTopWall) {
                return true;
            }
            for (let i = 0; i < obstacles.length; i++) {
                let bulletTouchObstacle = (this.x + this.width >= obstacles[i].x &&
                    this.x <= obstacles[i].x + obstacles[i].width &&
                    this.y <= obstacles[i].y + obstacles[i].height);
                //khi đạn chạm vào chướng ngại vật thì hủy chướng ngại vật
                if (bulletTouchObstacle) {
                    obstacles[i].hp--;
                    obstacles[i].isDestroyed(i);
                    ctxBullet.clearRect(self.x, self.y, self.width, self.height);
                    return true;
                }
            }
        } else {
            let bulletTouchBottomWall = this.y + this.height >= CV_HEIGHT;
            //khi đạn chạm vào cạnh trên Canvas thì xóa đạn
            if (bulletTouchBottomWall) {
                return true;
            }
            bulletTouchPlayer = this.x + this.width >= game.player.x &&
                this.x <= game.player.x + game.player.width &&
                this.y + this.height >= game.player.y;
            if (bulletTouchPlayer) {
                if (game.player.hp>0) game.player.hp--;
                if (game.player.hp==0){
                    game.over = true;
                    game.ready=false;
                }

                return true;
            }
        }

    }
}
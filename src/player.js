const ORIENTATION_UP = 'up';
const ORIENTATION_DOWN = 'down';
const ORIENTATION_LEFT = 'left';
const ORIENTATION_RIGHT = 'right';
const DEFAULT_ORIENTATION = ORIENTATION_UP;
const PLAYER_RATIO=0.3;
const CV_WIDTH = myCanvas.width;
const CV_HEIGHT = myCanvas.height;
const DEFAULT_POSISION_Y=CV_HEIGHT-100;
const DEFAULT_POSISION_X=CV_WIDTH / 2;

let Player = function () {
    //để tránh nhầm lẫn trong việc thực thi từ 'this' trong function, ta đặt self=this ở ngay đầu khai báo lớp để dùng trong function
    let self = this;
    this.x = DEFAULT_POSISION_X;
    this.y = DEFAULT_POSISION_Y;
    this.image=new Image();
    this.image.src='./images/combat_Aircrafts.png';
    this.width = this.image.naturalWidth*PLAYER_RATIO;
    this.height = this.image.naturalHeight*PLAYER_RATIO;
    this.speed = DEFAULT_SPEED;
    this.orientation = DEFAULT_ORIENTATION;
    this.show = function () {
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxGame.drawImage(self.image, x, y, width, height);

    };
    //cho phương thức này khai báo ở thẻ body với sự kiện onkeydown
    this.changeOrientation = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW_KEY:
                this.orientation = ORIENTATION_LEFT;
                break;
            case RIGHT_ARROW_KEY:
                this.orientation = ORIENTATION_RIGHT;
                break;
            case CTRL_KEY:
                this.shoot();
                break;
        }
    };
    this.move = function () {
        switch (this.orientation) {
            case ORIENTATION_LEFT:
                if (this.x <= 0) {
                    this.x = CV_WIDTH;
                }
                this.x -= this.speed;
                break;
            case ORIENTATION_RIGHT:
                if (this.x >= CV_WIDTH) {
                    this.x = 0;
                }
                this.x += this.speed;
                break;
        }
    };
    this.shoot = function () {
        let bullet = new Bullet();
        bullet.setType('./images/rocket2.png')
        this.bullet = bullet;
        this.bullet.x = this.x + this.width / 2-this.bullet.width/2;
        this.bullet.y = this.y;
        this.bullet.move();

    }
};
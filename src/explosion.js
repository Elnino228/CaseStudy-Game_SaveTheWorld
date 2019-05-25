const EXPLOSION_SIZE = 100;

let Explosion = function () {
    let index=11;
    let self=this;
    this.size = EXPLOSION_SIZE;
    this.setPosition=function (x,y) {
        this.x=x;
        this.y=y;
    }
    this.start = function () {
        if (index >=0) {
            let img = new Image();
            let x = this.x;
            let y = this.y;
            let width = this.size;
            let height = this.size;
            img.src = './images/explosive'+index+'.png';
            // ctxIntro.save();
            ctxExplosive.shadowColor='red';
            ctxExplosive.shadowBlur=60;
            ctxExplosive.drawImage(img, x, y, width, height);
            // ctxIntro.restore();
            setTimeout(function () {
                ctxExplosive.clearRect(0, 0, CV_WIDTH, CV_HEIGHT);
                index--;
                self.start();
            }, 100);
        }
    }
}
var manifest,loader;
var w,h;
var maxNumber = 30;
var size = 5;
var color = ['#fff'];

$(function(){

    var canvas = document.getElementById('gameCanvas'),
        stage = new createjs.Stage(canvas);

    w = stage.canvas.width = $(window).width();
    h = stage.canvas.height = $(window).height();

    canvas.style.background = 'black';

    //粒子particle
    var particle = function(){
        this.size = size;
        this.opacity = 1;
        this.scale = 1;
        this.color = color[0];
    };
    //测试用log
    particle.prototype.log = function(){
        console.log(this);
    };

    particle.prototype.createParticle = function(){
        var shape = new createjs.Shape();
        var scale = Math.random() + 0.3;
        shape.graphics.beginFill(this.color).drawCircle(0, 0, this.size);

//        shape.x = - Math.random() * w;
//        shape.y = - Math.random() * h;
        shape.velX = Math.random() * 2 + 1;
        shape.velY = Math.random() * 2 + 1;
        shape.alpha = Math.random() * this.opacity/2 + this.opacity/2;
        shape.setTransform(- Math.random() * w ,- Math.random() * h , scale, scale);

        return shape;
    };

    for(var i = 0; i < maxNumber ; i++){
        var snow = new particle().createParticle();
        stage.addChild(snow);
    }


    createjs.Ticker.timingMode = createjs.Ticker.RAF;
//    createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
//    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick);

    var time = 0;
    function tick(event) {
        var deltaS = event.delta / 1000;
        var l = stage.getNumChildren() - 1;

        for (var i = 1; i < l; i++) {
            var show = stage.getChildAt(i);
            show.x = (show.x + show.velX + w) % w;
            show.y = (show.y + show.velY + h) % h;
        }
        stage.update(event);
    }
});

function log(t){
    console.log(t);
}

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
        shape.velX = Math.random()* 5 * random_direction().x;
        shape.velY = Math.random()* 5 * random_direction().y;
        shape.alpha = 0;
        shape.setTransform(w/2 ,h/2 , scale, scale);

        return shape;
    };

    for(var i = 0; i < maxNumber ; i++){
        var snow = new particle().createParticle();
        snow.cango = false;
        stage.addChild(snow);
    }


    createjs.Ticker.timingMode = createjs.Ticker.RAF;
//    createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;
//    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick);

    var time = 0;
    var blur = 20;
    function tick(event) {
        var deltaS = event.delta / 1000;
        var l = stage.getNumChildren();

        time+=deltaS;
        if(time >= 2){
            time = 0;
        }
        for (var i = 0; i < maxNumber; i++) {
            var snow = stage.getChildAt(i);
            if(time == 0) snow.cango = true;
            if(snow.cango){
                if(snow.x > w+blur || snow.x < -blur || snow.y > h+blur || snow.y < -blur){
                    stage.removeChild(snow);
                    stage.addChild(new particle().createParticle());
                }else {
                    snow.x = snow.x + snow.velX;
                    snow.y = snow.y + snow.velY;
                    snow.alpha = 1;
                }
            }
        }
        stage.update(event);
    }
});

function log(t){
    console.log(t);
}

//随机一个正反方向
function random_direction(){
    var x = Math.floor(Math.random()*100);
    var y = Math.floor(Math.random()*100);

    return x>50&&y>50 ? {x:1,y:1} : x>50&&y<50 ? {x:1,y:-1} : x<50&&y>50 ? {x:-1,y:1} : {x:-1,y:-1};
}
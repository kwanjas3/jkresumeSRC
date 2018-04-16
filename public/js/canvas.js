


var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var circleArray = [];
var maxRadius = 40;
var minRadius = 2;
var mouse = {
    x: undefined,
    y: undefined,
}

var colorArray = [
    '#FFAB1D',
    '#005E8C',
    '#129057',
    '#23B16C',
    '#DCD6E0'
]




window.addEventListener('mousemove', function (evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;


    mouse.x = (evt.clientX - rect.left) * scaleX  // scale mouse coordinates after they have
    mouse.y = (evt.clientY - rect.top) * scaleY

})

function init() {
    var getParticleCount = document.getElementsByClassName('particleCount')[0].value
    circleArray = [];
    for (var i = 0; i < getParticleCount; i++) {
        var radius = Math.random() * 10 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius
        var y = Math.random() * (innerHeight - radius * 2) + radius
        var dx = (Math.random() - 0.5) * 3;
        var dy = (Math.random() - 0.5) * 3;
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}
init();

$('#particleCount').keypress(function (event) {
    var keycode = event.keyCode || event.which;
    if (keycode == '13') {
        init();
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]


    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill()
        this.update();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interaction
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
        ) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }



    }

}





animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
    }

}

animate();


    // c.fillStyle = 'rgba(255, 0, 0, 0.5)';
    // //c.fillRect(posx,posy,sizex,sizey)
    // c.fillRect(100, 100, 100, 100);

    // c.fillStyle = 'rgba(0, 255, 0, 0.5)';
    // //c.fillRect(posx,posy,sizex,sizey)
    // c.fillRect(200, 200, 100, 100);

    // //line


    // c.beginPath();
    // c.moveTo(50, 300);
    // c.lineTo(300, 100);
    // c.lineTo(400, 300);

    // c.strokeStyle = "#fa34a3";

    // c.stroke();

    // c.beginPath();
    // c.arc(300, 300, 30, 0, Math.PI * 2, false);
    // c.strokeStyle = 'blue';
    // c.stroke()



    // for (var i = 0; i < 100; i++) {
    //     var x = Math.random() * window.innerWidth
    //     var y = Math.random() * window.innerHeight

    //     var rngColorR = Math.round((Math.random() * 255))
    //     var rngColorG = Math.round((Math.random() * 255))
    //     var rngColorB = Math.round((Math.random() * 255))

    //     var r = rngColorR.toString();
    //     var g = rngColorG.toString();
    //     var b = rngColorB.toString();
    //     c.beginPath()
    //     c.arc(x, y, 30, 0, Math.PI * 2, false);
    //     c.strokeStyle = 'rgba('+r+' ,'+g+','+b+',0.5)'
    //     c.stroke()
    // }


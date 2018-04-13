var socket = io.connect('http://localhost:3000');

socket.emit('message_to_server', '#{id}');

socket.on('reponse', function(data)
{
	console.log(data);
});

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var colors = [
	'#000000',
	'#001c3c',
	'#224baa',
	'#366ae2',
	'#33c5ff'
];

var gravity = 1;
var friction = .85;
var x = Math.random()*innerWidth; 
var y = Math.random()*innerHeight;

var dx = (Math.random() - 0.5)*10;
var dy = (Math.random() - 0.5)*10;

var maxRadius = 20;

var mouse = {x:undefined, y:undefined}

var particles = [];

var playAnimation = true;

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', function(){
	//playAnimation = false;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
	//playAnimation = true;
});

function setup()
{
	socket.on('connection', function(){
		socket.emit('name', 'taco');
	});
}

socket.on('response', function(data)
{
	console.log(data);
});

function randomRange(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors)
{
	return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, dx, dy, radius, color)
{
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.radians = Math.random()* Math.PI * 2;
	this.velocity = Math.random() * (.04 -.01)+.01;

	//3D effect
	this.dist3D = {x: randomRange(20, 300), y: randomRange(20, 300)};
	this.dist2D = randomRange(20, 300);

	this.lastMouse = {x: x, y: y};

	this.color = color;
	const base = radius;

	this.draw = lastPoint =>
	{
		 context.beginPath();
		 context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		 context.fillStyle = this.color;
		 context.fill();
		 context.closePath();
/*
		context.beginPath();
		context.strokeStyle = this.color;
		context.lineWidth = this.radius;
		context.moveTo(lastPoint.x, lastPoint.y);
		context.lineTo(this.x, this.y);
		context.stroke();
		context.closePath();
		*/
	};

	this.update = () =>
	{
		const lastPoint = {x:this.x, y:this.y};
		this.radians += this.velocity;

		this.lastMouse.x += (mouse.x -this.lastMouse.x)*0.05;
		this.lastMouse.y += (mouse.y -this.lastMouse.y)*0.05;

		this.x = x+Math.cos(this.radians) * this.dist3D.x;
		this.y = y+Math.sin(this.radians) * this.dist3D.y;
		this.draw(lastPoint);
	};
}

function init()
{
	particles = [];
	part = [];

	for (var i = 0; i < 100; i++) 
	{
		var radius = randomRange(1, 7)
		particles.push(new Particle(canvas.width/2, canvas.height/2, 2, 2, radius, randomColor(colors)));
		
	}
}

function animate()
{
	requestAnimationFrame(animate);

	context.fillStyle = "rgba(0, 0, 0, .3)"
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
	}

	
}

setup();
init();
animate();

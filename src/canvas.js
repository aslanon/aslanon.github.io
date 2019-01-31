import data from "./skills-data";

const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let image = document.createElement("img");
image.src = canvas.getAttribute("center");
document.querySelector("body").appendChild(image);

/*
 * Your skills data.
 */
const skills = data.skillData;

let totalCircle = 250;
let velocity = 0.0025;
let angle = 0;
let mouse = {
  x: undefined,
  y: undefined,
  wheel: undefined
};

const colors = ["#FFC900", "#29A4E8", "#FF4100", "#1CE840", "#DD0DFF"];

/*
 * Events
 */
var mousewheel = /Firefox/i.test(navigator.userAgent)
  ? "DOMMouseScroll"
  : "mousewheel";
document.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
document.addEventListener("touchmove", function(e) {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});
canvas.addEventListener("mouseleave", function(e) {
  mouse.x = undefined;
  mouse.y = undefined;
  velocity = 0.0025;
});
document.addEventListener(mousewheel, function(e) {
  var y = /Firefox/i.test(navigator.userAgent) ? e.detail : e.deltaY;
  y < 0 ? (mouse.wheel = "up") : (mouse.wheel = "down");
  if (mouse.wheel == "up") {
    angle -= 15;
  }
  if (mouse.wheel == "down") {
    angle += 15;
  }
  setTimeout(() => {
    mouse.wheel = undefined;
  }, 0);
});
window.addEventListener("resize", function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

/*
 * Circle Object
 */
function Circle(x, y, radius, color, blurSize, text) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.blurSize = blurSize;
  this.rad = Math.random() * Math.PI * 2;
  this.velocity = velocity;
  this.distanceCenter = getRandomRange(50, innerWidth / 10);
  this.lastMouse = { x: x, y: y };
  this.opacity = Math.abs(((Math.random() * 100) / 10 - 1).toFixed(0) + "0");
  if (text) {
    this.text = text;
  }
}

Circle.prototype.update = function() {
  let lastPoint = {
    x: this.x,
    y: this.y
  };
  this.rad += velocity;

  if (mouse.x) {
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
    this.x = this.lastMouse.x + Math.cos(this.rad) * (this.distanceCenter * 5);
    this.y =
      this.lastMouse.y + Math.sin(this.rad) * (this.distanceCenter + angle * 5);
  } else {
    this.x = this.lastMouse.x + Math.cos(this.rad) * (this.distanceCenter * 5);
    this.y =
      this.lastMouse.y + Math.sin(this.rad) * (this.distanceCenter + angle * 5);
  }

  image.style.setProperty("--dx", `${this.lastMouse.x}px`);
  image.style.setProperty("--dy", `${this.lastMouse.y - 48}px`);

  this.drawCircle(lastPoint);
};

Circle.prototype.setup = function() {
  if (this.text) {
    ctx.fillStyle = this.color;
  } else {
    if (this.opacity <= 10) {
      ctx.fillStyle = this.color + `${this.opacity}`;
    } else {
      ctx.fillStyle = this.color;
    }
  }
  ctx.fill();
  ctx.closePath();
  if (this.text) {
    ctx.font = `${this.text.size * 2}px Arial`;
    ctx.fillStyle = this.text.color;
    ctx.fillText(this.text.text, this.x, this.y);
    // for firefox bug
    if (mousewheel === "mousewheel") {
      ctx.strokeStyle = "rgba(255,255,255,.2)";
      ctx.arc(mouse.x, mouse.y - 24, 20, 0, 0 * Math.PI);
      ctx.stroke();
    }
  }
};

Circle.prototype.drawCircle = function(lastPoint) {
  ctx.beginPath();
  ctx.shadowBlur = this.blurSize;
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  this.setup();
};

/*
 * Setup Canvas
 */
function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  createCircle();
  for (var i = 0; i < skills.length; i++) {
    createCircleText(skills[i]);
  }
}

/*
 * Circle Create
 */
let circleArray = [];
function createCircle() {
  circleArray = [];
  for (var i = 0; i < totalCircle; i++) {
    var blurSize = Math.abs((Math.random() - 0.8) * 25);
    var x = innerWidth / 2;
    var y = innerHeight / 2;
    var radius = Math.abs((Math.random() - 0.8) * 3);
    var color = colors[Math.floor(Math.random() * colors.length + 1)];
    circleArray.push(new Circle(x, y, radius, color, blurSize));
  }
}

/*
 * Circle text setup
 */
let i = -1 * Math.floor(totalCircle / skills.length);
function createCircleText(text) {
  i += Math.floor(totalCircle / skills.length);
  var blurSize = Math.abs((Math.random() - 0.8) * 25);
  var x = innerWidth / 2;
  var y = innerHeight / 2;
  var radius = Math.abs((Math.random() - 0.8) * 3);
  var color = colors[Math.floor(Math.random() * colors.length + 1)];
  circleArray.splice(i, 0, new Circle(x, y, text.size, color, blurSize, text));
}

/*
 * Random range generator
 */
function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
 * Animation frames
 */
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  circleArray.forEach(circle => {
    circle.update();
  });
}

init();
animate();

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _skillsData = __webpack_require__(/*! ./skills-data */ "./src/skills-data.js");

var _skillsData2 = _interopRequireDefault(_skillsData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var image = document.createElement("img");
image.src = canvas.getAttribute("center");
document.querySelector("body").appendChild(image);

/*
 * Your skills data.
 */
var skills = _skillsData2.default.skillData;

var totalCircle = 250;
var velocity = 0.0025;
var angle = 0;
var mouse = {
  x: undefined,
  y: undefined,
  wheel: undefined
};

var colors = ["#FFC900", "#29A4E8", "#FF4100", "#1CE840", "#DD0DFF"];

/*
 * Events
 */
var mousewheel = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
document.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
document.addEventListener("touchmove", function (e) {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});
canvas.addEventListener("mouseleave", function (e) {
  mouse.x = undefined;
  mouse.y = undefined;
  velocity = 0.0025;
});
document.addEventListener(mousewheel, function (e) {
  var y = /Firefox/i.test(navigator.userAgent) ? e.detail : e.deltaY;
  y < 0 ? mouse.wheel = "up" : mouse.wheel = "down";
  if (mouse.wheel == "up") {
    angle -= 15;
  }
  if (mouse.wheel == "down") {
    angle += 15;
  }
  setTimeout(function () {
    mouse.wheel = undefined;
  }, 0);
});
window.addEventListener("resize", function () {
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
  this.opacity = Math.abs((Math.random() * 100 / 10 - 1).toFixed(0) + "0");
  if (text) {
    this.text = text;
  }
}

Circle.prototype.update = function () {
  var lastPoint = {
    x: this.x,
    y: this.y
  };
  this.rad += velocity;

  if (mouse.x) {
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
    this.x = this.lastMouse.x + Math.cos(this.rad) * (this.distanceCenter * 5);
    this.y = this.lastMouse.y + Math.sin(this.rad) * (this.distanceCenter + angle * 5);
  } else {
    this.x = this.lastMouse.x + Math.cos(this.rad) * (this.distanceCenter * 5);
    this.y = this.lastMouse.y + Math.sin(this.rad) * (this.distanceCenter + angle * 5);
  }

  image.style.setProperty("--dx", this.lastMouse.x + "px");
  image.style.setProperty("--dy", this.lastMouse.y - 48 + "px");

  this.drawCircle(lastPoint);
};

Circle.prototype.setup = function () {
  if (this.text) {
    ctx.fillStyle = this.color;
  } else {
    if (this.opacity <= 10) {
      ctx.fillStyle = this.color + ("" + this.opacity);
    } else {
      ctx.fillStyle = this.color;
    }
  }
  ctx.fill();
  ctx.closePath();
  if (this.text) {
    ctx.font = this.text.size * 2 + "px Arial";
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

Circle.prototype.drawCircle = function (lastPoint) {
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
var circleArray = [];
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
var i = -1 * Math.floor(totalCircle / skills.length);
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
  circleArray.forEach(function (circle) {
    circle.update();
  });
}

init();
animate();

/***/ }),

/***/ "./src/skills-data.js":
/*!****************************!*\
  !*** ./src/skills-data.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var skillData = [{ text: "JavaScript", size: 8, color: "pink" }, { text: "Canvas", size: 5, color: "yellow" }, { text: "Vue.js", size: 8, color: "chartreuse" }, { text: "HTML & CSS", size: 9, color: "cornflowerblue" }, { text: "Illustration", size: 8.5, color: "orange" }, { text: "UI & UX", size: 8, color: "red" }, { text: "2D Animation", size: 8, color: "deeppink" }, { text: "Responsive Design & PWA", size: 9, color: "aquamarine" }, { text: "Python", size: 8, color: "darkviolet" }];

module.exports = { skillData: skillData };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map
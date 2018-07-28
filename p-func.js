var meIDs = ["5776","5788","5794","5796","5798","5800","5802","5804","5806","5808","5810","5812","5814","5816","5818"];
var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var c1 = canvas1.getContext("2d");
var c2 = canvas2.getContext("2d");
var maxParticles = 45;
var stars = [];
var astroneerImg = new Image();
astroneerImg.src = "./img/astronaut1.svg";
var aX;
var aY;
var moving = 3;
var sX;
var sY;

$(window).on("load",function(){
  particlesJS('main',{
    "particles": {
      "number": {
        "value": 189,
        "density": {
          "enable": true,
          "value_area": 631.3181133058181
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },

      },
      "opacity": {
        "value": 0.8017060304327615,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 0.2,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 4,
          "size_min": 0.3,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 600
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "bubble"
        },
        "onclick": {
          "enable": false,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 250,
          "size": 0,
          "duration": 2,
          "opacity": 0,
          "speed": 3
        },
        "repulse": {
          "distance": 400,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

    $(".particles-js-canvas-el").css({position : "absolute", zIndex: "1",});
    $("#main").css({display:"grid"});
    $("#me-drawn").css({width: "100%"});


    console.log("Earth: 'Astroneer, everything is loaded.'");
    new Vivus('me-drawn', {duration: 200}, function(){});
});

$(window).resize(function(){
  whereAdjust();
  setMarginLeftThirdBox();
  setCanvasSize();
  createStars();
  drawAstroneer();

})

$(document).ready(function(){
   console.log("Astroneer: 'The Document is ready.'");
   whereAdjust();
   $("#c-btn").click(function (){
     $('html, body').animate({scrollTop: $("#contact").offset().top}, 2000);
  });
  setMarginLeftThirdBox();
  setCanvasSize();
  createStars();
  drawAstroneer();

  setInterval(draw, 33);
  setInterval(moveAstroneer, 33);
});

function whereAdjust(){
  if($(window).width() < 760){
    $("#where").text("above");
  } else {
    $("#where").text("left");
  }
}

function setMarginLeftThirdBox(){
  var mL = $("#webDev").width();
  var wPW = $("#planetWatcher").width();
  var wRocketDesign = $("#rocketDesign").width();
  var wRD = $("#responsiveDevelopment").width();

  wPW = (mL - wPW) / 2;
  wRocketDesign = (mL - wRocketDesign) / 2;
  wRD = (mL - wRD) / 2;


  $("#planetWatcher").css({marginLeft: wPW});
  $("#rocketDesign").css({marginLeft: wRocketDesign});
  $("#responsiveDevelopment").css({marginLeft: wRD});
}

function setCanvasSize(){
  var parentWidth = $("#skills-content").width();
  var parentHeight = $("#skills-content").height();

  canvas1.setAttribute("width", parentWidth);
  canvas1.setAttribute("height", parentHeight);
  canvas2.setAttribute("width", parentWidth);
  canvas2.setAttribute("height", parentHeight);
  aX = canvas2.width / 3 - 50;
  aY = canvas2.height / 2 - 50;

  sX = Math.random() * canvas2.width * 1.5  + 50;
}

function createStars(){
  for (var i = 0; i < maxParticles; i++) {
    stars.push({
      x: Math.random() * canvas1.width * 2,
      y: Math.random() * canvas1.height,
      r: Math.random() * 2 + 1,
      d: Math.random() * maxParticles
    });
  };
}

function draw(){
  c1.clearRect(0, 0, canvas1.width, canvas1.height);
  c1.fillStyle = "rgba(255, 255, 255, 0.7)";
  c1.beginPath();

  for (var i = 0; i < maxParticles; i++) {
    var s = stars[i];
    c1.moveTo(s.x, s.y);
    c1.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  };

  c1.fill();
  update();
}

function update(){
  //sending the stars back to the right
  for (var i = 0; i < maxParticles; i++) {
    var s = stars[i];
    s.x -= 4;
    if(s.x < 0 + 3){
      stars[i] = {x: Math.random()* canvas1.width * 1.2, y: Math.random() * canvas1.height, r: Math.random() * 2 + 1, d: s.p};
    }
}
}

function drawAstroneer(){
  c2.drawImage(astroneerImg, aX, aY, 100, 50);
}

function moveAstroneer(){
  c2.clearRect(0, 0, canvas2.width, canvas2.height);
  c2.drawImage(astroneerImg, aX, aY, 100, 50);
  aY = aY + moving;
  if(aY  > canvas2.height - 150 || aY < 100){
    moving *= -1;
  }
}

//Made by Jason Cheng on Visual Studio Code (TM) :)
window.onload = function() {
  //initial/misc stuff
  //options
  var showSettings = getId("showSettings");
  var hideSettings = getId("done");
  var settings = getId("settings");
  var colorValues = ["grey", "blue", "green", "red", "orange"];
  var cvalueIndex = 0;
  getId("currentTheme").innerHTML = colorValues[cvalueIndex];
  $(settings).hide();
  showSettings.onmousedown = function(e) {
    var clickedObject = $("#controlPanel"),
      offset = clickedObject.offset(),
      w = this.offsetWidth,
      h = this.offsetHeight,
      x = e.pageX - offset.left,
      y = e.pageY - offset.top,
      ripple = $('<div/>');
    ripple.addClass("ripple").prependTo("#controlPanel");

    $('<div/>', {
      class: "rippleWave",
      css: {
        background: themeSelect[0],
        width: h,
        height: h,
        left: x - (h / 2),
        top: y - (h / 2),
      },
      prependTo: ripple,
      on: {
        animationend: function() {
          ripple.remove();
        }
      }
    });
    setTimeout(function() {
      $("#scoreBoard").hide();
      $(settings).fadeIn();
      $("#controlPanel").css("height", "auto");
    }, 500)
  };
  showSettings.onmouseenter = function() {
    this.innerHTML = "Edit settings"
  }
  showSettings.onmouseleave = function() {
    this.innerHTML = "Scores"
  }
  hideSettings.onmousedown = function(e) {
    var clickedObject = $("#controlPanel"),
      offset = clickedObject.offset(),
      w = this.offsetWidth,
      h = this.offsetHeight,
      x = e.pageX - offset.left,
      y = e.pageY - offset.top,
      ripple = $('<div/>');
    ripple.addClass("ripple").prependTo("#controlPanel");

    $('<div/>', {
      class: "rippleWave",
      css: {
        background: themeSelect[0],
        width: h,
        height: h,
        left: x - (h / 2),
        top: y - (h / 2),
      },
      prependTo: ripple,
      on: {
        animationend: function() {
          ripple.remove();
        }
      }
    });
    setTimeout(function() {
      $(settings).hide();
      $("#scoreBoard").fadeIn();
      $("#controlPanel").css("height", "auto");
    }, 500)
  };
  $(".options").click(function() {
    switch(this.id) {
      case "changeTheme":
        cvalueIndex = cvalueIndex >= colorValues.length - 1 ? 0 : cvalueIndex + 1;
        getId("currentTheme").innerHTML = colorValues[cvalueIndex];
        getId("currentTheme").style.color = colorValues[cvalueIndex] === "grey" ? "black" : colorValues[cvalueIndex];
        themeSelect = colorThemes[cvalueIndex];
        background.fill = themeSelect[0];
        userPaddle.fill = themeSelect[3];
        ball.fill = themeSelect[2];
        middleLine.fill = themeSelect[1];
        middleCircle.stroke = themeSelect[1];
        opponentPaddle.fill = themeSelect[3];
        background.draw();
        middleLine.draw();
        middleCircle.draw();
        if(shadows) {
          paddleShadow1.draw(); paddleShadow2.draw();
          ballShadow.draw();
        }
        userPaddle.draw();
        opponentPaddle.draw();
        ball.draw();
        if(paused) {
          ctx.fillStyle = "rgba(102, 102, 102, 0.7)";
          ctx.fillRect(0, 0, width, height);
          ctx.font = "30px Impact";
          ctx.fillStyle = "#d3d3d3";
          ctx.textAlign = "center";
          ctx.fillText("The theme has been changed to " + getId("currentTheme").innerHTML, canvas.width / 2, canvas.height / 2);
        }
        $(".score").css({
          border: "2px solid" + themeSelect[0],
        });
        $("#scoreBoard").css({
          color: "4px solid" + themeSelect[3],
        });
        break;
      case "allowCheats":
        getId("cheatsBool").innerHTML = getId("cheatsBool").innerHTML == "allowed" ? "disabled" : "allowed";
        gravity = false; inverted = false; slippery = false;
        if(paused) {
          ctx.clearRect(0, 0, width, height);
          background.draw();
          middleLine.draw();
          middleCircle.draw();
          if(shadows) {
            paddleShadow1.draw(); paddleShadow2.draw();
            ballShadow.draw();
          }
          userPaddle.draw();
          opponentPaddle.draw();
          ball.draw();
          ctx.fillStyle = "rgba(102, 102, 102, 0.7)";
          ctx.fillRect(0, 0, width, height);
          ctx.font = "30px Impact";
          ctx.fillStyle = "#d3d3d3";
          ctx.textAlign = "center";
          ctx.fillText("Special effects are now " + getId("cheatsBool").innerHTML, canvas.width / 2, canvas.height / 2);
        }
        break;
      case "toggle1p":
        singlePlayer = !singlePlayer;
        if(singlePlayer) {
          getId("1pBool").innerHTML = "on"
          getId("computer").innerHTML = "Computer";
        } else {
          getId("1pBool").innerHTML = "off";
          getId("computer").innerHTML = "Player 1";
        }
        if(paused) {
          ctx.clearRect(0, 0, width, height);
          background.draw();
          middleLine.draw();
          middleCircle.draw();
          if(shadows) {
            paddleShadow1.draw(); paddleShadow2.draw();
            ballShadow.draw();
          }
          userPaddle.draw();
          opponentPaddle.draw();
          ball.draw();
          ctx.fillStyle = "rgba(102, 102, 102, 0.7)";
          ctx.fillRect(0, 0, width, height);
          ctx.font = "30px Impact";
          ctx.fillStyle = "#d3d3d3";
          ctx.textAlign = "center";
          ctx.fillText("Single player mode is now " + getId("1pBool").innerHTML, canvas.width / 2, canvas.height / 2);
        }
        break;
      case "toggleShadow":
        shadows = !shadows;
        if(shadows) {
          getId("shadowBool").innerHTML = "shown"
        } else {
          getId("shadowBool").innerHTML = "not shown";
        }
        if(paused) {
          ctx.clearRect(0, 0, width, height);
          background.draw();
          middleLine.draw();
          middleCircle.draw();
          if(shadows) {
            paddleShadow1.draw(); paddleShadow2.draw();
            ballShadow.draw();
          }
          userPaddle.draw();
          opponentPaddle.draw();
          ball.draw();
          ctx.fillStyle = "rgba(102, 102, 102, 0.7)";
          ctx.fillRect(0, 0, width, height);
          ctx.font = "30px Impact";
          ctx.fillStyle = "#d3d3d3";
          ctx.textAlign = "center";
          ctx.fillText("Shadows are now " + getId("shadowBool").innerHTML, canvas.width / 2, canvas.height / 2);
        }
        break;
    }
  });

  //misc functions (usually in a separate file, but I did this to save space) - simple functions I use a lot
  function randNum(min, max, interval) { if(interval === undefined) { interval = 1; } var range = []; for(var i = min; i <= max; i += interval) { range.push(i); } return range[Math.floor(Math.random() * range.length)]; }
  function getId(id) { return document.getElementById(id); }
  function isNum(value) { if(isNaN(parseInt(value))) { return false; } else { return true; } }
  function toNum(value) { switch(typeof value) { case "string": return parseInt(value); case "boolean": if(value) { return 0; } else { return 1; } break; default: if(Array.isArray(value)) { var nums = []; for(var i = 0; i < value.length; i++) { nums.push(toNum(value[i])); } return nums; } else { return NaN; } } }

  //make the scoreboard draggable
  $("#controlPanel").draggable();

  //lots of variables - I combined them into one line to save space
  var userScore = 0, opponentScore = 0, paused = true, singlePlayer = false, ctx = getId("canvas").getContext("2d"), width = getId("canvas").width, height = getId("canvas").height, canvas = getId("canvas"), godMode = false, gravity = false, slippery = false, inverted = false, slow = false, hidden = true, teleportCap = { player: 0, opponent: 0, }, slowPotionCap = { player: 0, opponent: 0, }, shadows = false;
  var colorThemes = [["lightgrey", "white", "navy", "grey"], ["#64b5f6", "#e3f2fd", "#e57373", "#0d47a1"], ["#81c784", "#e8f5e9", "#fff176", "#1b5e20"], ["#e57373", "#ffebee", "#64b5f6", "#b71c1c"], ["#ffb74d", "#fff3e0", "#81c784", "#ff6f00"]];
  var themeSelect = colorThemes[cvalueIndex];

  //local storage - get players' points
  if(localStorage.getItem("newSession") === null || localStorage.getItem("userScore") === null || localStorage.getItem("opponentScore") === null) { localStorage.setItem("newSession", "true"); } else { if(confirm("Continue your match from last time? (" + localStorage.getItem("opponentScore") + ":" + localStorage.getItem("userScore") + ")")) { userScore = toNum(localStorage.getItem("userScore")); opponentScore = toNum(localStorage.getItem("opponentScore")); getId("userScore").innerHTML = userScore; getId("opponentScore").innerHTML = opponentScore; } }

  //makes a ready-to-go rectangle object, complete with draw() function
  function rect(x, y, w, h, fill, stroke, border, outline) { if(fill === null) { fill = "transparent"; } if(stroke === null || border === null) { stroke = "transparent"; border = 0; } if(outline === null) { outline = false; } this.x = x; this.y = y; this.w = w; this.h = h; this.fill = fill; this.stroke = stroke; this.border = border; this.draw = function() { ctx.fillStyle = this.fill; ctx.strokeStyle = this.stroke; ctx.lineWidth = this.border; ctx.fillRect(this.x, this.y, this.w, this.h); if(outline) { ctx.strokeRect(this.x, this.y, this.w, this.h); } }; }

  //circle object
  function circle(x, y, r, fill, stroke, border, outline) { if(fill === null) { fill = "transparent"; } if(stroke === null || border === null) { stroke = "transparent"; border = 0; } if(outline === null) { outline = false; } this.x = x; this.y = y; this.r = r; this.fill = fill; this.stroke = stroke; this.border = border; this.draw = function() { ctx.beginPath(); ctx.fillStyle = this.fill; ctx.strokeStyle = this.stroke; ctx.lineWidth = this.border; ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI); ctx.fill(); if(outline) { ctx.stroke(); } ctx.closePath(); }; }

  //game objects - grey background, paddles, center line/center circle, and ball
  var background = new rect(0, 0, width, height, themeSelect[0]),
    userPaddle = new rect(width - 40, (height - 150) / 2, 13, 150, themeSelect[3]),
    ball = new circle(width / 2, height / 2, 13, themeSelect[2]),
    middleLine = new rect(width / 2 - 6, 0, 12, height, themeSelect[1]),
    middleCircle = new circle(width / 2, height / 2, 70, "transparent", themeSelect[1], "12", true),
    opponentPaddle = new rect(40, (height - 150) / 2, 13, 150, themeSelect[3]),
    ballShadow = new circle(ball.x + 4, ball.y + 4, ball.r, "rgba(102, 102, 102, 0.7)"),
    paddleShadow1 = new rect(opponentPaddle.x - 4, opponentPaddle.y - 4, opponentPaddle.w, opponentPaddle.h, "rgba(102, 102, 102, 0.7)"),
    paddleShadow2 = new rect(userPaddle.x + 4, userPaddle.y - 4, userPaddle.w, userPaddle.h, "rgba(102, 102, 102, 0.7)");

  //sets ball's velocity X and Y (initially both 0)
  ball.vx = 0;
  ball.vy = 0;

  //sets both paddles' velocity Y (since paddles don't move sideways there's no need for vx)
  userPaddle.vy = 0;
  opponentPaddle.vy = 0;

  //draws all the objects
  background.draw();
  middleLine.draw();
  middleCircle.draw();
  userPaddle.draw();
  opponentPaddle.draw();
  ball.draw();

  var pauseBlur = new rect(0, 0, width, height, "rgba(102, 102, 102, 0.7)");
  pauseBlur.draw();
  ctx.font = "30px Impact";
  ctx.fillStyle = "#d3d3d3";
  ctx.textAlign = "center";
  ctx.fillText("Press space or click to begin", canvas.width / 2, canvas.height / 2);
  pauseBlur = null;

  //update function (or refresh, whatever)
  var refresh = setInterval(function() {
    if(!paused) {
      pauseBlur = undefined;
      //clears rectangle for new frame
      ctx.clearRect(0, 0, width, height);
      //draws all objects
      background.draw();
      middleLine.draw();
      middleCircle.draw();
      if(shadows) {
        paddleShadow1.draw(); paddleShadow2.draw();
        ballShadow.draw();
      }
      userPaddle.draw();
      opponentPaddle.draw();
      ball.draw();
      //slow effect
      if(slow && getId("cheatsBool").innerHTML == "allowed") {
        ball.x += ball.vx / 3; ball.y += ball.vy / 3;
      } else {
        ball.x += ball.vx;
        ball.y += ball.vy;
      }
      //gravity effect
      if(gravity && getId("cheatsBool").innerHTML == "allowed") {
        userPaddle.vy += 0.1;
        opponentPaddle.vy += 0.1;
      }
      //makes paddles move
      userPaddle.y += userPaddle.vy;
      opponentPaddle.y += opponentPaddle.vy;
      //stops paddles from going out the edge
      if(userPaddle.y <= 0) {
        userPaddle.y = 0;
      }
      if(opponentPaddle.y <= 0) {
        opponentPaddle.y = 0;
      }
      if(userPaddle.y + userPaddle.h >= height) {
        userPaddle.y = height - userPaddle.h;
      }
      if(opponentPaddle.y + opponentPaddle.h >= height) {
        opponentPaddle.y = height - opponentPaddle.h;
      }
      //score!
      //for player 1
      if(ball.x + ball.r >= width) {
        opponentScore += 1;
        ball.vx = 0;
        ball.vy = 0;
        ball.x = width / 2;
        ball.y = height / 2;
        getId("opponentScore").innerHTML = opponentScore;
        getId("userScore").innerHTML = userScore;
        pauseBlur = new rect(0, 0, width, height, "rgba(102, 102, 102, 0.7)");
        pauseBlur.draw();
        ctx.font = "30px Impact";
        ctx.fillStyle = "#d3d3d3";
        ctx.textAlign = "center";
        ctx.fillText("Score!", canvas.width / 2, canvas.height / 2);
        ctx.fillText(opponentScore + " : " + userScore, canvas.width / 2, canvas.height / 1.75);
        pauseBlur = null;
        paused = true;
        if(opponentScore >= 50 && !singlePlayer) {
          getId("computer").innerHTML = "God of Pong";
        }
        //sets players' score in local storage
        localStorage.setItem("userScore", userScore);
        localStorage.setItem("opponentScore", opponentScore);
      }
      //for player 2
      if(ball.x - ball.r <= 0) {
        userScore += 1;
        ball.vx = 0;
        ball.vy = 0;
        ball.x = width / 2;
        ball.y = height / 2;
        getId("opponentScore").innerHTML = opponentScore;
        getId("userScore").innerHTML = userScore;
        pauseBlur = new rect(0, 0, width, height, "rgba(102, 102, 102, 0.7)");
        pauseBlur.draw();
        ctx.font = "30px Impact";
        ctx.fillStyle = "#d3d3d3";
        ctx.textAlign = "center";
        ctx.fillText("Score!", canvas.width / 2, canvas.height / 2);
        ctx.fillText(opponentScore + " : " + userScore, canvas.width / 2, canvas.height / 1.75);
        pauseBlur = null;
        paused = true;
        if(userScore >= 50) {
          getId("user").innerHTML = "God of Pong";
        }
        //sets players' score in local storage
        localStorage.setItem("userScore", userScore);
        localStorage.setItem("opponentScore", opponentScore);
      }
      //bounces ball if it hits top or bottom
      if(ball.y + ball.r >= height || ball.y - ball.r <= 0) {
        ball.vy = -(ball.vy);
      }
      //bounces ball if it hits paddles
      if(ball.x + ball.r >= userPaddle.x) {
        if(ball.y >= userPaddle.y && ball.y <= userPaddle.y + userPaddle.h) {
          ball.vx = -(ball.vx) - 0.16; ball.vy = ball.vy > 0 ? ball.vy + 0.16 : ball.vy - 0.16;
          //plays the thump noise
          new Audio("SFX/tennishit.wav").play();
        }
      }
      if(ball.x - ball.r <= opponentPaddle.x + opponentPaddle.w) {
        if(ball.y >= opponentPaddle.y && ball.y <= opponentPaddle.y + opponentPaddle.h) {
          ball.vx = -(ball.vx) + 0.16; ball.vy = ball.vy > 0 ? ball.vy + 0.16 : ball.vy - 0.16;
          //plays the thump noise
          new Audio("SFX/tennishit.wav").play();
        }
      }
      if(ball.vx < 0) {
        ballShadow.x = ball.x + 4;
      } else {
        ballShadow.x = ball.x - 4;
      }
      if(ball.vy < 0) {
        ballShadow.y = ball.y + 4;
      } else {
        ballShadow.y = ball.y - 4;
      }
      if(userPaddle.y + userPaddle.h / 2 < height / 2) {
        paddleShadow2.y = userPaddle.y + 4;
      } else {
        paddleShadow2.y = userPaddle.y - 4;
      }

      if(opponentPaddle.y + opponentPaddle.h / 2 < height / 2) {
        paddleShadow1.y = opponentPaddle.y + 4;
      } else {
        paddleShadow1.y = opponentPaddle.y - 4;
      }
    }
  }, 10);
  //play/pause the game on click
  canvas.onmousedown = function() {
    if(ball.vx === 0 && ball.vy === 0) {
      var direction = randNum(0, 1);
      ball.vx = direction === 0 ? 3.75 : -3.75;
      if(ball.vx > 0) {
        ball.vy = userPaddle.y + userPaddle.h / 2 > height / 2 ? 3.75 : -3.75;
      } else {
        ball.vy = opponentPaddle.y + opponentPaddle.h / 2 > height / 2 ? 3.75 : -3.75;
      }
    }
    if(!paused) {
      pauseBlur = new rect(0, 0, width, height, "rgba(102, 102, 102, 0.7)");
      pauseBlur.draw();
      ctx.font = "30px Impact";
      ctx.fillStyle = "#d3d3d3";
      ctx.textAlign = "center";
      ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
      ctx.fillText(opponentScore + " : " + userScore, canvas.width / 2, canvas.height / 1.75);
      paused = true;
    } else {
      paused = false;
    }
  };

  var computer = setInterval(function() {
    //controls computer paddle in singleplayer mode
    if(singlePlayer && !paused) {
      opponentPaddle.y = Math.min(Math.max(ball.y - opponentPaddle.h / 2, 0), height - opponentPaddle.h);
    }
  }, 10);

  //checks for key presses
  console.log("S: player 1's slow potions; L: player 2's slow potions; F: teleport left paddle; J: teleport right paddle; V: gravity; B: no friction");
  window.onkeydown = function(e) {
    var c = e.keyCode;
    switch(c) {
      //controlling player 2's paddle
      case 73:
        if(inverted && getId("cheatsBool").innerHTML == "allowed") {
          userPaddle.vy = (Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85 <= 11 ? (Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85 : 11;
        } else {
          userPaddle.vy = -((Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85) >= -11 ? -((Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85) : -11;
        }
        break;
      case 75:
        if(inverted && getId("cheatsBool").innerHTML == "allowed") {
          userPaddle.vy = -((Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85) >= -11 ? -((Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85) : -11;
        } else {
          userPaddle.vy = (Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85 <= 11 ? (Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85 : 11;
        }
        break;
      //controlling player 1's paddle
      case 69:
        if(!singlePlayer) {
          if(inverted && getId("cheatsBool").innerHTML == "allowed") {
            opponentPaddle.vy = (Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85 <= 11 ? (Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85 : 11;
          } else {
            opponentPaddle.vy = -((Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85) >= -11 ? -((Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85) : -11;
          }
        }
        break;
      case 68:
        if(!singlePlayer) {
          if(inverted && getId("cheatsBool").innerHTML == "allowed") {
            opponentPaddle.vy = -((Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85) >= -11 ? -((Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85) : -11;
          } else {
            opponentPaddle.vy = (Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85 <= 11 ? (Math.abs(ball.vx) + Math.abs(ball.vy)) / 2 * 0.85 : 11;
          }
        }
        break;
      case 32:
        if(ball.vx === 0 && ball.vy === 0) {
          var direction = randNum(0, 1);
          ball.vx = direction === 0 ? 3.75 : -3.75;
          if(ball.vx > 0) {
            ball.vy = userPaddle.y + userPaddle.h / 2 > height / 2 ? 3.75 : -3.75;
          } else {
            ball.vy = opponentPaddle.y + opponentPaddle.h / 2 > height / 2 ? 3.75 : -3.75;
          }
        }
        if(!paused) {
          pauseBlur = new rect(0, 0, width, height, "rgba(102, 102, 102, 0.7)");
          pauseBlur.draw();
          ctx.font = "30px Impact";
          ctx.fillStyle = "#d3d3d3";
          ctx.textAlign = "center";
          ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
          ctx.fillText(opponentScore + " : " + userScore, canvas.width / 2, canvas.height / 1.75);
          pauseBlur = null;
          paused = true;
        } else {
          paused = false;
        }
        break;
      //toggle gravity effect
      case 86:
        if(getId("cheatsBool").innerHTML == "allowed") {
          gravity = !gravity;
        }
        break;
      //toggle slippery effect
      case 66:
        if(getId("cheatsBool").innerHTML == "allowed") {
          slippery = !slippery;
        }
        break;
      //toggle inverted effect
      case 78:
        if(getId("cheatsBool").innerHTML == "allowed") {
          inverted = !inverted;
        }
        break;
      //teleports player 1
      case 70:
        if(teleportCap.opponent < 4 && getId("cheatsBool").innerHTML == "allowed" && !paused) {
          new Audio("SFX/teleport.wav").play();
          opponentPaddle.y = ball.y - opponentPaddle.h / 2;
          teleportCap.opponent++;
        } else if(getId("cheatsBool").innerHTML == "allowed" && !paused) {
          new Audio("SFX/teleport.wav").play();
          opponentPaddle.y = randNum(0, height - opponentPaddle.h);
        }
        break;
      //teleports player 2
      case 74:
        if(teleportCap.player < 4 && getId("cheatsBool").innerHTML == "allowed" && !paused) {
          userPaddle.y = ball.y - userPaddle.h / 2;
          teleportCap.player++;
          new Audio("SFX/teleport.wav").play();
        } else if(getId("cheatsBool").innerHTML == "allowed" && !paused) {
          new Audio("SFX/teleport.wav").play();
          userPaddle.y = randNum(0, height - userPaddle.h);
        }
        break;
      //player 1's slow potions
      case 83:
        if(slowPotionCap.opponent < 5 && getId("cheatsBool").innerHTML == "allowed" && !paused) {
          slow = !slow;
          setTimeout(function() { slow = false; slowPotionCap.opponent += 1; }, 3000);
        }
        break;
      //player 2's slow potions
      case 76:
        if(slowPotionCap.player < 4 && getId("cheatsBool").innerHTML == "allowed" && !paused) {
          slow = !slow;
          setTimeout(function() { slow = false; slowPotionCap.player += 1; }, 3000);
        }
        break;
    }
  };
  window.onkeyup = function(e) {
    var c = e.keyCode;
    e.preventDefault();
    if(!slippery || getId("cheatsBool").innerHTML == "disabled") {
      switch(c) {
        //stops paddles if it's not slippery
        case 73:
          userPaddle.vy = 0;
          break;
        case 75:
          userPaddle.vy = 0;
          break;
        case 69:
          opponentPaddle.vy = 0;
          break;
        case 68:
          opponentPaddle.vy = 0;
          break;
      }
    }
  };
  //rename function
  $(".player").click(function() {
    this.innerHTML = prompt("What do you want to rename " + this.innerHTML + " to?").trim();
  });
  $(".player").mouseenter(function() {
    $(this).css({
      background: themeSelect[1]
    });
  });
  $(".player").mouseleave(function() {
    $(this).css({
      background: "transparent"
    });
  });
  $(".options").click(function(e) {
    var clickedObject = $(this),
      offset = clickedObject.offset(),
      w = Math.min(this.offsetWidth, 160),
      h = Math.min(this.offsetHeight, 160),
      x = e.pageX - offset.left,
      y = e.pageY - offset.top,
      ripple = $('<div/>');
    ripple.addClass("ripple").appendTo(clickedObject);

    $('<div/>', {
      class: "rippleWave",
      css: {
        background: themeSelect[1],
        width: h,
        height: h,
        left: x - (h / 2),
        top: y - (h / 2),
      },
      appendTo: ripple,
      on: {
        animationend: function() {
          ripple.remove();
        }
      }
    });
  });
};
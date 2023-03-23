/* adding text resizing for title*/

nameFont = function () {
    var divs = document.getElementsByClassName("nameFont", "otherText");
    for(var i = 0; i < divs.length; i++) {
        var relFontsize = divs[i].offsetWidth*0.13;
        divs[i].style.fontSize = relFontsize+'px';
    }
};

window.onload = function(event) {
    nameFont();
};
window.onresize = function(event) {
    nameFont();
};



/* adding word carousel for about section*/

wordChanger = (function(){
    var words = [
        'inexplicable',
        'surreal',
        'disturbing',
        'absurd',
        'hilarious',
        'terrifying'
    ], i=0;
    setInterval(function(){
        $('#changingword').fadeOut(function(){
            $(this).html(words[i=(i+1)%words.length]).fadeIn();
        });
    }, 2000);
      
})();

/* drag n drop motion word around */

motion.onmousedown = function(event) {

    let shiftX = event.clientX - motion.getBoundingClientRect().left;
    let shiftY = event.clientY - motion.getBoundingClientRect().top;
  
    motion.style.position = 'absolute';
    motion.style.zIndex = 1000;
    document.body.append(motion);
  
    moveAt(event.pageX, event.pageY);
  
    // переносит мяч на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
        motion.style.left = pageX - shiftX + 'px';
        motion.style.top = pageY - shiftY + 'px';
      }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // передвигаем мяч при событии mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // отпустить мяч, удалить ненужные обработчики
    motion.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      motion.onmouseup = null;
    };
  
  };
  
  motion.ondragstart = function() {
    return false;
  };

  /* Random Quote Generator */

  var quotes = [
  "Ultimately, each life is a mystery until we each solve the mystery, and that's where we are all headed whether we know it or not.",
  "Never turn down a good idea, but never take a bad idea.",
  "Intuition is seeing the solution. It's emotion and intellect going together.",
  "If you want to get one hour of good painting, you have to have four hours of uninterrupted time.",
  "Life should be blissful, and blissful doesn't mean just a small happiness. It's huge. It is profound.",
  "Your own head is impossible to escape, but I guess the secret is this prison cell just gets bigger and bigger and bigger and prettier and prettier and prettier.",
  "Don't fight the darkness. Don't even worry about the darkness. Turn on the light and the darkness goes. Turn up that light of pure consciousness: negativity goes.",
  "It makes me uncomfortable to talk about meanings and things. It's better not to know so much about what things mean. Because the meaning, it's a very personal thing, and the meaning for me is different than the meaning for somebody else.",
  "I don't know why people expect art to make sense. They accept the fact that life doesn't make sense.",
  "It's so freeing, it's beautiful in a way, to have a great failure. There's nowhere to go but up.",
  "Absurdity is what I like most in life, and there's humor in struggling in ignorance. If you saw a man repeatedly running into a wall until he was a bloody pulp, after a while it would make you laugh because it becomes absurd.",
  "I like to remember things my own way. How I remembered them, not necessarily the way they happened.",
  "I don't think it was pain that made Vincent Van Gogh great - I think his painting brought him whatever happiness he had.",
  "A filmmaker doesn't have to suffer to show suffering. You just have to understand it. You don't have to die to shoot a death scene.",
  "A film - especially when it's a personal film - is going to hit somebody or it's not. There's nothing you can do about it.",
  "I don't paint the town red. But when I do go out, people always want to touch my hair. It happens every time.",
  "I love super crispy, almost burned, snapping-crispy bacon.",
  "I've said many, many, many unkind things about Philadelphia, and I meant every one.",
  "A lot of artists think they want anger. But a real, strong, bitter anger occupies the mind, leaving no room for creativity.",
  "I don't think that people accept the fact that life doesn't make sense. I think it makes people terribly uncomfortable. It seems like religion and myth were invented against that, trying to make sense out of it.",
  "My cow is not pretty, but it is pretty to me.",
  "I discovered that if one looks a little closer at this beautiful world, there are always red ants underneath.",
  "I like cappuccino, actually. But even a bad cup of coffee is better than no coffee at all.",
  "Happy accidents are real gifts, and they can open the door to a future that didn't even exist. It's nice to set up something to encourage or allow happy accidents to happen.",
  "We think we understand the rules when we become adults but what we really experience is a narrowing of the imagination.",
  "Get your eyes on the doughnut and not on the hole.",
  "Life is very, very complicated, and so films should be allowed to be, too.",
  "If we didn't want to upset anyone, we would make films about sewing, but even that could be dangerous. I think there has to be those contrasts and strong things within a film for the total experience.",
  "I hate slick and pretty things. I prefer mistakes and accidents. Cuts and bruises. If you have a name for something, like 'cut' or 'bruise,' people will automatically be disturbed by it. But when you see the same thing in nature, and you don't know what it is, it can be very beautiful.",
  "Cinema is a lot like music. It can be very abstract, but people have a yearning to make intellectual sense of it. You don't need to put music into words right away - you just listen.",

  ];

  function newQuote(){
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
  }

  newQuote();

  /*NOISE */

  const noise = () => {
    let canvas, ctx;
  
    let wWidth, wHeight;
  
    let noiseData = [];
    let frame = 0;
  
    let loopTimeout;
  
    // Create Noise
    const createNoise = () => {
      const idata = ctx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;
  
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000;
        }
      }
  
      noiseData.push(idata);
    };
  
    // Play Noise
    const paintNoise = () => {
      if (frame === 5) {
        frame = 0;
      } else {
        frame++;
      }
  
      ctx.putImageData(noiseData[frame], 0, 0);
    };
  
    // Loop
    const loop = () => {
      paintNoise(frame);
  
      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, 1000 / 25);
    };
  
    // Setup
    const setup = () => {
      wWidth = window.innerWidth;
      wHeight = document.body.scrollHeight;
      canvas.width = wWidth;
      canvas.height = wHeight;
  
      for (let i = 0; i < 10; i++) {
        createNoise();
      }
  
      loop();
    };
  
    // Reset
    let resizeThrottle;
    const reset = () => {
      window.addEventListener(
        "resize",
        () => {
          window.clearTimeout(resizeThrottle);
  
          resizeThrottle = window.setTimeout(() => {
            window.clearTimeout(loopTimeout);
            setup();
          }, 200);
        },
        false
      );
    };
  
    // Init
    const init = (() => {
      canvas = document.getElementById("noise");
      ctx = canvas.getContext("2d");
  
      setup();
    })();
  };
  
  noise();


/* SCROLL for gallery*/

const scrollContainer = document.querySelector("#galleryContainer");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
  
});

/*close img hover on click */


let pic = document.querySelectorAll('.img-description-container');

pic.forEach(e => {
  e.addEventListener('click', () =>
  e.classList.toggle('clicked'))
});
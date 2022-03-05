document.addEventListener('DOMContentLoaded', () => {
   const grid = document.querySelector('.game__field')
   const scoreTable = document.querySelector('.score-header__number-now')
   const bestTable = document.querySelector('.score-header__number-best')
   const newGame = document.querySelector('.new-game')
   const result = document.querySelector('.result')
   const n = 5
   let squares = []
   let score = 0
   let best = 0
   let x1 = null
   let y1 = null
   let direction = ''
   let hours = 00, minutes = 00, seconds = 00, milliseconds = 00, interval
   const secondTable = document.querySelector('.seconds')
   const minuteTable = document.querySelector('.minutes')
   interval = setInterval(startTimer, 10)
   function startTimer() {
      milliseconds++
      if (milliseconds > 99) {
         seconds++
         secondTable.innerHTML = '0' + seconds
         milliseconds = 0
      }

      // seconds

      if (seconds < 9) {
         secondTable.innerHTML = '0' + seconds
      }
      if (seconds > 9) {
         secondTable.innerHTML = seconds
      }
      if (seconds > 60) {
         minutes++
         minuteTable.innerHTML = '0' + minutes
         seconds = 0
         secondTable.innerHTML = '0' + seconds
      }

      //minutes

      if (minutes > 9) {
         minuteTable.innerHTML = minutes
      }

   }

   function createBoard() {
      // document.addEventListener('touchstart', handleTouchStart, false)
      // document.addEventListener('touchmove', handleTouchMove, false)
      for (let index = 0; index < n * n; index++) {
         square = document.createElement('div')
         square.classList.add('field-game__square')
         square.innerHTML = 0
         grid.appendChild(square)
         squares.push(square)
      }
      for (let index = 0; index < 2; index++) {
         getNum()
      }


   }
   createBoard()
   checkZero()

   newGame.addEventListener("click", () => {
      minutes = 00, seconds = 00, milliseconds = 00
      secondTable.innerHTML = '00'
      minuteTable.innerHTML = '00'
      clearInterval(interval)
      interval = setInterval(startTimer, 10)
      score = 0
      scoreTable.innerHTML = 0
      squares = []
      result.innerHTML = ''
      for (let index = 0; index < n * n; index++) {
         square = document.querySelector('.field-game__square')
         square.remove()
      }
      document.addEventListener('keyup', control)
      createBoard()
      checkZero()
   })

   function handleTouchStart(event) {
      const firstTouch = event.touches[0];
      x1 = firstTouch.clientX;
      y1 = firstTouch.clientY;
   }

   function handleTouchMove(event) {
      if (!x1 || !y1) {
         return false;
      }
      let x2 = event.touches[0].clientX;
      let y2 = event.touches[0].clientY;
      let xDif = x2 - x1;
      let YDif = y2 - y1;

      if (Math.abs(xDif) > Math.abs(YDif)) {
         if (xDif > 0) {
            keyRight()
            checkZero()
         }
         else {
            keyLeft()
            checkZero()
         }
      }
      else {
         if (YDif > 0) {
            keyDown()
            checkZero()
         }
         else {
            keyUp()
            checkZero()
         }
      }
      x1 = null
      y1 = null
      console.log(direction);
   }

   function getNum() {
      while (1) {
         let fieldNumber = getRandomInt(n * n)
         if (squares[fieldNumber].innerText == 0) {
            const chance = Math.random()
            if (chance > 0.1) {
               squares[fieldNumber].innerHTML = 2
            }
            else {
               squares[fieldNumber].innerHTML = 4
            }
            checkForLose()
            break;
         }
      }
   }

   function getRandomInt(max) {
      return Math.floor(Math.random() * max);
   }

   // right
   function moveRight() {
      for (let i = 0; i < n * n; i++) {
         if (i % n == 0) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + 1].innerHTML
            let totalThree = squares[i + 2].innerHTML
            let totalFour = squares[i + 3].innerHTML
            let totalFive = squares[i + 4].innerHTML
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour), parseInt(totalFive)]
            let filteredRow = row.filter(el => el)
            let missing = n - filteredRow.length
            let spaces = Array(missing).fill(0)
            let newRow = spaces.concat(filteredRow)
            squares[i].innerHTML = newRow[0]
            squares[i + 1].innerHTML = newRow[1]
            squares[i + 2].innerHTML = newRow[2]
            squares[i + 3].innerHTML = newRow[3]
            squares[i + 4].innerHTML = newRow[4]

         }
      }
   }

   // left
   function moveLeft() {
      for (let i = 0; i < n * n; i++) {
         if (i % n == 0) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + 1].innerHTML
            let totalThree = squares[i + 2].innerHTML
            let totalFour = squares[i + 3].innerHTML
            let totalFive = squares[i + 4].innerHTML
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour), parseInt(totalFive)]
            let filteredRow = row.filter(el => el)
            let missing = n - filteredRow.length
            let spaces = Array(missing).fill(0)
            let newRow = filteredRow.concat(spaces)
            squares[i].innerHTML = newRow[0]
            squares[i + 1].innerHTML = newRow[1]
            squares[i + 2].innerHTML = newRow[2]
            squares[i + 3].innerHTML = newRow[3]
            squares[i + 4].innerHTML = newRow[4]

         }
      }
   }

   // up
   function moveUp() {
      for (let i = 0; i < n; i++) {
         let totalOne = squares[i].innerHTML
         let totalTwo = squares[i + n].innerHTML
         let totalThree = squares[i + n * 2].innerHTML
         let totalFour = squares[i + n * 3].innerHTML
         let totalFive = squares[i + n * 4].innerHTML
         let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour), parseInt(totalFive)]
         let filteredColumn = column.filter(el => el)
         let missing = n - filteredColumn.length
         let spaces = Array(missing).fill(0)
         let newRow = filteredColumn.concat(spaces)
         squares[i].innerHTML = newRow[0]
         squares[i + n].innerHTML = newRow[1]
         squares[i + n * 2].innerHTML = newRow[2]
         squares[i + n * 3].innerHTML = newRow[3]
         squares[i + n * 4].innerHTML = newRow[4]
      }
   }

   // down
   function moveDown() {
      for (let i = 0; i < n; i++) {
         let totalOne = squares[i].innerHTML
         let totalTwo = squares[i + n].innerHTML
         let totalThree = squares[i + n * 2].innerHTML
         let totalFour = squares[i + n * 3].innerHTML
         let totalFive = squares[i + n * 4].innerHTML
         let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour), parseInt(totalFive)]
         let filteredColumn = column.filter(el => el)
         let missing = n - filteredColumn.length
         let spaces = Array(missing).fill(0)
         let newRow = spaces.concat(filteredColumn)
         squares[i].innerHTML = newRow[0]
         squares[i + n].innerHTML = newRow[1]
         squares[i + n * 2].innerHTML = newRow[2]
         squares[i + n * 3].innerHTML = newRow[3]
         squares[i + n * 4].innerHTML = newRow[4]
      }
   }

   // combine rows
   function combineRow() {
      for (let i = 0; i < n * n - 1; i++) {
         if (squares[i].innerHTML === squares[i + 1].innerHTML) {
            let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
            squares[i].innerHTML = combineTotal
            squares[i + 1].innerHTML = 0
            score += combineTotal
            scoreTable.innerHTML = score
            if (score > best) {
               best = score
               bestTable.innerHTML = best
            }
         }
      }
      checkForWin()
      checkZero()
   }

   // combine columns
   function combineColumn() {
      for (let i = 0; i < n * n - n; i++) {
         if (squares[i].innerHTML === squares[i + n].innerHTML) {
            let combineTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + n].innerHTML)
            squares[i].innerHTML = combineTotal
            squares[i + n].innerHTML = 0
            score += combineTotal
            scoreTable.innerHTML = score
            if (score > best) {
               best = score
               bestTable.innerHTML = best
            }
         }
      }
      checkForWin()
      checkZero()
   }

   //control 
   function control(e) {
      if (e.keyCode === 39) {
         keyRight()
         checkZero()
      }
      else if (e.keyCode === 37) {
         keyLeft()
         checkZero()
      }
      else if (e.keyCode === 38) {
         keyUp()
         checkZero()
      }
      else if (e.keyCode === 40) {
         keyDown()
         checkZero()
      }
   }
   document.addEventListener('keyup', control)

   function keyRight() {
      moveRight()
      combineRow()
      moveRight()
      getNum()
      checkZero()
   }

   function keyLeft() {
      moveLeft()
      combineRow()
      moveLeft()
      getNum()
      checkZero()
   }

   function keyUp() {
      moveUp()
      combineColumn()
      moveUp()
      getNum()
      checkZero()
   }

   function keyDown() {
      moveDown()
      combineColumn()
      moveDown()
      getNum()
      checkZero()
   }

   // check for win
   function checkForWin() {
      if (squares.some(el => el.innerHTML == 2048)) {
         document.removeEventListener('keyup', control)
         document.removeEventListener('touchstart', handleTouchStart)
         document.removeEventListener('touchmove', handleTouchMove)
         result.innerHTML = 'You win!!'
         const name = document.querySelector('.input').value
         document.querySelector('.leaderboard__body').insertAdjacentHTML('beforeend', `<div class="leaderboard__item"><div class="leaderboard__label leaderboard__label_name">${name}</div>
         <div class="leaderboard__label leaderboard__label_time"><span class="minutes">${minutes > 9 ? minutes : '0' + minutes}</span>:<span class="seconds">${seconds > 9 ? seconds : '0' + seconds}</span></div></div>`)
         clearInterval(interval)
      }
   }

   // check for lose
   function checkForLose() {
      let zeros = 0
      for (let i = 0; i < squares.length; i++) {
         if (squares[i].innerHTML == 0) {
            zeros++
         }
      }
      if (zeros === 0) {
         document.removeEventListener('keyup', control)
         document.removeEventListener('touchstart', handleTouchStart)
         document.removeEventListener('touchmove', handleTouchMove)
         result.innerHTML = 'You lose(('
         clearInterval(interval)
      }
   }

   function checkZero() {
      for (let i = 0; i < squares.length; i++) {
         if (squares[i].innerHTML == 0) {
            squares[i].style.background = 'rgb(248, 248, 248)'
         }
         else if (squares[i].innerHTML == 2) {
            squares[i].style.background = '#74AFDF'
         }
         else if (squares[i].innerHTML == 4) {
            squares[i].style.background = '#91ABE5'
         }
         else if (squares[i].innerHTML == 8) {
            squares[i].style.background = '#A7A8E9'
         }
         else if (squares[i].innerHTML == 16) {
            squares[i].style.background = '#BFA4ED'
         }
         else if (squares[i].innerHTML == 32) {
            squares[i].style.background = '#CAA3EF'
         }
         else if (squares[i].innerHTML == 64) {
            squares[i].style.background = '#DCA1F3'
         }
         else if (squares[i].innerHTML == 128) {
            squares[i].style.background = '#E0A0F4'
         }
         else if (squares[i].innerHTML == 256) {
            squares[i].style.background = 'rgb(214, 122, 244)'
         }
         else if (squares[i].innerHTML == 512) {
            squares[i].style.background = 'rgb(209, 93, 247)'
         }
         else if (squares[i].innerHTML == 1024) {
            squares[i].style.background = 'rgb(202, 66, 247)'
         }
         else if (squares[i].innerHTML == 2048) {
            squares[i].style.background = 'rgb(197, 25, 255)'
         }
         if (squares[i].innerHTML == 0) {
            squares[i].style.color = 'transparent'
         }
         else {
            squares[i].style.color = '#EEE4DA'
         }
      }
   }

   var elem = document.documentElement;

   function openFullscreen() {
      if (elem.requestFullscreen) {
         elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
         elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
         elem.msRequestFullscreen();
      }
   }

   function closeFullscreen() {
      if (document.exitFullscreen) {
         document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
         document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
         document.msExitFullscreen();
      }
   }
   document.querySelector('.header__btn__open').addEventListener('click', openFullscreen)
   document.querySelector('.header__btn__close').addEventListener('click', closeFullscreen)
   /**
 * Функция определения события swipe на элементе.
 * @param {Object} el - элемент DOM.
 * @param {Object} settings - объект с предварительными настройками.
 */
   var swipe = function (el, settings) {

      // настройки по умолчанию
      var settings = Object.assign({}, {
         minDist: 60,  // минимальная дистанция, которую должен пройти указатель, чтобы жест считался как свайп (px)
         maxDist: 120, // максимальная дистанция, не превышая которую может пройти указатель, чтобы жест считался как свайп (px)
         maxTime: 700, // максимальное время, за которое должен быть совершен свайп (ms)
         minTime: 50   // минимальное время, за которое должен быть совершен свайп (ms)
      }, settings);

      // коррекция времени при ошибочных значениях
      if (settings.maxTime < settings.minTime) settings.maxTime = settings.minTime + 500;
      if (settings.maxTime < 100 || settings.minTime < 50) {
         settings.maxTime = 700;
         settings.minTime = 50;
      }

      var dir,                // направление свайпа (horizontal, vertical)
         swipeType,            // тип свайпа (up, down, left, right)
         dist,                 // дистанция, пройденная указателем
         isMouse = false,      // поддержка мыши (не используется для тач-событий)
         isMouseDown = false,  // указание на активное нажатие мыши (не используется для тач-событий)
         startX = 0,           // начало координат по оси X (pageX)
         distX = 0,            // дистанция, пройденная указателем по оси X
         startY = 0,           // начало координат по оси Y (pageY)
         distY = 0,            // дистанция, пройденная указателем по оси Y
         startTime = 0,        // время начала касания
         support = {           // поддерживаемые браузером типы событий
            pointer: !!("PointerEvent" in window || ("msPointerEnabled" in window.navigator)),
            touch: !!(typeof window.orientation !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "ontouchstart" in window || navigator.msMaxTouchPoints || "maxTouchPoints" in window.navigator > 1 || "msMaxTouchPoints" in window.navigator > 1)
         };

      /**
       * Опредление доступных в браузере событий: pointer, touch и mouse.
       * @returns {Object} - возвращает объект с доступными событиями.
       */
      var getSupportedEvents = function () {
         switch (true) {
            case support.pointer:
               events = {
                  type: "pointer",
                  start: "PointerDown",
                  move: "PointerMove",
                  end: "PointerUp",
                  cancel: "PointerCancel",
                  leave: "PointerLeave"
               };
               // добавление префиксов для IE10
               var ie10 = (window.navigator.msPointerEnabled && Function('/*@cc_on return document.documentMode===10@*/')());
               for (var value in events) {
                  if (value === "type") continue;
                  events[value] = (ie10) ? "MS" + events[value] : events[value].toLowerCase();
               }
               break;
            case support.touch:
               events = {
                  type: "touch",
                  start: "touchstart",
                  move: "touchmove",
                  end: "touchend",
                  cancel: "touchcancel"
               };
               break;
            default:
               events = {
                  type: "mouse",
                  start: "mousedown",
                  move: "mousemove",
                  end: "mouseup",
                  leave: "mouseleave"
               };
               break;
         }
         return events;
      };


      /**
       * Объединение событий mouse/pointer и touch.
       * @param e {Event} - принимает в качестве аргумента событие.
       * @returns {TouchList|Event} - возвращает либо TouchList, либо оставляет событие без изменения.
       */
      var eventsUnify = function (e) {
         return e.changedTouches ? e.changedTouches[0] : e;
      };


      /**
       * Обрабочик начала касания указателем.
       * @param e {Event} - получает событие.
       */
      var checkStart = function (e) {
         var event = eventsUnify(e);
         if (support.touch && typeof e.touches !== "undefined" && e.touches.length !== 1) return; // игнорирование касания несколькими пальцами
         dir = "none";
         swipeType = "none";
         dist = 0;
         startX = event.pageX;
         startY = event.pageY;
         startTime = new Date().getTime();
         if (isMouse) isMouseDown = true; // поддержка мыши
      };

      /**
       * Обработчик движения указателя.
       * @param e {Event} - получает событие.
       */
      var checkMove = function (e) {
         if (isMouse && !isMouseDown) return; // выход из функции, если мышь перестала быть активна во время движения
         var event = eventsUnify(e);
         distX = event.pageX - startX;
         distY = event.pageY - startY;
         if (Math.abs(distX) > Math.abs(distY)) dir = (distX < 0) ? "left" : "right";
         else dir = (distY < 0) ? "up" : "down";
      };

      /**
       * Обработчик окончания касания указателем.
       * @param e {Event} - получает событие.
       */
      var checkEnd = function (e) {
         if (isMouse && !isMouseDown) { // выход из функции и сброс проверки нажатия мыши
            isMouseDown = false;
            return;
         }
         var endTime = new Date().getTime();
         var time = endTime - startTime;
         if (time >= settings.minTime && time <= settings.maxTime) { // проверка времени жеста
            if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
               swipeType = dir; // опредление типа свайпа как "left" или "right"
            } else if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
               swipeType = dir; // опредление типа свайпа как "top" или "down"
            }
         }
         dist = (dir === "left" || dir === "right") ? Math.abs(distX) : Math.abs(distY); // опредление пройденной указателем дистанции

         // генерация кастомного события swipe
         if (swipeType !== "none" && dist >= settings.minDist) {
            var swipeEvent = new CustomEvent("swipe", {
               bubbles: true,
               cancelable: true,
               detail: {
                  full: e, // полное событие Event
                  dir: swipeType, // направление свайпа
                  dist: dist, // дистанция свайпа
                  time: time // время, потраченное на свайп
               }
            });
            el.dispatchEvent(swipeEvent);
         }
      };

      // добавление поддерживаемых событий
      var events = getSupportedEvents();

      // проверка наличия мыши
      if ((support.pointer && !support.touch) || events.type === "mouse") isMouse = true;

      // добавление обработчиков на элемент
      el.addEventListener(events.start, checkStart);
      el.addEventListener(events.move, checkMove);
      el.addEventListener(events.end, checkEnd);
      if (support.pointer && support.touch) {
         el.addEventListener('lostpointercapture', checkEnd);
      }
   };

   // вызов функции swipe с предварительными настройками
   swipe(document, { maxTime: 1000, minTime: 100, maxDist: 150, minDist: 60 });

   // обработка свайпов
   document.addEventListener("swipe", function (e) {
      switch (e.detail.dir) {
         case 'right':
            keyRight()
            checkZero()
            break;
         case 'left':
            keyLeft()
            checkZero()
            break;
         case 'up':
            keyUp()
            checkZero()
            break;
         case 'down':
            keyDown()
            checkZero()
            break;
      }
   });
})
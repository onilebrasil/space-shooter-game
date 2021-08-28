const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['images/monster1.png', 'monster2.png', 'monster3.png']
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button'); 

//Ship movement and shooting
function flyShip (event) {
  if(event.key === 'ArrowUp') {
    event.preventDefault();
    moveUp();

 }else if (event.key === 'ArrowDown') {
   event.preventDefault();
   moveDown(); 
 }else if(event.key === " "){
   event.preventDefault();
   fireLaser();  
 }
} 

//move up function,

function moveUp() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
  if(topPosition === '0px') {
    return    
 
 }else {
    let position = parseInt(topPosition);
    position -= 50;
    yourShip.style.top = `${position}px`
 }
} 

//Move Down function

function moveDown() {
 let topPosition = getComputedStyle(yourShip).getPropertyValue('top'); 
  if (topPosition === '510px') {
    return
 }else {
   let position = parseInt(topPosition);
   position += 50;
   yourShip.style.top = `${position}px`;
 }
}

//shooting functionality

function fireLaser() {
 let laser = createLaserElement();
 playArea.appendChild(laser);
 moveLaser(laser);
}

function createLaserElement() {
  let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left')); //eixo X
  let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));  //eixo y
  let newLaser = document.createElement('img');
  newLaser.src = 'images/shoot.png';
  mewLaser.classList.add('laser')
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition - 10}px`;
  return newLaser()
}

function moveLaser(laser) {
 let laserInterval = setInterval(() => {
   let xPosition = parseInt(laser.style.left)
   let aliens = document.querySelectorAll('.alien');

   alien.forEach((alien) => {                   //comparing if the alien was hit, if yes, change the image 
     if(checkLaserCollision(laser, alien)) {
      alien.src = 'img/explosion.png';
      alien.classList.remove('alien');
      alien.classList.add('dead-alien');  
     }
   })

  if(xPosition === 340) {
     laser.remove();
 }else {
   laser.style.left = `${xPosition + 8}px`;
 }
 },10)

}

//creating random enemies function

function creatAliens() {
 let newAlien = document.createElement('img');
 let alienSprite = aliensImg[Math.floor(math.random() * aliensImg.length)]; //sorteio da imagem de alien  
 newAlien.src = alienSprite;
 newAlien.classList.add('alien');
 newAlien.classList.add('alien-transition');
 mewAlien.style.left = '370px';
 newAlien.style.top = `${Math.floor(math.random() + 330) + 30}px`
 playArea.appendChild(newAlien);
 moveAlien(newAlien)
}

//moving the enemies function

function moveAlien(alien) {
 let moveAlienInterval = setInterval(() => {
  let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
  if(xPosition <= 50) {
   if(Array.from(alien.classList).includes('dead-alien')) {
     alien.remove();
   }else {
     gameOver(); 
   }
   }else {
    alien.style.left = `${xPosition - 4}px`;
  }
 }, 30);
}

//collision function

function checkLaser(laser, alien) {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  let laserBottom = laserTop - 20;  
  let alienTop = parseInt(alien.style.top);
  let alienLeft = parseInt(alien.style.left);
  let alienBottom = alienTop - 30;
  if(laserLeft != 340 && Laserleft + 40 >= alienLeft) {
    if(laserTop <= alienTop && laserTop >= alienBottom) {
      return true
   }else {
     return false
   } 
 }else {
   return false
 }
}

//Starting game
startButton.addEventListener('click', (event) => {
    playGame()
})

function playGame() {
 startButton.style.display = 'none';
 instructionsText.style.display = 'none';
 window.addEventListener('keydown', flyShip);
 alienInterval = setInterval(() => {
   creatAliens()
 },2000);
}

//Game Over function

function gameOver() {
 window.removeEventListener('keydown', flyShip);
 clearInterval(alienInterval);
 let aliens = document.querySelectorAll('.alien');
 aliens.forEach((alien) => alien.remove());
 let lasers = document.querySelectorAll('.laser');
 lasers.forEach((laser) => laser.remove()); 
 setTimeout(() => {
  alert('Game Over');
  yourShip.style.top = '250px';
  startButton.style.display = 'block';
  instructionsText.style.display = 'block'
 })
}

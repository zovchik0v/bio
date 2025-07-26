document.addEventListener('DOMContentLoaded', function() {
const body = document.body;
const clickMe = document.querySelector('.click-me');
const bioContainer = document.querySelector('.bio-container');
const bgMusic = document.getElementById('bgMusic');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');

createParticles();

body.addEventListener('click', function() {
if (!body.classList.contains('active')) {
body.classList.add('active');
bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
}
});

function createParticles() {
const particlesContainer = document.getElementById('particles');
const particleCount = 30;
for (let i = 0; i < particleCount; i++) {
const particle = document.createElement('div');
particle.classList.add('particle');
const size = Math.random() * 5 + 2;
const posX = Math.random() * 100;
const duration = Math.random() * 10 + 10;
const delay = Math.random() * -20;
const opacity = Math.random() * 0.5 + 0.1;
particle.style.width = `${size}px`;
particle.style.height = `${size}px`;
particle.style.left = `${posX}%`;
particle.style.bottom = `-${size}px`;
particle.style.animationDuration = `${duration}s`;
particle.style.animationDelay = `${delay}s`;
particle.style.opacity = opacity;
particlesContainer.appendChild(particle);
}
}

bgMusic.addEventListener('loadedmetadata', function() {
durationDisplay.textContent = formatTime(bgMusic.duration);
});

bgMusic.addEventListener('timeupdate', function() {
const currentTime = bgMusic.currentTime;
const duration = bgMusic.duration;
currentTimeDisplay.textContent = formatTime(currentTime);
progressBar.style.width = `${(currentTime / duration) * 100}%`;
});

progressContainer.addEventListener('click', function(e) {
const rect = this.getBoundingClientRect();
const pos = (e.clientX - rect.left) / rect.width;
bgMusic.currentTime = pos * bgMusic.duration;
});

playPauseBtn.addEventListener('click', function() {
if (bgMusic.paused) {
bgMusic.play();
playPauseBtn.textContent = '⏸';
} else {
bgMusic.pause();
playPauseBtn.textContent = '▶';
}
});

volumeSlider.addEventListener('input', function() {
bgMusic.volume = this.value;
});

function formatTime(seconds) {
const minutes = Math.floor(seconds / 60);
const secs = Math.floor(seconds % 60);
return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
});
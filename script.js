// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    initializeAnimations();
    setupScrollAnimations();
});

// Create floating particles
function createParticles() {
    const particles = document.getElementById('particles');
    const particleEmojis = ['❤️', '💕', '💖', '💗', '🌸', '🌺', '✨', '💫', '🦋'];

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation duration and delay
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        particles.appendChild(particle);
    }
}

// Initialize typewriter and other animations
function initializeAnimations() {
    // Typewriter effect is handled by CSS

    // Add staggered animation delays to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.2) + 's';
    });
}

// Scroll animations (AOS - Animate On Scroll)
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');

                // Special handling for message text
                if (entry.target.classList.contains('message-card')) {
                    animateMessageText();
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('[data-aos], .section-title, .message-card');
    elementsToObserve.forEach(element => {
        observer.observe(element);

        // Add delay based on data-delay attribute
        const delay = element.getAttribute('data-delay');
        if (delay) {
            element.style.transitionDelay = delay + 'ms';
        }
    });
}

// Animate message text with staggered effect
function animateMessageText() {
    const messageTexts = document.querySelectorAll('.message-text');
    messageTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('fade-in-animate');
        }, index * 500);
    });
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle like functionality for photos
function toggleLike(button) {
    const heartIcon = button.querySelector('.heart-icon');
    button.classList.toggle('liked');

    if (button.classList.contains('liked')) {
        heartIcon.textContent = '❤️';
        // Create floating heart effect
        createFloatingHeart(button);
    } else {
        heartIcon.textContent = '🤍';
    }
}

// Create floating heart animation when photo is liked
function createFloatingHeart(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';

    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + 'px';
    heart.style.top = rect.top + 'px';

    document.body.appendChild(heart);

    // Animate the heart
    heart.animate([
        { transform: 'translateY(0px) scale(1)', opacity: 1 },
        { transform: 'translateY(-60px) scale(1.5)', opacity: 0 }
    ], {
        duration: 1500,
        easing: 'ease-out'
    }).onfinish = () => {
        document.body.removeChild(heart);
    };
}
   // Update particles position based on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.2 + (index % 3) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add mouse movement effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Subtle movement effect
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;

    const floatingHearts = document.querySelector('.floating-hearts');
    if (floatingHearts) {
        floatingHearts.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Add click effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add entrance animations for photos when they come into view
const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img) {
                img.style.animation = 'photoEnter 0.8s ease-out forwards';
            }
        }
    });
}, { threshold: 0.2 });

// Observe all photo cards
document.querySelectorAll('.photo-card').forEach(card => {
    photoObserver.observe(card);
});

// Add photo enter animation
const photoStyle = document.createElement('style');
photoStyle.textContent = `
    @keyframes photoEnter {
        from {
            transform: scale(0.8) rotate(-5deg);
            opacity: 0;
        }
        to {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(photoStyle);

// Audio Tracks
const audioTracks = [
    {
        title: " Raabta (Kehte hain khuda)",
        artist: "Hits Song",
        duration: "3:52",
        src: "audio/22.mp3"
    },
    {
        title: " Khairiyat Pucho kabhi to kaifiyat",
        artist: "Hits Song",
        duration: "3:58",
        src: "audio/23.mp3"
    },
    {
        title: "Tere Sang Ishq Hua",
        artist: "Hits Song",
        duration: "3:48",
        src: "audio/24.mp3"
    }
];

let currentTrack = 0;
let isPlaying = false;

// DOM Elements
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevTrackBtn = document.getElementById("prevTrackBtn");
const nextTrackBtn = document.getElementById("nextTrackBtn");
const progressBar = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-bar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");
const vinylRecord = document.getElementById("vinylRecord");
const playlistItems = document.querySelectorAll(".playlist-item");


function initializeMusicPlayer() {
    loadTrack(currentTrack);
    updatePlaylistUI();

    playPauseBtn.addEventListener("click", togglePlay);
    prevTrackBtn.addEventListener("click", previousTrack);
    nextTrackBtn.addEventListener("click", nextTrack);
    progressContainer.addEventListener("click", seek);
    volumeSlider.addEventListener("input", changeVolume);
    audioPlayer.addEventListener("timeupdate", updateProgressBar);
    audioPlayer.addEventListener("ended", nextTrack);

    playlistItems.forEach((item, index) => {
        item.addEventListener("click", () => selectTrack(index));
    });
}

function loadTrack(index) {
    const track = audioTracks[index];
    audioPlayer.src = track.src;

    document.getElementById("trackTitle").textContent = track.title;
    document.getElementById("trackArtist").textContent = track.artist;
}

function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.textContent = "⏸️";
        vinylRecord.classList.add("playing");
    } else {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.textContent = "▶️";
        vinylRecord.classList.remove("playing");
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % audioTracks.length;
    switchTrack();
}

function previousTrack() {
    currentTrack =
        (currentTrack - 1 + audioTracks.length) % audioTracks.length;
    switchTrack();
}

function switchTrack() {
    loadTrack(currentTrack);
    updatePlaylistUI();
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸️";
    vinylRecord.classList.add("playing");
}

function selectTrack(index) {
    currentTrack = index;
    switchTrack();
}

function updatePlaylistUI() {
    playlistItems.forEach((item, index) => {
        item.classList.toggle("active", index === currentTrack);
    });
}

function updateProgressBar() {
    const { duration, currentTime } = audioPlayer;
    if (duration) {
        const percent = (currentTime / duration) * 100;
        progressBar.style.width = percent + "%";

        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeDisplay.textContent =
            `${minutes}:${seconds.toString().padStart(2, "0")}`;

        const durMin = Math.floor(duration / 60);
        const durSec = Math.floor(duration % 60);
        durationDisplay.textContent =
            `${durMin}:${durSec.toString().padStart(2, "0")}`;
    }
}

function seek(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

function changeVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
}

document.addEventListener("DOMContentLoaded", initializeMusicPlayer);

let currentDifficulty = "easy";
let puzzlePieces = [];
let moveCount = 0;
let gameTimer = null;
let gameStartTime = null;
let draggedElement = null;

// Puzzle Images
const puzzleImages = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg"
];

function initializePuzzleGame() {
    const difficultySelect = document.getElementById("difficultySelect");
    const newGameBtn = document.getElementById("newGameBtn");
    const showSolutionBtn = document.getElementById("showSolutionBtn");
    const playAgainBtn = document.getElementById("playAgainBtn");

    difficultySelect.addEventListener("change", changeDifficulty);
    newGameBtn.addEventListener("click", startNewGame);
    showSolutionBtn.addEventListener("click", showSolution);
    playAgainBtn.addEventListener("click", startNewGame);

    changeDifficulty();
    startNewGame();
}

function changeDifficulty() {
    const select = document.getElementById("difficultySelect");
    currentDifficulty = select.value;
    startNewGame();   // 🔥 important
}
function startNewGame() {
    clearInterval(gameTimer);
    moveCount = 0;
    gameStartTime = Date.now();
    updateMoveCounter();

    generatePuzzle();
    shufflePuzzle();
    startGameTimer();

    document.getElementById("gameCompletion").style.display = "none";
}

function generatePuzzle() {
    const puzzleBoard = document.getElementById("puzzleBoard");

    // Clear board completely
    puzzleBoard.innerHTML = "";
    puzzlePieces = [];

    const gridSize =
        currentDifficulty === "easy" ? 3 :
        currentDifficulty === "medium" ? 4 : 5;

    // 🔥 Always reset grid properly
    puzzleBoard.style.display = "grid";
    puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    const totalPieces = gridSize * gridSize;
    const imageUrl = puzzleImages[Math.floor(Math.random() * puzzleImages.length)];

    document.getElementById("solutionImage").src = imageUrl;

    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
        puzzleBoard.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
    };

    for (let i = 0; i < totalPieces; i++) {

        const piece = document.createElement("div");
        piece.className = "puzzle-piece";

        piece.dataset.correctPosition = i;

        const row = Math.floor(i / gridSize);
        const col = i % gridSize;

        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;
        piece.style.backgroundPosition =
            `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`;

        piece.draggable = true;

        piece.addEventListener("dragstart", handleDragStart);
        piece.addEventListener("dragover", handleDragOver);
        piece.addEventListener("drop", handleDrop);
        piece.addEventListener("dragend", handleDragEnd);

        puzzleBoard.appendChild(piece);
        puzzlePieces.push(piece);
    }
}
function shufflePuzzle() {
    const puzzleBoard = document.getElementById("puzzleBoard");

    puzzlePieces.sort(() => Math.random() - 0.5);

    puzzlePieces.forEach((piece, index) => {
        piece.dataset.currentPosition = index;
        puzzleBoard.appendChild(piece);
    });
}

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add("dragging");
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();

    if (!draggedElement || draggedElement === e.target) return;

    const parent = draggedElement.parentNode;
    const draggedIndex = [...parent.children].indexOf(draggedElement);
    const targetIndex = [...parent.children].indexOf(e.target);

    if (draggedIndex < targetIndex) {
        parent.insertBefore(draggedElement, e.target.nextSibling);
    } else {
        parent.insertBefore(draggedElement, e.target);
    }

    moveCount++;
    updateMoveCounter();
    checkCompletion();
}

function handleDragEnd(e) {
    e.target.classList.remove("dragging");
    draggedElement = null;
}

function checkCompletion() {
    const pieces = [...document.getElementById("puzzleBoard").children];

    const isComplete = pieces.every((piece, index) =>
        parseInt(piece.dataset.correctPosition) === index
    );

    if (isComplete) {
        clearInterval(gameTimer);
        showCompletion();
    }
}

function showCompletion() {
    const completionDiv = document.getElementById("gameCompletion");
    const finalTime = document.getElementById("finalTime");
    const finalMoves = document.getElementById("finalMoves");

    const timeElapsed = Math.floor((Date.now() - gameStartTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    finalTime.textContent =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;

    finalMoves.textContent = moveCount;

    completionDiv.style.display = "flex";
}

function showSolution() {
    const puzzleBoard = document.getElementById("puzzleBoard");

    puzzlePieces.sort(
        (a, b) =>
            parseInt(a.dataset.correctPosition) -
            parseInt(b.dataset.correctPosition)
    );

    puzzlePieces.forEach((piece, index) => {
        puzzleBoard.appendChild(piece);
    });

    checkCompletion();
}

function startGameTimer() {
    gameTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
        const min = Math.floor(elapsed / 60);
        const sec = elapsed % 60;

        document.getElementById("gameTimer").textContent =
            `${min}:${sec.toString().padStart(2, "0")}`;
    }, 1000);
}

function updateMoveCounter() {
    document.getElementById("moveCounter").textContent = moveCount;
}


document.addEventListener("DOMContentLoaded", initializePuzzleGame);

// ===============================
// COUNTDOWN SECTION
// ===============================

let countdownInterval = null;
let targetBirthday = null;

// ===============================
// INITIALIZE
// ===============================
function initializeCountdown() {
    const birthdayInput = document.getElementById("birthdayDate");

    // Set default date = next year same date
    const now = new Date();
    const nextYear = new Date(
        now.getFullYear() + 1,
        now.getMonth(),
        now.getDate(),
        0, 0, 0
    );

    birthdayInput.value = nextYear.toISOString().slice(0, 16);

    birthdayInput.addEventListener("change", updateCountdown);

    updateCountdown();
}

// ===============================
// UPDATE COUNTDOWN
// ===============================
function updateCountdown() {
    const birthdayInput = document.getElementById("birthdayDate");

    if (!birthdayInput.value) return;

    targetBirthday = new Date(birthdayInput.value);

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(calculateTimeRemaining, 1000);
    calculateTimeRemaining();
}

// ===============================
// CALCULATE TIME
// ===============================
function calculateTimeRemaining() {
    if (!targetBirthday) return;

    const now = new Date().getTime();
    const targetTime = targetBirthday.getTime();
    const difference = targetTime - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const messageEl = document.getElementById("countdownMessage");

    if (difference <= 0) {
        clearInterval(countdownInterval);

        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";

        messageEl.innerHTML =
            '<p class="birthday-celebration">🎉 Happy Birthday! 🎂</p>';

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    );
    const seconds = Math.floor(
        (difference % (1000 * 60)) /
        1000
    );

    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");

    updateMessage(days, hours, minutes, seconds);
}

// ===============================
// UPDATE MESSAGE LOGIC
// ===============================
function updateMessage(days, hours, minutes, seconds) {
    const messageEl = document.getElementById("countdownMessage");

    messageEl.classList.remove("birthday-celebration");

    if (days > 1) {
        messageEl.innerHTML = `<p>🎂 ${days} days until your special day!</p>`;
    } 
    else if (days === 1) {
        messageEl.innerHTML = `<p>🎉 Tomorrow is the big day!</p>`;
    } 
    else if (hours > 1) {
        messageEl.innerHTML = `<p>⏰ ${hours} hours remaining!</p>`;
    } 
    else if (minutes > 1) {
        messageEl.innerHTML = `<p>⏱️ ${minutes} minutes left!</p>`;
    } 
    else {
        messageEl.innerHTML = `<p>⚡ ${seconds} seconds to go!</p>`;
    }
}


document.addEventListener("DOMContentLoaded", initializeCountdown);











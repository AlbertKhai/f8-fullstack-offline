// Tạo Element
let playBtn = document.querySelector(".player .play-btn");
let playIcon = playBtn.querySelector(".fa-play");
let pauseIcon = playBtn.querySelector(".fa-pause");
let progressBar = document.querySelector(".progress-bar");
let currentTimeEle = progressBar.previousElementSibling;
let durationEle = progressBar.nextElementSibling;
let showTime = progressBar.querySelector(".show-time");
let progress = progressBar.querySelector(".progress");
let progressSpan = progress.querySelector("span");
let audio = document.querySelector(".audio");

let progressBarWidth = progressBar.clientWidth;

let initialClientX;
let value;
let currentValue = 0;
let mousedownDoc = true;
let isDragging;
let mousemoveProgressBar = false;
let audioTimeBefore;

/* ========================= Func Event for Audio ========================= */
let getTime = function (seconds) {
   let mins = Math.floor(seconds / 60); // Lấy được phút
   seconds = Math.floor(seconds - mins * 60); // Tính số giây còn lại
   return `${mins < 10 ? "0" + mins : mins}:${
      seconds < 10 ? "0" + seconds : seconds
   }`;
};

let getNumSecond = (value) => (value * audio.duration) / 100;

let dragging = function (yes) {
   mousedownDoc = !yes;
   isDragging = yes;

   if (yes) {
      document.body.classList.add("select-none");
      progressBar.classList.add("hover");
   } else {
      document.body.classList.remove("select-none");
      progressBar.classList.remove("hover");
   }
};

// 1. Nhả chuột
let handleChange = function (value) {
   audio.currentTime = getNumSecond(value);
};

// 2. Bấm chuột xuống, kéo
let handleInput = function (value) {
   audio.currentTime = getNumSecond(value);
   audioTimeBefore = audio.currentTime;
};

/* ========================= Func Event for Progress ========================= */

let handleDrag = function (e) {
   let moveWidth = e.clientX - initialClientX;
   value = (moveWidth * 100) / progressBarWidth + currentValue;

   if (value < 0) {
      value = 0;
   }

   if (value > 100) {
      value = 100;
   }

   progress.style.width = `${value}%`;
   currentTimeEle.innerText = getTime(getNumSecond(value));
};

/* ========================= Progress Bar ========================= */
progressBar.addEventListener("mousedown", function (e) {
   if (e.which === 1) {
      // -> Lấy offsetX -> tính phần trăm theo chiều rộng
      value = (e.offsetX * 100) / progressBarWidth;
      progress.style.width = `${value}%`;
      initialClientX = e.clientX;
      currentValue = value;
      dragging(true);
      handleInput(value);
      document.addEventListener("mousemove", handleDrag);
   }
});

progressBar.addEventListener("mousemove", function (e) {
   let value = (e.offsetX * 100) / progressBarWidth;
   showTime.innerText = getTime(getNumSecond(value));
   showTime.style.left = `${e.offsetX - showTime.clientWidth / 2}px`;
   showTime.classList.remove("hide");
});

progressBar.addEventListener("mouseout", function (e) {
   showTime.classList.add("hide");
});

/* ========================= Progress Span ========================= */

progressSpan.addEventListener("mousemove", function (e) {
   e.stopPropagation();
});

progressSpan.addEventListener("mousedown", function (e) {
   e.stopPropagation();
   document.addEventListener("mousemove", handleDrag);
   initialClientX = e.clientX;
   audioTimeBefore = audio.currentTime;
   dragging(true);
});

/* ========================= Document ========================= */

document.addEventListener("mouseup", function (e) {
   document.removeEventListener("mousemove", handleDrag);
   if (!mousedownDoc && e.clientX !== initialClientX) {
      currentValue = value;
      handleChange(currentValue);
   } else if (audio.currentTime - audioTimeBefore >= 1 && !mousedownDoc) {
      value = (audioTimeBefore * 100) / audio.duration;
      currentValue = value;
      handleChange(currentValue);
   }
   dragging(false);
});

document.addEventListener("keydown", function (e) {
   switch (e.key) {
      case " ":
         audio.paused ? audio.play() : audio.pause();
         break;
   }
});

// xử lý vấn đề document mouseup không được kích hoạt sau khi các ele trong play-inner được bôi đen và bị drag
document.addEventListener("dragend", function (e) {
   document.removeEventListener("mousemove", handleDrag);
   dragging(false);
});

/* ========================= Audio player ========================= */
// Lắng nghe sự kiện loadeddata -> sau khi file audio tải xong
audio.addEventListener("loadeddata", function () {
   durationEle.innerText = getTime(audio.duration);
});

// Action Play - Pause
playBtn.addEventListener("click", function () {
   if (audio.paused) {
      audio.play();
   } else {
      audio.pause();
   }
});

// Hiển thị thời gian nhạc đang phát
audio.addEventListener("timeupdate", function () {
   if (!isDragging) {
      currentTimeEle.innerText = getTime(audio.currentTime);
      value = (audio.currentTime * 100) / audio.duration;
      progress.style.width = `${value}%`;
      currentValue = value;
   }
});

// Đổi icon play
audio.addEventListener("play", function () {
   playIcon.classList.add("hide");
   setTimeout(() => {
      pauseIcon.classList.remove("hide");
   }, 200);
});

// Đổi icon pause
audio.addEventListener("pause", function () {
   pauseIcon.classList.add("hide");
   setTimeout(() => {
      playIcon.classList.remove("hide");
   }, 200);
});

audio.addEventListener("ended", function () {
   audio.currentTime = 0;
});

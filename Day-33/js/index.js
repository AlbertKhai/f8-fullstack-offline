const btnRecord = document.querySelector(".btn__record");
const messReady = document.querySelector(".mess__ready");
const messEnd = document.querySelector(".mess__end");
const messShow = document.querySelector(".mess__show");

const SpeechRecognition =
   window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = false;
recognition.lang = "vi-VN";
recognition.continuous = false;
recognition.maxAlternatives = 1;

let recording = false;

let handleStartRecord = () => {
   recognition.start();
   btnRecord.innerText = "Đang thu âm, nhấn để dừng";
   btnRecord.classList.add("recoding");
   messEnd.classList.add("d-none");
   messShow.classList.add("d-none");
   messReady.classList.remove("d-none");
   recording = true;
};

let handleEndRecord = () => {
   recognition.stop();
   btnRecord.innerText = "Bấm vào đây để nói";
   btnRecord.classList.remove("recoding");
   messReady.classList.add("d-none");
   recording = false;
};

btnRecord.addEventListener("click", function () {
   if (recording) {
      handleEndRecord();
   } else {
      handleStartRecord();
   }
});

// Bắt sự kiện khi ngừng nói
recognition.onspeechend = () => {
   handleEndRecord();
};

// Bắt sự kiện khi thu âm kết thúc
recognition.onaudioend = function () {
   handleEndRecord();
};

// Bắt sự kiện khi có kết quả từ thu âm
recognition.onresult = (e) => {
   let result = e.results[0][0].transcript.slice(0, -1).toLowerCase();
   messShow.innerText = `Đang thực hiện: ${result}.`;
   messShow.classList.remove("d-none");
   messEnd.classList.remove("d-none");

   let isSuccess = true;
   let continueSwitch = false;

   switch (result) {
      case "google":
         window.open("https://www.google.com", "_blank");
         break;
      case "facebook":
         window.open("https://www.facebook.com", "_blank");
         break;
      case "youtube":
         window.open("https://www.youtube.com", "_blank");
         break;
      case "google drive":
         window.open("https://drive.google.com", "_blank");
         break;
      case "google maps":
      case "bản đồ":
         window.open("https://maps.google.com", "_blank");
         break;
      default:
         continueSwitch = true;
   }

   if (continueSwitch) {
      switch (true) {
         case result.includes("chỉ đường"):
         case result.includes("chỉ đường tới"):
         case result.includes("tới"):
         case result.includes("đường tới"):
            result = result
               .replace(/.*?\b(tới|đường)\b\s*/, "")
               .split(" ")
               .join("+");

            if (!result) {
               window.open("https://maps.google.com", "_blank");
               break;
            }

            window.open(
               `https://www.google.com/maps/search/${result}`,
               "_blank"
            );
            break;

         case result.includes("bài hát"):
         case result.includes("mở bài hát"):
         case result.includes("nghe bài hát"):
            result = result
               .replace(/.*?\b(hát)\b\s*/, "")
               .split(" ")
               .join("+");

            if (!result) {
               window.open("https://zingmp3.vn", "_blank");
               break;
            }

            window.open(
               `https://zingmp3.vn/tim-kiem/tat-ca?q=${result}`,
               "_blank"
            );
            break;

         case result.includes("video"):
         case result.includes("mở video"):
         case result.includes("xem video"):
            // Thực hiện hành động mở Youtube với video yêu cầu
            result = result
               .replace(/.*?\b(video)\b\s*/, "")
               .split(" ")
               .join("+");

            if (!result) {
               window.open("https://www.youtube.com", "_blank");
               break;
            }

            window.open(
               `https://www.youtube.com/results?search_query=${result}`,
               "_blank"
            );
            break;

         default:
            isSuccess = false;
      }
   }

   if (isSuccess) {
      messShow.classList.remove("fail");
      messShow.innerText = "Đã thực hiện xong.";
   } else {
      messShow.classList.add("fail");
      messShow.innerText = "Không thực hiện được yêu cầu.";
   }
};

var buttons = document.getElementsByClassName("copyButton");

for (var i = 0; i < buttons.length; i++) {
   buttons[i].addEventListener("click", function () {
      var buttonClass = this.classList[1]; // lấy class thứ 2 (html hoặc js)
      var codeBlock = document.querySelector(
         ".codeBlock.language-" + buttonClass
      ).innerText;
      var textarea = document.createElement("textarea");
      textarea.textContent = codeBlock;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Đã sao chép code " + buttonClass + " vào clipboard!");
   });
}

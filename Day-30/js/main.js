const btnDropdown = document.querySelector(".action__dropdown");
const wrapAction = document.querySelector(".wrap-action");
const inputNameFile = document.querySelector(".action__name-file");
const editorContent = document.querySelector(".editor__content");
const countLetter = document.querySelector(".count__letter");
const countWord = document.querySelector(".count__word");
const btnBold = document.querySelector(".action__bold");
const btnUnderlined = document.querySelector(".action__underlined");
const btnItalic = document.querySelector(".action__italic");
const btnColor = document.querySelector(".action__color");
const btnNewFile = document.querySelector(".action__new");
const btnSaveTXT = document.querySelector(".action__txt");
const btnSavePDF = document.querySelector(".action__pdf");

let optPdf = {
   margin: 20,
   filename: inputNameFile.value,
   image: { type: "jpeg", quality: 0.98 },
   html2canvas: { scale: 2 },
   jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
};

let validNameFile = function () {
   let originalValue = inputNameFile.value;
   inputNameFile.value = inputNameFile.value.replace(/[*:?"<>|\/\\]/g, "");

   if (originalValue !== inputNameFile.value) {
      alert(
         `Tên file không chứa các kí tự đặc biệt sau:\n*, : , ? , " , < , > , | , / , \\`
      );
      return true;
   }

   return false;
};

/* ========================= Count ========================= */
let numLetter = document.createTextNode(0);
let numWord = document.createTextNode(0);

countLetter.append(numLetter);
countWord.append(numWord);

// handle paste content
editorContent.addEventListener("paste", function (e) {
   e.preventDefault();

   let text = e.clipboardData.getData("text/plain");
   text = text.replaceAll("\n", "");

   document.execCommand("insertText", false, text);
});

// count num word & letter content
editorContent.addEventListener("keyup", function () {
   let text = this.innerText.replaceAll("\n", " ");
   text = text
      .split(" ")
      .map((value) => value.trim())
      .filter(Boolean);
   numWord.data = text.length;
   numLetter.data = text.join("").length;
});

/* ========================= Action file ========================= */

btnDropdown.addEventListener("click", function (e) {
   e.stopPropagation();
   wrapAction.classList.toggle("show");
   this.classList.toggle("active");
});

document.addEventListener("click", function () {
   if (btnDropdown.classList.contains("active")) {
      wrapAction.classList.remove("show");
      btnDropdown.classList.remove("active");
   }
});

btnNewFile.addEventListener("click", function () {
   inputNameFile.value = "untitled";
   btnColor.value = "#ffff00";
   editorContent.innerHTML = "";
   numWord.data = 0;
   numLetter.data = 0;
});

btnSaveTXT.addEventListener("click", function () {
   if (validNameFile()) return;
   let text = editorContent.innerText;
   let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
   let url = URL.createObjectURL(blob);

   let a = document.createElement("a");
   a.href = url;
   a.download = `${inputNameFile.value}.txt`;
   a.click();

   URL.revokeObjectURL(url);
});

btnSavePDF.addEventListener("click", function () {
   if (validNameFile()) return;
   html2pdf(editorContent, optPdf);
});

/* ========================= Action editor ========================= */
let handleActionEditor = function (action, value = null) {
   let selection = window.getSelection();

   if (editorContent.contains(selection.anchorNode)) {
      document.execCommand(action, false, value);
   }
};

btnBold.addEventListener("click", function () {
   handleActionEditor("bold");
});

btnUnderlined.addEventListener("click", function () {
   handleActionEditor("underline");
});

btnItalic.addEventListener("click", function () {
   handleActionEditor("italic");
});

btnColor.addEventListener("blur", function () {
   handleActionEditor("foreColor", this.value);
});

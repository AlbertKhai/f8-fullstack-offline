const msgToast = document.getElementById("msgToast");
if (msgToast) {
   const toastBootstrap = bootstrap.Toast.getOrCreateInstance(msgToast);
   toastBootstrap.show();
}

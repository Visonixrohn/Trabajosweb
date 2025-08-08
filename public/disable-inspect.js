// Bloqueo básico de F12, Ctrl+U, Ctrl+Shift+I y clic derecho
window.addEventListener("keydown", function (e) {
  // F12
  if (e.key === "F12") {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
    e.preventDefault();
    return false;
  }
  // Ctrl+U
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+J
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
    e.preventDefault();
    return false;
  }
});
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  return false;
});

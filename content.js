chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "capture") {
    html2canvas(document.body).then(canvas => {
      sendResponse({imageData: canvas.toDataURL()});
    });
    return true;  // Indicates we want to send a response asynchronously
  }
});
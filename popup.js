document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('captureBtn').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "capture"}, function(response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          document.getElementById('result').textContent = "Error: " + chrome.runtime.lastError.message;
        } else if (response && response.imageData) {
          document.getElementById('result').textContent = "Image captured! Processing...";
          // Here you would typically send the image data for OCR processing
          // For now, let's just display a success message
          setTimeout(() => {
            document.getElementById('result').textContent = "TestTrick-inator has successfully captured the image!";
          }, 1000);
        } else {
          document.getElementById('result').textContent = "Failed to capture image.";
        }
      });
    });
  });
});
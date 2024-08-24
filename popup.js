document.getElementById('captureBtn').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "capture"}, function(response) {
      if (response && response.imageData) {
        detectText(response.imageData);
      }
    });
  });
});

function detectText(imageData) {
  document.getElementById('result').textContent = "Behold, the TestTrick-inator is scanning for testable content!";
  
  Tesseract.recognize(
    imageData,
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    document.getElementById('result').innerHTML = 
      "<p>Ah-ha! The TestTrick-inator has deciphered the test's secrets! Behold the knowledge:</p>" +
      "<p><strong>" + text + "</strong></p>" +
      "<p>Now, Perry the Platypus, with this information I shall ace every test in the Tri-State Area! ...What? Oh, it's just to help with studying? Well, I suppose that works too.</p>";
  }).catch(err => {
    document.getElementById('result').textContent = "Curse you, Perry the Platypus! The TestTrick-inator has been foiled by this incomprehensible test material!";
  });
}

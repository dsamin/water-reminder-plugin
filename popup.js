// Update hydration log display
function updateHydrationLogDisplay() {
    chrome.storage.local.get("weeklyLog", (result) => {
      const today = new Date().toISOString().split("T")[0]; // Get today's date
      const weeklyLog = result.weeklyLog || {};
      const hydratedHours = weeklyLog[today] || 0; // Get today's hydration count
      document.getElementById("hydrationLog").textContent = `Hours hydrated today: ${hydratedHours}`;
    });
  }
  
  // Update hydration log when "Drank Water" button is clicked
  document.getElementById("yesButton").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "logHydration" }, () => {
      updateHydrationLogDisplay(); // Refresh the UI after logging hydration
    });
  });
  
  // Event listener for "View Weekly History" button
  document.getElementById("historyButton").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "getWeeklyHistory" }, (response) => {
      if (response && response.success) {
        const weeklyHistory = document.getElementById("weeklyHistory");
        weeklyHistory.innerHTML = response.history
          .split('\n')
          .map((entry) => `<div>${entry}</div>`)
          .join('');
      }
    });
  });
  
  // Update countdown timer display
  function updateCountdownDisplay() {
    chrome.storage.local.get("countdownTime", (result) => {
      const time = result.countdownTime || 3600;
      document.getElementById("countdown").textContent = formatTime(time);
    });
  }
  
  // Format time into hh:mm:ss
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Refresh hydration log and countdown on popup load
  updateHydrationLogDisplay();
  setInterval(updateCountdownDisplay, 1000);
  
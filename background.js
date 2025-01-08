let countdownTime = 3600; // 1 hour in seconds
let countdownInterval;
let weeklyLog = {}; // Weekly hydration log
let snoozeTimer = null;
let lastHydrationTimestamp = 0; // Track last hydration timestamp

// Start or continue the countdown
function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    countdownTime--;
    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      countdownTime = 0;

      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon128.png",
        title: "Time to Hydrate!",
        message: "Take a moment to drink some water!"
      });
    }
    chrome.storage.local.set({ countdownTime });
  }, 1000);
}

// Save hydration logs in weekly format with a restriction of once per hour
function saveDailyHydrationCount() {
  const now = Date.now(); // Current timestamp in milliseconds
  const oneHour = 60 * 60 * 1000;

  // Check if the last hydration log was more than an hour ago
  if (now - lastHydrationTimestamp >= oneHour) {
    lastHydrationTimestamp = now; // Update the last hydration timestamp
    const today = new Date().toISOString().split("T")[0]; // Get today's date as YYYY-MM-DD
    chrome.storage.local.get("weeklyLog", (result) => {
      const log = result.weeklyLog || {};
      log[today] = (log[today] || 0) + 1; // Increment today's hydration count
      chrome.storage.local.set({ weeklyLog: log }); // Save the updated log
    });
  }
}

// Handle messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "logHydration") {
    saveDailyHydrationCount();
    sendResponse({ success: true });
  }

  if (message.action === "getWeeklyHistory") {
    chrome.storage.local.get("weeklyLog", (result) => {
      const log = result.weeklyLog || {};
      const history = Object.entries(log)
        .map(([date, count]) => `${date}: ${count} times`)
        .join("\n");
      sendResponse({ success: true, history });
    });
    return true; // Indicates async response
  }
});

// Reset hydration logs at midnight
function resetWeeklyLog() {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    chrome.storage.local.set({ weeklyLog: {} });
  }
}

// Check and reset logs every minute
setInterval(resetWeeklyLog, 60000);

// Initialize countdown on install or startup
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("countdownTime", (result) => {
    countdownTime = result.countdownTime || 3600;
    startCountdown();
  });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("countdownTime", (result) => {
    countdownTime = result.countdownTime || 3600;
    startCountdown();
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && !tab.url.startsWith("chrome://")) {
        chrome.storage.local.get("auto_remove", async (data) => {
            if (data.auto_remove) {
                await chrome.scripting.executeScript({
                    target: { tabId },
                    files: ["content.js"]
                });
            }
        });
    }
});

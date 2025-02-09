chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        chrome.storage.local.get("autoRemove", async (data) => {
            if (data.autoRemove) {
                await chrome.scripting.executeScript({
                    target: { tabId },
                    files: ["content.js"]
                });
            }
        });
    }
});

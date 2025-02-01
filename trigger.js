chrome.action.onClicked.addListener(async (tab) => {
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
    });

    chrome.action.setIcon({
        path: {
            "16": "icons/icon16_active.png",
            "48": "icons/icon48_active.png",
            "128": "icons/icon128_active.png"
        },
        tabId: tab.id
    });
});

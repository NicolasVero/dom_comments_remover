document.addEventListener("DOMContentLoaded", async () => {
    const button = document.getElementById("remove-comments");
    const checkbox = document.getElementById("auto-remove");

    chrome.storage.local.get("autoRemove", (data) => {
        checkbox.checked = data.autoRemove || false;
    });

    if (button) {
        button.addEventListener("click", async () => {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (tab) {
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
            }
        });
    }

    // Sauvegarder l'état de la checkbox
    checkbox.addEventListener("change", () => {
        chrome.storage.local.set({ autoRemove: checkbox.checked });
    });
});

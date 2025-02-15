// document.addEventListener("DOMContentLoaded", async () => {
//     const button = document.getElementById("remove-comments");
//     const checkbox = document.getElementById("auto-remove");

//     chrome.storage.local.get("auto_remove", (data) => {
//         checkbox.checked = data.auto_remove || false;
//     });

//     if (button) {
//         button.addEventListener("click", async () => {
//             let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//             if (tab) {
//                 await chrome.scripting.executeScript({
//                     target: { tabId: tab.id },
//                     files: ["content.js"]
//                 });

//                 chrome.action.setIcon({
//                     path: {
//                         "16": "icons/icon16_active.png",
//                         "48": "icons/icon48_active.png",
//                         "128": "icons/icon128_active.png"
//                     },
//                     tabId: tab.id
//                 });
//             }
//         });
//     }

//     checkbox.addEventListener("change", () => {
//         chrome.storage.local.set({ auto_remove: checkbox.checked });
//     });
// });


document.addEventListener("DOMContentLoaded", async () => {
    const button = document.getElementById("remove-comments");
    const auto_remove_checkbox = document.getElementById("auto-remove");
    const rework_comments_checkbox = document.getElementById("rework-comments");

    chrome.storage.local.get(["auto_remove", "rework_comments"], (data) => {
        auto_remove_checkbox.checked = data.auto_remove || false;
        rework_comments_checkbox.checked = data.rework_comments || false;
    });

    if (button) {
        button.addEventListener("click", async () => {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if (tab) {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (variable) => {
                        window.props = variable;
                    },
                    args: [{
                        message: "Hello from popup.js",
                        rework_comments: rework_comments_checkbox.checked
                    }]
                });

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

    auto_remove_checkbox.addEventListener("change", () => {
        chrome.storage.local.set({ auto_remove: auto_remove_checkbox.checked });
    });

    rework_comments_checkbox.addEventListener("change", () => {
        chrome.storage.local.set({ rework_comments: rework_comments_checkbox.checked });
    });
});

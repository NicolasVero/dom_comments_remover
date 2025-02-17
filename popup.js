document.addEventListener("DOMContentLoaded", async () => {
    const button = document.getElementById("remove-comments");
    const rework_comments_checkbox = document.getElementById("rework-comments");
    const rework_comments_end_template_checkbox = document.getElementById("rework-comments--end-template");

    chrome.storage.local.get(["auto_remove", "rework_comments", "rework_comments_end_template"], (data) => {
        rework_comments_checkbox.checked = data.rework_comments || false;
        rework_comments_end_template_checkbox.checked = data.rework_comments_end_template || false;
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
                        rework_comments: {
                            enable: rework_comments_checkbox.checked,
                            display_end_template: rework_comments_end_template_checkbox.checked
                        }
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
    
    rework_comments_checkbox.addEventListener("change", () => {
        chrome.storage.local.set({ rework_comments: rework_comments_checkbox.checked });
    });
    
    rework_comments_end_template_checkbox.addEventListener("change", () => {
        chrome.storage.local.set({ rework_comments_end_template: rework_comments_end_template_checkbox.checked });
    });
    
});

(function () {
  document.body.addEventListener("click", t => {
    const e = t.target.closest("#claude-onboarding-button");
    if (e) {
      (async function (t) {
        const e = t.getAttribute("data-task-prompt");
        if (e) {
          await chrome.runtime.sendMessage({
            type: "open_side_panel",
            prompt: e
          });
        }
      })(e);
    }
  });
})();
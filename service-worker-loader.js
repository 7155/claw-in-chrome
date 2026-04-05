import "./provider-format-adapter.js";
import "./assets/service-worker.ts-H0DVM1LS.js";

// Clear the uninstall survey URL registered by the bundled worker.
const clearUninstallUrl = async () => {
  try {
    await chrome.runtime.setUninstallURL("");
  } catch {}
};
clearUninstallUrl();
chrome.runtime.onInstalled.addListener(() => {
  clearUninstallUrl();
});
chrome.runtime.onStartup.addListener(() => {
  clearUninstallUrl();
});
(() => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const applyMode = matches => {
    document.documentElement.setAttribute("data-mode", matches ? "dark" : "light");
  };
  applyMode(media.matches);
  const handleChange = event => {
    applyMode(event.matches);
  };
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", handleChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(handleChange);
  }
})();
const copyButtons = document.querySelectorAll("[data-copy]");
const searchInput = document.querySelector("#siteSearch");
const searchableItems = document.querySelectorAll(".searchable");

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  return Promise.resolve();
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const originalText = button.textContent;
    await copyText(button.dataset.copy);
    button.textContent = "已复制";
    button.disabled = true;

    window.setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1200);
  });
});

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();

  searchableItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.classList.toggle("hidden-by-search", query.length > 0 && !text.includes(query));
  });
});

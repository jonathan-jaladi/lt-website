const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    const label = menuButton.querySelector("[data-menu-label]");
    if (label) label.textContent = isOpen ? "Menu" : "Close";
  });
}

document.querySelectorAll("[data-email-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    const formTitle = form.dataset.formTitle || "Website enquiry";
    const body = Array.from(fields.entries())
      .filter(([key]) => key !== "website")
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    const subject = encodeURIComponent(`LambTech website: ${formTitle}`);
    const message = encodeURIComponent(body);
    const notice = form.querySelector("[data-form-notice]");

    if (notice) notice.textContent = "Your email app should open with your enquiry. If it does not, email ceo@lambtech.in and copy the details above.";
    window.location.href = `mailto:ceo@lambtech.in?subject=${subject}&body=${message}`;
    if (typeof window.plausible === "function") window.plausible("Form Submit", { props: { form: formTitle } });
  });
});

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => {
    if (typeof window.plausible === "function") window.plausible("CTA Click", { props: { label: element.dataset.track } });
  });
});

(() => {
  const storageKey = "system-design-sidebar-collapsed";
  const root = document.documentElement;
  let collapsed = false;

  try {
    collapsed = localStorage.getItem(storageKey) === "true";
  } catch {
    // Keep the current page's state when browser storage is unavailable.
  }

  function mountToggle() {
    const sidebar = document.querySelector(".md-sidebar--primary");
    const title = document.querySelector(".md-header__title");
    if (!sidebar || !title) return;

    sidebar.id = "system-design-navigation";
    let button = document.querySelector(".sidebar-toggle");

    function updateToggle() {
      const label = collapsed ? "Show navigation sidebar" : "Hide navigation sidebar";
      root.classList.toggle("sidebar-collapsed", collapsed);
      button.setAttribute("aria-expanded", String(!collapsed));
      button.setAttribute("aria-label", label);
      button.title = label;
    }

    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "md-header__button sidebar-toggle";
      button.setAttribute("aria-controls", sidebar.id);
      button.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2"></rect>
          <path d="M9 4v16"></path>
          <path class="sidebar-toggle__chevron" d="m17 9-3 3 3 3"></path>
        </svg>`;
      button.addEventListener("click", () => {
        collapsed = !collapsed;
        updateToggle();
        try {
          localStorage.setItem(storageKey, String(collapsed));
        } catch {
          // The toggle remains usable without browser storage.
        }
      });
      title.before(button);
    }

    updateToggle();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(mountToggle);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountToggle);
  } else {
    mountToggle();
  }
})();


/** START THEME TOGGLE */
const theme = (() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  })();

  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");

  if (theme === "light") {
    document.documentElement.classList.remove("dark");
    sun.classList.remove("hidden");
    moon.classList.add("hidden");
  } else {
    document.documentElement.classList.add("dark");
    sun.classList.add("hidden");
    moon.classList.remove("hidden");
  }

  window.localStorage.setItem("theme", theme);

  const handleThemeToggleClick = () => {
    const element = document.documentElement;
    element.classList.toggle("dark");
    sun.classList.toggle("hidden");
    moon.classList.toggle("hidden");

    const isDark = element.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  document
    .getElementById("theme-toggle")
    .addEventListener("click", handleThemeToggleClick);
    /** END THEME TOGGLE */

    /** START SIDEBAR TOGGLE */
  const handleSidebarToggleClick = () => {
    const el = document.body;
    el.classList.toggle("closed");
  }

  document.getElementById("sidebar-toggle")
  .addEventListener("click", handleSidebarToggleClick);

    /** END SIDEBAR TOGGLE */

    /** START FONT SIZE CONTROL */

    let fontSize = (() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("fontSize")) {
      return Number(localStorage.getItem("fontSize"));
    }
    return 16;
  })();

    document.documentElement.style.fontSize = `${fontSize}px`;
    document.querySelector("#theme-toggle svg").style.width = `${fontSize}px`;

    const handleFontSizeClick = (e) => {
        const dir = e.target.getAttribute("data-dir");
        fontSize += dir == "1" ? 1 : -1;
        localStorage.setItem("fontSize", fontSize);
        document.documentElement.style.fontSize = `${fontSize}px`;
        document.querySelector("#theme-toggle svg").style.width = `${fontSize}px`;
    }

    document.querySelectorAll("[data-font-size]")
    .forEach(btn => btn.addEventListener("click", handleFontSizeClick));

    /** END FONT SIZE CONTROL */ 


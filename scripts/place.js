document.addEventListener("DOMContentLoaded", () => {
    const currentYear = new Date().getFullYear();
    const lastModified = new Date(document.lastModified).toLocaleString();

    document.getElementById("current-year").textContent = currentYear;
    document.getElementById("last-modified").textContent = lastModified;
});

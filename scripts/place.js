document.addEventListener("DOMContentLoaded", () => {
    const currentYear = new Date().getFullYear();
    const lastModified = new Date(document.lastModified).toLocaleString();

    document.getElementById("current-year").textContent = currentYear;
    document.getElementById("last-modified").textContent = lastModified;

    const temperature = 10;
    const windSpeed = 6;

    const calculateWindChill = (temp, speed) => (13.12 + 0.6215 * temp - 11.37 * speed ** 0.16 + 0.3965 * temp * speed ** 0.16).toFixed(1);

    const windChillElement = document.querySelector(".weather dl .row:last-child dd");
    if (temperature <= 10 && windSpeed > 4.8) {
        windChillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
    } else {
        windChillElement.textContent = "N/A";
    }
});

import pageElements from "./pageElements.js";


export function showGlobalLoader() {
    const loader = document.getElementById(pageElements.globalLoader);
    loader.style.display = ""; 
}

export function hideGlobalLoader() {
    const loader = document.getElementById(pageElements.globalLoader);
    loader.style.display = "none"; 
}

export function clearCatalog() {
    var catalog = document.getElementById(pageElements.catalog);
    catalog.innerHTML = "";
}
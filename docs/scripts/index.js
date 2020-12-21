import { locationHashChanged, showHomePageAsync } from "./router.js" 

window.onload = async () => {
    window.onhashchange = locationHashChanged;

    await showHomePageAsync();
}
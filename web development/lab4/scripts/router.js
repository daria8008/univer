import { loadAndShowSliderAsync } from "./slider.js";
import { loadAndShowGridAsync, loadAndShowGridTopAsync } from "./grid.js";
import pageElements from "./pageElements.js";
import {
    clearCatalog,
    showGlobalLoader,
    hideGlobalLoader
} from "./pageManagement.js";

export function locationHashChanged() {
    clearCatalog();

    switch (location.hash) {
        case pageSections.menu:
            showMenuPageAsync();
            return;
        case pageSections.sets:
            showSetsPageAsync();
            return;
        case pageSections.rolls:
            showRollsPageAsync();
            return;
        default: 
            showHomePageAsync();
            return;
    }
}

export async function showHomePageAsync() {
    showGlobalLoader();

    await loadAndShowSliderAsync();
    await loadAndShowGridTopAsync(pageElements.rollsTopGrid);
    await loadAndShowGridTopAsync(pageElements.setsTopGrid);

    hideGlobalLoader();
}

export async function showMenuPageAsync() {
    showGlobalLoader();

    await loadAndShowGridAsync(pageElements.setsGrid);
    await loadAndShowGridAsync(pageElements.rollsGrid);

    hideGlobalLoader();
}

export async function showSetsPageAsync() {
    showGlobalLoader();

    await loadAndShowGridAsync(pageElements.setsGrid);

    hideGlobalLoader();
}

export async function showRollsPageAsync() {
    showGlobalLoader();
    
    await loadAndShowGridAsync(pageElements.rollsGrid);

    hideGlobalLoader();
}

const pageSections = {
    menu: "#menu",
    sets: "#sets",
    rolls: "#rolls",
    discount: "#discounts",
    bin: "#bin"
}

import pageElements from "./pageElements.js";
import texts from "./texts.js";
import { ajax } from "./api.js";

function createGridItem(gridName, gridItemDataPath, itemProps) {
    const image = document.createElement("img");
    image.className = "item";
    image.src = `images/${gridItemDataPath}-${itemProps.id}.jpg`;

    const header = document.createElement("h3");
    header.innerText = itemProps.header;

    const caption = document.createElement("span");
    caption.innerText = itemProps.caption;

    const price = document.createElement("h4");
    price.innerText = itemProps.price;

    const button = document.createElement("button");
    button.className = "button";
    button.innerText = texts.addToBin;

    const gridItemWrapper = document.createElement("div");
    gridItemWrapper.className = "grid-item";
    gridItemWrapper.appendChild(image);
    gridItemWrapper.appendChild(header);
    gridItemWrapper.appendChild(caption);
    gridItemWrapper.appendChild(price);
    gridItemWrapper.appendChild(button);

    var table = document.getElementById(gridName);
    table.appendChild(gridItemWrapper);
}

function createGrid(gridName, headerName) {
    const header = document.createElement("h2");
    header.innerHTML = headerName;

    const grid = document.createElement("div");
    grid.id = gridName;
    grid.className = "grid-box head";

    var catalog = document.getElementById(pageElements.catalog);
    catalog.appendChild(header);
    catalog.appendChild(grid);
}

function getGridHeader(gridName) {
    switch (gridName) {
        case pageElements.setsGrid: 
            return texts.setsHeader;
        case pageElements.setsTopGrid: 
            return texts.setsTopHeader;
        case pageElements.rollsGrid: 
            return texts.rollsHeader;
        case pageElements.rollsTopGrid: 
            return texts.rollsTopHeader;
        default:
            return "";
    }
}

export async function loadAndShowGridTopAsync(gridName) {
    const topItemsCount = 3;
    await loadAndShowGridAsync(gridName, 
        (a, b) => ((a.purchasesCount > b.purchasesCount) 
            ? -1 
            : ((a.purchasesCount < b.purchasesCount) ? 1 : 0)), 
        topItemsCount);
}

export async function loadAndShowGridAsync(gridName, sortFunc, maxItemsToShow) {
    // load grid data
    const itemDataPath = getDataPathByGridName(gridName);
    let gridItems = await ajax(itemDataPath);

    // prepare grid data
    if (sortFunc) { 
        gridItems.sort(sortFunc);
    }
    if (maxItemsToShow) {
        gridItems = gridItems.slice(0, maxItemsToShow);
    }

    // create grid with header
    createGrid(gridName, getGridHeader(gridName));
    
    gridItems.forEach(gridItem => {
        const gridItemData = {
            id: gridItem.id,
            header: gridItem.name,
            caption: gridItem.content,
            price: gridItem.price
        };
        createGridItem(gridName, itemDataPath, gridItemData);
    });
}

function getDataPathByGridName(gridName) {
    switch (gridName) {
        case pageElements.setsGrid:
        case pageElements.setsTopGrid:
            return "sets";
        case pageElements.rollsGrid:
        case pageElements.rollsTopGrid:
            return "rolls";
    }
}

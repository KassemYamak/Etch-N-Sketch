//set global variables

let gridMin = 16;
let gridMax = 50;
let modes = ["black", "grey", "rainbow"];
let currentMode = modes[0];
let currentSize = document.querySelectorAll("#grid > div").length

//adjust grid size by comparing current number of items in the grid to the number of the new setting.
function makeGrid(){
    let grid = document.querySelector("#grid");
    let newSize = Number(document.querySelector("#grid-size").value);
    let newSizeSquared = newSize*newSize
//if the new grid is bigger than what is currently displayed, add grid items up to the difference.
    if (currentSize < newSizeSquared) {
        for (let i = (currentSize); i<newSizeSquared; i++){
            let gridItem = document.createElement("div");
            gridItem.setAttribute("class", "grid-item");
            gridItem.setAttribute("data-color", "0,0,0");
            gridItem.setAttribute("data-opacity","0");
            gridItem.setAttribute("data-mode", modes[0]);
            grid.appendChild(gridItem);
        };
//if new grid is smaller than what is currently displayed, remove grid items up to the difference.
    } else if (currentSize > newSizeSquared) {
        for (let i = (currentSize); i>newSizeSquared; i--){
            document.querySelector("#grid > div").remove();
        };
    };
//update currentSize for future use, make grid display current number of items per column.
    currentSize = document.querySelectorAll("#grid > div").length;
    let gridColumnTemplate = ""
    for (let i = 0; i<newSize; i++){
        gridColumnTemplate = gridColumnTemplate + "auto ";
    }
    grid.setAttribute("style", "grid-template-columns: " + gridColumnTemplate);
    clearGrid();
    document.querySelectorAll("#grid > div").forEach(element =>{
        element.addEventListener(
        "mouseover", (e)=>{
            setColorChangeEvent(element)
        }
        )
    })
};

// using data attributes to loop through each grid item setting it to color white.
function clearGrid() {
    let gridNodeList = document.querySelectorAll(".grid-item");
    gridNodeList.forEach(element => {
        element.setAttribute("data-opacity", "1");
        element.setAttribute("data-color", "255,255,255");
        updateGridColor(element)        
    });

};

//sets background colors based on data attributes assigend to the div.
function updateGridColor(item) {
    item.setAttribute (
        "style", 
        "background-color: rgba(" + 
        item.getAttribute("data-color") +
        "," +
        item.getAttribute("data-opacity")
        +")"
    );
};

let gridSize = document.querySelector("#grid-size");
function setGridSizeOptions(min, max){
    for (let i = gridMin; i<=gridMax; i++){
        let option = document.createElement("option")
        option.setAttribute("value", i);
        option.innerHTML = `${i}`
        gridSize.appendChild(option);
    }
}
//sets the setting based on the global variables declared 
setGridSizeOptions(gridMin, gridMax);

makeGrid();

gridSize.addEventListener("change", e=>{makeGrid(e)});

function setColorMode(index) {
    currentMode = modes[index];
}

//add event listeners to buttons to set the current mode
document
    .querySelector("#black-and-white")
    .addEventListener(
        "click",
        (e)=>{
            setColorMode(0);
        }
    );

document
    .querySelector("#greyscale")
    .addEventListener(
        "click",
        (e)=>{
            setColorMode(1)
        }
    );

document
    .querySelector("#rainbow")
    .addEventListener(
        "click",
        (e)=>{
            setColorMode(2)
        }
    );

//functions for changing the color of the grids
function setBlackColor(element) {
    element.setAttribute("data-color", "0,0,0");
    element.setAttribute("data-opacity", "1");
    element.setAttribute("data-mode", currentMode);
};


function setGreyColor(element){
    if (element.getAttribute("data-color") == "0,0,0"){
        console.log(Number(element.getAttribute("data-opacity"))+ .1)
        element.setAttribute("data-opacity", 
        (Number(element.getAttribute("data-opacity")) + .1))
    } else {
        element.setAttribute("data-color", "0,0,0");
        element.setAttribute("data-opacity", .1);
    }
    element.setAttribute("data-mode", modes[1]);
};

function setRainbowColor(element) {
    let rainbowColor = (
        Math.floor(Math.random()*255)
        + ", " +
        Math.floor(Math.random()*255)
        + ", " +
        Math.floor(Math.random()*255)
        );
    
    element.setAttribute("data-color", rainbowColor);
    element.setAttribute("data-opacity", Math.random());
    element.setAttribute("data-mode", currentMode);
};


function setColorChangeEvent(element){
    if (currentMode == modes[0]){
        setBlackColor(element)
    } else if (currentMode == modes[1]){
        setGreyColor(element);
    } else if (currentMode == modes[2]){
        setRainbowColor(element);
    };
    updateGridColor(element);
};
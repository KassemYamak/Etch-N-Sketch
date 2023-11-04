let gridMin = 16;
let gridMax = 50;

let currentSize=0


    currentSize = document.querySelectorAll("#grid > div").length


function makeGrid(){
    let grid = document.querySelector("#grid");
    let newSize = Number(document.querySelector("#grid-size").value);
    let newSizeSquared = newSize*newSize
    let iteration = 0
    if (currentSize < newSizeSquared) {
        for (let i = (currentSize); i<newSizeSquared; i++){
            iteration++
            let gridItem = document.createElement("div");
            gridItem.setAttribute("class", "grid-item");
            gridItem.setAttribute("data-color", "0,0,0");
            gridItem.setAttribute("data-opacity","0");
            gridItem.setAttribute("data-current-mode", "black");
            grid.appendChild(gridItem);
        };
    } else if (currentSize > newSizeSquared) {
        for (let i = (currentSize); i>newSizeSquared; i--){
            iteration--
            document.querySelector("#grid > div").remove();
        };
    };
    currentSize = document.querySelectorAll("#grid > div").length;
    console.log(currentSize)
    console.log("iterations " + iteration)
    console.log(document.querySelectorAll("#grid > div").length + `\n` + (newSize*newSize))
    let gridColumnTemplate = ""
    for (let i = 0; i<newSize; i++){
        gridColumnTemplate = gridColumnTemplate + "auto ";
    }
    grid.setAttribute("style", "grid-template-columns: " + gridColumnTemplate);
    clearGrid();
};


function clearGrid() {
    let gridNodeList = document.querySelectorAll(".grid-item");
    gridNodeList.forEach(element => {
        element.setAttribute("data-opacity", "100");
        element.setAttribute("data-color", "255,255,255");
        updateGridColor(element)        
    });

};

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

setGridSizeOptions(gridMin, gridMax);

makeGrid();

gridSize.addEventListener("change", e=>{makeGrid(e)});

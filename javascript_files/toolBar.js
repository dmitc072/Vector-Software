let radius; // Variable to store circle radius
let cx, cy; // Variables to store circle and ellipse centers
let rx, ry; // Variables to store ellipse radii
let width;
let height;
let x;
let y;
let x1;
let y1;
let x2;
let y2;
let absWidth;
let absHeight;
let startX, startY;
let isHoldingLeftClick = false;
let isDrawing = false;
let isJustCreated = false;
let selectionIcon = document.querySelector('#selectionIcon');
let adjustShapeIcon = document.querySelector('#adjustShapeIcon');
let lineIcon= document.querySelector('#lineIcon');
let rectangleIcon = document.querySelector('#rectangleIcon');
let circleIcon= document.querySelector('#circleIcon');
let historyList = document.querySelector('#history');
let historyDialogBox = document.querySelector("#history-box");
let shapeStatus = document.querySelector('#customPrompt')
let shapeStatusOverall = document.querySelector('#prompt')
let colorWheelContainer = document.querySelector('#container') //for colorWheel, i added it in HTML
const inputWidth = document.querySelector('#changeWidth'); //from customPrompt
const inputHeight = document.querySelector('#changeHeight'); //from customPrompt
const inputRadiusOrWidth = document.querySelector('#changeRadiusOrWidth'); //from customPrompt
const radiusOrWidthLabel = document.querySelector('#changeRadiusOrWidthLabel'); //from customPrompt
const firstShapeChange = document.querySelector('#firstShapeChange');
const secondShapeChange = document.querySelector('#secondShapeChange');
//const svg = document.querySelector('#design');
const svg = document.querySelector('#drawing');

let strokeColor = document.querySelector('#stroke');
let fillColor = document.querySelector('#fill');//call the color first
let createChangeButton = document.querySelector('#createChangeButton');
const arrangementDropdown = document.getElementById("arrangement");
let shapes = [];
// Use getComputedStyle to get the computed styles
/*The style property in JavaScript refers to the inline styles applied directly to 
an HTML element using the style attribute. However, in your case, it seems like 
the stroke and fill properties are set using CSS rules and not directly through inline styles. */
let stroke = strokeColor.style.stroke; //this calls the stroke from the CSS. getComputedStyle(strokeColor).stroke;
let fill = fillColor.style.fill;
let strokeWidth = 6; //this calls the stroke width
let toolbar = document.getElementById("toolBar");
let currentSelectedIcon="null";
let isToolbarMoving = false;
//let movingObjects = [historyList, shapes, toolbar, changeSize, promptToChangeSize];
let isSelectionIconSelected = false;
let isAdjustingShapeIconSelected = false;
let totalOffsetX = 0;
let totalOffsetY = 0;
let transformValues;
let transformObjectX;
let transformObjectY;
let isButtonClicked = false;
const canvasContainer = document.querySelector('.canvas-container'); //from colorWheel.js
// Select the <input> element within the .canvas-container
let inputElement = canvasContainer.querySelector('input'); //this is being called from the color selector
let changeStroke = document.querySelector('#changeStroke');
let changeStrokeSize = document.querySelector('#changeStrokeSize');
let changeFill = document.querySelector('#changeFill');
let isSelectingColor = false;
let isRendering = false;
let isAdjustingShape = false;
// Add a flag to track whether a shape is being interacted with
let isInteractingWithShape = false;
let isChangingColor = false;
let previousClickedForStroke= "null";
let previousClickedForFill= "null";
let previousClickedShapeId = "null";
let currentSelectedShape ="null"
// lineLength = Math.sqrt(Math.abs(shapeData.y2 - shapeData.y1) + Math.abs(shapeData.x2 - shapeData.x1)) //a^2+b^2 = c^2 or a = |y2-y1| ; b = |x2-x1|

const mousePosText = document.getElementById('mouse-pos');
let mousePos = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
  mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
});

//update the dimensions dialog / Resize dialogbox
document.addEventListener('click', () => {
    shapes.forEach((shapeData) => {
        if (event.target.id === shapeData.id) {
            const previousShapeElement = document.getElementById(shapeData.id); //call shapeData this way from getElementById gets all documents of shapeData to make changes
            if(shapeData.type === "line") {
                radiusOrWidthLabel.textContent = "Enter the new length for this line:"
                changeWidth.value = "";
                changeHeight.value = "";
                inputWidth.setAttribute("disabled", true);
                inputHeight.setAttribute("disabled", true);
                changeRadiusOrWidth.setAttribute("disabled", false);
                changeRadiusOrWidth.value = Math.abs(shapeData.y2 - shapeData.y1) + Math.abs(shapeData.x2 - shapeData.x1);
            } if (shapeData.type === "rect") {
                changeWidth.value = Math.abs(shapeData.width);
                changeHeight.value = Math.abs(shapeData.height);
                inputWidth.removeAttribute("disabled");
                inputHeight.removeAttribute("disabled");
                changeRadiusOrWidth.setAttribute("disabled", true);
                changeRadiusOrWidth.value = "";
            } if (shapeData.type === "ellipse") {
                changeWidth.value = Math.abs(shapeData.rx);
                changeHeight.value = Math.abs(shapeData.ry);
                inputWidth.removeAttribute("disabled", false);
                inputHeight.removeAttribute("disabled", false);
                changeRadiusOrWidth.setAttribute("disabled", false);
                changeRadiusOrWidth.value = "";
            } if (shapeData.type === "circle") {
                radiusOrWidthLabel.textContent = "Enter the new radius for this circle:"
                changeWidth.value = "";
                changeHeight.value = "";
                inputWidth.setAttribute("disabled", true);
                inputHeight.setAttribute("disabled", true);
                changeRadiusOrWidth.removeAttribute("disabled", false);
                changeRadiusOrWidth.value = shapeData.r; 
            } 
            changeFill.value = shapeData.fill;
            changeStroke.value = shapeData.stroke; 
            changeStrokeSize.value = previousShapeElement.getAttribute("stroke-width");
        }
    }); 
})


//before/after change shape
// Step 1: Activate the firstShapeChange button
firstShapeChange.addEventListener('click', () => {
    firstShapeChange.classList.add('active'); // Add a CSS class to indicate activation; this can be called anything
});

// Step 2: Listen for shape selection
svg.addEventListener('click', handleShapeSelectionBefore);

function handleShapeSelectionBefore(event) {
    if (firstShapeChange.classList.contains('active')) {
        const selectedShapeId = event.target.id;
        if (selectedShapeId !== "drawing") {
            firstShapeChange.value = selectedShapeId;
            firstShapeChange.classList.remove('active'); // Deactivate the button after selection
        }
    }
}


// Step 1: Activate the secondShapeChange button
secondShapeChange.addEventListener('click', () => {
    secondShapeChange.classList.add('active'); // Add a CSS class to indicate activation
});

// Step 2: Listen for shape selection
svg.addEventListener('click', handleShapeSelectionAfter);

function handleShapeSelectionAfter(event) {
    if (secondShapeChange.classList.contains('active')) {
        const selectedShapeId = event.target.id;
        if (selectedShapeId !== "drawing") {
            secondShapeChange.value = selectedShapeId;
            secondShapeChange.classList.remove('active'); // Deactivate the button after selection
        }
    }
}


arrangementDropdown.addEventListener("change", function () {
    const selectedValue = arrangementDropdown.value;
    const svgChange = document.getElementById('drawing');
    

    shapes.forEach((shapeData) => {
        const shapeElement = document.getElementById(shapeData.id);
        let firstShapeChangeIndex = shapes.findIndex(shape => shape.id === firstShapeChange.value); 
        //couldn't arrange, unless I used the array shapes[], because couldn't change with svg. had to use renderShape to reorganize the array
        let secondShapeChangeIndex =  shapes.findIndex(shape => shape.id === secondShapeChange.value);
        let removeShape;

        switch (selectedValue) {
            case "front":
                firstShapeChangeIndex = shapes.findIndex(shape => shape.id === firstShapeChange.value); //ex rect1[0]
                removeShape = shapes.splice(firstShapeChangeIndex,1); 
                shapes.push(removeShape [0]);
                renderShapes();
                break;
            case "back":
                firstShapeChangeIndex = shapes.findIndex(shape => shape.id === firstShapeChange.value); //ex rect1[0]
                removeShape = shapes.splice(firstShapeChangeIndex,1); 
                shapes.unshift(removeShape [0]);
                renderShapes();
                break;
            case "before":  
            firstShapeChangeIndex = shapes.findIndex(shape => shape.id === firstShapeChange.value); //ex rect1[0]
            secondShapeChangeIndex =  shapes.findIndex(shape => shape.id === secondShapeChange.value);  //ex rect3[2]
            removeShape = shapes.splice(secondShapeChangeIndex,1); 
            shapes.splice(firstShapeChangeIndex,0,removeShape [0]);
            renderShapes();
            console.log(shapes);
                break;
            case "after":
                console.log(shapes); //ex rect1[0], rect2[1], rect3[2], rect4[3]
                firstShapeChangeIndex = shapes.findIndex(shape => shape.id === firstShapeChange.value); //ex rect1[0]
                secondShapeChangeIndex =  shapes.findIndex(shape => shape.id === secondShapeChange.value);  //ex rect3[2]
                console.log("firstShapeChange.value is " + firstShapeChange.value + " and the index is " + firstShapeChangeIndex);  
                console.log("secondShapeChange.value is " + secondShapeChange.value + " and the index is " + secondShapeChangeIndex);
                removeShape = shapes.splice(firstShapeChangeIndex,1); // remove rect1[0] and only one item
                shapes.splice(secondShapeChangeIndex,0,removeShape [0])   //it calls to remove rect3[2], but 0 makes it so it stays. removeShape[0] is the stored rect1[1], which is added back at the end, which is the top
                console.log("the new firstShapeChange.value is " + firstShapeChange.value + " and the index is " + firstShapeChangeIndex);  
                console.log("the new secondShapeChange.value is " + secondShapeChange.value + " and the index is " + secondShapeChangeIndex);
                renderShapes();
                console.log(shapes);
                break;
            default:
                break;
        }
    // Update the dropdown to display the selected label
    arrangementDropdown.value = "Choose your arrangement:";
    firstShapeChange.value = "";
    secondShapeChange.value = "";
    });
});


//createbutton to change dimensions,etc.
createChangeButton.addEventListener('click', (event) => {
    shapes.forEach((shapeData) => {
       // currentSelectedShape.id = shapeData.id
        if (currentSelectedShape.id === shapeData.id) {
                const previousShapeElement = document.getElementById(currentSelectedShape.id); 
                if(shapeData.type === "rect") {
                    inputWidth.removeAttribute("disabled");
                    inputHeight.removeAttribute("disabled");    
                    previousShapeElement.setAttribute("width", changeWidth.value);//setAttribute changes the attribute in HTML, but using "=" stores it. You need both
                    shapeData.width = changeWidth.value; //since I am actually changing shapeData, I need to include this
                    previousShapeElement.setAttribute("height", changeHeight.value)
                    shapeData.height = changeHeight.value;
                } if(shapeData.type === "ellipse") {
                    inputWidth.removeAttribute("disabled");
                    inputHeight.removeAttribute("disabled");    
                    previousShapeElement.setAttribute("rx", changeWidth.value);//setAttribute changes the attribute in HTML, but using "=" stores it. You need both
                    shapeData.rx = changeWidth.value; //since I am actually changing shapeData, I need to include this
                    previousShapeElement.setAttribute("ry", changeHeight.value)
                    shapeData.ry = changeHeight.value;
                } if (shapeData.type === "circle") {
                    inputRadiusOrWidth.removeAttribute("disabled");
                    previousShapeElement.setAttribute("r", changeRadiusOrWidth.value)
                    shapeData.r = changeRadiusOrWidth.value;
                }
                previousShapeElement.setAttribute("stroke", changeStroke.value);// this is the right way to store the stroke in html but goes away. Not with style attribute, it works but doesn't change in HTML
                shapeData.stroke = changeStroke.value;
                previousShapeElement.setAttribute("stroke-width", changeStrokeSize.value);//"stroke-width" named correctly, I need to figure how to call the value which is a number
                const STROKE_WIDTH_PROPERTY = "stroke-width"; 
                shapeData[STROKE_WIDTH_PROPERTY] = changeStrokeSize.value; //creating a variable to a string, you can substitute the naming of the style like this
               // previousShapeElement.setAttribute("style", "fill:" + changeFill.value); this doesn't work right
                previousShapeElement.setAttribute("fill", changeFill.value);// this is the right way to store the fill in html but gpes away. Not with style attribute, it works but doesn't change in HTML
                shapeData.fill = changeFill.value;
        }
    }); 
});

// Define a function to handle icon selection and drawing setup
    function selectIconAndSetupDrawing(iconElement) {
        // Remove the "selected" class from all icons
        const allIcons = [selectionIcon, adjustShapeIcon, lineIcon, circleIcon, rectangleIcon];//need to add icons to select
        allIcons.forEach(icon => icon.classList.remove("selected"));
        // Select current icon
        currentSelectedIcon = iconElement;
        iconElement.classList.add("selected");
        // Disable drawing functionality for all icons
        removeDrawingListeners();
        
       
       renderShapes();
     
        console.log('Input value:', inputElement.value);
        // Get the ID of the selected icon
        const selectedIconId = iconElement.id; //how the switch starts

        // Use a switch statement to select the appropriate drawing setup function
        switch (selectedIconId) {
            case 'selectionIcon':
                isSelectionIconSelected = true;
                moveShapes();
                break;
            case 'adjustShapeIcon':
                isAdjustingShapeIconSelected = true;
                adjustShapes();
                break; 
            case 'lineIcon':
                islineIconSelected = true;
                setupDrawingLine();
                break;
            case 'rectangleIcon':
                isRectIconSelected = true;
                setupDrawingRect();
                break;
            case 'circleIcon':
                isCircleIconSelected = true;
                setupDrawingCircle();
                break;

            // Add more cases for other icons
            default:
                break;
        }
    }

// Add click event listeners for each icon
adjustShapeIcon.addEventListener("click", function() {
    selectIconAndSetupDrawing(adjustShapeIcon);
    svg.removeEventListener("mousedown", moveShape);
    svg.addEventListener("mousedown", adjustShape);
    console.log("adjustShape icon selected:", isSelectionIconSelected);
});

selectionIcon.addEventListener("click", function() {
    selectIconAndSetupDrawing(selectionIcon);
    svg.removeEventListener("mousedown", adjustShape);
    svg.addEventListener("mousedown", moveShape);
    console.log("selection icon selected:", isAdjustingShapeIconSelected);
});

lineIcon.addEventListener("click", function() {
    selectIconAndSetupDrawing(lineIcon);
    console.log("Line icon selected:", isLineIconSelected);
});

rectangleIcon.addEventListener("click", function() {
    selectIconAndSetupDrawing(rectangleIcon);
    console.log("Rectangle icon selected:", isRectIconSelected);
});

circleIcon.addEventListener("click", function() {
    selectIconAndSetupDrawing(circleIcon);
    console.log("Circle icon selected:", isCircleIconSelected);
});

// Define the moveObjects function for individual objects
function moveObjects(object, event) {
    let isObjectMoving = false;
    const initialPositionX = event.clientX - object.offsetLeft;
    const initialPositionY = event.clientY - object.offsetTop;
    const initialPositionXForPrompt = event.clientX - object.offsetParent.offsetLeft; //needs to be outside the if function about prompt, or it move quickly
    const initialPositionYForPrompt = event.clientY - object.offsetParent.offsetTop; //needs to be outside the if function about prompt, or it move quickly
    
    if (event.target.id !== "selectionIcon" && event.target.nodeName === object.nodeName) {
        isObjectMoving = true;
        const onMouseMove = (mousemoveEvent) => {
            if (isObjectMoving) {
                // Set the new position of the object
                const currentMouseX = mousemoveEvent.clientX;
                const currentMouseY = mousemoveEvent.clientY;

                const offsetX = currentMouseX - initialPositionX;
                const offsetY = currentMouseY - initialPositionY;
                object.style.left = offsetX + "px";
                object.style.top = offsetY + "px";  
            }
            if (isObjectMoving && object.offsetParent.className === "prompt") {//because of customprompt has to forms, I was able to call the parent this way

                const currentMouseX = mousemoveEvent.clientX; //continous movememt for calcuation
                const currentMouseY = mousemoveEvent.clientY; //continous movememt for calcuation

                const offsetX = currentMouseX - initialPositionXForPrompt;
                const offsetY = currentMouseY - initialPositionYForPrompt;
                object.offsetParent.style.left = offsetX + "px";
                object.offsetParent.style.top = offsetY + "px";  
            }
        };
    
        const onMouseUp = () => {
            isObjectMoving = false;
            // Remove the event listeners after mouseup
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        // Add event listeners for mousemove and mouseup
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
}

function moveShape(event) {
    // Set the flag to true when starting to move a shape
    isInteractingWithShape = true;

    // Set initial mouse positions outside the event listener
    let initialMouseX;
    let initialMouseY;
    let initialMouseX1;
    let initialMouseY1;
    let initialMouseX2;
    let initialMouseY2;

    shapes.forEach((shapeData) => {
        if (event.target.id === shapeData.id) {
            event.target.setAttribute("stroke-dasharray", "5,5"); //help identify which shape is selected
            currentSelectedShape = shapeData;

            let isObjectMoving = true;

            // Update initialMouseX and initialMouseY based on the shape type
            //This determines how to position the cursor will be when it moves
            if (event.target.tagName === "line") {
                initialMouseX1 = event.clientX - shapeData.x1;
                initialMouseY1 = event.clientY - shapeData.y1;
                initialMouseX2 = event.clientX - shapeData.x2;
                initialMouseY2 = event.clientY - shapeData.y2;
            } if (event.target.tagName === "rect") {
                initialMouseX = event.clientX - shapeData.x;
                initialMouseY = event.clientY - shapeData.y;
            } else if (event.target.tagName === "ellipse" || event.target.tagName === "circle") {
                initialMouseX = event.clientX - shapeData.cx;
                initialMouseY = event.clientY - shapeData.cy;
            }

            const onMouseMove = (mousemoveEvent) => {
                if (isObjectMoving && event.target.id !== 'design') {
                    // Calculate the difference between the current and initial mouse positions
                    const currentMouseX = mousemoveEvent.clientX;
                    const currentMouseY = mousemoveEvent.clientY;
            
                    const offsetX = currentMouseX - initialMouseX;
                    const offsetY = currentMouseY - initialMouseY;

                    // Update the shape's position using the offset
                    if (event.target.tagName === "line") {
                        const offsetX1 = currentMouseX - initialMouseX1;
                        const offsetY1 = currentMouseY - initialMouseY1;
                        const offsetX2 = currentMouseX - initialMouseX2;
                        const offsetY2 = currentMouseY - initialMouseY2;
                        shapeData.x1 = offsetX1;
                        shapeData.y1 = offsetY1;
                        shapeData.x2 = offsetX2;
                        shapeData.y2 = offsetY2;
                        // Update the attributes of the shape element
                        event.target.setAttribute('x1', shapeData.x1);
                        event.target.setAttribute('y1', shapeData.y1);
                        event.target.setAttribute('x2', shapeData.x2);
                        event.target.setAttribute('y2', shapeData.y2);
                    } if (event.target.tagName === "rect") {
                        shapeData.x = offsetX;
                        shapeData.y = offsetY;
                        // Update the attributes of the shape element
                        event.target.setAttribute('x', shapeData.x);
                        event.target.setAttribute('y', shapeData.y);
                    } else if (event.target.tagName === "ellipse" || event.target.tagName === "circle") {
                        shapeData.cx = offsetX;
                        shapeData.cy = offsetY;
                        // Update the attributes of the shape element
                        event.target.setAttribute('cx', shapeData.cx);
                        event.target.setAttribute('cy', shapeData.cy);
                    }
                }
            };

            const onMouseUp = () => {
                isInteractingWithShape = false;
                // Cleanup event listeners
                document.removeEventListener('mousemove', onMouseMove);
                event.target.removeAttribute("stroke-dasharray", "5,5"); //remove the identification
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    });
}


function adjustShape(event) {
    shapes.forEach((shapeData) => {
        if (event.target.id === shapeData.id) {
            event.target.setAttribute("stroke-dasharray", "5,5"); //help identify which shape is selected
            console.log("adjusting shape");
            currentSelectedShape = shapeData;

            isAdjustingShape = true;
            let initialMouseX;
            let initialMouseY;
            let initialShapeX = shapeData.rx; // Store the initial rx value
            let initialShapeY = shapeData.ry; // Store the initial ry value
            let initialShapeX1;
            let initialShapeY1;
            let initialShapeX2;
            let initialShapeY2;
               // Also store the initial dimensions of the rectangle shape
               let initialShapeWidth;
               let initialShapeHeight;

                if (event.target.tagName === 'rect') {
                    initialShapeWidth = parseFloat(event.target.getAttribute('width'));
                    initialShapeHeight = parseFloat(event.target.getAttribute('height'));
                    initialShapeX = parseFloat(event.target.getAttribute('x'));
                    initialShapeY = parseFloat(event.target.getAttribute('y')); //retrieving shapeData.y
                }
         
                if (event.target.tagName === 'line') {
                    initialShapeX1 = parseFloat(event.target.getAttribute('x1'));
                    initialShapeY1 = parseFloat(event.target.getAttribute('y1'));   
                    initialShapeX2 = parseFloat(event.target.getAttribute('x2'));
                    initialShapeY2 = parseFloat(event.target.getAttribute('y2'));   
                }
            // Update initialMouseX and initialMouseY on mousedown event
            document.addEventListener('mousedown', (mousedownEvent) => {
                initialMouseX = mousedownEvent.clientX; // Update with the current cursor position
                initialMouseY = mousedownEvent.clientY; // Update with the current cursor position
            });

            const onMouseMove = (mousemoveEvent) => {
                if (isAdjustingShape && event.target.id !== 'design') {
                    const currentMouseX = mousemoveEvent.clientX;
                    const currentMouseY = mousemoveEvent.clientY;
            
                    const offsetX = currentMouseX - initialMouseX;
                    const offsetY = currentMouseY - initialMouseY;

                    if (event.target.tagName === 'circle' || event.target.tagName === 'ellipse') {
                        shapeData.rx = initialShapeX + offsetX;
                        shapeData.ry = initialShapeY + offsetY;
                        event.target.setAttribute('rx', Math.abs(shapeData.rx));
                        event.target.setAttribute('ry', Math.abs(shapeData.ry));
                        changeWidth.value = Math.abs(shapeData.rx); //only does auto adjust when moving shape.
                        changeHeight.value = Math.abs(shapeData.ry);
                    }

                    if (event.target.tagName === 'rect') {

                        //if x and y is less than original position, make changes to x and y position
                        const width = initialShapeWidth + offsetX;// initialShapeWidth + difference of where you start and clicked your mouse position
                        const height = initialShapeHeight + offsetY;
                        const x = width < 0 ? initialShapeX + width:initialShapeX; //if width is negative, use shape origin original position amd add the width, else you the rect position
                        const y = height < 0 ? initialShapeY + height:initialShapeY;
                      
                        shapeData.x = x;
                        shapeData.y = y;
                        shapeData.width =  Math.abs(width); 
                        shapeData.height = Math.abs(height)
            
                        event.target.setAttribute('x', x);
                        event.target.setAttribute('y', y);
                        event.target.setAttribute('width', Math.abs(width)); //after the adjustments on x and y position width has to be positive
                        event.target.setAttribute('height', Math.abs(height));
            
                        changeWidth.value = Math.abs(width);
                        changeHeight.value = Math.abs(height);
                    }

                    if (event.target.tagName === 'line') {
                        if (event.clientX >= initialShapeX1 - 20 && event.clientX <= initialShapeX1 + 20) {
                            const x1 = initialShapeX1 + offsetX;
                            const y1 = initialShapeY1 + offsetY;
                        shapeData.x1 = x1;
                        shapeData.y1 = y1;

                        event.target.setAttribute("x1", x1);
                        event.target.setAttribute("y1", y1);
                        }

                        if (event.clientX >= initialShapeX2 - 20 && event.clientX <= initialShapeX2 + 20) {
                            const x2 = initialShapeX2 + offsetX;
                            const y2 = initialShapeY2 + offsetY;
                        shapeData.x2 = x2;
                        shapeData.y2 = y2;

                        event.target.setAttribute("x2", x2);
                        event.target.setAttribute("y2", y2);
                        }
                    }
                }
            };

            const onMouseUp = () => {
                isAdjustingShape = false;
                // Cleanup event listeners
                document.removeEventListener('mousemove', onMouseMove);
                event.target.removeAttribute("stroke-dasharray", "5,5"); //remove the identification
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    });
}

//eventListeners to move objects
function adjustShapes(event) {
svg.addEventListener('mousedown', adjustShape);
  
}

toolbar.addEventListener("mousedown", (event) => {
    moveObjects(toolbar, event);
});

historyDialogBox.addEventListener("mousedown", (event) => {
    moveObjects(historyDialogBox, event);
});

shapeStatusOverall.addEventListener("mousedown", (event) => {
    moveObjects(shapeStatusOverall, event);
});

shapeStatus.addEventListener("mousedown", (event) => {
    moveObjects(shapeStatus, event);
});

colorWheelContainer.addEventListener("mousedown", (event) => {
    moveObjects(colorWheelContainer, event);
});

function moveShapes(event) {
    if (!isInteractingWithShape) {
        
        svg.addEventListener("mousedown", moveShape); 
        // Select the fill button element by its ID


    }
}

function renderHistory() { //located in mouseup function in each shape file
    historyList.innerHTML = ''; // Clear the history list
    // Loop through the shapes array and create history list items
    shapes.forEach((shape, index) => {
        const selectedShape = document.getElementById(shape.id);
        const li = document.createElement('li');
        li.textContent = shape.id;
        li.style.fontSize = '16px';
        li.style.color = 'blue';
        li.style.fontFamily = 'Arial, sans-serif';
        li.style.cursor = 'pointer';
        // Add click event listener to the li element
        li.addEventListener('click', () => {
            const newId = prompt('Enter a new ID for this shape:', shape.id);
            if (newId !== null) {
                shapes[index].id = newId; // Update the shape's ID in the array
                selectedShape.id = newId;
                svg.childNodes[index].id = selectedShape.id; //had to click in sources on Inspect Element to find how to call #design(shape) with was svg.
                                                                      //childNodes; [index] is recalling the position in the array
                renderHistory(); // Update the history list
                
            }
        });
        historyList.appendChild(li);
    });
}


//change stroke and fill
const fillButtonElement = document.querySelector("#fillButtonId");
const strokeButtonElement = document.querySelector("#strokeButtonId");

fillButtonElement.addEventListener('click', () => {
    const newFillColor = inputElement.value; // Get the new fill color from the input to the toolbar fill color
   

    fillColor.style.fill = newFillColor; // Update the fill color of the input element
    fill = newFillColor; // Update the fill variable
    

    shapes.forEach((shapeData) => {
                //var previousClickedShapeIdForFill = shapeData.id;
            if (currentSelectedShape.id  !== null && currentSelectedShape.id  === shapeData.id) { //in order to get this to work, I have to make the click previousClicked = shapeData in moveShape() first so it can go the the the loop to  match.
                const previousShapeElementForFill = document.getElementById(currentSelectedShape.id);
                previousShapeElementForFill.setAttribute("fill", fill);//this actually integrate the stroke into the HTML element
                shapeData.fill = fill;
                changeFill.value = fill;
            }
    });
})
             
strokeButtonElement.addEventListener('click', () => {
    const newStrokeColor = inputElement.value; // Get the new fill color from the input
    
    //the two lines call basically the same but need it
    strokeColor.style.stroke = newStrokeColor; // Update the stroke color of the input element to the toolbar stroke color
    stroke = newStrokeColor; // Update the stroke variable
    

    shapes.forEach((shapeData) => {
 
            if (currentSelectedShape.id  !== null && currentSelectedShape.id === shapeData.id) { //in order to get this to work, I have to make the click previousClicked = shapeData in moveShape() first so it can go the the the loop to  match.
                const previousShapeElementForStroke = document.getElementById(currentSelectedShape.id);
                previousShapeElementForStroke.setAttribute("stroke", stroke);//this actually integrate the stroke into the HTML element
                shapeData.stroke = stroke; 
                changeStroke.value = stroke; //this updates the stroke value        
            }
    });
})

function removeDrawingListeners() {
    svg.removeEventListener("mousedown", onRectMouseDown);
    svg.removeEventListener("mousemove", onRectMouseMove);
    svg.removeEventListener("mouseup", onRectMouseUp);
    svg.removeEventListener("mousedown", onCircleMouseDown);
    svg.removeEventListener("mousemove", onCircleMouseMove);
    svg.removeEventListener("mouseup", onCircleMouseUp);
    svg.removeEventListener("mousedown", onLineMouseDown);
    svg.removeEventListener("mousemove", onLineMouseMove);
    svg.removeEventListener("mouseup", onLineMouseUp);
}



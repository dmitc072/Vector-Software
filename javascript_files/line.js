let isLineIconSelected = false;
let lineCounter = 0; // Initialize the counter for lines

function setupDrawingLine() {
    svg.addEventListener("mousedown", onLineMouseDown);
    svg.addEventListener("mousemove", onLineMouseMove);
    svg.addEventListener("mouseup", onLineMouseUp);
}

function onLineMouseDown(event) {
        startX = event.clientX;
        startY = event.clientY;
        isDrawing = true;
        console.log("Is drawing line");
        lineCounter++;
}

function onLineMouseMove(event) {
    if (isDrawing) {
        x1 = startX;
        y1 = startY;
        x2 = event.clientX;
        y2 = event.clientY;
  
        // Clear the SVG container before rendering shapes
        svg.innerHTML = "";
        renderShapes(); //location of this is important
        

        const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineElement.setAttribute('class', "line");
        lineElement.setAttribute('id', "line_" + lineCounter);
        lineElement.setAttribute('x1', x1);
        lineElement.setAttribute('y1', y1);
        lineElement.setAttribute('x2', x2);
        lineElement.setAttribute('y2', y2);
        lineElement.setAttribute('stroke', stroke);
        lineElement.setAttribute('stroke-width',strokeWidth)

        svg.appendChild(lineElement);
                
        
    }
}

function onLineMouseUp (event) {
        isDrawing = false;
        const newLine = {
            type: 'line',
            class: 'line',
            id: "line_" + lineCounter,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            stroke: stroke,
            "stroke-width": strokeWidth,
        };
        shapes.push(newLine);

       // Render the history list and size
       renderHistory(); //located in toolBar.js
}



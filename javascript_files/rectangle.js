let rectangleCounter = 0; // Initialize the counter for rectangles



function setupDrawingRect() {
    svg.addEventListener("mousedown", onRectMouseDown);
    svg.addEventListener("mousemove", onRectMouseMove);
    svg.addEventListener("mouseup", onRectMouseUp);
}

function onRectMouseDown(event) {
    // Store the starting position and set drawing flag to true
    startX = event.clientX;
    startY = event.clientY;
    isDrawing = true;
    console.log("drawing rectangle");
    // Increment the rectangle counter
    rectangleCounter++;
}

function onRectMouseMove(event) {
    if (isDrawing) {
        // Calculate the width and height for the rectangle
        width = event.clientX - startX;
        height = event.clientY - startY;

        // Calculate the new x and y coordinates for the rectangle
        x = width < 0 ? event.clientX : startX;
        y = height < 0 ? event.clientY : startY;

        // Calculate the absolute dimensions
        absWidth = Math.abs(width);
        absHeight = Math.abs(height);

        // Clear the SVG container before rendering shapes
        svg.innerHTML = "";
        renderShapes();

        // Create a new rectangle at the cursor position
        const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectElement.setAttribute('class', 'rectangle');
        rectElement.setAttribute('id', 'rectangle_' + rectangleCounter);
        rectElement.setAttribute('x', x);
        rectElement.setAttribute('y', y);
        rectElement.setAttribute('width', absWidth);
        rectElement.setAttribute('height', absHeight);
        rectElement.setAttribute('fill', fill);
        rectElement.setAttribute('stroke', stroke);
        rectElement.setAttribute('stroke-width', strokeWidth);
    
        svg.appendChild(rectElement);
    }
}

function onRectMouseUp() {
    // Reset the drawing flag
    isDrawing = false;
    
    const newRectangle = {
        type: 'rect',
        class: 'rectangle',
        id: "rectangle_" + rectangleCounter,
        x: x,
        y: y,
        width: absWidth,
        height: absHeight,
        fill: fill,
        stroke: stroke,
        "stroke-width": strokeWidth,
    };
    shapes.push(newRectangle);
    // old design to Save the rectangle in the array
   // shapes.push({type:"rect",id:'rectangle_' + rectangleCounter,class:"rectangle", x, y, width: absWidth, height: absHeight, stroke:stroke, fill: fill, "stroke-width": strokeWidth });

    // Render the history list and size
    renderHistory();
}





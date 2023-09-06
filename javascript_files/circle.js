let circleCounter = 0; // Initialize the counter for circles
let ellipseCounter = 0; // Initialize the counter for ellipses

function setupDrawingCircle() {
    svg.addEventListener("mousedown", onCircleMouseDown);
    svg.addEventListener("mousemove", onCircleMouseMove);
    svg.addEventListener("mouseup", onCircleMouseUp);
}

function onCircleMouseDown(event) {
    startX = event.clientX;
    startY = event.clientY;
    isDrawing = true;
    cx = startX; // Initialize cx and cy with the starting point
    cy = startY;
    console.log("drawing circle");
    if (event.shiftKey) {
        circleCounter++;
    } else {
        ellipseCounter++;
    }
}

function onCircleMouseMove(event) {
    if (isDrawing) {
        if (event.shiftKey) {
            // Calculate the radius for the circle
            radius = Math.sqrt(Math.pow(event.clientX - startX, 2) + Math.pow(event.clientY - startY, 2));
        } else {
            // Calculate the x and y radii for the ellipse
            rx = Math.abs(event.clientX - startX) / 2;
            ry = Math.abs(event.clientY - startY) / 2;
        }
           // Clear the SVG container before rendering shapes
           svg.innerHTML = "";
           renderShapes(); //location of this is important
           
      //this creates the drawing but is not stored in the svg id="design"
        if (event.shiftKey) {
            const circleElement = document.createElementNS('http://www.w3.org/2000/svg', "circle");
            circleElement.setAttribute('class', "circle");
            circleElement.setAttribute('id', "circle_" + circleCounter);
            circleElement.setAttribute('cx', cx);
            circleElement.setAttribute('cy', cy);
            circleElement.setAttribute('r', radius);
            circleElement.setAttribute('fill', fill);
            circleElement.setAttribute('stroke', stroke);
            circleElement.setAttribute('stroke-width', strokeWidth);
            
            svg.appendChild(circleElement); 
        } else {
            const ellipseElement = document.createElementNS('http://www.w3.org/2000/svg', "ellipse");
            ellipseElement.setAttribute('class', "ellipse");
            ellipseElement.setAttribute('id', "ellipse_" + ellipseCounter);
            ellipseElement.setAttribute('cx', cx);
            ellipseElement.setAttribute('cy', cy);
            ellipseElement.setAttribute('rx', rx);
            ellipseElement.setAttribute('ry', ry);
            ellipseElement.setAttribute('fill', fill);
            ellipseElement.setAttribute('stroke', stroke);
            ellipseElement.setAttribute('stroke-width', strokeWidth);
            
            svg.appendChild(ellipseElement);
        }
    }
}

function onCircleMouseUp(event) { //once release the mouse, the ellipseElement and circleElement are stored in shapes by below function
    isDrawing = false;

    if (event.shiftKey) {
        const newCircle = {
            type: 'circle',
            class: 'ellipse',
            id: "circle_" + circleCounter,
            cx: cx,
            cy: cy,
            r: radius,
            fill: fill,
            stroke: stroke,
            "stroke-width": strokeWidth,
        };
        shapes.push(newCircle);
    } else {
        const newEllipse = {
            type: 'ellipse',
            class: 'ellipse',
            id: "ellipse_" + ellipseCounter,
            cx: cx,
            cy: cy,
            rx: rx,
            ry: ry,
            fill: fill,
            stroke: stroke,
            "stroke-width": strokeWidth,
        };
        shapes.push(newEllipse);
    }
    //stores the shapes in history
    renderHistory();
}



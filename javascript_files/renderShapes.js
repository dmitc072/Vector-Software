function renderShapes() { //after shapes are pushed in from shapes[];ex onCircleMouseUp(), it stores into the array and calling it below
    svg.innerHTML = ""; // Clear the SVG container

    shapes.forEach(shapeData => {
        const { type, id, cx, cy, rx, ry, r, x, y, x1, x2, y1, y2, width, height, fill, stroke, "stroke-width":strokeWidth}  = shapeData; //calling the values below, which are the values of shapes[]; not sure, but do not include class and strokeWidth is called differently

        // Create a new SVG element based on the shape type
        const shapeElement = document.createElementNS('http://www.w3.org/2000/svg', type); //type is declared in shapes.push

    
        if (type === 'circle') {
            shapeElement.setAttribute('class', "circle");
            shapeElement.setAttribute('id', id);
            shapeElement.setAttribute('cx', cx);
            shapeElement.setAttribute('cy', cy);
            shapeElement.setAttribute('r', r);
            shapeElement.setAttribute('fill', fill);
            shapeElement.setAttribute('stroke', stroke);
            shapeElement.setAttribute('stroke-width', strokeWidth);
           
        } if (type === 'ellipse') {
            shapeElement.setAttribute('class', "ellipse");
            shapeElement.setAttribute('id', id);
            shapeElement.setAttribute('cx', cx);
            shapeElement.setAttribute('cy', cy);
            shapeElement.setAttribute('rx', rx);
            shapeElement.setAttribute('ry', ry);
            shapeElement.setAttribute('fill', fill);
            shapeElement.setAttribute('stroke', stroke);
            shapeElement.setAttribute('stroke-width', strokeWidth);
            
        } if (type === "rect"){
            shapeElement.setAttribute('class', 'rectangle');
            shapeElement.setAttribute('id', id);
            shapeElement.setAttribute('x', x);
            shapeElement.setAttribute('y', y);
            shapeElement.setAttribute('width', width);
            shapeElement.setAttribute('height', height);
            shapeElement.setAttribute('fill', fill);
            shapeElement.setAttribute('stroke', stroke);
            shapeElement.setAttribute('stroke-width', strokeWidth);

        }   if (type === 'line') {
            shapeElement.setAttribute('class', 'line');
            shapeElement.setAttribute('id', id);
            shapeElement.setAttribute('x1', x1);
            shapeElement.setAttribute('y1', y1);
            shapeElement.setAttribute('x2', x2);
            shapeElement.setAttribute('y2', y2);
            shapeElement.setAttribute('stroke', stroke);
            shapeElement.setAttribute('stroke-width',strokeWidth);

        }
        svg.appendChild(shapeElement);
        
    });
}

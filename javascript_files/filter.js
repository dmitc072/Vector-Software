/* from HTML
<svg id="filters"  xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="imageOver">
            <feComposite in="SourceGraphic" in2="OtherGraphic" operator="over" />
          </filter>
          <filter id="imageIn">
            <feComposite in="SourceGraphic" in2="OtherGraphic" operator="in" />
          </filter>
          <filter id="imageOut">
            <feComposite in="SourceGraphic" in2="OtherGraphic" operator="out" />
          </filter>
          <filter id="imageAtop">
            <feComposite in="SourceGraphic" in2="OtherGraphic" operator="atop" />
          </filter>
          <filter id="imageXor">
            <feComposite in="SourceGraphic" in2="OtherGraphic" operator="xor" />
          </filter>
          <filter id="imageArithmetic">
            <feComposite in="SourceGraphic" in2="OtherGraphic" 
              operator="arithmetic"
              k1="0.1"
              k2="0.2"
              k3="0.3"
              k4="0.4" />
          </filter>
          <filter id="imageLighter">
            <feComposite in="SourceGraphic" in2="OtherGraphic" operator="lighter" />
          </filter>
        </defs>
    </svg>
     
    <div class="filterChange" >
    <div class="title-box" id="filterChange">
      <p class="filterChange-title">Filter</p>
      <img id="closeIcon" class="close-icon" src="closeIcon.png" width="10" height="10" alt="Close">
  </div>
      <form id="filterChangeForm" class="filterChangeForm" action="/action_page.php">  <!--to use form in javascript i had to call the form and not div like i did with toolBar-->
        <p class="addFilter">Type of Filter</p>
        <input type="number" id="typeOfFilter" name="typeOfFilter" value = "" >
        <br><br> 
        <p class="addFilter">First Shape</p>
        <input type="text" id="shapeOneFilter" name="shapeOneFilter" value = "" >
        <br><br> 
        <p class="addFilter">Second Shape</p>
        <input type="text" id="shapeTwoFilter" name="shapeTwoFilter" value = "" >
        <br><br> 
        <input type="button" id="addFilterButton" value="Add Filter">
    </form>  
  </div>
    */

    let filter = document.getElementById('filters');
    const filterArrangementDropdown = document.getElementById("filterArrangement");


    
           // const svgContainer = document.querySelector('#filters'); // Assuming there's only one <svg> element
            const defs = filter.querySelector('defs');
    
            // Create the first <use> element
            const use1 = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            use1.setAttribute('xlink:href', '#rectangle_1');
            use1.setAttribute('x', '0');
            use1.setAttribute('y', '0');
            use1.setAttribute('filter', 'url(#imageArithmetic)');
    
            // Create the second <use> element
            const use2 = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            use2.setAttribute('xlink:href', '#rectangle_2');
            use2.setAttribute('x', '200');
            use2.setAttribute('y', '0');
            use2.setAttribute('filter', 'url(#imageArithmetic)');
    
            // Append the <use> elements to the <svg> container
            filter.appendChild(use1);
            filter.appendChild(use2);
   
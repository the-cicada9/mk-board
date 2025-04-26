export function initBoard(container, options = {}) {
    const width = options.width || 500;
    const height = options.height || 400;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = '2px solid #ccc';
    canvas.style.borderRadius = '8px';
    canvas.style.cursor = 'crosshair';
    canvas.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let drawing = false;
    let toolMode = 'pencil'; // Track if the current tool is 'pencil' or 'eraser'

    // Default options
    let color = options.color || '#000000';  // Default pencil color (hex format)
    let lineWidth = options.lineWidth || 2; // Default pencil line width
    let eraserSize = options.eraserSize || 10; // Default eraser size

    // Create UI elements for tool selection
    const toolContainer = document.createElement('div');
    toolContainer.style.marginBottom = '10px';
    toolContainer.style.display = 'flex';
    toolContainer.style.alignItems = 'center';
    toolContainer.style.gap = '20px';  // More space between controls

    // Tool mode dropdown (pencil/eraser)
    const toolSelect = document.createElement('select');
    const pencilOption = document.createElement('option');
    pencilOption.value = 'pencil';
    pencilOption.textContent = 'Pencil';
    toolSelect.appendChild(pencilOption);

    const eraserOption = document.createElement('option');
    eraserOption.value = 'eraser';
    eraserOption.textContent = 'Eraser';
    toolSelect.appendChild(eraserOption);

    toolSelect.value = toolMode;
    toolSelect.addEventListener('change', (e) => {
        toolMode = e.target.value;
        console.log("Tool mode changed to: ", toolMode);
        // Show or hide the eraser size dropdown based on selected tool
        eraserSizeSelect.style.display = toolMode === 'eraser' ? 'block' : 'none';
    });
    toolSelect.style.padding = '8px 12px';
    toolSelect.style.borderRadius = '8px';
    toolSelect.style.border = '1px solid #ddd';
    toolSelect.style.fontSize = '14px';
    toolSelect.style.cursor = 'pointer';
    toolSelect.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
    toolSelect.addEventListener('focus', () => {
        toolSelect.style.borderColor = '#4CAF50';
        toolSelect.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.5)';
    });
    toolSelect.addEventListener('blur', () => {
        toolSelect.style.borderColor = '#ddd';
        toolSelect.style.boxShadow = 'none';
    });
    toolContainer.appendChild(toolSelect);

    // Color picker for pencil color
    const colorPickerWrapper = document.createElement('div');
    colorPickerWrapper.style.position = 'relative';
    colorPickerWrapper.style.width = '40px';
    colorPickerWrapper.style.height = '40px';
    colorPickerWrapper.style.borderRadius = '50%';
    colorPickerWrapper.style.border = '1px solid #ddd';

    // Create a circular color indicator inside the wrapper
    const colorIndicator = document.createElement('div');
    colorIndicator.style.position = 'absolute';
    colorIndicator.style.width = '100%';
    colorIndicator.style.height = '100%';
    colorIndicator.style.borderRadius = '50%';
    colorIndicator.style.backgroundColor = color; // Default color
    colorPickerWrapper.appendChild(colorIndicator);

    // Create the input element (invisible) to select the color
    const hiddenColorInput = document.createElement('input');
    hiddenColorInput.type = 'color';
    hiddenColorInput.value = color;
    hiddenColorInput.style.position = 'absolute';
    hiddenColorInput.style.top = '0';
    hiddenColorInput.style.left = '0';
    hiddenColorInput.style.opacity = '0';  // Hide the default input
    hiddenColorInput.addEventListener('input', (e) => {
        color = e.target.value;
        colorIndicator.style.backgroundColor = color; // Update the color indicator
    });
    colorPickerWrapper.appendChild(hiddenColorInput);

    // Append the color picker wrapper to the tool container
    toolContainer.appendChild(colorPickerWrapper);

    // Line width dropdown
    const lineWidthSelect = document.createElement('select');
    [1, 2, 4, 6, 8].forEach((widthOption) => {
        const option = document.createElement('option');
        option.value = widthOption;
        option.textContent = `${widthOption}px`;
        lineWidthSelect.appendChild(option);
    });
    lineWidthSelect.value = lineWidth;
    lineWidthSelect.addEventListener('change', (e) => {
        lineWidth = e.target.value;
    });
    lineWidthSelect.style.padding = '8px 12px';
    lineWidthSelect.style.borderRadius = '8px';
    lineWidthSelect.style.border = '1px solid #ddd';
    lineWidthSelect.style.fontSize = '14px';
    lineWidthSelect.style.cursor = 'pointer';
    lineWidthSelect.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
    lineWidthSelect.addEventListener('focus', () => {
        lineWidthSelect.style.borderColor = '#4CAF50';
        lineWidthSelect.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.5)';
    });
    lineWidthSelect.addEventListener('blur', () => {
        lineWidthSelect.style.borderColor = '#ddd';
        lineWidthSelect.style.boxShadow = 'none';
    });
    toolContainer.appendChild(lineWidthSelect);

    // Eraser size dropdown (hidden by default)
    const eraserSizeSelect = document.createElement('select');
    [10, 20, 30, 40, 50].forEach((sizeOption) => {
        const option = document.createElement('option');
        option.value = sizeOption;
        option.textContent = `${sizeOption}px`;
        eraserSizeSelect.appendChild(option);
    });
    eraserSizeSelect.value = eraserSize;
    eraserSizeSelect.style.display = 'none'; // Hide it initially
    eraserSizeSelect.style.padding = '8px 12px';
    eraserSizeSelect.style.borderRadius = '8px';
    eraserSizeSelect.style.border = '1px solid #ddd';
    eraserSizeSelect.style.fontSize = '14px';
    eraserSizeSelect.style.cursor = 'pointer';
    eraserSizeSelect.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
    eraserSizeSelect.addEventListener('focus', () => {
        eraserSizeSelect.style.borderColor = '#4CAF50';
        eraserSizeSelect.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.5)';
    });
    eraserSizeSelect.addEventListener('blur', () => {
        eraserSizeSelect.style.borderColor = '#ddd';
        eraserSizeSelect.style.boxShadow = 'none';
    });
    toolContainer.appendChild(eraserSizeSelect);

    // Clear button with styling
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.style.padding = '10px 20px';
    clearButton.style.border = 'none';
    clearButton.style.backgroundColor = '#f44336';
    clearButton.style.color = 'white';
    clearButton.style.borderRadius = '8px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.fontSize = '14px';
    clearButton.style.transition = 'background-color 0.3s ease';
    clearButton.addEventListener('mouseenter', () => {
        clearButton.style.backgroundColor = '#d32f2f';
    });
    clearButton.addEventListener('mouseleave', () => {
        clearButton.style.backgroundColor = '#f44336';
    });
    clearButton.onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    toolContainer.appendChild(clearButton);

    // Add tool container to main container
    container.appendChild(toolContainer);

    // Pencil drawing
    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath(); // Clear previous path to avoid connecting points
        ctx.moveTo(x, y);
    });
    canvas.addEventListener('mouseup', () => {
        drawing = false;
    });
    canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (toolMode === 'eraser') {
            // Clear the drawn part with eraser
            ctx.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
        } else {
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = color;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    });
}

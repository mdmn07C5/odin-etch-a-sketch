function randomRGBColor() {
    return `rgba(
        ${Math.round(Math.random() * 255)}, 
        ${Math.round(Math.random() * 255)}, 
        ${Math.round(Math.random() * 255)}, 
    1)`
}

function darken(rgb) {
    let colors = rgb.slice(
        rgb.indexOf('(') + 1,
        rgb.indexOf(')')
    ).split(',');
    colors = colors.map(Number);
    colors = colors.map((color) => Math.round(color - 25.5));

    return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`
}

function createTile() {
    const tile = document.createElement('div');
    tile.setAttribute('class', 'tile')
    tile.addEventListener('mouseenter', function (e) {
        const style = window.getComputedStyle(this);
        let bgColor = style.getPropertyValue('background-color')
        if (bgColor === 'rgba(0, 0, 0, 0)') {
            this.style.backgroundColor = randomRGBColor();
        } else {
            this.style.backgroundColor = darken(bgColor);
        }

    })
    return tile;
}

function createGrid(numTiles=16) {
    const grid = document.querySelector('#grid');
    grid.innerHTML = '';
    
    for (let i = 0; i < numTiles; i++) {
        const col = document.createElement('div');
        col.setAttribute('class', 'col');
        for (let j = 0; j < numTiles; j++) {
            const tile = createTile();
            // tile.textContent = `${j*numTiles + i}`;
            col.appendChild(tile);
        }
        grid.appendChild(col);
    }
}

function resetBoardPrompt() {
    let size = Number.parseInt(prompt('Enter board size: ', 16));
    if (size < 1 || size > 100) {
        alert('Board size must be between 1 and 100 (per side).')
        return
    }
    createGrid(size);
}

function registerResetButton() {
    const resetButton = document.querySelector('#reset-button');
    resetButton.addEventListener('click', resetBoardPrompt);
}

createGrid();
registerResetButton();
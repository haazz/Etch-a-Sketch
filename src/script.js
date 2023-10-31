const grid = document.querySelector('.grid');
const h1 = document.querySelector('h1');
const changeGridSizeButton = document.querySelector('.changeGridSizeButton');
const clearGridButton = document.querySelector('.clearGridButton');
const blackButton = document.querySelector('.blackButton');
const darkeningButton = document.querySelector('.darkeningButton');
const randomColorButton = document.querySelector('.randomColorButton');

let gridSize = 16;			// Default grid size = 16
let gridColor = 'black';	// Default grid color is black

const grey = ['#ffffff', '#f5f7ff', '#e6e9f3', 
			'#d8dbe7', '#bcc0cf', '#a1a5b6', 
			'#878c9e', '#6f7486', '#585d6e', 
			'#424755', '#2e313d', '#1b1d25', 
			'#121319', '#090a0d', '#000000']

for(let i = 0; i < grey.length; i++) {
	grey[i] = hexToRgb(grey[i]);
}

makeGrid(gridSize);

changeGridSizeButton.addEventListener('click', () => {
	gridSize = prompt('Change grid size (1~100) (Default: 16)');
	
});

blackButton.addEventListener('click', () => {
	gridColor = 'black';
});

darkeningButton.addEventListener('click', () => {
	gridColor = 'darkening';
});

randomColorButton.addEventListener('click', () => {
	gridColor = 'randomColor';
});

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? "rgb(" +
		parseInt(result[1], 16) + ", " +
		parseInt(result[2], 16) + ", " +
		parseInt(result[3], 16) + ")"
		: null;
}

function setColor(gridColor, currentColor) {
	console.log(currentColor);
	if (gridColor === 'black') {
		return gridColor;
	}
	else if (gridColor === 'randomColor') {
		let red = Math.random() * 255;
		let green = Math.random() * 255;
		let blue = Math.random() * 255;

		return "rgb(" + red + ", " + green + ", " + blue +")";
	}
	else {
		for(let i = 0; i < grey.length; i++){
			if(currentColor === grey[grey.length - 1]) {
				return grey[grey.length - 1];
			}
			else if(currentColor === grey[i]) {
				return grey[i + 1];
			}
		}
		return grey[1];
	}
}

function makeGrid(gridSize) {
	for(let i = 0; i < gridSize; i++) {
		const row = document.createElement('div');
		row.className = 'row';
		for(let j = 0; j < gridSize; j++) {
			const square = document.createElement('div');
			square.className = 'square';
			square.addEventListener('mouseover',() => {
				square.style.background = setColor(gridColor, square.style.background);
			});
			row.appendChild(square);
		}
		grid.appendChild(row);
	}
}
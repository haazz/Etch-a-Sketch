const grid = document.querySelector('.grid');
const h1 = document.querySelector('h1');
const changeGridSizeButton = document.querySelector('.changeGridSizeButton');
const clearGridButton = document.querySelector('.clearGridButton');
const blackButton = document.querySelector('.blackButton');
const darkeningButton = document.querySelector('.darkeningButton');
const randomColorButton = document.querySelector('.randomColorButton');

let gridSize = 16;			// Default grid size = 16
let gridColor = 'black';	// Default grid color is black
let colorButtons = {'black': blackButton, 'darkening': darkeningButton, 'randomColor': randomColorButton};

const grey = ['#ffffff', '#f5f7ff', '#e6e9f3', 
			'#d8dbe7', '#bcc0cf', '#a1a5b6', 
			'#878c9e', '#6f7486', '#585d6e', 
			'#424755', '#2e313d', '#1b1d25', 
			'#121319', '#090a0d', '#000000']

for(let i = 0; i < grey.length; i++) {
	grey[i] = hexToRgb(grey[i]);
}

makeGrid(gridSize);
updateButtonColor(colorButtons, gridColor);

changeGridSizeButton.addEventListener('click', () => {
	gridSize = prompt('Change grid size (1~100) (Default: 16)');
	if (gridSize === null) {
		gridSize = 16;
	}
	else if (gridSize < 1 || gridSize > 100) {
		alert("Wrong answer!");
		gridSize = 16;
	}
	removeGrid(grid);
	makeGrid(gridSize);
});

clearGridButton.addEventListener('click', ()=>{
	removeGrid(grid);
	makeGrid(gridSize);
});

blackButton.addEventListener('click', () => {
	gridColor = 'black';
	updateButtonColor(colorButtons, gridColor);
});

darkeningButton.addEventListener('click', () => {
	gridColor = 'darkening';
	updateButtonColor(colorButtons, gridColor);
});

randomColorButton.addEventListener('click', () => {
	gridColor = 'randomColor';
	updateButtonColor(colorButtons, gridColor);
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
		return hexToRgb('#000000');
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

function removeGrid(grid) {
	grid.textContent = "";
}

function updateButtonColor(colorButtons, gridColor) {
	for(color in colorButtons) {
		colorButtons[color].style.removeProperty("background");
		colorButtons[color].style.removeProperty("color");
	}
	console.log(colorButtons[gridColor]);
	colorButtons[gridColor].style.background = "black";
	colorButtons[gridColor].style.color = "white";

	// for (let i = 0; i < colorButton.length(); i++) {
	// 	colorButtons[i]
	// }
	
	// blackButton.style.removeProperty("background");
	// .style.removeProperty("background");
	// if (gridColor === 'black') {
	// 	blackButton.style.background = "black";
	// 	blackButton.style.color = "white";
	// }
	// else if (gridColor === 'darkening') {
	// 	darkeningButton.style.background = "black";
	// 	darkeningButton.style.color = "white";
	// }
	// else {
	// 	randomColorButton.style.background = "black";
	// 	randomColorButton.style.color = "white";
	// }
	
}
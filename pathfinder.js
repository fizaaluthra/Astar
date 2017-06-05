

var cols = 13;
var rows = 13;
var open_set = new BinaryHeap(function(arr) {
					return fScores[arr[0]][arr[1]]; });
var closed_set = [];
var wtrue;
var htrue;

var fScores = new Array(cols);
var gScores = new Array(cols);
var hScores = new Array(cols);
var neighbours = new Array(cols);
var camefrom = new Array(cols);
var obstacle = new Array(cols);
var path_found;
var algo_choice = 0;

function includes (arr, spot){
	for (k = 0; k < arr.length ; ++k){
		if (arr[k][0] === spot[0] && arr[k][1] === spot[1]){
			return k+1;
		}
	}
	return false;
}
function heurestic(start, end){
	var d = dist(start[0], start[1], end[0], end[1]);
	return d;
}
function addNeighbours( i , j ) {

	neighbours[i][j] = []

	if (i < cols - 1){
		neighbours[i][j].push([i + 1, j]);
	}
	if (j < rows - 1){
		neighbours[i][j].push([i, j + 1]);
	}
	if (i > 0){
		neighbours[i][j].push([i - 1, j]);
	}
	if (j > 0){
		neighbours[i][j].push([i, j	- 1]);
	}
	if (i > 0 && j > 0){
		neighbours[i][j].push([i - 1, j - 1]);

	}
	if (i < cols - 1 && j > 0){
		neighbours[i][j].push([i + 1, j - 1]);
	}
	if (i > 0 && j < rows - 1){
		neighbours[i][j].push([i - 1, j + 1]);
	}
	if (i < cols - 1 && j  < rows - 1){
		neighbours[i][j].push([i + 1, j + 1]);
	}

}


function show(i, j, color){
	fill(color);
	stroke(0);

	rect( i * (wtrue + 1), j * (htrue + 1), wtrue, htrue);
}

function setup(){

 	start = [0, 0];
 	end = [cols - 1 ,rows - 1];

	setup_maze();
	//createCanvas(400, 400);


	var astar_button = createButton('Astar');
	var djikstra_button = createButton('Djikstra');
	var greedy_button = createButton('Best First Search');
	astar_button.mousePressed(function(){
		algo_choice = 1;
		astar_setup(1);

	});
	djikstra_button.mousePressed(function(){
		algo_choice = 2;
		astar_setup(2);
	});
	greedy_button.mousePressed(function(){
		algo_choice = 3;
		greedy_setup();
	});

 console.time('pathfunction');

}

function draw(){
	if (path_found == 0){
	if (algo_choice == 1 || algo_choice == 2){
		astar();

	}
	else if (algo_choice == 3) {
		greedy();
	}

}

}

var cols = 10;
var rows = 10;
var open_set = [];
var closed_set= [];
var wtrue;
var htrue;

var fScores = new Array(cols);
var gScores = new Array(cols);
var hScores = new Array(cols);
var neighbours = new Array(cols);
var camefrom = new Array(cols);

function includes (spot){
	for (k = 0; k < closed_set.length ; ++k){
		if (closed_set[k][0] === spot[0] && closed_set[k][1] === spot[1]){
			return true;
		}
	}
	return false;
}
function heurestic(start, end){
	var d = dist(start[0], start[1], end[0], end[1]);
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


}

function deletefromopen(indices){
	var node = open_set.length - 1;
	for (node; node>= 0; --node){
		if (open_set[node][0] === indices[0] && open_set[node][1] === indices[1]){
			open_set.splice(node, 1);
		}
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

	createCanvas(400, 400);

	wtrue = (width / cols) - 1;
	htrue = (height / rows) - 1;
	var i,j;
	for(i = 0; i < cols; ++i){
		fScores[i] = new Array(rows);
		gScores[i] = new Array(rows);
		hScores[i] = new Array(rows);
		neighbours[i] = new Array(rows);
		camefrom[i] = new Array(rows);
	}

	for (i = 0; i < cols; ++i){
		for (j = 0; j < rows; ++j){
			addNeighbours(i, j);
			fScores[i][j] = 0;
			gScores[i][j] = 0;
			hScores[i][j] = heurestic([i,j], end); 
		}
	}


 open_set.push(start);


}


function draw(){
	length = open_set.length;

	if (length > 0){

		var min =  open_set[0];
		for (var counter = 0; counter < length; ++counter){
			node = open_set[counter];
			if (fScores[node[0]][node[1]] < fScores[min[0]][min[1]]){
				min[0] = node[0];
				min[1] = node[1];
			}
		}
	
		if (min[0] === end[0] && min[1] === end[1]){

			current = min;
			show(current[0], current[1], color(0,0,255));
			parent = camefrom[current[0]][current[1]];
			
		
			while (parent){
				
			show(parent[0], parent[1], color(0, 0, 255));
			parent = camefrom[parent[0]][parent[1]];

				
			}
			console.log('finished');
			noLoop();
			return;
			
		}

		deletefromopen(min);
		closed_set.push(min);
		
		for (var i = 0; i < neighbours[min[0]][min[1]].length; ++i){

			neighbour = neighbours[min[0]][min[1]][i];
			
			if (!includes(neighbour)){
			
			flag = 0;
			tentative_gScore = gScores[min[0]][min[1]] + 1; // not true for diagonals -- diagonals you have to add root 2
			if (!open_set.includes(neighbour)){
				open_set.push(neighbour);
				gScores[neighbour[0]][neighbour[1]] = tentative_gScore;
				flag = 1;
			}
			else if (tentative_gScore < gScores[neighbour[0]][neighbour[1]]){
				gScores[neighbour[0]][neighbour[1]] = tentative_gScore;
				flag =1;
			}

			if(flag ==1){ // this is the best record it 
				fScores[neighbour[0]][neighbour[1]] = tentative_gScore + hScores[neighbour[0]][neighbour[1]];
				
				camefrom[neighbour[0]][neighbour[1]] = min;
				
			}
			}
		}

	} else {

	}

	background(0);

	for(i = 0; i < cols; ++i){
		for (j = 0; j < rows; ++j){
			show(i , j, 255);
		}
	}

	for (i = 0; i < open_set.length; ++i){
		node = open_set[i];
		show(node[0], node[1], color(0, 255, 0));
	}

	for(i = 0; i < closed_set.length; ++i){
		node = closed_set[i];
		show(node[0], node[1], color(255, 0, 0));
	}
}
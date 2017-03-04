var cols = 11;
var rows = 11;
var open = [];
var closed = [];
var wtrue;
var htrue;

var fScores = new Array(10);
var gScores = new Array(10);
var hScores = new Array(10);

function deletefromopen(indices){
	var node = open.length - 1;
	for (node , node >= 0, --node){
		if (open[node][0] === indices[0] && open[node][1] === indices[1]){
			open.splice(node, 1);
		}
	}
}
function show(i, j){
	fill(255);
	stroke(0);
	console.log('h')
	rect( i * (wtrue + 1), j * (htrue + 1), wtrue, htrue);
}

function setup(){
	createCanvas(400, 400);
	console.log('A*');
	wtrue = (width / cols) - 1;
	htrue = (height / rows) - 1;
	var i,j;
	for(i = 0; i < cols; ++i){
		fScores[i] = new Array(rows);
		gScores[i] = new Array(rows);
		hScores[i] = new Array(rows);
	}

	
 start = [0, 0];
 end = [cols - 1, rows - 1];

 open.push(start);

}


function draw(){

	if (open.length > 0){

		var min = [0 , 0];
		for (var node = 0; node < open.length; ++node){
			if (fScores[node[0]][node[1]] < fScores[min[0]][min[1]]){
				min[0] = node[0];
				min[1] = node[1];
			}
		}

		if (min[0] === end[0] && min[1] === end[1]{
			console.log('finished');
		}

		deletefromopen(min);
		closed.push(min);

	} else {

	}

	background(0);

	for(i = 0; i < cols; ++i){
		for (j = 0; j < rows; ++j){
			show(i , j);
		}
	}

	noLoop();
}
var cols, rows;
var FLAG = 0;
var w = 40;

var path_found = 0;
var algo_choice = -1;
var grid = new Array(rows);
var current;
var visited = new Array(rows);
var walls = new Array(rows);
var mystack = new Array();
function setup(){
	createCanvas(400, 400);
	cols = floor(width/w);
	rows = floor(height/w);

		for(var i = 0; i < rows; ++i){
			grid[i] = new Array(cols);
			visited[i] = new Array(cols);
			walls[i] = new Array(cols);
 		}
		for (var i = 0; i < rows; ++i){
			for (var j = 0; j < cols; ++j){
					visited[i][j] = false;
					walls[i][j] = [true, true, true, true];
			}
		}

	current = [0,0];
	var astar_button = createButton('Astar');
	var djikstra_button = createButton('Djikstra');
	var greedy_button = createButton('Best First Search');
	astar_button.mousePressed(function(){
		algo_choice = 1;


	});
	djikstra_button.mousePressed(function(){
		algo_choice = 2;
		astar_setup(2);
	});
	greedy_button.mousePressed(function(){
		algo_choice = 3;
		greedy_setup();
	});
}

var star, end, open_set, closed_set, wtrue, htrue, fScores, gScores, hScores, camefrom, neighbours;

function checkNeighbors (i, j){
	var neighbours = [];
	var top, right, bottom, left;
	if (j-1 >=0){
		 top = [i, j-1];

	}
	else{
		 top = undefined;

	}
	if ( i + 1 < rows){
		 right = [i+1, j];

	}
	else{
		right = undefined;
	}
	if ( j + 1 < cols){
		bottom = [i, j+1];

	}
	else{
		bottom = undefined;
	}
	if (i - 1 >= 0){
		left = [i-1, j];
	}
	else{
		left = undefined;
	}


	if(top && !visited[top[0]][top[1]]){
		neighbours.push(top);
	}
	if(right && !visited[right[0]][right[1]]){
		neighbours.push(right);
	}
	if(bottom && !visited[bottom[0]][bottom[1]]){
		neighbours.push(bottom);
	}
	if(left && !visited[left[0]][left[1]]){
		neighbours.push(left);
	}
	if(neighbours.length > 0){
		var r = floor(random(0, neighbours.length));
		return neighbours[r];
	}
	else{
		return undefined
	}
}
function highlight(i,j){
	var x = i*w;
  var y = j*w;
	noStroke();
	fill(0,0,255,100);
	rect(x,y,w,w);

}
function draw(){
	if(!((current[0]===0 && current[1]===0 && visited[current[0]][current[1]]) || FLAG > 0)){
	background(51);

	for(var i = 0; i < grid.length; ++i){
		for(var j = 0; j < grid[0].length; ++j)
		show(i,j);
	}
	visited[current[0]][current[1]] = true;
	highlight(current[0],current[1]);

	var next = checkNeighbors(current[0],current[1]);

	if(next){
		visited[next[0]][next[1]] = true;
		mystack.push(current);
		removeWalls(current,next);
		current = next;

 }else if (mystack.length > 0){
	 if (mystack.length === 1){
		x = i*w;
		y = j*w;
		fill(255);
		fill(255,0,255,100);
		noStroke();
		rect(x , y, w , w);
	}
	 	 prev = mystack.pop();
		 current[0]=prev[0];
		 current[1]=prev[1];

	}
}
else{
	console.log(path_found);
	if (path_found === 0){
		console.log('here');
		console.log(algo_choice);
	if (algo_choice === 1 || algo_choice === 2){

		if (FLAG === 0){
			astar_setup(algo_choice, walls);
			FLAG = 1;
		}
		else{
			if(FLAG === 2){
				for(var i = 0; i < grid.length; ++i){
					for(var j = 0; j < grid[0].length; ++j)
					show(i,j);
				}
				current = min;
				stroke(153);
				line((current[0]*w)/2, (current[1]*w)/2, ((current[0]+1)*w)/2, ((current[1]+1)*w)/2);
				//node_show(current[0], current[1], color(0, 0, 255));
				parent = camefrom[current[0]][current[1]];


				while (parent){
					current = parent;
					line((current[0]*w)/2, (current[1]*w)/2, ((current[0]+1)*w)/2, ((current[1]+1)*w)/2);
				parent = camefrom[parent[0]][parent[1]];


				}
			}
			else{
			astar();
		}
		}
		return;
	}
	else if (algo_choice == 3) {
		greedy();
		return;

	}

}
}
}


function show(i, j){
		var x = i*w;
		var y = j*w;
		stroke(255);
	if (walls[i][j][0]){
		line(x,y,x+w,y);
	}
	if (walls[i][j][1]){
		line(x+w,y,x+w,y+w);
	}
	if (walls[i][j][2]){
		line(x+w,y+w,x,y+w);
	}
	if(walls[i][j][3]){
		line(x,y+w,x,y);
	}
	if (visited[i][j]){
		fill(255,0,255,100);
		noStroke();
		rect(x , y, w , w);
	}

}

function removeWalls(current, next){
	var x = current[0] - next[0];
	if(x === 1){
		walls[current[0]][current[1]][3] = false;
		walls[next[0]][next[1]][1] = false;

	}
	if(x === -1 ){
		walls[current[0]][current[1]][1] = false;
		walls[next[0]][next[1]][3] = false;

	}
	var y = current[1] - next[1];
	if(y === 1){
		walls[current[0]][current[1]][0] = false;
		walls[next[0]][next[1]][2] = false;

	}
	if(y === -1 ){
		walls[current[0]][current[1]][2] = false;
		walls[next[0]][next[1]][0] = false;

	}
}

function BinaryHeap(scorer){
	this.elements = [];
	this.scorer = scorer; 
	this.push = function (element){
		this.elements.push(element);

		this.bubbleup(this.elements.length - 1); // pass in the index where you pushed the new element
	}

	this.bubbleup = function (n){
		
		

		while(n > 0){
			var element = this.elements[n];
			var parent_n = Math.floor((n+1)/2) - 1;
			var parent_score = scorer(this.elements[parent_n]);
			var element_score = scorer(element);


			if (parent_score < element_score){
				break;
			}
			this.elements[n] = this.elements[parent_n];
			this.elements[parent_n] = element;
			

		
			n = parent_n;
		}

	}

	this.pop = function(){
		var result = this.elements[0] // return the minimum score element

		var end = this.elements.pop(); // get the last element

		this.elements[0] = end;
		this.sinkdown(0);
		

		return result;
	}

	this.sinkdown = function(n){
		var element = this.elements[n];
		var element_score = scorer(element);
		
		while (true){
			
			var child1_n =  (n + 1) * 2;
			var child2_n = child1_n - 1;
			var flag = 0;

			if(child1_n < this.elements.length){
				var child1 = this.elements[child1_n];
				var child1_score = scorer(child1);
				if (child1_score < element_score){
					flag = child1_n;
				}
			} 
		
			if (child2_n < this.elements.length){
				
				var child2 = this.elements[child2_n];
				var child2_score = scorer(child2);
				if(flag == 0){
					if (child2_score < element_score){
						flag = child2_n;
					}
				}
				else {
					if (child2_score < child1_score){
						flag = child2_n;
					}
				}
			}
			if (flag == 0) {
				break;
			}

			this.elements[n] = this.elements[flag];
			this.elements[flag] = element;

			n = flag;
			
		}



	}
}



var cols = 15;
var rows = 15;
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

function includes (arr, spot){
	for (k = 0; k < arr.length ; ++k){
		if (arr[k][0] === spot[0] && arr[k][1] === spot[1]){
			return true;
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
		obstacle[i] = new Array(rows);
	}

	for (i = 0; i < cols; ++i){
		for (j = 0; j < rows; ++j){
			addNeighbours(i, j);
			fScores[i][j] = 0;
			gScores[i][j] = 0;
			hScores[i][j] = heurestic([i,j], end); 

			if (random(1) < 0.25){
				obstacle[i][j] = true;
			}
			else{
				obstacle[i][j] = false;
			}
		}
	}


 open_set.push(start);
 
 console.time('someFunction');

}


function draw(){
	length = open_set.elements.length;

	if (length > 0){

		var min =  open_set.pop();
		
		//for (var counter = 0; counter < length; ++counter){
			//node = open_set[counter];
			//if (fScores[node[0]][node[1]] < fScores[min[0]][min[1]]){
			//	min[0] = node[0];
			//	min[1] = node[1];
			//}
		//}
		
		
		if (min[0] === end[0] && min[1] === end[1]){

			current = min;
			show(current[0], current[1], color(0,0,255));
			parent = camefrom[current[0]][current[1]];
			
		
			while (parent){
				
			show(parent[0], parent[1], color(0, 0, 255));
			parent = camefrom[parent[0]][parent[1]];

				
			}
			console.log('finished');
			console.timeEnd('someFunction');

			noLoop();
			return;
			
		}

		deletefromopen(min);
		closed_set.push(min);
		
		for (var i = 0; i < neighbours[min[0]][min[1]].length; ++i){

			neighbour = neighbours[min[0]][min[1]][i];
			if ((!includes(closed_set, neighbour)) && (!obstacle[neighbour[0]][neighbour[1]])){
			
			flag = 0;
			tentative_gScore = gScores[min[0]][min[1]] + dist(min[0],min[1], neighbour[0], neighbour[1]); 
			if (!includes(open_set.elements, neighbour)){
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
			if (!obstacle[i][j]){
				show(i , j, 255);
			}
			else{
				show(i , j, 0);
			}
		}
	}

	for (i = 0; i < open_set.elements.length; ++i){
		node = open_set.elements[i];
		show(node[0], node[1], color(0, 255, 0));
	}

	for(i = 0; i < closed_set.length; ++i){
		node = closed_set[i];
		show(node[0], node[1], color(255, 0, 0));
	}

}
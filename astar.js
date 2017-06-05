function node_show(i, j, color){
	fill(color);

	rect( i * (wtrue + 1), j * (htrue + 1), wtrue, htrue);
}
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
function astar_setup(algo_choice, walls){
	console.log('hi');

 	 start = [0,0];
	 end = [cols - 1 ,rows - 1];
	 open_set = new BinaryHeap(function(arr) {
					return fScores[arr[0]][arr[1]]; });
	 closed_set = [];

	 path_found = 0;
	 wtrue = (width / cols) - 1;
	 htrue = (height / rows) - 1;
	var i,j;

	 fScores = new Array(rows);
	 gScores = new Array(rows);
	 hScores = new Array(rows);
	 camefrom = new Array(rows);
	 neighbours = new Array(rows);
	for (i = 0; i < rows; ++i){
		fScores[i] = new Array(cols);
		gScores[i] = new Array(cols);
		hScores[i] = new Array(cols);
		camefrom[i] = new Array(cols);
		neighbours[i] = new Array(cols);
	}

	for (i = 0; i < rows; ++i){
		for (j = 0; j < cols; ++j){
			fScores[i][j] = 0;
			gScores[i][j] = 0;
			hScores[i][j] = 0;
			neighbours[i][j] = addNeighbours(i,j);
			if(algo_choice == 1){
			hScores[i][j] = heurestic([i,j], end);
			}
		}
	}
	open_set.push(start);
	console.log('hi');

}


function addNeighbours(i,j){
	var neighbours = [];
	var top, right, bottom, left;
	if (j-1 >=0){
		 top = [i, j-1];

	}

	if ( i + 1 < rows){
		 right = [i+1, j];

	}

	if ( j + 1 < cols){
		bottom = [i, j+1];

	}

	if (i - 1 >= 0){
		left = [i-1, j];
	}



	if(top){
		neighbours.push(top);
	}
	if(right){
		neighbours.push(right);
	}
	if(bottom){
		neighbours.push(bottom);
	}
	if(left){
		neighbours.push(left);
	}
	return neighbours;
}
function blocked(min, neighbour){
	var x = min[0] - neighbour[0];
	if(x === 1){
		return walls[min[0]][min[1]][3];
	}
	if(x === -1 ){
		return walls[min[0]][min[1]][1];
	}
	var y = min[1] - neighbour[1];
	if(y === 1){
		return walls[min[0]][min[1]][0];

	}
	if(y === -1 ){
		return walls[min[0]][min[1]][2];

	}
}
function astar(){
	console.log('hi');

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



		if(min[0] === end[0] && min[1] === end[1]) {


			console.log('finished');
			console.timeEnd('pathfunction');
			path_found = 1;
			FLAG = 2;
			return





		}


		closed_set.push(min);
		console.log(neighbours);
		console.log(min);
		console.log(walls);

		for (var i = 0; i < neighbours[min[0]][min[1]].length; ++i){

			neighbour = neighbours[min[0]][min[1]][i];
			if ((!includes(closed_set, neighbour)) && (!blocked(min,neighbour))){
				console.log(neighbours)

			flag = 0;
			flag2 = 0;
			tentative_gScore = gScores[min[0]][min[1]] + dist(min[0],min[1], neighbour[0], neighbour[1]);
			index = includes(open_set.elements, neighbour);
			if (!index){

				gScores[neighbour[0]][neighbour[1]] = tentative_gScore;
				flag = 1;
				flag2 = 1;
			}
			else if (tentative_gScore < gScores[neighbour[0]][neighbour[1]]){
				gScores[neighbour[0]][neighbour[1]] = tentative_gScore;
				flag =1;
			}


			if(flag ==1){ // this is the best record it
				fScores[neighbour[0]][neighbour[1]] = tentative_gScore + hScores[neighbour[0]][neighbour[1]];

				camefrom[neighbour[0]][neighbour[1]] = min;
				if (flag2==1){
				open_set.push(neighbour);
				}
				else{
					open_set.bubbleup(index-1);
					open_set.sinkdown(index-1);
				}


			}
			}
		}

	} else {

	}

	background(0);



	// for (i = 0; i < open_set.elements.length; ++i){
	// 	node = open_set.elements[i];
	// 	node_show(node[0], node[1], color(0, 255, 0));
	// }
	//
	//
	//
	// current = min;
	// node_show(current[0], current[1], color(0,0,255));
	// parent = camefrom[current[0]][current[1]];
	//
	//
	// while (parent){
	//
	// node_show(parent[0], parent[1], color(0, 0, 255));
	// parent = camefrom[parent[0]][parent[1]];
	//
	//
	// }
astar();
}

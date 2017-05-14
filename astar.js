function astar_setup(algo_choice){
	open_set = new BinaryHeap(function(arr) { 
					return fScores[arr[0]][arr[1]]; });
	closed_set = [];

	path_found = 0;
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
			hScores[i][j] = 0;
			if(algo_choice == 1){
			hScores[i][j] = heurestic([i,j], end); 
			}
			obstacle[i][j] = false;
			if (random(1) < 0.15){
				obstacle[i][j] = true;
			}
		}
	}
	open_set.push(start);
}
function astar(){
	
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
	
			current = min;
			show(current[0], current[1], color(0,0,255));
			parent = camefrom[current[0]][current[1]];
			
		
			while (parent){
				
			show(parent[0], parent[1], color(0, 0, 255));
			parent = camefrom[parent[0]][parent[1]];

				
			}
			console.log('finished');
			console.timeEnd('pathfunction');
			path_found = 1;

			

			
			
		}

		
		closed_set.push(min);

		for (var i = 0; i < neighbours[min[0]][min[1]].length; ++i){

			neighbour = neighbours[min[0]][min[1]][i];
			if ((!includes(closed_set, neighbour)) && (!obstacle[neighbour[0]][neighbour[1]])){
			
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


	current = min;
	show(current[0], current[1], color(0,0,255));
	parent = camefrom[current[0]][current[1]];
			
		
	while (parent){
				
	show(parent[0], parent[1], color(0, 0, 255));
	parent = camefrom[parent[0]][parent[1]];

				
	}

}

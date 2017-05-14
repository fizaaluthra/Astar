function greedy_setup(){
		open_set = new BinaryHeap(function(arr) { 
					return hScores[arr[0]][arr[1]]; });
		closed_set = [];
		path_found = 0;
		wtrue = (width / cols) - 1;
		htrue = (height / rows) - 1;
		var i,j;
		for(i = 0; i < cols; ++i){
		hScores[i] = new Array(rows);
		neighbours[i] = new Array(rows);
		camefrom[i] = new Array(rows);
		obstacle[i] = new Array(rows);
	}

	for (i = 0; i < cols; ++i){
		for (j = 0; j < rows; ++j){
			addNeighbours(i, j);
			hScores[i][j] = heurestic([i,j], end); 
			obstacle[i][j] = false;
			if (random(1) < 0.25){
				obstacle[i][j] = true;
			}
		}
	}
	open_set.push(start);
}
function greedy(){

		length = open_set.elements.length;

		if (length > 0){
		
		var min =  open_set.pop();
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
				
				camefrom[neighbour[0]][neighbour[1]] = min;
				open_set.push(neighbour);


				
	
			}
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

}

function BinaryHeap(scorer){
	this.elements = [];
	this.scorer = scorer; 
	this.push = function (element){
		if (this.elements.length == 0){
			this.elements[0] = element;
		}
		else{
			this.elements.push(element);
		}




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
		if(this.elements.length > 1){
		var result = this.elements[0] // return the minimum score element

		var end = this.elements.pop(); // get the last element

		this.elements[0] = end;
		this.sinkdown(0);
		}
		else{
			result = this.elements.pop();
		}
		

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

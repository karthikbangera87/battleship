var view = {

boardMessage: function(msg)
		    {
				var messageArea = document.getElementById("messageArea");
				messageArea.innerHTML = msg;		
		  	},
hitsMessage: function(location) 
			{
				var hits = document.getElementById(location);
				hits.setAttribute("class","hit");
			},
			
missMessage: function(location) 
			{
				var miss = document.getElementById(location);
				miss.setAttribute("class","miss");
			}

};

var model = {

gridSize :7,
shipCount : 3,
shipLength : 3,
isSunk :0,

ships :[{location:["00","10","20"],hits: ["","",""]},
		 {location:["33","43","53"],hits:["","",""]},
		 {location:["03","13","23"],hits:["","",""]}],

check : function(guess)
		{
			for( var i = 0; i< this.shipCount; i++)
			{
				var ship = this.ships[i];
				var index = ship.location.indexOf(guess);
				console.log("Index:",index);
				if(index >=0){
					ship.hits[index] = "hits";
					view.hitsMessage(guess);
					view.boardMessage("HIT");
					if(this.checkSunk(ship)){
						view.boardMessage("Your battleship has sunk !!!");
						this.isSunk++;
					}
					return true;
				}
				
			}
			view.missMessage(guess)
			view.boardMessage("MISS")
			return false;
		
		},
		
checkSunk: function(ship){
				for(var i = 0; i< this.shipLength; i++){
					if(ship.hits[i] !== "hits"){
						console.log("Value of ships[i]",ship.hits[i]);
						return false;
					}
				}
				
				return true;
		   }


};		

model.check("00");


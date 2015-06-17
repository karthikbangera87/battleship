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

var controller  = {

guess:0,

processGuess: function(guess){
				var location = parseGuess(guess);
				if(location){
					this.guess++;
					var hits =  model.check(location);
					if(hits && model.isSunk == model.shipCount)
					{
						alert("GAME OVER");
					}
				}
				
			  }



};

function parseGuess(guess){
			var alphabet = ["A","B","C","D","E","F","G"];
				if(guess == null || guess.length !==2)
				{
					alert("Invalid input");
				}
				else
				{
				
					var row = alphabet.indexOf(guess.charAt(0));
					var column = guess.charAt(1);
					if(isNaN(row) || isNaN(column))
					{
						alert("Invalid input");
					}
					else if(row < 0 || row > model.gridSize || column < 0 || column > model.gridsize)
					{
						alert("Invalid input");
					}	
					else
					{
						
						return(row+column);
					}
				}
			return null;
}

function init(){
var firebutton = document.getElementById("fireButton");
firebutton.onclick = firebuttonhandler;
var guessinput = document.getElementById("guessInput");
guessinput.onkeypress = keypresshandler

}

function keypresshandler(e){
	var firebutton = document.getElementById("fireButton");
	if(e.keyCode == 13)
	{
		firebutton.click();
		return false;
	}
}
function firebuttonhandler(){
var guessinput = document.getElementById("guessInput");
var guess = guessinput.value;
controller.processGuess(guess);
guessinput.value = "";

}

window.onload= init;
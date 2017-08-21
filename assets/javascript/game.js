var fighterChosen = false;
var enemyChosen = false;
var enemyName = "";
var yourName = "";
var enemyObject = {
}
var yourObject = {
}
var yourScope = "";
var enemyScope = "";
var wins = 0;


$(document).ready(function() {

  var pikachuObject = {
    name: "pikachu",
    type: "electric"
  }

  var bulbasaurObject = {
    name: "bulbasaur",
    type: "grass"
  }

  var squirtleObject = {
    name: "squirtle",
    type: "water"
  }

  var charmanderObject = {
    name: "charmander",
    type: "fire"
  }

  //For Debugging. Not in final build.
  $("#defeated").on("click", function(){
    clearEnemy();
  });


  
  
  $(".friendlyFighter").on("click", function(){

    //When any "friendly" fighter is clicked (AFTER the fighter was chosen) it should be made an enemy
    if (fighterChosen){
      if (enemyChosen === false){
        enemyScope = this;

        console.log("Choosing enemy.")
        this.classList.add('enemyFighter');
        this.classList.remove('friendlyFighter');
        enemyChosen = true;

        console.log("Your enemy was chosen: " + enemyChosen);
        console.log("this: " + this);
        enemyName = $(this).attr("name");
        moveEnemy(enemyScope);
        setEnemy(enemyName);
        
      }
      else {
        console.log("You already picked an enemy!.")
      }
    }  
    //When a fighter has not been chosen, choose a fighter!
    else{
      yourScope = this;
      console.log("Choosing your fighter.")
      this.classList.add('yourFighter');
      this.classList.remove('friendlyFighter');
      fighterChosen = true;

      console.log("Your fighter was chosen: " + fighterChosen);
      console.log("this: " + this);
      yourName = $(this).attr("name");
      moveYourFighter(yourScope);
      setYourFighter(yourName);
      
    }

  });


  function moveEnemy(enemy){
    var moveDesc = "#" + enemyName + "Description";
    console.log ("Move Description: " + moveDesc);

    console.log("Passed along: " + enemy);
    $(enemy).attr('src', 'assets/images/' + $(enemy).attr("name") + '-attack.gif');
    $(enemy).appendTo($(".rightSideRight"));

    console.log("Moving Pokemon Description too.");
    $(moveDesc).appendTo($(".rightSideRight"));

  }

  function moveYourFighter(yourFighter){
    var moveDesc = "#" + yourName + "Description";
    console.log ("Move Description: " + moveDesc);

    console.log("Passed along: " + yourFighter);
    $(yourFighter).attr('src', 'assets/images/' + yourName + '-attack.gif');
    $(yourFighter).appendTo($(".rightSideLeft"));

    console.log("Moving Pokemon Description too.");
    $(moveDesc).appendTo($(".rightSideLeft"));

  }

  function clearEnemy(){
    wins ++;
    var moveDesc = "#" + enemyName + "Description";

    $(enemyScope).attr('src', 'assets/images/' + $(enemyScope).attr("name") + '.gif');
    $(enemyScope).addClass('defeatedFighter');
    $(enemyScope).removeClass('enemyFighter');

    if ( wins === 1 ){
      console.log("Moving the enemy to defeatedLeft. Wins: " + wins);
      $(enemyScope).appendTo($("#defeatedLeft"));
      $(moveDesc).appendTo($("#defeatedLeft"));
    }
    else if ( wins === 2 ){
      console.log("Moving the enemy to defeatedMiddle. Wins: " + wins);
      $(enemyScope).appendTo($("#defeatedMiddle"));
      $(moveDesc).appendTo($("#defeatedMiddle"));
    }
    else if ( wins > 2 ){
      console.log("Moving the enemy to defeatedRight." + wins);
      $(enemyScope).appendTo($("#defeatedRight"));
      $(moveDesc).appendTo($("#defeatedRight"));
      alert("You beat all the enemy Pokemon! You win!");
    }

    enemyChosen = false;

  }

  function setEnemy(){
    if (enemyName === "pikachu"){
      enemyObject = pikachuObject;
    }
    else if (enemyName === "bulbasaur"){
      enemyObject = bulbasaurObject;
    }
    else if (enemyName === "squirtle"){
      enemyObject = squirtleObject;
    }
    else if (enemyName === "charmander"){
      enemyObject = charmanderObject;
    }
    else {
      console.log("Something is wrong with enemy name.")
    }
  }

  function setYourFighter(){
    if (yourName === "pikachu") {
      yourObject = pikachuObject;
    }
    else if (yourName === "bulbasaur") {
      yourObject = bulbasaurObject;
    }
    else if (yourName === "squirtle") {
      yourObject = squirtleObject;
    }
    else if (yourName === "charmander") {
      yourObject = charmanderObject;
    }
    else {
      console.log("Something is wrong with your fighter's name.")
    }
  }

  
  

});
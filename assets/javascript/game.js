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
var potionsLeft = 10;


$(document).ready(function() {

  $('#attackButton').prop('disabled', true);
  $('#potionButton').prop('disabled', true);

  var pikachuObject = {
    name: "pikachu",
    type: "electric",
    strongAgainst: ["water"],
    weakAgainst: [],
    HP: 100
  }

  var bulbasaurObject = {
    name: "bulbasaur",
    type: "grass",
    strongAgainst: ["water"],
    weakAgainst: ["fire"],
    HP: 100
  }

  var squirtleObject = {
    name: "squirtle",
    type: "water",
    strongAgainst: ["fire"],
    weakAgainst: ["grass","electric"],
    HP: 100
  }

  var charmanderObject = {
    name: "charmander",
    type: "fire",
    strongAgainst: ["grass"],
    weakAgainst: ["water"],
    HP: 100
  }

  //For Debugging. Not in final build.
  // $("#defeated").on("click", function(){
  //   clearEnemy();
  // });
  
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
        console.log("Your enemy is: " + enemyName);
        moveEnemy(enemyScope);
        setEnemy(enemyName);

        //Create Attack Button
        createButton();

        $("#instruction2").text("Click Attack to complete a turn.");
        $("#instruction3").text("Click Potion to heal. (Tip: Save them for a tough fight.)");
        
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
      console.log("Your fighter is: " + yourName);
      moveYourFighter(yourScope);
      setYourFighter(yourName);

      $("#instruction2").text("Click the Pokemon you want to fight first.");
      
    }

  });

  //Attack Button on Click
  $("#attackButton").on("click", function(){
    console.log("Attack button was pressed.");
    attackButtonPressed();
  });

  //Potion Button on click
  $("#potionButton").on("click", function(){
    console.log("Potion button was pressed.");
    potionButtonPressed();
  });

  function moveEnemy(enemy){
    //Makes sure this only runs before the win condition is met.
    if (wins < 3){
      var moveDesc = "#" + enemyName + "Description";
      var enemyHPMove = "#" + enemyName + "HP";

      // Move enemy image, after making it the "Attack" version.
      $(enemy).attr('src', 'assets/images/' + enemyName + '-attack.gif');
      $(enemy).appendTo($(".rightSideRight"));

      // Move enemy description.
      $(moveDesc).appendTo($(".rightSideRight"));

      //Move enemy HP
      $(enemyHPMove).appendTo($(".rightSideRight"));

    }
    else {
      console.log("You already won the game.");
    }
  }

  function moveYourFighter(yourFighter){
    var moveDesc = "#" + yourName + "Description";
    var yourHPMove = "#" + yourName + "HP";

    // Move your image, after making it the "Attack" version.
    $(yourFighter).attr('src', 'assets/images/' + yourName + '-attack.gif');
    $(yourFighter).appendTo($(".rightSideLeft"));

    // Move your description.
    $(moveDesc).appendTo($(".rightSideLeft"));

    //Move your HP.
    $(yourHPMove).appendTo($(".rightSideLeft"));


  }

  function clearEnemy(){
    wins ++;
    var moveDesc = "#" + enemyName + "Description";
    var enemyHPMove = "#" + enemyName + "HP";

    $(enemyScope).attr('src', 'assets/images/' + $(enemyScope).attr("name") + '.gif');
    $(enemyScope).addClass('defeatedFighter');
    $(enemyScope).removeClass('enemyFighter');

    $(enemyHPMove).text("0 / 100");
    $(enemyHPMove).addClass('noHP');
    $(enemyHPMove).removeClass('fullHP');


    if ( wins === 1 ){
      console.log("Moving the enemy to defeatedLeft. Wins: " + wins);
      $(enemyScope).appendTo($("#defeatedLeft"));
      $(moveDesc).appendTo($("#defeatedLeft"));
      $(enemyHPMove).appendTo($("#defeatedLeft"));
    }
    else if ( wins === 2 ){
      console.log("Moving the enemy to defeatedMiddle. Wins: " + wins);
      $(enemyScope).appendTo($("#defeatedMiddle"));
      $(moveDesc).appendTo($("#defeatedMiddle"));
      $(enemyHPMove).appendTo($("#defeatedMiddle"));
    }
    else if ( wins === 3 ){
      console.log("Moving the enemy to defeatedRight." + wins);
      $(enemyScope).appendTo($("#defeatedRight"));
      $(moveDesc).appendTo($("#defeatedRight"));
      $(enemyHPMove).appendTo($("#defeatedRight"));
      $("#instruction1").text("Congrats!");
      $("#instruction2").text("You defeated all 3 enemy Pokemon.");
      $("#instruction3").text("Refresh the page for a new game.");
      alert("You beat all the enemy Pokemon! You win!");
    }
    else {
      console.log("Something is wrong. Wins: " + wins);
    }

    enemyChosen = false;
    potionsLeft = potionsLeft + 2;
    $("#potionsLeft").text("Potions Left: " + potionsLeft);
    console.log("You found 2 potions.");

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

  function createButton(){
    $('#attackButton').prop('disabled', false);

    $('#potionButton').prop('disabled', false);
    var yourDmg = $("<p id='yourDamage'>");
    var enemyDmg = $("<p id='enemyDamage'>");

    $("#damageArea").append(yourDmg);
    $("#damageArea").append(enemyDmg);
  }
  
  function attackButtonPressed(){
    var enemyDamage = getRandomIntInclusive(25, 15);
    var yourDamage = getRandomIntInclusive(25, 15);
    var yourHP = "#" + yourName + "HP";
    var enemyHP = "#" + enemyName + "HP";

    // console.log("Attack button function executed.");
    console.log("Your type is: " + yourObject.type);
    console.log("You are weak to: " + yourObject.weakAgainst);

    console.log("Enemy type is: " + enemyObject.type);
    console.log("Enemy is weak to: " + enemyObject.weakAgainst);

    //Super Effective for your fighter.
    if (enemyObject.weakAgainst.indexOf(yourObject.type) !== -1) {
      console.log("It was super effective against " + enemyName);
      yourDamage = (yourDamage * 2);
    }
    //Super Effective against your fighter.
    else if (yourObject.weakAgainst.indexOf(enemyObject.type) !== -1) {
      console.log("It was super effective against " + yourName);
      enemyDamage = (enemyDamage * 2);
    }

    yourObject.HP = yourObject.HP - enemyDamage;
    console.log("You were attacked for " + enemyDamage + ".");
    $("#enemyDamage").text("You were attacked for " + enemyDamage + ".");
    $(yourHP).text(yourObject.HP + " / 100");


    enemyObject.HP = enemyObject.HP - yourDamage;
    console.log("The enemy was attacked for " + yourDamage + ".");
    $("#yourDamage").text("The enemy was attacked for " + yourDamage + ".");
    $(enemyHP).text(enemyObject.HP + " / 100");

    if (yourObject.HP < 1) {
      $("#instruction1").text("You lose!");
      $("#instruction2").text("Try to fight weaker enemies first!");
      $("#instruction3").text("Save your potions for tough fights. They heal for 20 HP.");
      alert("You lose! Refresh to play again.");
    }
    else if (enemyObject.HP < 1) {
      clearEnemy();
      console.log(enemyName + " has been defeated.");
    }


  }

  function potionButtonPressed(){
    var potionHealing = 20;
    var yourHP = "#" + yourName + "HP";

    //Gotta have potions left.
    if (potionsLeft > 0){
      potionsLeft--;
      console.log("You have " + potionsLeft + " potions left to use.");
      $("#potionsLeft").text("Potions Left: " + potionsLeft);

      if (yourObject.HP > 80){
        yourObject.HP = 100;
        console.log("You healed to 100.");
        $(yourHP).text(yourObject.HP + " / 100");
      }
      else if (yourObject.HP < 1){
        console.log("You are already dead.");
      }
      else {
        yourObject.HP = yourObject.HP + potionHealing;
        console.log("You healed for 20 points of damage.");
        $(yourHP).text(yourObject.HP + " / 100");
      }
        
    }
    else {
      console.log ("Error! You are out of potions.");
    }
      
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
    
  

});
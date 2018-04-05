$(document).ready(function () {
    var options = [
        {
            question: "Arthas was the Prince of what Kingdom?", 
            choice: ["Stormwind", "Quel'thalas", "Lordaeron", "Ironforge"],
            answer: 2,
            photo: "assets/images/lordaeron.jpg"
         },
         {
             question: "The Helm of Domination houses whose spirit?", 
            choice: ["Ner'zhul", "Uther", "Hogger", "Blackhand"],
            answer: 0,
            photo: "assets/images/nerzhul.jpg"
         }, 
         {
             question: "Who was the last of the Sunstrider Dynasty?", 
            choice: ["Kael'thas Sunstrider", "Lor'themar Theron", "Anasterian Sunstrider", "Sylvanas Windrunner" ],
            answer: 0,
            photo: "assets/images/kaelthas.jpg"
        }, 
        {
            question: "Who was the Ranger General of Quel'thalas at the time of the Third War?", 
            choice: ["Hauldron Brightwing", "Sylvanas Windrunner", "Lor'themar Theron", "Aelanthan Hailstrike" ],
            answer: 1,
            photo: "assets/images/sylvanas.jpg"
        }, 
        {
            question: "Which war marked the first use of paladins?", 
            choice: ["Third", "First", "Fourth", "Second" ],
            answer: 3,
            photo: "assets/images/alexandros.jpg"
        }, 
        {
            question: "Who was the first warchief of the Horde?", 
            choice: ["Thrall", "Orgrim Doomhammer", "Blackhand the Destroyer", "Gul'dan" ],
            answer: 2,
            photo: "assets/images/blackhand.jpg"
        }, 
        {
            question: "Once a titan, who was the leader of the Burning Legion?", 
            choice: ["Sargeras", "Aggramar", "Argus", "Aman'Thul" ],
            answer: 0,
            photo: "assets/images/sargeras.jpg"
        }, 
        {
            question: "What weapon has been wielded by the last and the current kings of Stormwind?", 
            choice: ["Frostmourne", "Shalamayne", "Ashbringer", "Doomhammer" ],
            answer: 1,
            photo: "assets/images/shalamayne.png"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //		console.log(pick.question);
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
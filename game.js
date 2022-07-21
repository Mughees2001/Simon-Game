
    //Checking if we are on Mobile Device or on a Laptop
    if ($(window).width() <= 1000){
        $('h1').text("Tap on Button to Start the Game"); 
        $('h1').css("border-style","solid");
        $('h1').css("background-color","orange");
        $('h1').on("click",function(){
            if(toggle==true){
                nextSequence();
                $('h1').addClass("pressed");
                setTimeout(function(){
                    $('h1').removeClass("pressed");
                },100);
            }
            toggle=false;
            $('h1').css("border-style","none");
            $('h1').css("background-color","transparent");
        })
    }
    else{   
        $(document).on("keydown",function(){
        if(toggle==true){
            nextSequence();
            }
        toggle=false;
        })
    }
    
    var userClickedPattern=[];
    var gamePattern=[];
    var buttonColours = ["red", "blue", "green", "yellow"];
    var level = 0;
    var toggle=true;

    
    function playSound(name){
        sound="sounds/"+name+".mp3"
        var randomSound = new Audio(sound);
        randomSound.play();
    }
    function nextSequence(){
        level++;
        $("h1").text("Level"+" "+level);
        var randomNumber=Math.floor(Math.random()*4);
        var randomChosenColour=buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
        userClickedPattern=[];
    }
    function animatePress(currentColour){
        currentColour="."+currentColour;
        $(currentColour).addClass("pressed");
        setTimeout(function(){
            $(currentColour).removeClass("pressed");
        },100);
    }
    function checkAnswer(currentLevel){
        
        if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
            if(userClickedPattern.length==gamePattern.length){
                setTimeout(nextSequence,1000);
            }
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200);
            if ($(window).width() <= 1000){
                $("h1").text("Game Over,Press the button to restart");
                $('h1').css("border-style","solid");
                $('h1').css("background-color","orange");
            }
            else{
                $("h1").text("Game Over, Press Any Key to Restart");

            }
            startOver();
        }
    }
    function startOver(){
        toggle=true;
        level=0;
        userClickedPattern=[];
        gamePattern=[];
    }
    
    $(".btn").click(function(){
        if(toggle==false){
            var userChosenColour = this.id;
            userClickedPattern.push(userChosenColour );
            console.log(userClickedPattern);
            playSound(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length-1);
        }
        
    })







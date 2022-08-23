 
var SpawnWithANumber = true // If you want to spawn the hud at a certain value with the "NumberSpawner" it depends on the number you set to spawn.
var NumberSpawner = 50 // Lists from 1-100 if the "SpawnWithANumber" is set to true.
var SoundWithNumber = true // Lists from 1-100 if the "SpawnWithANumber" is set to true.
var NumberSound = 20 // Lists from 1-100 if the "SpawnWithANumber" is set to true.

console.log('natural [app.js]')
console.log('natural [config]', "SpawnWithANumber =", SpawnWithANumber, "NumberSpawner =", NumberSpawner, "SoundWithNumber =", SoundWithNumber, "NumberSound =", NumberSound)
console.log('natural [config] | Check the configuration of this hud in app.js')

$("#healthcont").css("display", "none")

window.addEventListener("message", function(event) {

    if (event.data.health < 0) {
        document.getElementById("icon").className = "fas fa-skull-crossbones"
        $("#icon").css("animation", "IconScale 1.5s infinite")
    } else {
        document.getElementById("icon").className = "fas fa-heartbeat"
        $("#icon").css("animation", "none")
    }

    if (SpawnWithANumber == true) {
        if (event.data.health < NumberSpawner) {
            $("#healthcount").css("display", "block")
            $("#healthcount").css("animation", "contspawn 0.8s forwards")
        }

        if (event.data.health > NumberSpawner) {
            $("#healthcount").css("display", "none")
            $("#healthcount").css("animation", "contdrop 0.8s forwards")
        }

        if (event.data.hng < NumberSpawner) {
            $("#foodcount").css("display", "block")
            $("#foodcount").css("animation", "contspawn 0.8s forwards")
        }
        if (event.data.hng > NumberSpawner) {
            $("#foodcount").css("display", "none")
            $("#foodcount").css("animation", "contdrop 0.8s forwards")
        }

        if (event.data.thr < NumberSpawner) {
            $("#whatercount").css("display", "block")
            $("#whatercount").css("animation", "contspawn 0.8s forwards")
        }
        
        if (event.data.thr > NumberSpawner) {
            $("#whatercount").css("display", "none")
            $("#whatercount").css("animation", "contdrop 0.8s forwards")
        }


        if (event.data.armour > 0) {
            $("#shieldcount").css("display", "block")
            $("#shieldcount").css("animation", "contspawn 0.8s forwards")
        }

        if (event.data.armour == 0){
            $("#shieldcount").css("display", "none")
            $("#shieldcount").css("animation", "contdrop 1.5s forwards")
        }

        if(event.data.inMap){
            $(".container").css("animation", "inMap 1s forwards")
            $(".carhud").css("animation", "inMap 1s forwards")
            $(".carhud").fadeIn()
        }else if (event.data.notMap){
            $(".container").css("animation", "contspawn 1s forwards")
            $(".CHUD").fadeOut(150)
            $(".carhud").fadeOut(150)
        }
}

    if (event.data.voice == true) {
        $("#voice").css("animation", "vctr 0.5s forwards")
    }else if  (event.data.voice == false) {
        $("#voice").css("animation", "vcfl 0.5s forwards")
    }

    if (event.data.IsSwiming ==  true) {
        $("#swimcount").css("display", "block")
        $("#swim").animate({height: event.data.Ox + "%"}, 350)
    } else if (event.data.IsSwiming ==  false) {
        $("#swimcount").css("animation", "contdrop 1s forwards")
        $("#swimcount").css("display", "none")
    }

    if (event.data.cfg == true){
        $(".HUD").hide();
        $(".CHUD").fadeOut(100);
        $(".logo").fadeOut(100);
    } else if (event.data.cfg == false) {
        $(".HUD").show();
        $(".carhud").fadeIn();
        $(".logo").fadeIn();
    }

    $("#health").animate({
        height: event.data.health + "%"
    }, 650)
    
    $("#shield").animate({
        height: event.data.armour + "%"
    }, 650)

    $("#food").animate({
        height: event.data.hng + "%"
    }, 650)
    
    $("#whater").animate({
        height: event.data.thr + "%"
    }, 650)


    if (event.data.vh == true) {
        $(".CHUD").css("display", "block")
        $(".CHUD").fadeIn(0)
        $(".CHUD").css("animation", "contspawn 0.8s forwards")
        $("#fuel").animate({height: event.data.fuel + "%"}, 350)
        $(".km").html(Math.ceil(event.data.speed))
        $(".gearrount").html(Math.round(event.data.gear))
        $("#engine").animate({height: event.data.engine + "%"}, 350)
        $("#right").animate({width : event.data.rpm * 50 + 3 + "%"})
        $("#left").animate({width : event.data.rpm * 50 + 3  + "%"})
        
    } else if (event.data.vh == false) {
        setTimeout(() => {
            $(".CHUD").fadeOut(150)
        }, 250);
    }


    const health = new Audio("src/js/health.mp3");
    const hunger = new Audio("src/js/hunger.mp3");
    const thirst = new Audio("src/js/thirst.mp3");

    if(SoundWithNumber == true) {
        if (event.data.health < NumberSound) {
            health.play();
            setTimeout(function() {
                health.pause();
              }, 1000);
        } else  {
            health.pause();
        }
        if (event.data.hng < NumberSound) {
            hunger.play();
            setTimeout(function() {
                hunger.pause();
              }, 1000);
        }  else  {
            hunger.pause();
        }

        if (event.data.thr < NumberSound) {
            thirst.play();
            setTimeout(function() {
                thirst.pause();
              }, 1000);
        } else  {
            thirst.pause();
        }

    }
})

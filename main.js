//start
var audioBuffer = null;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = null;
var source;

function PlaySound(Category, NameSound) {
    if (Category === "VeryLoud") {
        if (NameSound == "OTH_L") {
            GetSound("./Sounds/VeryLoud/OTH_L.mp3")
        } else if(NameSound == "NokiaRT_L") {
            GetSound("./Sounds/VeryLoud/NokiaRT_L.mp3")
        }
    }
    else if (Category == "Normal") {
        if (NameSound == "OTH") {
            GetSound("./Sounds/Normal/OTH.mp3")
        } else if(NameSound == "NokiaRT") {
            GetSound("./Sounds/VeryLoud/NokiaRT.mp3")
        }
    }
}

function GetSound(sound) {
    if (audioContext == null) {
        audioContext = new AudioContext();
    }
    var request = new XMLHttpRequest();
    if (source) {
        try {
            source.stop();
        } catch (err) {}
    }
    source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    request.open('GET', sound, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buffer) {
            source.buffer = buffer;
            source.start(0);
        });
    }
    request.send();
}

function createRipple(event) {
    console.log("Clicked")
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle)
}

const buttons = document.getElementsByTagName("button");
console.log(buttons)
for (const button of buttons) {
    console.log("Setup")
    button.addEventListener("click", createRipple);
    console.log("Setup")
}

console.log("Start")
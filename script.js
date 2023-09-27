// Lager variabler som jeg kommer til å bruke senere i koden.
let hunger = 50;
let thirst = 50;
let mood = 50;
let health = 100;
let age = 0;
let count = 0;
let foodValue = 10;
let moodValue = 10;
let hungerDecrease = 0.5;
let thirstDecrease = 0.5;
let moodDecrease = 0.5;

// Henter inn data fra HTML dokumentet via ID og gjør det om til en const variabel.
const hungerBar = document.getElementById("hunger-bar");
const thirstBar = document.getElementById("thirst-bar");
const moodBar = document.getElementById("mood-bar");
const healthBar = document.getElementById("health-bar");
const feedButton = document.getElementById("feed-button");
const waterButton = document.getElementById("water-button");
const playButton = document.getElementById("play-button");
const cbutton = document.getElementById("color-button");
const restartButton = document.getElementById("restart")
const hale = document.getElementById("Hale");
const kropp = document.getElementById("KroppOransje");
const hode = document.getElementById("Hode");
const walkButton = document.getElementById("walk-button")


// Henter inn alle SVGene, for å kode når dem skal vises og ikke vises.
var svg1 = document.querySelector("#petalive");
var svg2 = document.querySelector("#petalmostdead");
var svg3 = document.querySelector("#petdead");

//  Øker Mengden som går opp når du trykker på Feed, Water og Play knappen
function increaseValues() {
    foodValue += age * 0.01;
    moodValue += age * 0.005;
}
// Øker Mengden som går ned som Alderen går opp
function increaseDecreaseValues() {
    if (age % 5 === 0) {
        hungerDecrease *= 1.22;
        thirstDecrease *= 1.22;
        moodDecrease *= 1.27;
    }
}
// Plusser på foodValue til Hunger baren. Maks mengde er på 100.
feedButton.addEventListener("click", function() {
    if(health > 0) {
        hunger = Math.min(hunger + foodValue, 100);
        updateHungerBar();
    }
});
// Plusser på foodValue til Thirst baren. Maks mengde er på 100.
waterButton.addEventListener("click", function() {
    if(health > 0) {
        thirst = Math.min(thirst + foodValue, 100);
        updateThirstBar();
    }
});
// Plusser på moodValue til Mood baren. Trekker 10 value fra hunger og thirst bar.
playButton.addEventListener("click", function() {
    if(hunger > 10 && thirst > 10) {
        if(health > 0) {
            mood = Math.min(mood + moodValue, 100);
            hunger = Math.max(hunger - 5, 0);
            thirst = Math.max(thirst - 5, 0);
            updateMoodBar();
            updateHungerBar();
            updateThirstBar();
        }
    }
});
// Knapp som gjemmer gammel svg, viser fram spritesheeten og gjemmer Walk knappen som gjør at man ikke kan spamme den. setTimeouten gjør at den går tilbake som den var etter 2,45 sekund.
walkButton.addEventListener("click", function() {
    if(health > 0) {
        walkpanda.classList.remove("hidden")
        svg1.classList.add("hidden");
        walkButton.classList.add("hidden");
        setTimeout(() => {
            walkpanda.classList.add("hidden");
            walkButton.classList.remove("hidden");
            svg1.classList.remove("hidden");
        }, 2450);
    }
});
// Funksjon som gjør at barene er value % av 100.
function updateHungerBar() {
    hungerBar.style.width = hunger + "%";
}

function updateThirstBar() {
    thirstBar.style.width = thirst + "%";
}

function updateMoodBar() {
    moodBar.style.width = mood + "%";
}

// Gjør det samme som de andre, men når health variablen er på 0, så vil alle de andre knappene stoppe.
function updateHealthBar() {
    healthBar.style.width = health + "%";
    if(health <= 0) {
        feedButton.setAttribute("disabled", true);
        waterButton.setAttribute("disabled", true);
        playButton.setAttribute("disabled", true);
        hunger = 0;
        thirst = 0;
        mood = 0;
        updateHungerBar();
        updateThirstBar();
        updateMoodBar();
    }
}
// Gjør at Age variablen går opp hvert 200 millisekund så lenge mood har en value på over 0.
let ageInterval = setInterval(() => {
    if (mood > 0) {
        count++;
        if (count % 1 === 0) {
            age++;
            document.getElementById("age-value").innerHTML = age;
            document.getElementById("age-value-restart").innerHTML = age;
            increaseValues();
            increaseDecreaseValues();
        }
    }
}, 500);
// Gjør at Barene går nedover. Decrease variablene er hvor mye de går ned. Når både Hunger og Thirst er = 0, vil health variablen gå ned med 5 hvert 200 ms.
let decreaseInterval = setInterval(() => {
    hunger = Math.max(hunger - hungerDecrease, 0);
    thirst = Math.max(thirst - thirstDecrease, 0);
    mood = Math.max(mood - moodDecrease, 0);
    if(hunger === 0 && thirst === 0) {
        health = Math.max(health - 5, 0);
    }
    updateHungerBar();
    updateThirstBar();
    updateMoodBar();
    updateHealthBar();
}, 200);
// Label til de forskjellige barene. Displayer også hvor mye som er igjen av Value, ut av 100.
let labelInterval = setInterval(() => {
    document.getElementById("health-label").innerHTML = "Health: " + health.toFixed(0) + "/" + 100;
    document.getElementById("hunger-label").innerHTML = "Hunger: " + hunger.toFixed(0) + "/" + 100;
    document.getElementById("thirst-label").innerHTML = "Thirst: " + thirst.toFixed(0) + "/" + 100;
    document.getElementById("mood-label").innerHTML = "Mood: " + mood.toFixed(0) + "/" + 100;
}, 200);
// Funksjon for å generere en random farge.
function getRandomShade() {
    // Skaffer en random value av hue, saturation og lightness.
    let hue = Math.floor(Math.random() * 361);
    let saturation = Math.floor(Math.random() * 101);
    let lightness = Math.floor(Math.random() * 101);
  
    // Henter inn fra hver HSL variabel og setter dem sammen til 1 farge
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
// Når "Change Color" knappen trykkes så får hver del, en helt random farge hver.
  cbutton.addEventListener("click", function() {
    hale.style.fill = getRandomShade();
    kropp.style.fill = getRandomShade();
    hode.style.fill = getRandomShade();
  });

// Innhenter #Hale svg elementet på figuren
var Halerotate = document.querySelector("#Hale");

// Innhenter black-screen diven fra HTML-en.
const blackScreen = document.querySelector('#black-screen');

// Innhenter Hode og Pet knappen fra HTML-en.
var petgroup = document.getElementById("Hode_00000008134417900778916410000005723629010135854234_");
var petbutton = document.getElementById("pet-button");

// Interval for å legge til og fjerne klasser fra de forskjellige HTML elementene.
setInterval(function() {
    Halerotate.classList.add("haleAnimasjon");
    if (health < 60) {
        svg1.classList.add("hidden");
        svg2.classList.remove("hidden");
        cbutton.classList.add("hidden");
        walkButton.classList.add("hidden");
        walkpanda.classList.add("hidden")
        petbutton.classList.add("hidden")
      }
    if (health === 0) {
      svg2.classList.add("hidden");
      svg3.classList.remove("hidden");
      blackScreen.classList.add('show');
    }
  }, 100);

// Gjør at restart knappen reloader siden. Kjapp og fin løsning.
  restartButton.addEventListener("click", function() {
    location.reload();
});

// Gjør at Hodet gruppen i Svgen #PetAlive går opp og ned når man trykker på Petbutton. Den varer i 2 sekund. Ligner på at klapper den litt på hodet <3.
petbutton.addEventListener("click", function() {
    petgroup.setAttribute("transform", "translate(0, 0)");
  
    petgroup.style.transition = "transform 2s";
  
    setTimeout(function(){
      petgroup.setAttribute("transform", "translate(0, 40)");
      setTimeout(function(){
      petgroup.setAttribute("transform", "translate(0, 0)");
      },2000);
    },0);
  });

// Kode som gjør at når en knapp trykke, så trykkes den buttonen.
  document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyQ') {
      document.getElementById("feed-button").click();
    }
  });
  document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyW') {
      document.getElementById("water-button").click();
    }
  });
  document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyE') {
      document.getElementById("play-button").click();
    }
  });
  document.addEventListener('keydown', function(event) {
    if (health > 60 && event.code === 'KeyR') {
      document.getElementById("color-button").click();
    }
  });
  document.addEventListener('keydown', function(event) {
    if (health > 60 && event.code === 'KeyT') {
      document.getElementById("walk-button").click();
    }
  });
  document.addEventListener('keydown', function(event) {
    if (health > 60 && event.code === 'KeyY') {
      document.getElementById("pet-button").click();
    }
  });
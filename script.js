/*let strings = [
    "The quick brown fox jumps over the lazy dog.        ",
    "Sphynx of black quartz, judge my vow.               ",
    "Two driven jocks help fax my big quiz.              ",
    "Waltz, nymph, for quick jigs vex Bud                ",
    "My girl wove six dozen plaid jackets before she quit",
    "The quick brown fox jumps over the lazy dog.        ",
]*/

let strings = [
    "                                                                         ",
    "Think of these thoughts as hackneyed and trite.                          ",
    "Cliched, depraved, disturbing and contrived.                             ",
    "Shallow, cold, wretched. Miserable, dark and any other adjective.        ",
    "Choose to sit safely out of the sun,                                     ",
    "away from rays so blinding to the eye.                                   ",
    "Singing songs someone's already sung. Averting gaze from beautiful light.",
    "But as complacency settles, anxieties will rise                          ",
    "and part this Soul as Jekyll parted Hyde.                                ",
    "Now I'm but half of a hollow man's lies:                                 ",
    "the love, the hate, the emotional side.                                  ",
]

let charset = " ABCDEFGHSTUVWXYZqrstuvwxyzIJKLMNOPQRabcdefghijklmnop,.!?"
//"EeTt!AaOoIiNnSsH hRrDdLlUuCc,WwMmFfYyGgPpBb.VvKkXxJjQqZz"

var current = 0;
var progress = { value: 0 };
var text = document.querySelector(".transition");
text.textContent = strings[current];

var tween = new TWEEN.Tween();

function transition() {
    tween = new TWEEN.Tween(progress, false)
        .to({value: 1}, 1000)
        .easing(TWEEN.Easing.Back.Out)
        .onUpdate(() => {
            update()
        })
        .onComplete(() => {
            progress = { value: 0 };
            current += 1;
            if ((current + 1) >= strings.length) {
                current = 0;
            }
        })
        .start();
}

function update() {

    var characters = strings[current].split("");
    var asciiValues = []; characters.forEach((v) => { asciiValues.push(charset.indexOf(v)) });

    var targetCharacters = strings[current + 1].split("");
    var targetAsciiValues = []; targetCharacters.forEach((v) => { targetAsciiValues.push(charset.indexOf(v)) });

    var output = [];

    //console.log(progress)
    
    for (var i = 0; i < asciiValues.length; i++) {
        let newValue = Math.floor(lerp(asciiValues[i], targetAsciiValues[i], progress.value));
        let newCharacter = charset.charAt(newValue);
        output.push(newCharacter);
    }

    text.textContent = output.join("");

}

function lerp( a, b, alpha ) {
    return a + alpha * ( b - a );
}

function animate(time) {
    tween.update(time);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
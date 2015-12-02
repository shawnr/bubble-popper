'use strict';

console.log('Altered! Content script');

var bubbleTerms = [{
    'a': 'Death Tax',
    'b': 'Estate Tax',
    'descriptionA': 'Term used by fiscal conservatives for estate tax.',
    'descriptionB': 'Also known as "inheritance tax."'
}, {
    'a': 'Affordable Care Act',
    'b': 'Obamacare',
    'descriptionA': 'Act signed by President Obama to reform health care industry in 2010',
    'descriptionB': 'Term used often by fiscally conservative Republican party members (as opposed to Democratic) to talk about the Affordable Care Act'
}, {
    'a': '\b(Climate Change)\W+(?:\w+\W+){1,}?(scam)\b',
    'b': 'Climate Change',
    'descriptionA': 'These words are often used together by climate change deniers ',
    'descriptionB': 'Designates the theory that the earth\'s atmosphere is in a steady rise due to human production of Co2'
}, {
    'a': 'Evolution + Creation',
    'b': 'Evolution',
    'descriptionA': 'These words are often used together by Creationists and intellegent design theorists, arguing for god\'s hand in origin of species.',
    'descriptionB': 'Designates the theory that species desended slowly over millions of years from a shared ancestor. '
}, {
    'a': 'Vaccination + Autism',
    'b': 'Vaccination',
    'descriptionA': 'These words are often used together by vaccination skeptics who believe a link between vaccines and autism exists.',
    'descriptionB': 'Designates the practice of introducing an agent into the body to immunize it against disease.'
}, {
    'a': 'Ammendment + Self-Defense + Arms',
    'b': 'People + Gun Control',
    'descriptionA': 'These words often appear in the discourses of gun rights advocates',
    'descriptionB': 'These words often appear in the discourses of gun control advocates'
}, {
    'a': 'Death Penalty + Murder',
    'b': 'Death Penalty + Capital Punishment + Deterrence',
    'descriptionA': 'These words appear often in the discourses of those in opposition to the death penalty',
    'descriptionB': 'These words often appear in the discourses of those in support of the death penalty'
}, {
    'a': 'Pro-Life',
    'b': 'Pro-Choice',
    'descriptionA': 'Term used by anti-abortionists to designate the choice of mothers',
    'descriptionB': 'Term used by pro-abortionists to designate the choice of mothers'
}, {
    'a': 'Homosexualism',
    'b': 'Gay',
    'descriptionA': 'Term used often by anti-gay advocates',
    'descriptionB': 'Term often used over the term homosexual by those sympathetic to gay rights'
}];
// Grab the page content
var pageContent = document.getElementsByTagName('body');
var bodyText = pageContent[0].innerText;
var bubblesFoundList = [];
// Loop through all the terms.
bubbleTerms.forEach(function (term) {
    // Check each term to see if it exists in the text.
    var result = {};
    var matched = false;
    console.log('checking: ' + term.a);
    if (bodyText.includes(term.a) || bodyText.includes(term.a.toLowerCase())) {
        result = {
            term: term.a,
            description: term.descriptionA
        };
        matched = true;
    } else {
        var bubbleRE = new RegExp(term.a);
        var matchArray = bubbleRE.exec(bodyText);
        if (matchArray != null) {
            matched = true;
            console.log('matchArray = ' + matchArray);
            result = {
                term: term.a,
                description: term.descriptionA
            };
        }
    }

    if (!matched) {
        console.log('checking: ' + term.b);
        if (bodyText.includes(term.b) || bodyText.includes(term.b.toLowerCase())) {
            result = {
                term: term.b,
                description: term.descriptionB
            };
            matched = true;
        } else {
            var bubbleRE = new RegExp(term.b);
            var matchArray = bubbleRE.exec(bodyText);
            if (matchArray != null) {
                matched = true;
                result = {
                    term: term.a,
                    description: term.descriptionA
                };
            }
        }
    }

    if (matched) {
        bubblesFoundList.push(result);
        console.log("Matched on: " + result.term);
    }
});
var bubbleContainer = document.createElement('div');
var bubbleContainerClassAttr = document.createAttribute('class');
bubbleContainerClassAttr.value = 'bubbleContainer';
bubbleContainer.setAttributeNode(bubbleContainerClassAttr);
bubblesFoundList.forEach(function (bubble) {
    var newBubble = document.createElement('div');
    var bubbleClassAttr = document.createAttribute('class');
    bubbleClassAttr.value = 'bubbleTerm';
    newBubble.setAttributeNode(bubbleClassAttr);
    var bubbleHeading = document.createElement('h3');
    var bubbleTitle = document.createTextNode('Found: ' + bubble.term);
    bubbleHeading.appendChild(bubbleTitle);
    var bubbleDescriptionContainer = document.createElement('p');
    var bubbleDescription = document.createTextNode(bubble.description);
    bubbleDescriptionContainer.appendChild(bubbleDescription);
    newBubble.appendChild(bubbleHeading);
    newBubble.appendChild(bubbleDescriptionContainer);
    bubbleContainer.appendChild(newBubble);
    console.log('Created bubble for: ' + bubble.term);
});
document.body.appendChild(bubbleContainer);
//# sourceMappingURL=contentscript.js.map

'use strict';

console.log('Altered! Content script');

var bubbleTerms = [
    {
        'a': new RegExp(/(Death Tax)/gim),
        'b': new RegExp(/(Estate Tax)/gim),
        'descriptionA': 'Term used by fiscal conservatives for estate tax.',
        'descriptionB': 'Also known as "inheritance tax."'
    },
    {
        'a': new RegExp(/(Affordable Care Act)/gim),
        'b': new RegExp(/(Obamacare)/gim),
        'descriptionA': 'Act signed by President Obama to reform health care industry in 2010',
        'descriptionB': 'Term used often by fiscally conservative Republican party members (as opposed to Democratic) to talk about the Affordable Care Act'
    },
    {
        //'a': '\b(Climate Change)[\W+(?:\w+\W+){1,}]*(scam)\b',
        'a': new RegExp(/(Climate Change)[\W+(?:\w+\W+){1,}]*(scam)/gim),
        'b': new RegExp(/(Climate Change)/gim),
        'descriptionA': 'These words are often used together by climate change deniers ',
        'descriptionB': 'Designates the theory that the earth\'s atmosphere is in a steady rise due to human production of Co2'
    },
    {
        'a': new RegExp(/(Evolution)[\W+(?:\w+\W+){1,}]*(Creation)/gim),
        'b': new RegExp(/(Evolution)/gim),
        'descriptionA': 'These words are often used together by Creationists and intellegent design theorists, arguing for god\'s hand in origin of species.',
        'descriptionB': 'Designates the theory that species desended slowly over millions of years from a shared ancestor. '
    },
    {
        'a': new RegExp(/(Vaccination)[\W+(?:\w+\W+){1,}]*(Autism)/gim),
        'b': new RegExp(/(Vaccination)/gim),
        'descriptionA': 'These words are often used together by vaccination skeptics who believe a link between vaccines and autism exists.',
        'descriptionB': 'Designates the practice of introducing an agent into the body to immunize it against disease.'
    },
    {
        'a': new RegExp(/(Ammendment)[\W+(?:\w+\W+){1,}]*(Arms)/gim),
        'b': new RegExp(/(People)[\W+(?:\w+\W+){1,}]*(Gun Control)/gim),
        'descriptionA': 'These words often appear in the discourses of gun rights advocates',
        'descriptionB': 'These words often appear in the discourses of gun control advocates'
    },
    {
        'a': new RegExp(/(Death Penalty)[\W+(?:\w+\W+){1,}]*(Murder)/gim),
        'b': new RegExp(/(Death Penalty)[\W+(?:\w+\W+){1,}]*(Capital Punishment)/gim),
        'descriptionA': 'These words appear often in the discourses of those in opposition to the death penalty',
        'descriptionB': 'These words often appear in the discourses of those in support of the death penalty'
    },
    {
        'a': new RegExp(/(Pro-Life)/gim),
        'b': new RegExp(/(Pro-Choice)/gim),
        'descriptionA': 'Term used by anti-abortionists to designate the choice of mothers',
        'descriptionB': 'Term used by pro-abortionists to designate the choice of mothers'
    },
    {
        'a': new RegExp(/(Homosexualism)/gim),
        'b': new RegExp(/(Gay)/gim),
        'descriptionA': 'Term used often by anti-gay advocates',
        'descriptionB': 'Term often used over the term homosexual by those sympathetic to gay rights'
    }
]
// Grab the page content
var pageContent = document.getElementsByTagName('body');
var bodyText = pageContent[0].innerText;
var bubblesFoundList = [];
// Loop through all the terms.
bubbleTerms.forEach(function(term){
    // Check each term to see if it exists in the text.
    var result = {};
    var matched = false;
    console.log('checking: ' + term.a);

    var matchArray = term.a.test(bodyText);
    if (matchArray !== false) {
        matched = true;
        console.log('matchArray = ' + matchArray);
        result = {
            term: term.a,
            description: term.descriptionA
        }
    }


    if (!matched){
        console.log('checking: ' + term.b);
        var matchArray = term.b.test(bodyText);
        if (matchArray !== false) {
            matched = true;
            result = {
                term: term.a,
                description: term.descriptionA
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
bubblesFoundList.forEach(function(bubble){
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

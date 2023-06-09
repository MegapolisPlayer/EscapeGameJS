//Codes
//Czech - CZ
//English - EN
//Russian - RU
//German - DE
//Skolstina - AL

let TranslatedText = [];
let AmountTranslations = 0;

function TranslationLoad(lang, lid) {
	console.log("Loading LC-"+lang);
	TranslatedText.push([]);
	let req = new XMLHttpRequest();
	req.open("GET", "lang/text"+lang+".txt");
	req.onload = (event) => {
		console.log("Processing LC-"+lang);
		let splittext = req.responseText;
		splittext = splittext.replaceAll('\r', ''); //for windows compatibility
		splittext = splittext.split('\n');
		for(let Id = 0; Id < splittext.length; Id++) {
			if(splittext[Id].length !== 0) {
				(TranslatedText[lid]).push(splittext[Id]);
			}
		}
		AmountTranslations++;
		console.log("Language code "+lang+": ");
		console.log(TranslatedText[lid]);
	}
	req.send();
}

function TranslationGetMultipleLines(lid, idf, amount) {
	let tempResult = "";
	for(let Id = 0; Id < amount; Id++) {
		tempResult += TranslatedText[lid][idf + Id];
		if(Id !== amount - 1) {
			tempResult += '\n';
		}
	}
	return tempResult;
}

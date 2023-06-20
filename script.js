const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQoutes = [];


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner() {
   
    loader.hidden = true;
    quoteContainer.hidden = false;
    
}
// show new Quotes
function newQuote () {
    showLoadingSpinner();
    const quote = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
    authorText.textContent = quote.author;
    

    // check quote text 
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// get quotes from api

async function getQuotes() {
    showLoadingSpinner();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiURL);
        apiQoutes = await response.json();
        newQuote();
    } catch(error) {
        console.log(error)
    }
}

// tweet Quote

function tweetQuote () {

    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    open(twitterURL , '_blank')
}

// Events

newQuoteBtn.addEventListener('click' , newQuote);
twitterBtn.addEventListener('click' , tweetQuote);

getQuotes();
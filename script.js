const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoader() {
        quoteContainer.hidden = false;
        loader.hidden = true;
}

let errorCount = 0;
//Get Quote from API
async function getQuote() {
    showLoader()
    const proxy = 'https://infinite-refuge-66842.herokuapp.com/'
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxy + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        if (data.quoteText.length > 80) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        removeLoader()
        errorCount = 0;
        } catch (error) {
            errorCount++;
            if (errorCount < 30) {
            getQuote();
            } else {
                removeLoader()
                quoteText.innerText = 'Sorry! There is an Error.'
                authorText.innerHTML = '<i class="fas fa-exclamation-triangle"></i>'
                newQuoteBtn.hidden = true;
                twitterBtn.hidden = true;
            }
        }
}


function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(twitterUrl,'_blank');
}


//Event listener

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//on load
getQuote()




let results = [];
let quotesList = null;
const searchBox = document.getElementById("search-box");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const quotesSection = document.getElementById("quotes-list-section");
const errorMessage = document.getElementById("error-message");

const generateQuoteList = () => {
  const quotesList = document.createElement("ul");
  quotesList.setAttribute("id", "quotes-list");
  quotesList.setAttribute("class", "quotes-list");
  quotesSection.appendChild(quotesList);
  return quotesList;
};

const generateQuote = (quote, author, quotesList) => {
  const li = document.createElement("li");
  li.setAttribute("class", "quote-item");

  const blockquote = document.createElement("blockquote");

  const span = document.createElement("span");
  span.textContent = quote;
  span.setAttribute("class", "quote-block-span");

  blockquote.appendChild(span);
  blockquote.setAttribute("class", "block-quote");

  const cite = document.createElement("cite");
  cite.textContent = author;
  cite.setAttribute("class", "quote-block-citation");

  const footer = document.createElement("footer");
  footer.setAttribute("class", "quote-block-footer");

  footer.appendChild(cite);
  blockquote.appendChild(footer);

  li.appendChild(blockquote);
  li.setAttribute("class", "quote-item");

  quotesList.appendChild(li);
};

const fetchQuotes = async () => {
  try {
    const response = await fetch("https://dummyjson.com/quotes");
    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }
    const jsonData = await response.json();
    results = jsonData.quotes;
    quotesList = document.getElementById("quotes-list");
    results.forEach((ele) => generateQuote(ele.quote, ele.author, quotesList));
    searchBox.style.display = "block";
    return jsonData;
  } catch (error) {
    errorMessage.textContent = "Failed to fetch quotes. Please try again later :(";
    searchBox.style.display = "none";
    return error;
  }
};

let previousKeyword = null;

const handleSearch = (event) => {
  event.preventDefault();

  const keyword = searchInput.value.trim().toLowerCase();

  const doesQuoteListExist = document.getElementById("quotes-list");

  if (doesQuoteListExist && previousKeyword !== keyword) {
    quotesSection.removeChild(quotesList);
    quotesList = null;
  }

  if (!quotesList) {
    previousKeyword = keyword;
    quotesList = generateQuoteList();
  }

  const filteredQuotes = results.filter((ele) => {
    const quote = ele.quote.toLowerCase();
    return quote.includes(keyword);
  });

  if (filteredQuotes.length === 0) {
    errorMessage.textContent = "No results found.";
  } else {
    errorMessage.textContent = "";
    filteredQuotes.forEach((ele) => generateQuote(ele.quote, ele.author, quotesList));
  }
};

fetchQuotes();

searchButton.addEventListener("click", handleSearch);

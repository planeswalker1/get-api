// Manipulates responseField to render a formatted and appropriate message
function renderResponse(res) {
  // Displays either message depending on results
  if (res.errors) {
    responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
  } else {
    responseField.innerHTML = '<p>Your shortened url is: </p><p>' + res.shortUrl + '</p>';
  }
}

// AJAX functions
function shortenUrl() {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({ destination: urlToShorten });
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'apikey': apiKey
    },
    body: data
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
    throw new Error('Request failed!');
  }, networkError => {
    console.log(networkError.message)
  }).then(jsonResponse => {
    renderResponse(jsonResponse);
  });
}

// Clear page and call AJAX functions
function displayShortUrl(event) {
  event.preventDefault();
  while (responseField.firstChild) {
    responseField.removeChild(responseField.firstChild)
  }
  shortenUrl();
}

// Information to reach API
const apiKey = 'e50ffb47d90a4e98b186b3c89cd84f4c';
const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
const inputField = document.querySelector('.group__input');
const shortenButton = document.querySelector('.btn');
const responseField = document.querySelector('.response-field');

shortenButton.addEventListener('click', displayShortUrl);

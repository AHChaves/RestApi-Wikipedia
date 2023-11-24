document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector(`.search-box`);
    const input = form.querySelector(`input[type="search"]`);
    const resultsContainer = document.querySelector('.results');
    const resultsCounter = document.querySelector('header p');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        const searchTerm = input.value;
        if(searchTerm){
            searchWikipedia(searchTerm);
        }
    });

    function searchWikipedia(searchTerm){
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;

        fetch(url).then(response => response.json()).then(data => {
            displayResults(data.query.search);
        }).catch(error => alert('Error: ' + error));
    }

    
    function displayResults(results){


        resultsContainer.innerHTML = '';
        resultsCounter.textContent = `Número de resultados: ${results.length}`
        
        results.forEach(result => {
            //console.log(result);
            const resultsElements = document.createElement('div');
            resultsElements.className = 'result';
            resultsElements.innerHTML = `<h3>${result.title}</h3><p>${result.snippet}</p>`;
            resultsContainer.appendChild(resultsElements);

            getDetails(result);
        });
    }

    function getDetails(result) {
        const pageUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=1&origin=*&pageids=${result.pageid}`;

        fetch(pageUrl).then(response => response.json()).then(data => {
            let pageList = data.query.pages;
            Object.keys(pageList).forEach(id => {
                printDetails(pageList[id]);
            })
        }).catch(error => alert('Error: ' + error));
    }

    function printDetails(page) {
        const pageDetails = document.createElement('div');
        //resultsElements.className = 'result';
        pageDetails.innerHTML = `<p>titulo: ${page.title}</p>`;
        resultsContainer.appendChild(pageDetails);
    }
});
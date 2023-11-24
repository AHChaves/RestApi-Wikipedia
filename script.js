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
            resultsElements.innerHTML = `<a href="#" if="titulo${result.pageid}">${result.title}</a><p>${result.snippet}</p>`;
            resultsContainer.appendChild(resultsElements);

            printDetails(result, resultsElements);
        });
    }

    function printDetails(result, div) {
        const pageUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&redirects=1&origin=*&pageids=${result.pageid}`;

        const pageDetailsDiv = document.createElement('div');
        pageDetailsDiv.className = 'details';
        div.appendChild(pageDetailsDiv);

        createDetailBox(pageDetailsDiv, 'Núm. palavras', result.wordcount);
        createDetailBox(pageDetailsDiv, 'Tamanho (bytes)', result.size);
        createDetailBox(pageDetailsDiv, 'ID da página', result.pageid);

        fetch(pageUrl).then(response => response.json()).then(data => {
            const pageList = data.query.pages;

            Object.keys(pageList).forEach(id => {
                const currentPage = pageList[id];

                
            })
        }).catch(error => alert('Error: ' + error));
    }

    function createDetailBox(div, string, value) {
        let wordCountBox = document.createElement('div');
        wordCountBox.className = 'detailBox';

        wordCountBox.innerHTML = `<p>${string}: ${value}</p>`;

        div.appendChild(wordCountBox);
    }
});
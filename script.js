document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search box
    searchField.value = '';
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';

    if (searchText === '') {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('spinner').style.display = 'none';
    }
    else {
        // load data
        const url = ` https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = totalbooks => {
    const books = totalbooks.docs;
    document.getElementById('total').style.display = 'block';
    document.getElementById('total-found').innerText = `${totalbooks.numFound}`;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    document.getElementById('spinner').style.display = 'none';
    if (books.length === 0) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('total').style.display = 'none';
    }
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div  class="card h-100">
            <img  src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" style="height: 400px;" alt="...">
            <div class="card-body text-center">
                <h4 class="card-title">${book.title}</h4>
                <p class="card-text"><b>Written By </b>${book.author_name}</p>
                <p class="card-text"><b>Published By </b>${book.publisher[0]}</p>
                <p class="card-text"><b>First Publish </b>${book.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}
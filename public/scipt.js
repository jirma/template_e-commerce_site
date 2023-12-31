document.addEventListener("DOMContentLoaded", () => {
    const articleContainer = document.querySelector('.article-container');
    articleContainer.innerHTML = '';
  
    function fetchData() {
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          createArticles(data);
          createCategories(data);
        })
        .catch(error => {
          console.error('Error fetching the data: ', error);
        });
    }
  
    function createArticles(data) {
      data.products.forEach(product => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
  
        const image = document.createElement('img');
        image.setAttribute('src', product.src);
        image.setAttribute('alt', product.name);
  
        const title = document.createElement('h2');
        title.textContent = product.name;
  
        const price = document.createElement('p');
        price.textContent = `Price: $${product.price}`;
  
        const availability = document.createElement('p');
        availability.textContent = `Availability: ${product.availability ? 'In Stock' : 'Out of Stock'}`;
        availability.style.color = product.availability ? 'green' : 'red';

        const category = document.createElement('p');
        category.textContent = `Category: ${product.category}`;
  
        articleDiv.appendChild(image);
        articleDiv.appendChild(title);
        articleDiv.appendChild(price);
        articleDiv.appendChild(availability);
  
        articleContainer.appendChild(articleDiv);
      });
    }
  
    function createCategories(data) {
        const categories = data.products.map(product => product.category);
        const uniqueCategories = [...new Set(categories)];
    
        const categoriesContainer = document.querySelector('.categories-container');
        uniqueCategories.forEach(category => {
            const label = document.createElement('label');
            label.textContent = category;
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'category';
            checkbox.value = category;
            categoriesContainer.appendChild(checkbox);
            categoriesContainer.appendChild(label);
      });
  
      filterArticles();
    }
  
    function filterArticles() {
      const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
      categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
  
          const articles = articleContainer.getElementsByClassName('article');
          Array.from(articles).forEach(article => {
            console.log(article);
            const articleCategory = article.querySelector('input[name="category"]').value;
            console.log(articleCategory);
            if (selectedCategories.includes(articleCategory)) {
              article.style.display = 'block';
            } else {
              article.style.display = 'none';
            }
          });
        });
      });
    }
  
    function searchArticles() {
      const searchButton = document.getElementById('btn');
      searchButton.addEventListener('click', () => {
        const searchTerm = document.getElementById('champ').value.toLowerCase();
        const articles = articleContainer.getElementsByClassName('article');
        Array.from(articles).forEach(article => {
            console.log(article);
          const title = article.getElementsByTagName('h2')[0].textContent.toLowerCase();
          if (title.includes(searchTerm)) {
            article.style.display = 'block';
          } else {
            article.style.display = 'none';
          }
        });
      });
    }
  
    fetchData();
    searchArticles();
  });
  
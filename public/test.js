document.addEventListener("DOMContentLoaded", () => {
    const articleContainer = document.querySelector('.article-container');
    articleContainer.innerHTML = '';
    let articles = []
    

    function fetchData() {
        fetch('data.json')
        .then(response => response.json())
        .then(data => {
            articles = [].concat(data.products);
            console.log(articles);
            showArticles(articles);

            const categories = data.products.map(product => product.category);
            const uniqueCategories = [...new Set(categories)];
            createCategories(uniqueCategories);
    
            let input = document.querySelector('input');
            input.addEventListener('input', function() {
                let filteredInput = articles.filter((product) => product.name.toLowerCase().includes(input.value.toLowerCase()) === true)
                showArticles(filteredInput);
            });
            
    
            let categoryCheckboxes = document.querySelectorAll('input[name="category"]');
            let categoryCheck = [].concat(uniqueCategories);
            let categoriesBoxes = []
            for (let i = 0; i<categoryCheckboxes.length; i++){
                categoryCheckboxes[i].addEventListener("change", function (){
                        if (categoryCheckboxes[i].checked && !(categoriesBoxes.includes(categoryCheckboxes[i].value))){
                            categoriesBoxes.push(categoryCheckboxes[i].value);
                        }
                        else if (!(categoryCheckboxes[i].checked) && (categoriesBoxes.includes(categoryCheckboxes[i].value))){
                            categoriesBoxes = categoriesBoxes.filter((category) => category !== categoryCheckboxes[i].value);
                        }
                        if (categoriesBoxes.length <= 0){
                            articles = [].concat(data.products);
                            showArticles(articles);
                        }
                        else{                        
                            articles = data.products.filter((product) => categoriesBoxes.includes(product.category));
                            showArticles(articles);
                        }
                });
            }
        })
        .catch(error => {
            console.error('Error fetching the data: ', error);
        });
    }
    
    
    function showArticles(data) {
        articleContainer.innerHTML = '';
        data.forEach(product => {
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
        
        let id = 0;
    
        const categoriesContainer = document.querySelector('.categories-container');
        data.forEach(category => {
            const label = document.createElement('label');
            label.textContent = category;
            const checkbox = document.createElement('input');
            checkbox.id = id++;
            checkbox.type = 'checkbox';
            checkbox.name = 'category';
            checkbox.value = category;
            categoriesContainer.appendChild(checkbox);
            categoriesContainer.appendChild(label);
        });
    }    
    fetchData();
});
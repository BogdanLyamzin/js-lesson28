
async function getFullProducts(){
    try {
        const categoriesResponse = await fetch("http://localhost:3000/categories");
        if(!categoriesResponse.ok){
            throw new Error("Запрос не удался");
        }
        const categories = await categoriesResponse.json();
         console.log(categories);
    
        const productsResponse = await fetch("http://localhost:3000/products");
        if(!productsResponse.ok){
            throw new Error("Запрос не удался");
        }
        const products = await productsResponse.json();
        console.log(products);
    
        const fullProducts = products.map(product => {
            const {name} = categories.find(category => category.id === product.categoryId);
            return {...product, category: name};
        });
    
        return fullProducts
    }
    catch(error){
        return error;
    }

}

const products = getFullProducts();
/*
products
    .then(result => {
        console.log(result)
        const productCards = result.map(item => `<li>${item.Title} - ${item.category}</li>`).join("");
        document.body.insertAdjacentHTML("beforeend", productCards)
    })*/
/*
const productsRequest = fetch("http://localhost:3000/products");

productsRequest
.then(response => {
    if(!response.ok){
        throw new Error("Запрос не удался")
    }
    return response.json()
})
.then(products => {
    const categoriesRequest = fetch("http://localhost:3000/categories");
    categoriesRequest
        .then(response => {
            if(!response.ok){
                throw new Error("Категории не удалось получить")
            }
            return response.json()
        })
        .then(categories => {
            //console.log(products);
            //console.log(categories);
            const fullProducts = products.map(product => {
                // console.log(product)
                // console.log(categories)
                // console.log(product.categoryId)
                const {name} = categories.find(category => category.id === product.categoryId);
                return {...product, categoryId: name};
            })
            const productCards = fullProducts.map(item => `<li>${item.Title} - ${item.category}</li>`)
        })
        .catch(error => console.log(error))
})
.catch(error => console.log(error))
*/
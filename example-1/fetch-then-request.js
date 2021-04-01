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
            console.log(fullProducts)
        })
        .catch(error => console.log(error))
})
.catch(error => console.log(error))

async function getFullProducts(){
    try {
        const {data: categories} = await axios.get("http://localhost:3000/categorie");
         console.log(categories);
    
        const {data: products} = await axios.get("http://localhost:3000/products");
         console.log(products);
    
        const fullProducts = products.map(product => {
            const {name} = categories.find(category => category.id === product.categoryId);
            return {...product, category: name};
        });
    
        return fullProducts
    }
    catch(error){
        console.log(error)
        //return error;
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


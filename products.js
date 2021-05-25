const baseUrl = "http://localhost:3000/products";

async function api(url) {
    const res = await fetch(url);
    return res.json();
}

const divProducts$$ = document.body.querySelector('[data-function="products"]');
console.log(divProducts$$);

const printProducts = (products) => {
    for (product of products) {
        const newDiv$$ = document.createElement("div");
        newDiv$$.setAttribute("class", "b-gallery__product");
        newDiv$$.innerHTML = `
        <img src=${product.image} class="b-gallery__img">
        <h4 class="b-gallery__name">${product.name}</h4>
        <p class="b-gallery__desc">${product.description}</p>`;

        divProducts$$.appendChild(newDiv$$);
    }
};

api(baseUrl).then((products) => {
    console.log(products);
    printProducts(products);
});

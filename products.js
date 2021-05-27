const baseUrl = "http://localhost:3000/products";

async function api(url) {
    const res = await fetch(url);
    return res.json();
}

const divProducts$$ = document.body.querySelector('[data-function="products"]');
const galleryH2$$ = document.body.querySelector('[data-function="gallery-h2"]');
const list$$ = document.body.querySelector('[data-function="button-list"]');
const block$$ = document.body.querySelector('[data-function="button-block"]');
const search$$ = document.body.querySelector('[data-function="search"]');
const name$$ = document.body.querySelector('[data-function="name"]');
const price$$ = document.body.querySelector('[data-function="price"]');
const description$$ = document.body.querySelector('[data-function="description"]');
const stars$$ = document.body.querySelector('[data-function="stars"]');
const image$$ = document.body.querySelector('[data-function="image"]');

let galleryCounter = 0;

const printProducts = (products) => {
    for (product of products) {
        const div$$ = document.createElement("div");
        div$$.classList.add(
            "b-gallery__product",
            "d-flex",
            "justify-content-end",
            "col-12",
            "col-sm-6",
            "col-lg-3"
        );
        div$$.setAttribute("id", product.id);
        div$$.innerHTML = `
        <div class="b-gallery__img">
            <img src=${product.image}>
        </div>`;

        const divText$$ = document.createElement("div");
        divText$$.classList.add("b-gallery__text-block");
        divText$$.innerHTML = `
        <div classs="d-flex justify-content-end">
            <h4 class="b-gallery__name">${product.name}</h4>
            <span class="b-gallery__price">${product.price} €</span>
            <p class="b-gallery__desc">${product.description}</p>
        </div>`;

        const divStars$$ = document.createElement("div");
        divStars$$.classList.add("b-gallery__stars-block", "d-flex", "justify-content-between");
        divStars$$.innerHTML = `
        <div class="b-gallery__stars d-flex justify-content-between flex-wrap">${setStars(
            product.stars
        )}</div>`;

        const button$$ = document.createElement("button");
        button$$.classList.add("b-gallery__button-edit");
        button$$.setAttribute("id", product.id);
        button$$.textContent = "Editar";
        button$$.addEventListener("click", editProduct);

        divStars$$.appendChild(button$$);
        div$$.appendChild(divText$$);
        div$$.appendChild(divStars$$);
        divProducts$$.appendChild(div$$);
        updateGalleryCounter();
    }
};

if (window.location.href.includes("products.html")) {
    api(baseUrl).then((products) => {
        printProducts(products);
    });
}

const searchProducts = (event) => {
    api(baseUrl).then((products) => {
        divProducts$$.innerHTML = "";
        galleryCounter = 0;
        let productsList = products.filter((product) =>
            product.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        printProducts(productsList);
    });
};

search$$.addEventListener("input", searchProducts);

const updateGalleryCounter = () => {
    galleryCounter++;
    galleryH2$$.textContent = `Listado de productos (${galleryCounter})`;
};

const setStars = (rating) => {
    let htmlStr = "";
    const fullStar = `<span class="b-icon__star icon-star-full"></span>`;
    const halfStar = `<span class="b-icon__star icon-star-half"></span>`;
    const emptyStar = `<span class="b-icon__star icon-star-empty"></span>`;

    for (let i = 1; i <= 5; i++) {
        if (Math.floor(rating) >= i) {
            htmlStr += fullStar;
        } else {
            if ((rating % 1).toFixed(2) >= 0.5 && Math.floor(rating) >= i - 1) {
                htmlStr += halfStar;
            } else {
                htmlStr += emptyStar;
            }
        }
    }

    htmlStr += `<span class="b-icon__star-text">&nbsp${rating}<span>`;
    return htmlStr;
};

//////////////////////////////  EDIT PRODUCT  ////////////////////////////

const editProduct = () => {
    const id = event.target.getAttribute("id");
    console.log(id);
    // sessionStorage.setItem("reloading", "true");
    // sessionStorage.setItem("productId", id);
    // window.location.assign("management.html");
};

// const fillInputs = () => {
//     console.log("Editar producto");
//     const id = sessionStorage.getItem("productId");
//     sessionStorage.removeItem("productId");
//     sessionStorage.removeItem("reloading");
//     console.log(id);
// };

// let reloading = sessionStorage.getItem("reloading");
// if (reloading === true) {
//     fillInputs();
// }

// let preview = [
//     { id: galleryCounter + 1, name: "", price: 0, description: "", stars: 0, image: "" },
// ];

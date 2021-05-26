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
        button$$.textContent = "Editar";
        button$$.addEventListener("click", editProduct);

        divStars$$.appendChild(button$$);
        div$$.appendChild(divText$$);
        div$$.appendChild(divStars$$);
        divProducts$$.appendChild(div$$);
        updateGalleryCounter();
    }
};

api(baseUrl).then((products) => {
    console.log(products);
    printProducts(products);
});

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

const editProduct = () => {
    console.log("Editar un producto");
};

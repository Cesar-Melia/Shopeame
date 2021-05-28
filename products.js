const baseUrl = "http://localhost:3000/products";
let products = [];
let productsMod = [];

async function api(url) {
    try {
        const res = await fetch(url);
        return res.json();
    } catch (err) {
        console.error("Error: Fallo de conexion con la API", err);
        alert("Error: Fallo de conexion con la API");
    }
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
const form$$ = document.querySelector("form");
const submit$$ = document.querySelector('[data-function="submit"]');

let galleryCounter = 0;
let numId;
let preview;

const printProducts = (products = productsMod) => {
    divProducts$$.innerHTML = "";
    for (product of products) {
        const div$$ = document.createElement("div");
        if (window.location.href.includes("products.html")) {
            div$$.classList.add(
                "b-gallery__product",
                "d-flex",
                "justify-content-between",
                "col-12",
                "col-sm-6",
                "col-lg-3"
            );
        }
        if (window.location.href.includes("manage.html")) {
            div$$.classList.add("col-12", "col-md-4");
        }
        div$$.setAttribute("id", product.id);
        div$$.innerHTML = `
        <div class="b-gallery__img align-self-center">
            <img src=${product.image}>
        </div>`;

        const divText$$ = document.createElement("div");
        divText$$.classList.add("b-gallery__text-block");
        divText$$.innerHTML = `
        <div>
            <h4 class="b-gallery__name">${product.name}</h4>
            <span class="b-gallery__price">${product.price} €</span>
            <p class="b-gallery__desc">${product.description}</p>
        </div>`;

        const divStars$$ = document.createElement("div");
        divStars$$.classList.add(
            "b-gallery__stars-block",
            "d-flex",
            "justify-content-between",
            "flex-wrap"
        );
        divStars$$.innerHTML = `
        <div class="b-gallery__stars d-flex justify-content-between flex-wrap">${setStars(
            product.stars
        )}</div>`;

        const divTextAndStars$$ = document.createElement("div");
        divTextAndStars$$.setAttribute("data-function", "text-stars");
        divTextAndStars$$.appendChild(divText$$);
        divTextAndStars$$.appendChild(divStars$$);

        const button$$ = document.createElement("button");
        button$$.classList.add("b-gallery__button-edit");
        button$$.setAttribute("id", product.id);
        button$$.textContent = "Editar";
        if (window.location.href.includes("products.html")) {
            button$$.addEventListener("click", editProduct);
        }

        divStars$$.appendChild(button$$);
        div$$.appendChild(divTextAndStars$$);
        divProducts$$.appendChild(div$$);
        updateGalleryCounter();
    }
};

const searchProducts = (event) => {
    if (event.target.value) {
        productsMod = products.filter((product) =>
            product.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
    } else {
        productsMod = products;
    }
    galleryCounter = 0;
    printProducts();
};

const updateGalleryCounter = () => {
    galleryCounter++;
    if (window.location.href.includes("products.html")) {
        galleryH2$$.textContent = `Listado de productos (${galleryCounter})`;
    }
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

const editProduct = (event) => {
    const id = event.target.getAttribute("id");
    window.location = `management.html?id=${id}`;
};

const applyList = () => {
    const productContainers$$ = document.body.querySelectorAll(".b-gallery__product");
    const textStars$$ = document.body.querySelectorAll('[data-function="text-stars"]');

    block$$.classList.remove("b-gallery__button--pressed");
    list$$.classList.add("b-gallery__button--pressed");

    divProducts$$.classList.add("flex-column");

    for (block of productContainers$$) {
        block.classList.remove("col-sm-6", "col-lg-3");
        block.classList.add("flex-row");
    }

    for (block of textStars$$) {
        block.classList.add("col-8");
    }
};

const applyBlock = () => {
    productContainers$$ = document.body.querySelectorAll(".b-gallery__product");
    textStars$$ = document.body.querySelectorAll('[data-function="text-stars"]');

    list$$.classList.remove("b-gallery__button--pressed");
    block$$.classList.add("b-gallery__button--pressed");

    divProducts$$.classList.remove("flex-column");

    for (product of productContainers$$) {
        product.classList.remove("flex-row");
        product.classList.add("col-sm-6", "col-lg-3");
    }

    for (block of textStars$$) {
        block.classList.remove("col-8");
    }
};

const generatePreview = (preview) => {
    if (numId === undefined) {
        numId = productsMod.length;
        while (productsMod.find((product) => product.id === numId)) {
            numId++;
        }
    }
    preview[0].id = numId;
    preview[0].name = name$$.value;
    preview[0].price = price$$.value;
    preview[0].description = description$$.value;
    preview[0].stars = stars$$.value;
    preview[0].image = image$$.value;
    printProducts(preview);
};

async function postProduct(preview) {
    const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(preview),
    });
    console.log("Post product");
}

async function putProduct(preview) {
    const res = await fetch(`http://localhost:3000/products/${preview.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(preview),
    });
    console.log("Put product");
}

/////////////////////////////////////////////////////////////////////////////  SET TIME OUT ?
const loadProduct = () => {
    const urlParams = new URLSearchParams(window.location.search);
    numId = urlParams.get("id");

    setTimeout(() => {
        preview[0] = productsMod.find((product) => product.id === Number(numId));

        name$$.value = preview[0].name;
        price$$.value = preview[0].price;
        description$$.value = preview[0].description;
        stars$$.value = preview[0].stars;
        image$$.value = preview[0].image;

        printProducts(preview);
    }, 100);
};

if (window.location.href.includes("products.html")) {
    search$$.addEventListener("input", searchProducts);
    list$$.addEventListener("click", applyList);
    block$$.addEventListener("click", applyBlock);
}

if (window.location.href.includes("management.html")) {
    preview = [
        {
            id: numId,
            name: "Nombre",
            price: 0,
            description: "Descripción",
            stars: 0,
            image: "assets/images/img-default.png",
        },
    ];

    if (window.location.href.includes("?id=")) {
        loadProduct();
    }
    printProducts(preview);

    form$$.addEventListener("input", () => {
        generatePreview(preview);
    });

    submit$$.addEventListener("click", (event) => {
        event.preventDefault();
        if (numId > products.length) {
            postProduct(preview[0]);
        }
        if (numId <= products.length) {
            putProduct(preview[0]);
        }
    });
}

window.onload = () => {
    api(baseUrl).then((prods) => {
        productsMod = prods;
        products = prods;
        if (window.location.href.includes("products.html")) {
            printProducts();
        }
    });
};

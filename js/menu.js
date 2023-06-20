const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");
const btnCategoria = document.querySelectorAll(".btn-categoria");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
});

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
});

btnCategoria.forEach(boton => 
    boton.addEventListener("click", () => {
        aside.classList.remove("aside-visible");
    })
);
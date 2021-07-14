export const openMenu = () => {
  const menu = document.querySelector("nav");
  const body = document.querySelector("body");
  const cover = document.getElementById("cover");
  const list = document.getElementById("nav-list");
  
  menu.classList.toggle("open");
  body.classList.toggle("open");
  cover.classList.toggle("open");
  list.classList.toggle("open");
};

export const closeMenu = () => {
  const menu = document.querySelector("nav");
  const body = document.querySelector("body");
  const cover = document.getElementById("cover");
  const list = document.getElementById("nav-list");
  
  menu.classList.remove("open");
  body.classList.remove("open");
  cover.classList.remove("open");
  list.classList.remove("open");
};

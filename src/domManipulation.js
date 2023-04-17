const sidebarDiv = document.querySelector(".sidebar");
const mainDiv = document.querySelector(".main");
const contentTitle = document.querySelector(".content-title");

const hideSidebar = () => {
  if (sidebarDiv.style.display !== "none") {
    sidebarDiv.style.display = "none";
  } else {
    sidebarDiv.style.display = "flex";
  }
};

const changeContentTitle = (sidebarChoice) => {
  contentTitle.textContent = sidebarChoice.textContent;
};

export { hideSidebar, changeContentTitle };

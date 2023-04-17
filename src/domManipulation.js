const sidebarDiv = document.querySelector(".sidebar");

const hideSidebar = () => {
  if (sidebarDiv.style.display !== "none") {
    sidebarDiv.style.display = "none";
  } else {
    sidebarDiv.style.display = "flex";
  }
};

export { hideSidebar };

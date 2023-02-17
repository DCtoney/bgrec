function createCardDisplay(){
    let container = document.createElement("div");
    container.classList.add("container");

    let userTitle = document.createElement("h3");
    container.appendChild(userTitle);
    userTitle.innerText = sessionStorage.getItem("username")!;
}
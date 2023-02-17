$("#submit-button").on("click", _event => {
    console.log("button clicked!")
    if (document.querySelector<HTMLInputElement>('#uname')!.value && document.querySelector<HTMLInputElement>('#pass')!.value) {
        // I am aware we are storing a user password in plain text in session storage. 
        // I would use OAuth2.0 if this was a real project.
        sessionStorage.setItem("username", document.getElementById('uname')!.innerText);
        sessionStorage.setItem("password", document.getElementById('pass')!.innerText);
        console.log("set session storage");
        window.location.href = "./profile.html";
    }
});

window.onload = () => {
    console.log("window loads!");
    // instead of making a user that has already logged in do it again, redirect them to their account page
    if (sessionStorage.getItem("username") && sessionStorage.getItem("password")){
        window.location.href = "./profile.html";
    };
}
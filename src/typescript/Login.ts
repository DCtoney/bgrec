

$("#submit-button").on("click", _event => {
    if (document.querySelector<HTMLInputElement>('#uname')!.value && document.querySelector<HTMLInputElement>('#pass')!.value) {
        // I am aware we are storing a user password in plain text in session storage. 
        // I would use OAuth2.0 if this was a real project.
        let username = (document.getElementById('uname') as HTMLInputElement).value;
        let password = (document.getElementById('pass') as HTMLInputElement).value;
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        window.location.href = "./profile.html";
    }
});


window.onload = () => {
    // instead of making a user that has already logged in do it again, redirect them to their account page
    if (sessionStorage.getItem("username") && sessionStorage.getItem("password")){
        window.location.href = "./profile.html";
    };
}
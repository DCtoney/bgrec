
/**
 * Listener for submit button. Saves username and password to session storage and redirects to account page.
 * If this were more than a client-side undergrad project, we would use OAuth2.0 or 
 * a similar secure system to handle account login. 
 * We are aware that it is not secure to save sensitive user information in plaintext.
 */
$("#submit-button").on("click", _event => {
    if (document.querySelector<HTMLInputElement>('#uname')!.value && document.querySelector<HTMLInputElement>('#pass')!.value) {
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
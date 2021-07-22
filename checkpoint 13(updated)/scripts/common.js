
// display and remove loader

function displayLoader(flag){
  if (flag){
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  }
  else{
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
}

displayLoader(true);

// Header template literal
const headerTemplate = document.createElement('header');
headerTemplate.innerHTML = `
  <a href="index.html"><img src="assets/images/logo.png" alt="logo" height="100px" width="150px"></a>
  <button type="button" class="btn btn-light" data-toggle="modal" data-target="#myModal" id="header-login">
    Login
  </button>
`
document.querySelector('.content').before(headerTemplate);
headerTemplate.setAttribute('class', 'header');

// Footer template literal
const footerTemplate = document.createElement('footer');
footerTemplate.innerHTML = `
  <div class="contact">
    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#contactUs">Contact Us</button>
  </div>
  <div class="copyright">
    &copy; 2020 ROOM SEARCH PVT. LTD.
  </div>
  <div class="socialMedia">
    <a href="https://www.facebook.com" target="_blank"> <img src="assets/images/facebook.png" alt="" width="22px" height="20px"> </a>
    <a href="https://www.instagram.com" target="_blank"> <img src="assets/images/instagram.png" alt="" width="22px" height="20px"> </a>
    <a href="https://www.twitter.com" target="_blank"> <img src="assets/images/twitter.png" alt="" width="22px" height="20px"> </a>
  </div>
`
document.querySelector('.content').after(footerTemplate);
footerTemplate.setAttribute('class', 'footer');

// Perform login on clicking login button on modal

function performLogin(){
  let usernameValue = document.querySelector('#Username').value;
  let passwordValue = document.querySelector('#Password').value;
  if (usernameValue === "admin" && passwordValue === "admin"){
    document.querySelector('#header-login').innerText = "Logout";
    alert('Successfully logged in');
    $('#myModal').modal('hide');
    document.querySelector('#myModal').remove();
    localStorage.username = "admin";
    localStorage.password = "admin";
  }
}

let modalLoginButton = document.querySelector('#modal-login');
modalLoginButton.addEventListener('click', performLogin);

// Changing login button if user already logged in
if (localStorage.username === "admin"){
  document.querySelector('#header-login').innerText = "Logout";
  document.querySelector('#myModal').remove();
}

// Perform logout on clicking logout button on header
function performLogout(){
  if (document.querySelector('#header-login').innerText === "Logout"){
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    location.reload();
  }
}

document.querySelector('#header-login').addEventListener('click', performLogout);

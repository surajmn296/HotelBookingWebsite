let headerTemplate=` <a href="index.html"><img src="assests/images/logo.png" alt="logo" style="height: 60px; width: 60px"/></a>
        <button type="button" id="loginbutton" class="btn btn-light btn-sm" data-toggle="modal" data-target="#login" onclick="mainLogin(event)">LOGIN </button>`
let loginModal=` <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="exampleModalLabel">Please Login</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" >
                    <form>
                        <div class="form-group">
                            <label class="col-form-label" for="username">Username: </label>
                            <input id="username" type="text" class="form-control" placeholder="Enter Usernme" required>
                        </div>
                        <div class="form-group">
                            <label class="col-form-label" for="password" autocomplete="off">Password: </label>
                            <input id="password" type="password" class="form-control" placeholder="Enter Password" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" style="margin: auto;" onclick="login(event)">Login</button>
                </div>
            </div>
        </div>
    </div>`
document.getElementById('header1').innerHTML=headerTemplate;
document.getElementById('loginModalCreation').innerHTML=loginModal;
let footerTemplate = `<div id="contact">
            <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#contact">ContactUs</button>
        </div>
        <div id="copyright">&copy; 2020 ROOM SEARCH PVT. LTD</div>
        <div class="social_media_icons">
            <a href="https://www.facebook.com" target="_blank"><img class="social_img" src="assests/images/facebook.png"></a>
            <a href="https://www.instagram.com" target="_blank" ><img class="social_img" src="assests/images/instagram.png"></a>
            <a href="https://twitter.com" target="_blank" ><img class="social_img" src="assests/images/twitter.png" width="22px" height="20px"></a>
        </div>`
let contactUsModal=`<div class="modal fade" id="contact" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="exampleModalLabel1">Get in touch</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Thank you for reaching out!!!</p>
                    <p>Please enter your email and we will get back to you.</p>
                        <form>
                            <div class="form-group">
                                <label class="col-form-label">Email:</label>
                                <input type="text" class="form-control" placeholder="Enter your emailid"required>
                            </div>
                        </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>`
document.getElementById('footer1').innerHTML=footerTemplate;
document.getElementById('contactUsModalCreation').innerHTML=contactUsModal;


function mainLogin (e){
    if (localStorage.getItem('isLogin') === 'true') {
        localStorage.setItem('isLogin', 'false');
        location.reload();
    }
};


function login(e){
    localStorage.setItem('username', 'admin');
    localStorage.setItem('password', 'admin');
    localStorage.setItem('isLogin', 'false');
    e.preventDefault();
    let userElement = document.getElementById('username').value;
    let passwordElement = document.getElementById('password').value;

    if (userElement === localStorage.getItem('username') &&
        passwordElement === localStorage.getItem('password')) 
    {
        localStorage.setItem('isLogin', 'true');
        alert('Successfully logged in!');
        let loginElement = document.getElementById('loginbutton')
        loginElement.dataset.target = '';
        loginElement.innerText = 'LOGOUT';
        window.location.reload();
    } else {
        alert('Please enter correct username/password');
        userElement.value = '';
        passwordElement.value = '';
    }
};

let isLogin = localStorage.getItem('isLogin');
let loginElement = document.getElementById('loginbutton');


let checkLogin = () => {
    if (!isLogin || isLogin === 'false') {
        localStorage.clear();
        loginElement.dataset.target = '#login';
        loginElement.innerText = 'LOGIN';
    } else if (isLogin === 'true') {
        loginElement.dataset.target = '';
        loginElement.innerText = 'LOGOUT';
    }
}

checkLogin();
const baseUrl = "http://localhost:3000";

function auth() {
    if(localStorage.token) {
        $('#home-page').show();
        $('#login-page').hide();
        $('#register-page').hide();
        $('#edit-page').hide();
        $('#error-report').hide();
        $('#success-report').hide();
        fetchTodo();
    } else {
        $('#login-page').show();
        $('#register-page').hide();
        $('#home-page').hide();
        $('#edit-page').hide();
        $('#error-report').hide();
        $('#success-report').hide();
    }
};

$( document ).ready(function() {
    auth();
});

function alertError(err) {
    $('#error-report').empty();
    let error = err.responseJSON.errs[0];

    $('#error-report').append(error);
    $('#error-report').show();

    setTimeout(function(){
        $(`#error-report`).hide("done");
    }, 2000);
};

function alertSuccess(data) {
    console.log(`masuk alert sukses`);
    $('#success-report').empty();
    let success = data.msg;

    $('#success-report').append(success);
    $('#success-report').show();

    setTimeout(function(){
        $(`#success-report`).hide("done");
    }, 2000);
};

function login(event) {
    event.preventDefault();

    let email = $('#login-email').val();
    let password = $('#login-password').val();

    $.ajax({
        url : `${baseUrl}/user/login`,
        method : 'POST',
        data : {
            email,
            password
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        auth();
    })
    .fail(err => {
        alertError(err)
    })
    .always(() => {
        $('#login-email').val('');
        $('#login-password').val('');
    })
};

function register(event) {
    event.preventDefault();

    let email = $('#register-email').val();
    let password = $('#register-password').val();

    $.ajax({
        url : `${baseUrl}/user/register`,
        method : `POST`,
        data : {
            email,
            password
        }
    })
    .done(data => {
        auth();
    })
    .fail(err => {
        alertError(err)
    })
    .always(() => {
        $('#register-email').val('');
        $('#register-password').val('');
    })
};

function logout() {
    localStorage.clear();
    auth()
};

function fetchTodo() {
    $.ajax({
        url : `${baseUrl}/todo`,
        method : `GET`,
        headers : {
            token : localStorage.token
        }
    })
    .done(data => {
        $('#fetch-todo').empty();
        $('#fetch-email').empty();

        $('#fetch-email').append(`
            <h3 style="font-family: 'Otomanopee One', sans-serif;">Haaaiii ${localStorage.email}, Lets see your todos</h3>
        `),

        data.data.forEach(e => {
            if(e.status === false) {
                $('#fetch-todo').append(`
                    <tbody>
                        <tr>
                            <td>${e.title}</td>
                            <td>${e.description}</td>
                            <td id='due_date'>${e.due_date}</td>
                            <td>
                                <i type="button" onclick="toEditPage(${e.id})" class="fas fa-edit"></i> ||
                                <i type="button" onclick="delTodo(${e.id})" class="fas fa-trash-alt"></i>
                            </td>
                            <td>
                                <button onclick="changeStatus(${e.id})" class="btn btn-success my-2 my-sm-0" type="button">Done</button>
                            </td>
                        </tr>
                    </tbody>
                `)
            }
        })
    })
    .fail(err => {
        alertError(err)
    })
    .always(() => {

    })
};

function addTodo(event) {
    event.preventDefault();

    let title = $('#add-title').val();
    let description = $('#add-description').val();
    let due_date = $('#add-due_date').val();

    $.ajax({
        url : `${baseUrl}/todo`,
        method : `POST`,
        headers : {
            token : localStorage.token
        },
        data : {
            title,
            description,
            due_date
        }
    })
    .done(data => {
        auth();
        alertSuccess(data);
    })
    .fail(err => {
        alertError(err);
    })
    .always(() => {
        $('#add-title').val('');
        $('#add-description').val('');
        $('#add-due_date').val('');
    })
};

function editTodo(event) {
    event.preventDefault();

    let title = $('#edit-title').val();
    let description = $('#edit-description').val();
    let due_date = $('#edit-due_date').val();

    $.ajax({
        url : `${baseUrl}/todo/${localStorage.todoId}`,
        method : `PUT`,
        headers : {
            token : localStorage.token
        },
        data : {
            title,
            description,
            due_date
        }
    })
    .done(data => {
        auth();
        alertSuccess(data);
    })
    .fail(err => {
        alertError(err);
    })
};

function delTodo(id) {
    $.ajax({
        url : `${baseUrl}/todo/${id}`,
        method : `DELETE`,
        headers : {
            token : localStorage.token
        }
    })
    .done(data => {
        auth();
        alertSuccess(data);
    })
    .fail(err => {
        alertError(err);
    })
};

function changeStatus(id) {
    $.ajax({
        url : `${baseUrl}/todo/${id}`,
        method : `PUT`,
        headers : {
            token : localStorage.token
        },
        data : {
            status : true
        }
    })
    .done(data => {
        fetchTodo();
        alertSuccess(data);
    })
    .fail(err => {
        alertError(err);
    })
};

function toRegisterPage(event) {
    event.preventDefault();
    $('#register-page').show();
    $('#login-page').hide();
    $('#home-page').hide();
};

function toLoginPage(event) {
    event.preventDefault();
    $('#login-page').show();
    $('#register-page').hide();
    $('#home-page').hide();
};

function toHomePage(event) {
    event.preventDefault();

    $('#login-page').hide();
    $('#register-page').hide();
    $('#edit-page').hide();
    $('#home-page').show();  
};

function toEditPage(id) {
    $('#login-page').hide();
    $('#register-page').hide();
    $('#home-page').hide();
    $('#edit-page').show();

    localStorage.setItem('todoId', id);

    $.ajax({
        url : `${baseUrl}/todo/${id}`,
        method : `GET`,
        headers : {
            token : localStorage.token
        }
    })
    .done(data => {
        $('#edit-title').val(`${data.data.title}`);
        $('#edit-description').val(`${data.data.description}`);
        $('#edit-due_date').val(`${data.data.due_date}`);
    })
    .fail(err => {
        alertError(err);
    })
};
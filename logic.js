class UserData {
    constructor(username, email, password, birthday) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
    }
}

let currentUserData;

function submitForm() {
    currentUserData = new UserData(
        $("#nameInput").val(),
        $("#mailInput").val(),
        $("#passwordInput").val(),
        new Date($("#dateInput").val())
    );

    $("#okno").css({
        scale: "1",
        opacity: "1"
    });

    sendEmailAndGenerateCode();
}

function sendEmailAndGenerateCode() {
    $.ajax({
        url: "http://151.248.112.241:1111/email-code",
        type: "POST",
        data: JSON.stringify(currentUserData),
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function checkCode() {
    $.ajax({
        url: "http://151.248.112.241:1111/check-code",
        type: "POST",
        data: JSON.stringify({
            code: $("#oknoInput").val(),
            email: currentUserData.email
        }),
        contentType: "application/json",
        success: function (response) {
            console.log(response);
            $("#okno").css({
                scale: "0",
                opacity: "0"
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}
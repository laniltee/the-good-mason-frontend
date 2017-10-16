var userHasChangedImage = false;
var newImageUrl = "";
const IMAGE_UPLOAD_URL = "http://smartflashcardsapi.stg-prsn.com/api/images/";
const PROFILE_API_URL = "http://localhost:8083/profiles/supervisors";

function readURL(input) {

    if (input.files && input.files[0]) {
        userHasChangedImage = true;
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#profile-img-select').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#profile-img-input").change(function() {
    readURL(this);
});

function buildUserEmail(elem){
    console.log('chefName');
    var chefName = $("#first-name-in").val();
    chefName = chefName.replace(' ', '.').toLowerCase();
    console.log(chefName);
    $("#email-in").val(chefName + '@pearson.com');
}

function addNewSupervisor() {

    $('#msg-add').text('Please Wait .. ..');

    if (userHasChangedImage) {
        var formData = new FormData();
        formData.append('doc', $('input[type=file]')[0].files[0]);

        $.ajax({
            url: IMAGE_UPLOAD_URL,
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,
            async: false,
            success: function(data) {
                console.log("image updating success");
                console.log(data.fileName);
                newImageUrl = data.fileName;
            },
            error: function() {
                console.log("uppload updating failure");
            }

        });

    }

    postNewSupervisor();
}

function postNewSupervisor() {
    var jsonObj = {
        "fullName": $("#first-name-in").val(),
        "designation": $("#designation-in").val(),
        "description": $("#desc-in").val(),
        "interestedAreas": $("#areas-in").val().toString(),
        "imageUrl": newImageUrl,
        "contactNo": $("#contact-in").val(),
        "type": "chef",
        "email": $("#email-in").val(),
    }

    $.ajax({
        url: PROFILE_API_URL,
        data: JSON.stringify(jsonObj),
        type: 'POST',
        contentType: 'application/json',
        async: false,
        success: function(data) {
            console.log("profile adding success");
            console.log(data);
            location.reload();
        },
        error: function() {
            console.log("profile adding failure");
        }

    });

    //console.log(jsonObj);
}
function GithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    
    // The function should finally return the object(it now contains the response!)
    $.ajax({
        type: "GET",
        url: "https://api.github.com/users/"+user,
    }).done(function (data) {
        Displaydata(data)
    }).fail(function (data) {
        noUser(data)
        
    });
}


function Displaydata(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    
        document.getElementById("user").innerHTML="User  : " + user.login;
        document.getElementById("userid").innerHTML="User id : " + user.id;
        document.getElementById("image").src=user.avatar_url;
        document.getElementById("link").href=user.html_url;
        document.getElementById("name").innerHTML="User Name : " + user.name;
    
    

    
}


function noUser(username) {
    //3. set the elements such that a suitable message is displayed

    document.getElementById("user").innerHTML=username.responseJSON.message + "Please verify the username";
    document.getElementById("userid").innerHTML=null;
    document.getElementById("image").src=null;
    document.getElementById("link").href=null;
    document.getElementById("name").innerHTML=null;
    
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            GithubInfo(username);
            //if the response is successful show the user's details
           
        }
    })
});

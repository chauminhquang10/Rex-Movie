// include  the Messenger Extensions JS SDK

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.com/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "Messenger");

window.extAsyncInit = function () {
  // the Messenger Extensions JS SDK is done loading

  // dùng để lấy psid người dùng
  MessengerExtensions.getContext(
    "294695622386728",
    function success(thread_context) {
      // success
      //set psid to input

      $("#psid").val(thread_context.psid);
      handleClickButtonReserveAccount();
    },
    function error(err) {
      // error
      console.log("Lỗi tạo tài khoản chatbot with Messenger Extensions", err);

      //run backup for web version (get userId from URL)
      $("#psid").val(senderId);
      handleClickButtonReserveAccount();
    }
  );
};

//validate inputs
function validateInputFields() {
  const EMAIL_REG =
    /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
  let email = $("#email");
  let phoneNumber = $("#phoneNumber");

  if (!email.val().match(EMAIL_REG)) {
    email.addClass("is-invalid");
    return true;
  } else {
    email.removeClass("is-invalid");
  }

  if (phoneNumber.val() === "") {
    phoneNumber.addClass("is-invalid");
    return true;
  } else {
    phoneNumber.removeClass("is-invalid");
  }

  return false;
}

function handleClickButtonReserveAccount() {
  $("#btnReserveAccount").on("click", function (e) {
    let check = validateInputFields(); //return true or false

    let data = {
      psid: $("#psid").val(),
      customerName: $("#customerName").val(),
      email: $("#email").val(),
      phoneNumber: $("#phoneNumber").val(),
    };

    // nếu k có lỗi validate thì
    if (!check) {
      //close webview (đóng cái webview)
      MessengerExtensions.requestCloseBrowser(
        function success() {
          // webview closed
          callAjax(data);
        },
        function error(err) {
          // an error occurred
          console.log(err);

          callAjax(data);
          $("#customerInfo").css("display", "none");
          $("#handleError").css("display", "block");
        }
      );
    }
  });
}

function callAjax(data) {
  //send data to node.js server
  $.ajax({
    url: `${window.location.origin}/reserve-account-ajax`,
    method: "POST",
    data: data,
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
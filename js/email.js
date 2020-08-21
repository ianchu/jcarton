function sendEmail() {
  var name = $('#input_name').val()
  var email = $('#input_email').val()
  var phone = $('#input_phone').val()
  var message = $('#input_message').val()

  $.ajax({
    type: "POST",
    url: "https://mandrillapp.com/api/1.0/messages/send.json",
    data: {
      "key": "l9rB8yqPlGi6e249XuxHfA",
      "message": {
        "from_email": email,
        "to": [
          {
          "email": "jrcarton@gmail.com",
          "name": "Dr James Carton",
          "type": "to"
        }
        ],
        "autotext": "true",
        "subject": generateSubject(name),
        "html": generateEmail(name, email, phone, message)
      }
    }
  })
  .done(function(response) {
    $('#send-form').hide();
    $('#success-message').show();
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus);
    console.log(errorThrown);
    $('#send-form').hide();
    $('#fail-message').show();
  })
  .always(function(response) {
    $('#send-form').hide();
  });
}

function generateSubject(name) {
  var subject = "[website feedback] New message";
  if(name !== undefined) {
    subject += " from "+name;
  }
  return subject;
}

function generateEmail(name, email, phone, message) {
  date = new Date().toString();
  var emailMessage = "<html><body><p>Original message sent at <b>"+date+"</b>:</p>";
  emailMessage += "<p>\""+message+"\"</p>";
  emailMessage += generateSignature(name, email, phone);
  emailMessage += "</body></html>";
  return emailMessage;
}

function generateSignature(name, email, phone) {
  var signature = "<p>Contact details:";
  if(name !== undefined) {
    signature += "<br>"+name;
  }
  if(email !== undefined) {
    signature += "<br>"+email;
  }
  if(phone !== undefined) {
    signature += "<br>"+phone;
  }
  signature += "</p>";
  return signature;
}

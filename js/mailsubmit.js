document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  const contactForm = document.getElementById("form");
  

  async function handleContactForm(event) { 
    event.preventDefault(); 
    submitSendGrid();
  } 

  // Submit grid
  async function submitSendGrid() {
    const name = document.getElementById("form-name").value;
    const email = document.getElementById("form-email").value; 
    const message = document.getElementById("form-text").value;

    const htmlMessage = `<br>Name: ` + name + `<br>` + `Email: ` + email + `<br>` + `Message: ` + message;
    const dataEmail = "vitalie@dreamcraft.io";
    const dataSubject = "Dreamcraft NEW LEAD";
    const dataName = "Vitalie Croitor";
    const sendGridApikey = "";
    
    setContactSubmitButtonEnabled(false);
    
    try {

        await axios.post(
            'https://api.sendgrid.com/v3/mail/send',
            {
              'personalizations': 
              [
                  {
                    'to': 
                    [
                        {
                          'email': dataEmail,
                          'name': dataName
                        }
                    ],
                    'subject': dataSubject
                  }
              ],
              'content': 
              [
                  {
                    'type': 'text/html',
                    'value': htmlMessage
                  }
              ],
              'from': 
                {
                'email': dataEmail,
                'name': dataName
                },
              'reply_to': 
                {
                'email': dataEmail,
                'name': dataName
                }
            },
            {
            headers: 
              {
                'Authorization': `Bearer ${sendGridApikey}`,
                'Content-Type': 'application/json'
              }
            }
        );
        showContactSubmitSuccess();
        console.info("SendGrid message sent");
        } catch (e) {
          console.error(e);
          showContactSubmitError();
        } finally {
          setContactSubmitButtonEnabled(true);
        }
  }

  function setContactSubmitButtonEnabled(isEnabled){
    document.getElementById("id-contact-submit-button").disabled = isEnabled;
  }


  function showContactSubmitSuccess() {
    document.getElementById("id-contact-success").style.display = "block";
    document.getElementById("id-contact-failure").style.display = "none";
  }

  function showContactSubmitError(){
    document.getElementById("id-contact-success").style.display = "none";
    document.getElementById("id-contact-failure").style.display = "block";
  }

  //contactForm.addEventListener('submit', handleContactForm);


});
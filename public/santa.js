$(()=>{

    //  // functions to hide buttons when draw again is required
    const $message = $('#message').text()

    if(/Draw Again/i.test($message) == true){
        $(`.next`).hide();
    } else {
      $(`.draw-again`).hide();
    }
    console.log($message)

})


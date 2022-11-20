$(()=>{

//////model design
  // close model
  const $closeModal = () => {
    $(`#model`).css('display', 'none');
  }
    //Open Model
	const $openModal = () => {
    $('#model').css('display', 'block');
      };

      //model box code
      $('.bttn').on('click', $openModal);
      $('#close').on('click', $closeModal);
//////////////////////

})

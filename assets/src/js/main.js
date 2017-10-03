/**
 * All JavaScript goes here
 * 
 */

jQuery( document ).ready( function( $ ) {
//attches it to the DOM instead of the mail button because the mail button can be replaced 
	
	$('.js-modal').hide();
	$( document ).on( 'click', '.mail-button', function() {
		$( '.js-modal' ).show();
	});

	$( '.contact-form-bg' ).click( function() {
		$( '.js-modal' ).hide();
	});

  $( '.hamburger-bars' ).click(function(){
    console.log('clicked');
      $('.js-menu-modal').show();
    });
  $('.x-vector').click(function(){
  	  $('.js-menu-modal').hide();
  });

});


$(window).on('load',function(){
	const api = {
		//getting the JSON file
		base: 'dealers.json'
	}
$.get(`${api.base}`,function(data, status){

	//why is it not dealers.data for the below instead of data.dealers?
	const dealers = data.dealers;
	const dealersWrapper = $('.dealers');
	dealersWrapper.html( '' );

//do I need an index here??
	dealers.forEach(function(dealer, index){
		dealer.data.weekHours.sun = dealer.data.weekHours.sun === '' ? 'Closed' : dealer.data.weekHours.sun;

		dealersWrapper.append(`
			<div class="card-wrapper">
				<div class="dealer">
	                  <h1 class="name">${dealer.data.name}</h1>
	                  <hr class="hidden-mobile">
	                  <div class="phone-section hidden-desktop">
	                     <button class="phone-button"><i class="fa fa-phone" aria-hidden="true"></i><span class="tap">Tap to call</span><span class="phone1">${dealer.data.phone1}</span></button>
	                  </div>
	                  <div class="phone-desktop hidden-mobile">
	                     <img src="images/phone2-icon.png" alt="phone-icon" class="phone2-icon"><span class="desktop-phone-number">${dealer.data.phone1}</span>
	                  </div>
	                  <p class="talk">Can't talk now? Click below to send an email.</p>
	                  <div class="contact-box">
	                     <button class="mail-button"><img class="mail" src="images/mail.png" alt="mail-icon">
	                     <span class="contact">Contact this Pro</span></button>
	                  </div>
	                  <ul class="hours">
	                     <li>Business Hours</li>
	                     <li class="weekHours">Weekdays ${dealer.data.weekHours.mon}</li>
	                     <li class="Saturday">Saturday ${dealer.data.weekHours.sat}</li>
	                     <li class="Sunday">Sunday ${dealer.data.weekHours.sun}</li>
	                  </ul>
	                  <footer class="dealers-footer">
	                     <ul class="dealer-footer-left js-certifications-list-${index}"></ul>
	                  </footer>
	               </div>
	           </div>`);

		const certifications = dealer.data.certifications;
		const certificationsList = $(`.js-certifications-list-${index}`);

		certifications.forEach(function (cert) {
			let iconName;
			switch (cert) {
				case 'Installation Pro':
					iconName = 'star'
					break;
				case 'Residential Pro':
					iconName = 'home'
					break;
				case 'Service Pro':
					iconName = 'gear'
					break;
				case 'Commercial Pro':
					iconName = 'star'
					break;
				default:
					iconName = 'star'
			}

			certificationsList.append(`
				<li><img class="dealer-icon" src="images/${iconName}.png" alt="${iconName}-icon">${cert}</li>
			`);
		});

	});
});
});


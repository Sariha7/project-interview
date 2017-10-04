/**
 * All JavaScript goes here
 * 
 */

jQuery( document ).ready( function( $ ) {
//attches it to the DOM instead of the mail button because the mail button can be replaced 
	//below shows the js-modal class
	$('.js-modal').hide();
	$( document ).on( 'click', '.mail-button', function() {
		$( '.js-modal' ).show();
	});
	//hides the js-modal class if you click on the overlay
	$( '.contact-form-bg' ).click( function() {
		$( '.js-modal' ).hide();
	});
//click on the menu icon and slow the menu modal
  $( '.hamburger-bars' ).click(function(){
    console.log('clicked');
      $('.js-menu-modal').show();
    });
//click on the x and the menu hides
  $('.x-vector').click(function(){
  	  $('.js-menu-modal').hide();
  });

});

//when the window loads run the following function to get the data from the JSON form
$(window).on('load',function(){
	//set a constant so that you can pull it later
	const api = {
		//getting the JSON file
		base: 'dealers.json'
	}

// can do get, post, put, delete.  In this case we want to get information so we use get
$.get(`${api.base}`,function(data, status){

//?????????????????????????????????
	//seting dealers to the data from the dealers
	const dealers = data.dealers;
	const dealersWrapper = $('.dealers');
	dealersWrapper.html( '' );

//do I need an index here??
	dealers.forEach(function(dealer, index){
		//if the string in the file for sun is empty then say closed, otherwise put whatever the file says s 
		dealer.data.weekHours.sun = dealer.data.weekHours.sun === '' ? 'Closed' : dealer.data.weekHours.sun;

//at this point, all html in the current index.html file that is inside the card-wrapper div is useless beacuse we are replacing it
		dealersWrapper.append(`
			<div class="card-wrapper">
				<div class="dealer">
	                  <h1 class="name">${dealer.data.name}</h1>
	                  <hr class="hr-desktop hidden-mobile">
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

//setting a new constant so we can pull the information from the certifications array within the data array in the dealer object
		const certifications = dealer.data.certifications;
		const certificationsList = $(`.js-certifications-list-${index}`);

//loop over the certifications.  If it has the certiification add the icon name so that we can update the html below
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
					iconName = 'users'
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


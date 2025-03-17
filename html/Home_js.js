const volunteer = document.querySelector('#volunteer');
const resource = document.querySelector('#resource');
const donation = document.querySelector('#donation')
const affected = document.querySelector('#affected')
const vol = document.querySelector('#vol')



volunteer.addEventListener('click' , ()=>{
    window.location.href = 'volunteer.ejs'
})

resource.addEventListener('click', () => {
    window.location.href = 'resource.ejs';
});


donation.addEventListener('click', () => {
    window.location.href = 'donation.ejs';
});


affected.addEventListener('click', () => {
    window.location.href = 'affected.ejs';
});


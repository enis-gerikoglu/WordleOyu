let open = document.getElementById('open')
const close = document.getElementById("close")
const container = document.querySelector('.container')



open.addEventListener('click',() => {
     
   
    container.classList.add('show-nav')
})


close.addEventListener('click',()=> container.classList.remove('show-nav'))


history.scrollRestoration = "manual";

$(window).on('beforeunload', function(){
      $(window).scrollTop(0);
});
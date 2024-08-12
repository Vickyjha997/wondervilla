// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  
  let btn=document.querySelector('.navbar-toggler');
  let flag=0;
  let nav=document.querySelector('.navbar');
  btn.addEventListener('click',()=>{
    
    if(flag==0){
      flag=1;
      nav.style.marginBottom='80px';
    }
    else{
      flag=0;
      nav.style.marginBottom='0px';
    }
  })


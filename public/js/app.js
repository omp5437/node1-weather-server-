
const weatherForm= document.querySelector('form')
const search=document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        
        response.json().then((data) => {
            if (data.errorMessage) {
                messageOne.textContent = data.errorMessage
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

document.querySelector('#currentLocation').addEventListener('click',(e)=>{
    e.preventDefault()
    if(!navigator.geolocation){
        messageOne.textContent='Geolocation is not supported by your browser!'
    }
    navigator.geolocation.getCurrentPosition((position)=>{

     
       const  lat=parseFloat(position.coords.latitude)
       const long=parseFloat(position.coords.longitude)


        fetch(`/weatherCurrent?lat=${lat}&lon=${long}` ).then((response)=>{
            response.json().then((data) => {
                if (data.errorMessage) {
                    messageOne.textContent = data.errorMessage
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })     

    })
})
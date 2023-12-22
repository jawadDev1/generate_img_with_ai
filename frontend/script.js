const prompt = document.getElementById('prompt');
const generate = document.getElementById('generate');
const showImage = document.getElementById('showImage');
const generating = document.getElementById('generating');

async function getImage(){
    generating.innerText = 'Generating...'
    const response = await fetch('http://localhost:8080/api/v1/generateimage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({prompt: prompt.value})
    });
    const data = await response.json();
    displayImage(data[0].url)
    
}

function displayImage(url){
    if(showImage.hasChildNodes()){
        showImage.removeChild(showImage.firstChild)
    }
    let image = document.createElement('img');
    image.src = url;
    generating.innerText = '';
    showImage.appendChild(image);
}

generate.addEventListener('click', ()=>{
    getImage();
})
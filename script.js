document.getElementById('order-btn').addEventListener("click",()=>{
    const selectedItem =[...document.querySelectorAll('input[type="checkbox"]:checked')].map(checkbox=>checkbox.value) 
    console.log(selectedItem);
    if(selectedItem.length===0){
    alert('Please select one item');
    return;
   }
    document.getElementById('click-sound').play();
    document.getElementById('loading-msg').style.display="block";
   
    const orderPromise = selectedItem.map(item=>
        new Promise(resolve=>{
        setTimeout(()=> resolve(item),Math.random()*5000);
    })) ;

    Promise.all(orderPromise).then(readyItem=>{
        document.getElementById('loading-msg').style.display='none';

        const orderId = `ORD-${Math.floor(Math.random()*10000)}`
        document.getElementById('order-id').textContent = `ORDER ID: ${orderId}`;

        const foodImagesDiv = document.getElementById('food-img');
        foodImagesDiv.innerHTML='';
        readyItem.forEach(item=>{
            const img = document.createElement('img');
            img.src = `img/${item.toLowerCase()}.jpg`; 
            img.alt = `food-item`;
            img.style.width = "150px"; 
            img.style.height = "150px"; 
            console.log(img);
            foodImagesDiv.appendChild(img);
            document.getElementById('complete-sound').play();
    })
    })

})

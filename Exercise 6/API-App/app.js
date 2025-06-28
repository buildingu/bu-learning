
btn = document.querySelector('button');
area = document.querySelector('.area');
btn.addEventListener('click', function (e) {
    e.preventDefault();
    area.innerHTML="";

    fetch("https://x-colors.yurace.pro/api/random")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const hex = data.hex;
            const rgb = data.rgb;
            const hsl = data.hsl;
            displayColor(hex);
            displayDetails(hex,rgb,hsl);
        })
        .catch(error => console.error("Error:", error));

});

function displayColor(whatColor) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('Color');
    colorBox.style.backgroundColor = whatColor;
    area.appendChild(colorBox);
    
};

function displayDetails(hex,rgb,hsl){
    const colorInfo = document.createElement('div');
    colorInfo.innerHTML=`Hex: ${hex}<br> RGB: ${rgb}<br> HSL: ${hsl}`;
    area.appendChild(colorInfo);
};



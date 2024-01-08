

//Add event listener to show the container
document.getElementById('list').addEventListener('click', function () {
    document.getElementById('container').style.transform = 'scale(1)';
});

// Add event listener to close the container
document.getElementById('close').addEventListener('click', function () {
    document.getElementById('container').style.transform = 'scale(0)';
});

// Add event listener for form submission
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    MemorizeMarkers(event); // Call your function here
});

function MemorizeMarkers(event) {
    alert('Form submitted'); // Display an alert for debugging
    event.preventDefault(); // Prevent the default form submission

    let Name = document.getElementById('WebsiteName').value;
    let URL = document.getElementById('URL').value;

    if(!Name && !URL){
        alert('Empty fields not allowed!')
        return false
    }else if(!Name){
        alert('Empty field for Name not allowed!')
        return false
    }else if(!URL){
        alert('Empty field for URL not allowed!')
        return false

    }

    let Data = {
        SiteName: Name,
        SiteURL: URL
    };

    // Retrieve existing data from localStorage
    let storageData = localStorage.getItem('storage');

    if (storageData === null) {
        // If no data exists in localStorage, create a new array and store it
        let arr = [];
        arr.push(Data);
        localStorage.setItem('storage', JSON.stringify(arr));
    } else {
        // If data exists, parse it, add the new data, and store it back
        let get = JSON.parse(storageData);
        get.push(Data);
        localStorage.setItem('storage', JSON.stringify(get));
    }
    //prevent reloading to see the result
    Display()
    document.getElementById('form').reset()
}

function Display() {
    let get = JSON.parse(localStorage.getItem('storage'));
    let result = document.getElementById('yourSites');
    result.innerHTML = '';
    if (get) {
        for (let x = 0; x < get.length; x++) {
            result.innerHTML += '<div>' + get[x].SiteName + '<a href="' + get[x].SiteURL + '" target="_blank">Go</a>' +
                '<button onclick="Delete(\'' + get[x].SiteName + '\')">Delete</button>' + '</div>';
        }
    }
    
}

function Delete(i) {
    let get = JSON.parse(localStorage.getItem('storage'));
    for (let x = 0; x < get.length; x++) {
        if (get[x].SiteName == i) {
            get.splice(x, 1);
        }
    }

    myjson = JSON.stringify(get);
    localStorage.setItem('storage', myjson);
    Display()
}







 

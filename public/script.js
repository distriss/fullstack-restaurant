// Alert Box Display
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('success')) {
        alert('Reservation Successful')
    } else if (urlParams.has('error')) {
        alert('There was an error making the reservation. Please call 0123 456 7890')
    }
}

// Menu Tabs
function openMenu(event, menuName) {
    let menuArr = document.getElementsByClassName("menu");
    Array.from(menuArr).forEach(menu => menu.style.display = 'none');

    let tabLinks = document.getElementsByClassName("tablink"); 
    Array.from(tabLinks).forEach(tab => tab.classList.remove('active-tab'));

    document.getElementById(menuName).style.display = 'block'; 
    event.currentTarget.classList.add('active-tab');
}

document.getElementById("mainLink").click();

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

let price = +movieSelect.value;


container.addEventListener('click', event => {
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
        event.target.classList.toggle('selected');
        updateSelected();
    }
});

movieSelect.addEventListener('change', event =>{
    price = +event.target.value;
    setMovieData(event.target.selectedIndex,event.target.value);
    updateSelected();   
})

function updateSelected () {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const countseats = selectedSeats.length;
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex));
    count.innerText = countseats;
    total.innerText = countseats*price;
}

function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem("movieIndex",movieIndex);
    localStorage.setItem("movePrice",moviePrice);
}

function showDatatoUI(){
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeats'));
    const  selectmovieIndex = localStorage.getItem("movieIndex");
    seats.forEach((seat,index) => {
        if(selectedSeat.indexOf(index) > -1 ) {
            seat.classList.add('selected');
        }
    });
    if (selectmovieIndex !== null) {
        movieSelect.selectedIndex = selectmovieIndex;
    }
}

showDatatoUI();
updateSelected();
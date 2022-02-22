const plane = document.querySelector(".plane");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const airline = document.getElementById("airline");


let ticketPrice = +airline.value;

//this saves selected airline index and price
const setAirlineData = (airlineIndex, airlinePrice) => {
    localStorage.setItem('selectedAirlineIndex', airlineIndex);
    localStorage.setItem('selectedAirlinePrice', airlinePrice);
}

// to update total count
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;  
}

//function to get data and populate UI
let populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            } 
        });
    }

    const selectedAirlineIndex = localStorage.getItem('selectedAirlineIndex');

    if(selectedAirlineIndex !== null) {
        airline.selectedIndex = selectedAirlineIndex;
    }
}

populateUI();

//airline select event
airline.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setAirlineData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// plane seat select event
plane.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

//set initial count and total
updateSelectedCount();
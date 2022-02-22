const plane = document.querySelector(".plane");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const airline = document.getElementById("airline");

let ticketPrice = +airline.value;

//this saves selected airline index and price
function setAirlineData(airlineIndex, airlinePrice){
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
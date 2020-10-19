var ctx = document.getElementById("myChart").getContext('2d');
var chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["red", "green", "blue"],
        datasets: [{
            label: 'Number of votes',
            data: [1, 1, 1],
            backgroundColor: ['red', 'green', 'blue'],
            borderColor: ['green', 'blue', 'red'],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: "chart"
        },
        legend: {
            position: 'bottom'
        }
    }
});
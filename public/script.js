

//chart JS
var ctx = document.getElementById("taskChart").getContext('2d');
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Current", "Completed"],
                datasets: [{
                    label: 'Number of votes',
                    data: [34, 14],
                    backgroundColor: ['green', 'blue'],
                    borderColor: ['green', 'blue'],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Tasks"
                },
                legend: {
                    position: 'bottom'
                },
                responsive: false,
            }
        });

        new Chart(document.getElementById("habitChart"), {
          type: 'horizontalBar',
          data: {
            labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [2478,5267,734,784,433]
              }
            ]
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Predicted world population (millions) in 2050'
            }
          }
      });


//Delete fetch
const del = document.getElementById('delete')
    del.addEventListener('click', 
    function () {  
      fetch('http://localhost:3009/tasks/'+ del.value, {    
         method: 'DELETE'
        })  
        .then(res => {if (res.ok) return res.json()  })
        .then(data => {    
            console.log(data)    
            window.location.reload()  
            })
          .catch(err => console.log(err))
      })
    
              
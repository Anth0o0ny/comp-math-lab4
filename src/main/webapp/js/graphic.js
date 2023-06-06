const ctx = $('#graphic')[0].getContext('2d');
let chart;

document.addEventListener('DOMContentLoaded', function () {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Точки из таблицы',
                data: [],
                backgroundColor: 'rgba(246,162,30,0.2)',
                borderColor: 'rgb(252,200,26)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
})
document.getElementById('dataFile').addEventListener('change', handleFileSelect, false);

function addChangeHandlers(){
    $('.x-val').each(function () {
        $(this).on('change', redrawGraphic);
    });

    $('.y-val').each(function () {
        $(this).on('change', redrawGraphic);
    });
}
const rowCountSelect = document.getElementById('rowCountSelect');
const myTable = document.getElementById('myTable');

rowCountSelect.addEventListener('change', function() {
    const selectedRowCount = parseInt(rowCountSelect.value);
    const currentRowCount = myTable.tBodies[0].rows.length;

    if (selectedRowCount > currentRowCount) {
        const rowsToAdd = selectedRowCount - currentRowCount;
        for (let i = 0; i < rowsToAdd; i++) {
            const newRow = document.createElement('tr');

            const newXData = document.createElement('td');
            const newXInput = document.createElement('input');
            newXInput.classList.add('input', 'is-small', 'x-val');
            newXInput.addEventListener('input', redrawGraphic); // добавляем обработчик события input
            newXData.appendChild(newXInput);
            newRow.appendChild(newXData);

            const newYData = document.createElement('td');
            const newYInput = document.createElement('input');
            newYInput.classList.add('input', 'is-small', 'y-val');
            newYInput.addEventListener('input', redrawGraphic); // добавляем обработчик события input
            newYData.appendChild(newYInput);
            newRow.appendChild(newYData);

            myTable.tBodies[0].appendChild(newRow);
        }
    } else if (selectedRowCount < currentRowCount) {
        const rowsToRemove = currentRowCount - selectedRowCount;
        for (let i = 0; i < rowsToRemove; i++) {
            myTable.tBodies[0].deleteRow(-1);
        }
    }

    redrawGraphic(); // вызываем функцию перерисовки графика после изменения количества строк
});



function redrawGraphic() {
    // const xFields = $('.x-val');
    //
    // const yFields = $('.y-val');
    const xFields = Array.from(document.getElementsByClassName('x-val'));
    const yFields = Array.from(document.getElementsByClassName('y-val'));

    // массивы для хранения значений x и y
    const xValues = [];
    const yValues = [];

    // перебираем все поля ввода и добавляем их значения в соответствующие массивы
    for (let i = 0; i < xFields.length; i++) {
        const xValue = xFields[i].value;
        const yValue = yFields[i].value;

        // проверяем, что поля заполнены и значения уникальны
        if (xValue !== '' && yValue !== '' && !xValues.includes(xValue)) {
            xValues.push(xValue);
            yValues.push(yValue);
        }
    }
    console.log(xFields, yFields)

    const values = [];
    for (let i = 0; i < xFields.length; i++) {
        const xVal = parseFloat($(xFields[i]).val().replaceAll(',', '.'));
        const yVal = parseFloat($(yFields[i]).val().replaceAll(',', '.'));
        values.push({x: xVal, y: yVal});
    }

    for (let i = 0; i < values.length; i++) {
        if (isNaN(values[i].x) || isNaN(values[i].y)) {
            values[i].x = 0;
            values[i].y = 0;
        }
    }

    values.sort(function (a, b) {
        return a.x - b.x;
    });

    // Get unique x values
    let uniqueXValues = [];
    let uniqueYValues = [];
    for (let i = 0; i < values.length; i++) {
        if (!uniqueXValues.includes(values[i].x)) {
            uniqueXValues.push(values[i].x);
            uniqueYValues.push(values[i].y);
        }
    }

    const data = {
        labels: uniqueXValues,
        datasets: [{
            label: 'Точки из таблицы',
            data: uniqueYValues,
            backgroundColor: 'rgba(246,162,30,0.2)',
            borderColor: 'rgb(252,200,26)',
            borderWidth: 3
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    fontSize: 10,
                    max: Math.max(...uniqueYValues),
                    min: Math.min(...uniqueYValues)
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize: 10,
                    max: Math.max(...uniqueXValues),
                    min: Math.min(...uniqueXValues)
                }
            }]
        },
        legend: {
            display: true,
            labels: {
                fontSize: 10,
            }
        }
    };

    chart.data = data;
    chart.options = options;

    chart.update();
}

function handleFileSelect(evt) {
    let files = evt.target.files; // список выбранных файлов
    let file = files[0];

    let reader = new FileReader();
    reader.onload = function (e) {
        // читаем содержимое файла
        let contents = e.target.result;
        let lines = contents.split('\n'); // разделяем содержимое файла на строки
        let xValues = lines[0].split(';'); // разделяем первую строку на массив значений X
        let yValues = lines[1].split(';'); // разделяем вторую строку на массив значений Y

        // заполняем ячейки таблицы
        let tableRows = document.querySelectorAll("#data table tbody tr");
        for (let i = 0; i < tableRows.length; i++) {
            let xInput = tableRows[i].querySelector("td:first-child input");
            let yInput = tableRows[i].querySelector("td:nth-child(2) input");
            if (xValues[i] === undefined || yValues[i] === undefined) continue
            let xVal = xValues[i].replaceAll(',', '.');
            let yVal = yValues[i].replaceAll(',', '.');
            let x = undefined;
            let y = undefined;

            if (xVal !== null && xVal !== undefined && !isNaN(xVal)) {
                x = parseFloat(xVal);
            }

            if (yVal !== null && yVal !== undefined && !isNaN(yVal)) {
                y = parseFloat(yVal);
            }

            console.log(x, y)
            if (x !== undefined && y !== undefined) { // проверяем, что значения X и Y существуют
                xInput.value = x;
                yInput.value = y;
            }
        }
        redrawGraphic();
    };
    reader.readAsText(file);
}


const notificationButton = document.getElementById("notificationButton");
let xValues = [];
let yValues = [];

$(document).ready(function () {
    addChangeHandlers();
    $("#submitButton").on("click", function () {
        redrawGraphic();
        let isValid = true;
        xValues.splice(0, xValues.length);
        yValues.splice(0, yValues.length);

        $(".x-val").each(function () {
            let value = $(this).val().replaceAll(',', '.');

            if (value === null || value === undefined || isNaN(value) || value === "") {
                console.log("INVALID:" + value)
                isValid = false;
                return;
            }

            console.log("x valid:" + value)
            xValues.push(parseFloat(value));
        });

        $(".y-val").each(function () {
            let value = $(this).val().replaceAll(',', '.');

            if (value === null || value === undefined || isNaN(value) || value === "") {
                console.log("INVALID:" + value)
                isValid = false;
                return;
            }

            console.log("y valid:" + value)
            yValues.push(parseFloat(value));
        });

        console.log(new Set(xValues), xValues)
        if (new Set(xValues).size !== xValues.length) {
            isValid = false;
        }

        if (!isValid) {
            document.getElementById("submitHelper").style.display = "block";
            return;
        } else {
            document.getElementById("submitHelper").style.display = "none";
        }

        let data = {
            x: xValues,
            y: yValues
        }

        $.ajax({
            type: "POST",
            url: "points/solve",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function (result) {

                let x = result['x'];
                let phy = result['phy'][0].map(num => parseFloat(num.toFixed(3)));
                let name = result['name'];
                let y = result['y'][0];
                let epsilons = result['epsilons'][0].map(num => parseFloat(num.toFixed(3)));;
                let a = result['a'];
                let b = result['b'];
                let c = result['c'];
                let S = result['S']
                let r = result['r'];
                let deviation = result['deviation'];


                // Создание массива объектов для каждой точки
                // const validPhy = phy.filter(value => !isNaN(value));
                const data = {
                    label: 'Аппроксимированные значения y',
                    data: phy,
                    borderColor: 'blue',
                    backgroundColor: 'transparent',
                    pointRadius: 4,
                    pointHoverRadius: 6
                };

                console.log("chart" + chart);
                // Добавление точек на график
                chart.data.datasets.push(data);
                chart.data.labels.push.apply(chart.data.labels, x);
                chart.update();

                let text = `name: ${name}\n` +
                    `x: ${x}\n` +
                    `phy: ${phy}\n` +
                    `y: ${y}\n` +
                    `epsilons: ${epsilons}\n` +
                    `a: ${a}\n` +
                    `b: ${b}\n` +
                    `c: ${c}\n` +
                    `S: ${S}\n` +
                    `r: ${r === undefined ? 'только для линии' : r}\n` +
                    `deviation: ${deviation}\n`;
                document.getElementById("result").value = text;

            },
            error: function (xhr, status, error) {
                document.getElementById("result").value = error;
            }
        })
    });
});

notificationButton.addEventListener("click", () => {
    submitHelper.style.display = "none";
})



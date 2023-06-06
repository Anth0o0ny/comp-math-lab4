// const rowCountSelect = document.getElementById('rowCountSelect');
// const myTable = document.getElementById('myTable');
//
// rowCountSelect.addEventListener('change', function() {
//     const selectedRowCount = parseInt(rowCountSelect.value);
//     const currentRowCount = myTable.tBodies[0].rows.length;
//
//     if (selectedRowCount > currentRowCount) {
//         const rowsToAdd = selectedRowCount - currentRowCount;
//         for (let i = 0; i < rowsToAdd; i++) {
//             const newRow = document.createElement('tr');
//
//             const newXData = document.createElement('td');
//             const newXInput = document.createElement('input');
//             newXInput.classList.add('input', 'is-small', 'x-val');
//             newXData.appendChild(newXInput);
//             newRow.appendChild(newXData);
//
//             const newYData = document.createElement('td');
//             const newYInput = document.createElement('input');
//             newYInput.classList.add('input', 'is-small', 'y-val');
//             newYData.appendChild(newYInput);
//             newRow.appendChild(newYData);
//
//             myTable.tBodies[0].appendChild(newRow);
//         }
//     } else if (selectedRowCount < currentRowCount) {
//         const rowsToRemove = currentRowCount - selectedRowCount;
//         for (let i = 0; i < rowsToRemove; i++) {
//             myTable.tBodies[0].deleteRow(-1);
//         }
//     }
// });

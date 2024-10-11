const search = document.getElementById("search");
const table = document.querySelector('.table')
const tbody = table.querySelector('.tbody')
const template = document.querySelector('#template')
const sortFlag = [true, true, true, true];


async function getPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
    
        posts.forEach((post) => {
            const row = template.content.cloneNode(true)
            row.querySelector('.userId').textContent = post.userId;
            row.querySelector('.id').textContent = post.id;
            row.querySelector('.title').textContent = post.title;
            row.querySelector('.body').textContent = post.body;
            tbody.append(row)
        });
      
    } catch (error) {
        const row = template.content.cloneNode(true);
        let cells = row.querySelectorAll('td');
        cells.forEach(cell => {cell.textContent = "Posts not found"});
        tbody.append(row)
    }
}


table.addEventListener ("click", function (e) {
    if(e.target.tagName != 'TH') return  
    let th = e.target;
    const rowsArray = sortTable(th.cellIndex, th.dataset.type);

    //удалить предущие значения
    let rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {row.remove();});

    //отрисовать отсортированные значения
    rowsArray.forEach((post) => {
        const item = template.content.cloneNode(true);
        item.querySelector('.userId').textContent = post.querySelector('.userId').textContent;
        item.querySelector('.id').textContent = post.querySelector('.id').textContent;
        item.querySelector('.title').textContent = post.querySelector('.title').textContent;
        item.querySelector('.body').textContent = post.querySelector('.body').textContent;
        tbody.append(item)
    });
    
});

//сортировка таблицы
function sortTable(colNum, type) {
    let tbody = table.querySelector('tbody');
    let rowsArray = Array.from(tbody.rows);
    let compare;
    if(sortFlag[colNum]) {
        if (type == 'number') {
            compare = function(rowA, rowB) {  return Number(rowA.cells[colNum].textContent) - Number(rowB.cells[colNum].textContent)};
        } else {
            compare = function(rowA, rowB) {  return rowA.cells[colNum].textContent >= rowB.cells[colNum].textContent ? 1 : -1};
        }
    } else {
        if (type == 'number') {
            compare = function(rowA, rowB) {  return Number(rowB.cells[colNum].textContent) - Number(rowA.cells[colNum].textContent)};
        } else {
            compare = function(rowA, rowB) {  return rowA.cells[colNum].textContent >= rowB.cells[colNum].textContent ? -1 : 1};
        }
    }
    changeSort(colNum)
    
    return rowsArray.sort(compare);    

}
// смена флага, если произошла сортировка. Флаг -- проверка сколько нажатий было. 
function changeSort (colNum) {
    for (let i = 0; i < sortFlag.length; i++ )
        (i == colNum) ? sortFlag[colNum] = !sortFlag[colNum] : sortFlag[i] = true; 
}

// событие при вводе в поиск
search.addEventListener("keyup", function (e) {
    filter = search.value.toUpperCase();
    const tr = tbody.getElementsByTagName("tr");
    let foundFlag; 

    // Если меньше трех символов введено, покзаываем все строки
    if (filter.length < 3) {
        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "";
        }
        return;
    }

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        foundFlag = false;
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                foundFlag = true;
            }
        }
        
        if (foundFlag) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
});

getPosts();


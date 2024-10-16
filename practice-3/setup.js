const search = document.getElementById("search");
const table = document.querySelector('.table')
const tbody = table.querySelector('.tbody')
const template = document.querySelector('#template')
const sortFlag = [true, true, true, true];
const allRows = [];
const currentRows = [];


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
    } finally {
        const rows = tbody.getElementsByTagName("tr"); 
        for (let i = 0; i < rows.length; i++) {
            allRows.push(rows[i]);
            currentRows.push(rows[i]);
        }
    }
    
}

//слушатель события для сортировки таблицы
table.addEventListener ("click", function (e) {
    if(e.target.tagName != 'TH') return  
    let th = e.target;
    const sortRows = sortTable(th.cellIndex, th.dataset.type);

    renderTable(sortRows);
});

//сортировка таблицы
function sortTable(colNum, type) {
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
    allRows.sort(compare); // сохраняем сортировку всех строк 
    return rowsArray.sort(compare); // возвращаем отсортированные текущие строки
     

}
// смена флага, если произошла сортировка. Флаг -- проверка сколько нажатий было. 
function changeSort (colNum) {
    for (let i = 0; i < sortFlag.length; i++ )
        (i == colNum) ? sortFlag[colNum] = !sortFlag[colNum] : sortFlag[i] = true; 
}


function renderTable(data) {
    let rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {row.remove();});
    data.forEach((d) => {
        const item = template.content.cloneNode(true);
        item.querySelector('.userId').textContent = d.querySelector('.userId').textContent;
        item.querySelector('.id').textContent = d.querySelector('.id').textContent;
        item.querySelector('.title').textContent = d.querySelector('.title').textContent;
        item.querySelector('.body').textContent = d.querySelector('.body').textContent;
        tbody.append(item)
    });
       
    }

//поиск
search.addEventListener("keyup", function (e) {
    const filter = this.value.toLowerCase();
    if (filter.length >= 3) {
        const filterRows=allRows.filter(item => 
            item.innerText.toLowerCase().includes(filter) 
        );
        renderTable(filterRows);
    } 
    else {
        renderTable(allRows); // Показываем все строки, если введено меньше 3 символов
    }
});


getPosts();


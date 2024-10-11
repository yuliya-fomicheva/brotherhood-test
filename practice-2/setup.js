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


getPosts();


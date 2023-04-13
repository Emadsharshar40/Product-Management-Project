let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let Creat = document.getElementById('Creat');
let tbody = document.getElementById('tbody');

let mood = 'creat';
var tmp;
// get total
function getTotal() {
    if(price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(255, 61, 61)';
    }
};
// creat product
let dataProduct;
if(localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
};
Creat.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
// count
    if(title.value != '' 
    && price.value != '' 
    && category.value != '' 
    && newPro.count < 101)
    {
        if(mood === 'creat') {
            if(newPro.count > 1) {
                for(let i = 0; i < newPro.count; i++) {
                    dataProduct.push(newPro);
                };
            } else {
                dataProduct.push(newPro);
            }
        } else {
            dataProduct[tmp] = newPro;
            mood = 'creat';
            Creat.innerHTML = 'Creat';
            count.style.display = 'block';
        }
        clearData();
    };
    // save data in localStorage
    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData();
};
// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};
// read
function showData() {
    getTotal();
    let table = '';
    for(let i = 0; i < dataProduct.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
            </tr>
        `;
    };
    tbody.innerHTML = table;
    let deleteAll = document.getElementById('deleteAll');
    if(dataProduct.length > 0) {
        deleteAll.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
        `;
    } else {
        deleteAll.innerHTML = '';
    };
};
showData();
// delete
function deletePro(i) {
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
};
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
};
// update
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = e[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    Creat.innerHTML = 'UPDATE';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
};
// search
let searchMood = 'title';

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = `search by ${searchMood}`.toUpperCase();
    search.focus();
    search.value = '';
    showData();
};

function searchInData(value) 
{
    let table = '';
    if(searchMood == 'title') 
    {
        for(let j = 0; j < dataProduct.length; j++)
        {
            if(dataProduct[j].title.includes(value.toLowerCase()))
            {
                table += `
                    <tr>
                        <td>${j + 1}</td>
                        <td>${dataProduct[j].title}</td>
                        <td>${dataProduct[j].price}</td>
                        <td>${dataProduct[j].taxes}</td>
                        <td>${dataProduct[j].ads}</td>
                        <td>${dataProduct[j].discount}</td>
                        <td>${dataProduct[j].total}</td>
                        <td>${dataProduct[j].category}</td>
                        <td><button onclick="updateData(${j})" id="update">update</button></td>
                        <td><button onclick="deletePro(${j})" id="delete">delete</button></td>
                    </tr>
                `;
            }
        }
    } else {
        for(let j = 0; j < dataProduct.length; j++)
        {
            if(dataProduct[j].category.includes(value.toLowerCase()))
            {
                table += `
                    <tr>
                        <td>${j + 1}</td>
                        <td>${dataProduct[j].title}</td>
                        <td>${dataProduct[j].price}</td>
                        <td>${dataProduct[j].taxes}</td>
                        <td>${dataProduct[j].ads}</td>
                        <td>${dataProduct[j].discount}</td>
                        <td>${dataProduct[j].total}</td>
                        <td>${dataProduct[j].category}</td>
                        <td><button onclick="updateData(${j})" id="update">update</button></td>
                        <td><button onclick="deletePro(${j})" id="delete">delete</button></td>
                    </tr>
                `;
            }
        }
    }
    tbody.innerHTML = table;
};
//clean data

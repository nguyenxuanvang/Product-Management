const inputNodes = document.querySelectorAll('.insert-form div input');
const buttonNode = document.querySelector('.insert-form button');
let productLists = JSON.parse(localStorage.getItem('productLists'));
if(productLists === null) productLists = [];
let kt = 0;
const dataListNode = document.querySelector('.data-list');
function Product(id,name,cost) {
    this.id = id;
    this.name = name;
    this.cost = cost;
}
const checkValid = function(array) {
    kt = 0;
    array.forEach(item => {
        if (item.value === '') kt = 1;
    });
    return kt;
}
const checkExist = function(array) {
    kt = 0;
    if (array === null) return 0;
    else {
        array.forEach(item => {
            if (item.id === inputNodes[0].value) kt = 1;
        });
    }
    return kt;
}
const findIndex = function(array, index) {
    for(let i = 0; i < array.length; i += 1)
        if (array[i].id === index)
            return i;
    return -1;
}
buttonNode.addEventListener('click',() => {
   
    if(checkValid(inputNodes) === 1)
        alert('vui lòng không để trống');
    else {
        if (checkExist(productLists) === 1) alert('Mã sản phẩm đã tồn tại');
        else {
            let product = new Product(inputNodes[0].value,inputNodes[1].value,inputNodes[2].value);
            productLists.push(product);
            localStorage.setItem('productLists',JSON.stringify(productLists));
            alert('Lưu thành công');
            location.reload();
        }
    }
});
if(productLists.length === 0) dataListNode.classList.add('hidden');
else {
    const bodyNode = document.querySelector('tbody');
    productLists.forEach(item => {
        const trNode = document.createElement('tr');
        bodyNode.appendChild(trNode);
        trNode.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.cost}đ</td>
            <td>
                <a class="action-button edit-button" href="#">Edit</a>
                <a class="action-button delete-button" href="#">Delete</a>
                <button class="save-button hidden">Lưu</button>
                <button class="cancel-button hidden">Quay Lại</button>
            </td>
        `;
    });
}
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(item => {
    item.addEventListener('click',(event)=> {
        event.preventDefault();
        let choice = false;
        let idChoice = event.target.parentElement.parentElement.children[0].textContent;
        choice = confirm (`Bạn có muốn xóa sản phẩm (id=${idChoice})`);
        if(choice === true) {
            for(let i = 0; i < productLists.length; i += 1)
                if(productLists[i].id === idChoice){
                    productLists.splice(i,1);
                    localStorage.setItem('productLists',JSON.stringify(productLists));
                    break;
                }
            const trNode = item.parentElement.parentElement;
            trNode.remove();
        }
    });
});
const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach(item => {
    item.addEventListener('click',()=>{
        const trNode = item.parentElement.parentElement;
        const idChoose = findIndex(productLists,trNode.children[0].textContent);
        trNode.children[3].children[0].classList.toggle('hidden');
        trNode.children[3].children[1].classList.toggle('hidden');
        trNode.children[3].children[2].classList.toggle('hidden');
        trNode.children[3].children[3].classList.toggle('hidden');
        trNode.children[1].innerHTML = `
        <input type="text" name="name" value="${productLists[idChoose].name}">
        `;
        trNode.children[2].innerHTML = `
            <input type="text" name="price" value="${productLists[idChoose].cost}">
        `;
    });
});
const saveButtons = document.querySelectorAll('.save-button');
saveButtons.forEach(item => {
    item.addEventListener('click',() => {
        const trNode = item.parentElement.parentElement;
        const idChoose = findIndex(productLists,trNode.children[0].textContent);
        if(trNode.children[1].children[0].value === '' || trNode.children[2].children[0].value === '')
            alert('Vui lòng không để trống');
        else {
                productLists[idChoose].name = trNode.children[1].children[0].value;
                productLists[idChoose].cost = trNode.children[2].children[0].value;
                trNode.children[3].children[0].classList.toggle('hidden');
                trNode.children[3].children[1].classList.toggle('hidden');
                trNode.children[3].children[2].classList.toggle('hidden');
                trNode.children[3].children[3].classList.toggle('hidden');
                trNode.children[1].innerHTML = `${productLists[idChoose].name}`;
                trNode.children[2].innerHTML = `${productLists[idChoose].cost}đ`;
                localStorage.setItem('productLists',JSON.stringify(productLists));
                alert('Lưu thành công');
        }
    });
});
const cancelButtons = document.querySelectorAll('.cancel-button');
cancelButtons.forEach(item =>{
    item.addEventListener('click',() => {
        const trNode = item.parentElement.parentElement;
        const idChoose = findIndex(productLists,trNode.children[0].textContent);
        trNode.children[3].children[0].classList.toggle('hidden');
        trNode.children[3].children[1].classList.toggle('hidden');
        trNode.children[3].children[2].classList.toggle('hidden');
        trNode.children[3].children[3].classList.toggle('hidden');
        trNode.children[1].innerHTML = `${productLists[idChoose].name}`;
        trNode.children[2].innerHTML = `${productLists[idChoose].cost}đ`;
    });
});

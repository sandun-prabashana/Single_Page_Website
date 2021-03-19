$('#input-Isearch,#input-code,#input-name,#input-qty,#input-price').on('keydown',function (event) {
    var input=(event.key);
    if (input=="Tab"){
        event.preventDefault();
    }
});
/////////////////////////////////////////////////////////////////
function generateOrderId() {
    try {
        let lastOrderId = Item[Item.length-1].getItemCode();
        let newID = parseInt(lastOrderId.substring(5, 7)) + 1;
        if (newID < 10) {
            $("#input-code").val('I00-00'+newID);
        }else if (newID < 100) {
            $("#input-code").val('I00-0'+newID);
        } else {
            $("#input-code").val('I00-'+newID);
        }
    } catch (e) {
        $("#input-code").val('I00-001');
    }

}
/////////////////////////////////////////////////////////////////


var ItemCode=/^(I00-)[0-9]{1,3}$/;

$('#input-code').on('keydown',function (event) {
    var input=(event.key);
    let inputCode=$('#input-code').val();
    if (ItemCode.test(inputCode)){
        $('#lblcode').text('');
        $('#input-code').css('border','2px solid lime');
        if (input=="Enter"){
            $('#input-name').focus();
        }
    }else {
        $('#input-code').css('border','2px solid red');
        $('#lblcode').text('Your Input Data format Is Wrong(I00-001)');
        $('#input-code').focus();
    }
});

$('#input-Isearch').on('keydown',function (event) {
    var input=(event.key);
    let inputSearch=$('#input-Isearch').val();
    if (ItemCode.test(inputSearch)){
        $('#lblIcode').text('');
        $('#input-Isearch').css('border','2px solid lime');
        if (input=="Enter"){
            $('#input-Isearch').focus();
        }
    }else {
        $('#input-Isearch').css('border','2px solid red');
        $('#lblIcode').text('Your Input Data format Is Wrong(I00-001)');
        $('#input-Isearch').focus();
    }
});

/////////////////////////////////////////////////////////////////

var ItemName=/^[A-Z]{1}[a-z]{1,15}$/;

$('#input-name').on('keydown',function (event) {
    var input=(event.key);
    let inputName=$('#input-name').val();
    if (ItemName.test(inputName)){
        $('#lblIname').text('');
        $('#input-name').css('border','2px solid lime');
        if (input=="Enter"){
            $('#input-qty').focus();
        }
    }else {
        $('#input-name').css('border','2px solid red');
        $('#lblIname').text('Your Input Data format Is Wrong(Ex:-Milk)');
        $('#input-name').focus();
    }
});

/////////////////////////////////////////////////////////////////

var Itemqty=/^[0-9]{1,9}$/;

$('#input-qty').on('keydown',function (event) {
    var input=(event.key);
    let inputqty=$('#input-qty').val();
    if (Itemqty.test(inputqty)){
        $('#lblqty').text('');
        $('#input-qty').css('border','2px solid lime');
        if (input=="Enter"){
            $('#input-price').focus();
        }
    }else {
        $('#input-qty').css('border','2px solid red');
        $('#lblqty').text('Your Input Data format Is Wrong(Ex:-1000)');
        $('#input-qty').focus();
    }
});

/////////////////////////////////////////////////////////////////

var Itemprice=/^[0-9]{1,9}(.)[0-9]{2}$/;

$('#input-price').on('keydown',function (event) {
    var input=(event.key);
    let inputprice=$('#input-price').val();
    if (Itemprice.test(inputprice)){
        $('#lblprice').text('');
        $('#input-price').css('border','2px solid lime');
        if (input=="Enter"){
            Itemsave();
        }
    }else {
        $('#input-price').css('border','2px solid red');
        $('#lblprice').text('Your Input Data format Is Wrong(Ex:-100.00)');
        $('#input-price').focus();
    }
});

/////////////////////////////////////////////////////////////////

generateOrderId();

$('#btnIsave').on('click',function () {
    Itemsave();
    III();
    // $('#tblCustomer>tr').on('click');
});


function Itemsave() {
    let code = $("#input-code").val();
    let name = $("#input-name").val();
    let qty = $("#input-qty").val();
    let price = $("#input-price").val();

    let data = saveItem(code,name,qty,price);
    if(data)ItemformClear();
}

function saveItem(code,name,qty,price) {
    let item = new ItemDTO(code,name,qty,price);
    Item.push(item);

    loadAllItem();
    return true;
}

function getAllItems() {
    return Item;
}

function loadAllItem() {
    let allItems = getAllItems();
    $('#tblItem').empty();
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let name = allItems[i].getItemName();
        let qty = allItems[i].getItemQty();
        let price = allItems[i].getItemPrice();

        var row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${price}</td></tr>`;
        $('#tblItem').append(row);
        generateOrderId();
    }
}

function ItemformClear(){
    $('#input-name').val("");
    $('#input-qty').val("");
    $('#input-price').val("");
    $('#input-code').focus();
}

/////////////////////////////////////////////////////////////////////////////

$('#tbl-Item').click(function () {
    var table = document.getElementById('tbl-Item');

    for(var i = 0; i < table.rows.length; i++)
    {
        table.rows[i].onclick = function()
        {
            document.getElementById("input-code").value = this.cells[0].innerHTML;
            document.getElementById("input-name").value = this.cells[1].innerHTML;
            document.getElementById("input-qty").value = this.cells[2].innerHTML;
            document.getElementById("input-price").value = this.cells[3].innerHTML;
        };
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////

$("#btnIdelete").click(function () {
    let code = $("#input-code").val();
    let option=confirm(`Do you want to delete This Item:${code}`);
    if (option){
        let result=deleteItem(code);
        if (result){
            alert("Item Deleted");
        } else{
            alert("Item Failed")
        }

    }
    loadAllItem();
    ItemformClear();
});

function deleteItem(code) {
    let item = searchItem(code);
    if (item != null) {
        let indexNumber = Item.indexOf(item);
        Item.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

function searchItem(id) {
    for (var i in Item) {
        if (Item[i].getItemCode() == id) return Item[i];
    }
    return null;
}

/////////////////////////////////////////////////////////////////////////////////////////////////

$("#btnIupdate").click(function () {
    let code = $("#input-code").val();
    let name = $("#input-name").val();
    let qty = $("#input-qty").val();
    let price = $("#input-price").val();

    let option=confirm(`Do you want to Update Item:${code}`);
    if (option){
        let result= updateItem(code,name,qty,price);
        if (result){
            alert("Item Updated");
        }else{
            alert("Item Update Fail");
        }
    }
    loadAllItem();
    ItemformClear();

});

function updateItem(code,name,qty,price) {
    let item = searchItem(code);
    if (item != null) {
        item.setItemCode(code)
        item.setItemName(name)
        item.setItemQty(qty);
        item.setItemPrice(price);
        return true;
    } else {
        return false;
    }
}

//////////////////////////////////////////////////////////////////////////////////////

$('#btnIsearch').on('click',function () {
    let code=$('#input-Isearch').val();
    let item = searchItem(code);
    if (item != null) {
        $("#input-code").val(item.getItemCode());
        $("#input-name").val(item.getItemName());
        $("#input-qty").val(item.getItemQty());
        $("#input-price").val(item.getItemPrice());
    } else {
        ItemformClear();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////

function III() {
    var input=Item.length;
    var text=document.getElementById('itemCount');
    text.innerText=input;
}
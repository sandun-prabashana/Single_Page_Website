var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today =yyyy+'-'+MM+'-'+dd;

$('#txtDate').val(today);


$("#btnAddToTable").click(function () {

    let code = $('#txtItemCode').val();
    let check = isExist(code);
    if (!check) {
        let oId = $('#txtOrderID').val();
        let code = $('#txtItemCode').val();
        let name = $('#txtItemDescription').val();
        let qty =  $('#txtQty').val();
        let price = $('#txtItemPrice').val();

        let tot=parseFloat(qty)*parseFloat(price);

        var row = `<tr><td class="code">${code}</td><td>${name}</td><td>${price}</td><td>${qty}</td><td>${tot}</td>
        <td>
        <button type='button' onclick='productDelete(this);' class='btn btn-default'>
        <img src="../img/multiply_26px.png">
        </button>
        </td>
        </tr>`;
        $('#orderTable').append(row);
        saveOrders(oId,code,name,price,qty,tot);

        let tot1=0;
        let table = document.getElementById('tblOrders');
        let count = table.rows.length;
        for(let i=1; i<count; i++) {
            tot1 += parseFloat(table.rows[i].cells[4].innerText);
        }
        var text=document.getElementById('total');
        text.innerText=tot1;

        var subtext=document.getElementById('subtotal');
        let discount=$('#txtDiscount');
        if (tot1 > 2000 && tot1 < 5000) {
            discount.val('10%');
            let disvalue=(tot - (tot1/100)*10);
            subtext.innerText=disvalue;
        } else if (tot1 > 5000) {
            discount.val('20%');
            let disvalue=(tot - (tot1/100)*20);
            subtext.innerText=disvalue;
        } else {
            discount.val('NO Discount');
            let disvalue=(tot1);
            subtext.innerText=disvalue;
        }



    } else {
        alert("Item is already in Order!");
    }

});

const isExist = function (code) {

    let table = document.getElementById('tblOrders');
    let count = table.rows.length;
    for(let i=0; i<count; i++) {
        if (table.rows[i].cells[0].innerText === code) {
            return true;
        }
    }
    return false;
}
function productDelete(ctl){
    $(ctl).parents("tr").remove();
    Orders.pop();
}

function saveOrders(oId,code,name,price,qty,tot) {
    let order = new OrderDTO(oId,code,name,price,qty,tot);
    Orders.push(order);

    return true;
}
$('#txtQty').on('keydown',function (event) {
    cheakQty();
});

function cheakQty() {
    let qty =  $('#txtQty').val();
    let count= $('#txtQTYOnHand').val();
    let name = $('#txtItemDescription').val();
    if(count<qty){
        $('#txtQty').val('0');
        $('#order-qty-empty-error').text('You can only get maximum of ' + count + ' '+ name);
        $('#txtQty').css('border','2px solid red');
    }else{
        $('#order-qty-empty-error').text('');
        $('#txtQty').css('border','2px solid lime');

        }
}

$('#txtCash').on('keydown',function (event) {
    var input=(event.key);
    let tot=document.getElementById('subtotal').innerText;
    let cash=$('#txtCash').val();
    let ftot=parseFloat(tot);
    let fcash=parseFloat(cash);
    if (input=="Enter") {
        if (ftot > fcash) {
            alert("Please Enter Correct Amount")
        } else {
            let result = parseFloat(cash) - parseFloat(tot);
            $('#txtBalance').val(result);
        }
    }
});
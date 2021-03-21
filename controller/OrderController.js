
var OrderId=/^(M00-)[0-9]{1,3}$/;

$('#txtOrderID').on('keydown',function (event) {
    var input=(event.key);
    let inputID=$('#txtOrderID').val();
    if (OrderId.test(inputID)){
        $('#orderId-invalid-error').text('');
        $('#txtOrderID').css('border','2px solid lime');
        if (input=="Enter"){
            $('#txtDate').focus();
        }
    }else {
        $('#txtOrderID').css('border','2px solid red');
        $('#orderId-invalid-error').text('Your Input Data format Is Wrong(M00-001)');
        $('#txtOrderID').focus();
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////

function loadCustomer() {
    let allCustomers = getAllCustomers();
    $('#selectCusID').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerName();

        var option = `<option>${id}</option>`;
        $('#selectCusID').append(option);
    }
}

//////////////////////////////////////////////////////////////////////////////////////


$('#selectCusID').on('click',function () {
    let name=$('#selectCusID').val();
    let customer = searchCustomerByName(name);
    if (customer != null) {
        $("#orderCustomerID").val(customer.getCustomerID());
        $("#orderCustomerName").val(customer.getCustomerName());
        $("#orderCustomerNumber").val(customer.getCustomerNo());
        $("#orderCustomerAddress").val(customer.getCustomerAddress());
    } else {

    }
});

function searchCustomerByName(name) {
    for (var i in Customer) {
        if (Customer[i].getCustomerName() == name) return Customer[i];
    }
    return null;
}


/////////////////////////////////////////////////////////////////////////////////////////////

function loadItem() {
    let allItems = getAllItems();
    $('#selectItemCode').empty();
    for (var i in allItems) {
        let code = allItems[i].getItemName();

        var option = `<option>${code}</option>`;
        $('#selectItemCode').append(option);
    }
}

//////////////////////////////////////////////////////////////////////////////////////


$('#selectItemCode').on('click',function () {
    let code=$('#selectItemCode').val();
    let Item = searchItemByName(code);
    if (Item != null) {
        $("#txtItemCode").val(Item.getItemCode());
        $("#txtItemDescription").val(Item.getItemName());
        $("#txtItemPrice").val(Item.getItemPrice());
        $("#txtQTYOnHand").val(Item.getItemQty());
        $("#txtQty").val(Item.getItemQty());
    } else {

    }
});

function searchItemByName(code) {
    for (var i in Item) {
        if (Item[i].getItemName() == code) return Item[i];
    }
    return null;
}


/////////////////////////////////////////////////////////////////////////////////////////////

// function loadItemToTable(){
//         let oId = $('#txtOrderID').val();
//
//         let code = $('#txtItemCode').val();
//         let name = $('#txtItemDescription').val();
//         let qty =  $('#txtQty').val();
//         let price = $('#txtItemPrice').val();
//
//         let tot=parseFloat(qty)*parseFloat(price);
//
//         setqty();
//         saveOrders(oId,code,name,price,qty,tot);
//         var row = `<tr><td class="code">${code}</td><td>${name}</td><td>${price}</td><td>${qty}</td><td>${tot}</td>
//         <td>
//         <button type='button' onclick='productDelete(this ${code});' class='btn btn-default'>
//         <img src="../img/multiply_26px.png">
//         </button>
//         </td>
//         </tr>`;
//         $('#orderTable').append(row);
//
//
//
//         // update item
//         let ItemAmount= $('#txtQTYOnHand').val();
//         updateItem(code,name,ItemAmount,price);
//
//     // }
//
//
// }
//
//
// // function mytable() {
// //     let tbl=document.getElementById('tblOrders').rows.length;
// //     let code = $('#txtItemCode').val();
// //     for(let i=1; i< tbl; i++){
// //         let data=document.getElementById('tblOrders').rows[i].cells[0].innerHTML;
// //         if(data==code){
// //
// //         }
// //     }
// // }
//
// function productDelete(ctl,a){
//     $(ctl).parents("tr").remove();
//     Orders.pop();
//     // let count= $('#txtQTYOnHand').val();
//     // let tot=parseInt(count)+parseInt(qty);
//     // $('#txtQTYOnHand').val(tot);
//     // updateItem(code,name,tot,price);
// }
// //
// //
// function saveOrders(oId,code,name,price,qty,tot) {
//     let order = new OrderDTO(oId,code,name,price,qty,tot);
//     Orders.push(order);
//
//     return true;
// }
// //
// function setqty(){
//     let qty =  $('#txtQty').val();
//     let count= $('#txtQTYOnHand').val();
//
//     let tot= parseInt(count)-parseInt(qty);
//
//     $('#txtQTYOnHand').val(tot);
// }
//
// $('#btnAddToTable').on('click',function () {
//
//     loadItemToTable();
//
// });
// //
// // ///////////////////////////////////////////////////////////////////////
// //
// function cheakQty() {
//     let qty =  $('#txtQty').val();
//     let count= $('#txtQTYOnHand').val();
//     let name = $('#txtItemDescription').val();
//     if(count<qty){
//         $('#txtQty').val('0');
//         $('#order-qty-empty-error').text('You can only get maximum of ' + count + ' '+ name);
//         $('#txtQty').css('border','2px solid red');
//     }else{
//         $('#order-qty-empty-error').text('');
//         $('#txtQty').css('border','2px solid lime');
//
//         }
// }
// //
// //
// $('#txtQty').on('keydown',function () {
//     cheakQty();
// });
// //
// // var no=0;
// // //
// // function removeDuplicate(qty){
// //     var email = new Array();
// //     let code = $('#txtItemCode').val();
// //     var arr = document.getElementsByClassName('code');
// //     var tbl = document.getElementById('tblOrders').rows.length;
// //     var tbl1= document.getElementById('tblOrders');
// //     for(let a=0; a< arr.length; a++){
// //         email.push(arr[a].innerHTML);
// //     }
// //     for(let i=0; i< tbl; i++) {
// //
// //             if(no>0) {
// //                 if (tbl1.rows[i + 1].cells[0].innerHTML == code) {
// //                     console.log(email[i]);
// //                     console.log(i);
// //                     let code = tbl1.rows[i].cells[0].innerHTML
// //                     let name = tbl1.rows[i].cells[1].innerHTML
// //                     let price = tbl1.rows[i].cells[2].innerHTML
// //                     let oldqty = tbl1.rows[i].cells[3].innerHTML
// //                     let newQty = parseInt(oldqty) + parseInt(qty);
// //                     let tot = parseFloat(newQty) * parseFloat(price);
// //
// //                     var row = `<tr><td class="code">${code}</td><td>${name}</td><td>${price}</td><td>${newQty}</td><td>${tot}</td>
// //         <td>
// //         <button type='button' onclick='productDelete(this);' class='btn btn-default'>
// //         <img src="../img/multiply_26px.png">
// //         </button>
// //         </td>
// //         </tr>`;
// //                     $('#orderTable').append(row);
// //
// //                 } else {
// //                     newsave();
// //                 }
// //             }else{
// //                 newsave();
// //                 no=1;
// //             }
// //
// //     }
// //
// // }
// //
// // function newsave() {
// //     let oId = $('#txtOrderID').val();
// //
// //     let code = $('#txtItemCode').val();
// //     let name = $('#txtItemDescription').val();
// //     let qty =  $('#txtQty').val();
// //     let price = $('#txtItemPrice').val();
// //
// //     let tot=parseFloat(qty)*parseFloat(price);
// //
// //     setqty();
// //     saveOrders(oId,code,name,price,qty,tot);
// //     var row = `<tr><td class="code">${code}</td><td>${name}</td><td>${price}</td><td>${qty}</td><td>${tot}</td>
// //         <td>
// //         <button type='button' onclick='productDelete(this);' class='btn btn-default'>
// //         <img src="../img/multiply_26px.png">
// //         </button>
// //         </td>
// //         </tr>`;
// //     $('#orderTable').append(row);
// //
// //
// //
// // }
//
// ///////////////////////////////////////////////////////////////////////////////////////////////
// // $('#txtQty').on('keydown',function () {
// //     cheakQty()
// // });
// //
// // function cheakQty() {
// //     let qty =  $('#txtQty').val();
// //     let count= $('#txtQTYOnHand').val();
// //     let name = $('#txtItemDescription').val();
// //     if(count<qty){
// //         $('#txtQty').val('');
// //         $('#order-qty-empty-error').text('You can only get maximum of ' + count + ' '+ name);
// //         $('#txtQty').css('border','2px solid red');
// //     }else{
// //         $('#order-qty-empty-error').text('');
// //         $('#txtQty').css('border','2px solid lime');
// //         }
// // }
//
// /////////////////////////////////////////////////////////////////
// //
// // var a=1;
// //
// // function find(){
// //     let itCode = $('#txtItemCode').val();
// //     console.log('a');
// //     let allOrders = getAllOrders();
// //     console.log('b');
// //     for (var i in allOrders) {
// //         if (typeof i=="undefined"){
// //             console.log('D');
// //         }
// //
// //         let code = allOrders[i].getOrderCode();
// //
// //         if(code==itCode){
// //             correct();
// //         }else{
// //             OrderSave();
// //         }
// //     }
// // }
// //
// // var z=0;
// //
// // var a=0;
// // var b=0;
// //
// // function newValue() {
// //     let itCode = $('#txtItemCode').val();
// //     let allOrders = getAllOrders();
// //     len=0;
// //     for (var i in allOrders) {
// //         let code = allOrders[i].getOrderCode();
// //         if (code==itCode){
// //             len=1;
// //             ++a;
// //             break;
// //         }else{
// //             len=1;
// //             ++b;
// //             break;
// //         }
// //     }
// // }
//
// // var len=0;
// // $('#btnAddToTable').on('click',function () {
// //     newValue();
// //     // OrderSave();
// //     // deleteArray();
// //     if (len==0){
// //         OrderSave();
// //     }else{
// //         deleteArray();
// //         console.log('1')
// //         if (a>0){
// //             OrderSave();
// //         }else if (b>0){
// //             deleteArray();
// //         }
// //     }
//
//
// // var select=0;
// //     let itCode = $('#txtItemCode').val();
// //     let allOrders = getAllOrders();
// //     for (var i in allOrders) {
// //         let code = allOrders[i].getOrderCode();
// //         if(code==itCode){
// //             // correct();
// //             // break;
// //             ++select;
// //         }else{
// //             // OrderSave();
// //             // console.log("old");
// //             // break;
// //             --select;
// //         }
// //     }
// //     if (select>=0){
// //         correct();
// //     }else {
// //         OrderSave();
// //         console.log("old");
// //     }
// //     if (z==0){
// //         OrderSave();
// //         console.log("new");
// //     }
//
//     // $('#tblCustomer>tr').on('click');
// // });
//
//
// // function OrderSave() {
// //         let oId = $('#txtOrderID').val();
// //
// //         let code = $('#txtItemCode').val();
// //         let name = $('#txtItemDescription').val();
// //         let qty = $('#txtQty').val();
// //         let price = $('#txtItemPrice').val();
// //
// //         let tot = parseFloat(qty) * parseFloat(price);
// //
// //         let data = saveOrder(oId,code,name,price,qty,tot);
// //         setqty();
// //     console.log("add");
// //         len=1;
// //     // if(data)ItemformClear();
// // }
// //
// function saveOrder(oId,code,name,price,qty,tot) {
//     let order = new OrderDTO(oId,code,name,price,qty,tot);
//     Orders.push(order);
//
//     loadAllOrders();
//     return true;
// }
//
// function getAllOrders() {
//     return Orders;
// }
//
// function loadAllOrders() {
//     let allOrders = getAllOrders();
//     $('#orderTable').empty();
//     for (var i in allOrders) {
//         // let oId=allOrders[i].getOrderID();
//         let code = allOrders[i].getOrderCode();
//         let name = allOrders[i].getOrderName();
//         let price = allOrders[i].getOrderPrice();
//         let qty = allOrders[i].getOrderQty();
//         let tot=allOrders[i].getOrderTot();
//
//         // let orderID = $('#txtItemCode').val();
//
//         var row = `<tr><td>${code}</td><td>${name}</td><td>${price}</td><td>${qty}</td><td>${tot}</td>
//          <td>
//          <button type='button' class='btn btn-default'>
//          <img src="../img/multiply_26px.png">
//          </button>
//          </td>
//         </tr>`;
//         $('#orderTable').append(row);
//
//
//
//     }
// }
//
// function correct() {
//     let allOrders = getAllOrders();
//     let orderID = $('#txtItemCode').val();
//     for (var i in allOrders) {
//         var oId=allOrders[i].getOrderID();
//         var code = allOrders[i].getOrderCode();
//         var name = allOrders[i].getOrderName();
//         var price = allOrders[i].getOrderPrice();
//         var qty = allOrders[i].getOrderQty();
//         var tot = allOrders[i].getOrderTot();
//
//         if (code==orderID){
//             let Oqty = $('#txtQty').val();
//             var newQty=parseInt(qty)+parseInt(Oqty);
//
//             var newtot = parseFloat(newQty) * parseFloat(price);
//
//             updateOrder(oId,code,name,price,newQty,newtot);
//             console.log("update");
//             setqty();
//         }else{
//             console.log("erro");
//         }
//     }
//      // updateOrder(oId,code,name,price,newQty,newtot);
//      // setqty();
// }
//
// function ItemformClear(){
//     $('#input-code').val("");
//     $('#input-name').val("");
//     $('#input-qty').val("");
//     $('#input-price').val("");
//     $('#input-code').focus();
// }
// function setqty(){
//     let qty =  $('#txtQty').val();
//     let count= $('#txtQTYOnHand').val();
//
//     let tot= count - qty;
//
//
//     $('#txtQTYOnHand').val(tot);
// }
//
// /////////////////////////////////////////////////////////////////////////////////////////////////
//
// function updateOrder(oId,code,name,price,newQty,newtot){
//
//     updateOrders(oId,code,name,price,newQty,newtot);
//
//     loadAllOrders();
//
// };
//
// function updateOrders(oId,code,name,price,newQty,newtot) {
//     let order = searchOrder(oId);
//     if (order != null) {
//         order.setOderID(oId);
//         order.setOderCode(code);
//         order.setOderName(name);
//         order.setOderPrice(price);
//         order.setOderQty(newQty);
//         order.setOderTot(newtot);
//         return true;
//     } else {
//         return false;
//     }
// }
//
//
// function searchOrder(oId) {
//     for (var i in Orders) {
//         if (Orders[i].getOrderID() == oId) return Orders[i];
//     }
//     return null;
// }
// //////////////////////////////////////////////////////////////////////////////////////
// function deleteArray() {
//
//     let code = $('#txtItemCode').val();
//
//     newOrder();
//
//     loadAllOrders();
// }
//
// function deleteOrder(code) {
//     let oder = searchCode(code);
//     if (oder != null) {
//         let indexNumber = Orders.indexOf(oder);
//         Orders.splice(indexNumber, 1);
//         return true;
//     } else {
//         return false;
//     }
// }
//
// function searchCode(code) {
//     for (var i in Orders) {
//         if (Orders[i].getOrderCode() == code) return Orders[i];
//     }
//     return null;
// }
//
// function newOrder() {
//     let allOrders = getAllOrders();
//     let itCode = $('#txtItemCode').val();
//     for (var i in allOrders) {
//         let code = allOrders[i].getOrderCode();
//         if (itCode==code){
//             deleteOrder(code);
//             console.log("delete");
//             // break;
//         }else {
//             console.log("del");
//             OrderSave();
//         }
//     }
// }
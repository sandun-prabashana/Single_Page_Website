$('#input_id,#input_name,#input_address,#input_number,#input_nic').on('keydown',function (event) {
    var input=(event.key);
    if (input=="Tab"){
        event.preventDefault();
    }
});
///////////////////////////////////////////////////////////////////////////////////

function generateCustomerId() {
    try {
        let lastCustomerId = Customer[Customer.length-1].getCustomerID();
        let newID = parseInt(lastCustomerId.substring(5, 7)) + 1;
        if (newID < 10) {
            $("#input_id").val('C00-00'+newID);
        }else if (newID < 100) {
            $("#input_id").val('C00-0'+newID);
        } else {
            $("#input_id").val('C00-'+newID);
        }
    } catch (e) {
        $("#input_id").val('C00-001');
    }

}

/////////////////////////////////////////////////////////////////


var CustomerRegId=/^(C00-)[0-9]{1,3}$/;

$('#input_id').on('keydown',function (event) {
    var input=(event.key);
    let inputID=$('#input_id').val();
    if (CustomerRegId.test(inputID)){
        $('#lblid').text('');
        $('#input_id').css('border','2px solid lime');
        if (input=="Enter"){
            $('#input_name').focus();
        }
    }else {
        $('#input_id').css('border','2px solid red');
        $('#lblid').text('Your Input Data format Is Wrong(C00-001)');
        $('#input_id').focus();
    }
});

$('#input-search').on('keydown',function (event) {
    var input=(event.key);
    let inputSearch=$('#input-search').val();
    if (CustomerRegId.test(inputSearch)){
        $('#lblsearch').text('');
        $('#input-search').css('border','2px solid lime');
        // if (input=="Enter"){
        //     $('#input_name').focus();
        // }
    }else {
        $('#input-search').css('border','2px solid red');
        $('#lblsearch').text('Your Input Data format Is Wrong(C00-001)');
        $('#input-search').focus();
    }
});
/////////////////////////////////////////////////////////////////
var CustomerName=/^[A-Z]{1}[a-z]{1,9}( )[A-Z]{1}[a-z]{1,9}$/;

$('#input_name').on('keydown',function (event) {
    var input=(event.key);
    let inputName=$('#input_name').val();
    if (CustomerName.test(inputName)){
        $('#lblname').text('');
        $('#input_name').css('border','2px solid lime');
        if (input=="Enter"){
            $('#input_address').focus();
        }
    }else {
        $('#input_name').css('border','2px solid red');
        $('#lblname').text('Your Input Data format Is Wrong(Ex:-Saman Kumara)');
        $('#input_name').focus();
    }
});

/////////////////////////////////////////////////////////////////

var CustomerAddress=/^[A-Z]{1}[a-z]{1,15}$/;

$('#input_address').on('keydown',function (event) {
    var input=(event.key);
    let inputAddress=$('#input_address').val();
    if (CustomerAddress.test(inputAddress)){
        $('#lbladdress').text('');
        $('#input_address').css('border','2px solid lime');
        if (input=="Enter"){
            $('#input_number').focus();
        }
    }else {
        $('#input_address').css('border','2px solid red');
        $('#lbladdress').text('Your Input Data format Is Wrong(Ex:-Colombo)');
        $('#input_address').focus();
    }
});

/////////////////////////////////////////////////////////////////

var CustomerNo=/^[0-9]{3}(-)[0-9]{7}$/;

$('#input_number').on('keydown',function (event) {
    var input=(event.key);
    let inputNo=$('#input_number').val();
    if (CustomerNo.test(inputNo)){
        $('#lblno').text('');
        $('#input_number').css('border','2px solid lime');
        if (input=="Enter"){
            $('#input_nic').focus();
        }
    }else {
        $('#input_number').css('border','2px solid red');
        $('#lblno').text('Your Input Data format Is Wrong(Ex:-077-1234567)');
        $('#input_number').focus();
    }
});

/////////////////////////////////////////////////////////////////

var CustomerNic=/^[0-9]{8,16}(V)$/;

$('#input_nic').on('keydown',function (event) {
    var input=(event.key);
    let inputNic=$('#input_nic').val();
    if (CustomerNic.test(inputNic)){
        $('#lblnic').text('');
        $('#input_nic').css('border','2px solid lime');
        if (input=="Enter"){
            save();
        }
    }else {
        $('#input_nic').css('border','2px solid red');
        $('#lblnic').text('Your Input Data format Is Wrong(Ex:-19991010V)');
        $('#input_nic').focus();
    }
});

/////////////////////////////////////////////////////////////////////////////

$('#input_id').on('dblclick',function () {
    $(this).remove();
});

/////////////////////////////////////////////////////////////////////////////

generateCustomerId();

$('#btn_save').on('click',function () {
    save();
    CCC();
    $('#tblCustomer>tr').on('click');
});


function save() {
    let id = $("#input_id").val();
    let name = $("#input_name").val();
    let address = $("#input_address").val();
    let no = $("#input_number").val();
    let nic = $("#input_nic").val();

    let data = saveCustomer(id, name, address, no, nic);
    if(data)formClear();
}

function saveCustomer(id, name, address, no, nic) {
    let customer = new CustomerDTO(id, name, address, no, nic);
    Customer.push(customer);

    loadAllCustomer();
    return true;
}

function getAllCustomers() {
    return Customer;
}

function loadAllCustomer() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let no = allCustomers[i].getCustomerNo();
        let nic = allCustomers[i].getCustomerNic();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${no}</td><td>${nic}</td></tr>`;
        $('#tblCustomer').append(row);
        generateCustomerId();
    }
}

function formClear(){
    $('#input_name').val("");
    $('#input_address').val("");
    $('#input_number').val("");
    $('#input_nic').val("");
    $('#input_id').focus();
}

/////////////////////////////////////////////////////////////////////////////

// $('#tblCustomer>tr').off('click',function () {
//     let id=$(this).children('td:eq(0)').text();
//     $('#input_id').val(id);
// });

$('#tbl_customer').click(function () {
    var table = document.getElementById('tbl_customer');

    for(var i = 0; i < table.rows.length; i++)
    {
        table.rows[i].onclick = function()
        {
            document.getElementById("input_id").value = this.cells[0].innerHTML;
            document.getElementById("input_name").value = this.cells[1].innerHTML;
            document.getElementById("input_address").value = this.cells[2].innerHTML;
            document.getElementById("input_number").value = this.cells[3].innerHTML;
            document.getElementById("input_nic").value = this.cells[4].innerHTML;
        };
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////

$("#btn_delete").click(function () {
    let cusID = $("#input_id").val();
    let option=confirm(`Do you want to delete This Customer:${cusID}`);
    if (option){
        let result=deleteCustomer(cusID);
        if (result){
            alert("Customer Deleted");
        } else{
            alert("Delete Failed")
        }

    }

    loadAllCustomer();
    formClear();
});

function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = Customer.indexOf(customer);
        Customer.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

function searchCustomer(id) {
    for (var i in Customer) {
        if (Customer[i].getCustomerID() == id) return Customer[i];
    }
    return null;
}

/////////////////////////////////////////////////////////////////////////////////////////////////

$("#btn_update").click(function () {
    let id = $("#input_id").val();
    let name = $("#input_name").val();
    let address = $("#input_address").val();
    let no = $("#input_number").val();
    let nic = $("#input_nic").val();

    let option=confirm(`Do you want to Update Customer ID:${id}`);
    if (option){
        let result= updateCustomer(id, name, address, no, nic);
        if (result){
            alert("Customer Updated");
        }else{
            alert("Customer Update Faild");
        }
    }
    generateCustomerId();
    loadAllCustomer();
    formClear();
});

function updateCustomer(id, name, address, no, nic) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerNo(no);
        customer.setCustomerNic(nic);
        return true;
    } else {
        return false;
    }
}

//////////////////////////////////////////////////////////////////////////////////////


$('#btn-search').on('click',function () {
    let id=$('#input-search').val();
    let customer = searchCustomer(id);
    if (customer != null) {
        $("#input_id").val(customer.getCustomerID());
        $("#input_name").val(customer.getCustomerName());
        $("#input_address").val(customer.getCustomerAddress());
        $("#input_number").val(customer.getCustomerNo());
        $("#input_nic").val(customer.getCustomerNic())
    } else {
        formClear();
    }
});

///////////////////////////////////////////////////////////////////////////////////
function CCC() {
    var input=Customer.length;
    var text=document.getElementById('custCount');
    text.innerText=input;
}
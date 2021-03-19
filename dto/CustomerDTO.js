function CustomerDTO(id, name, address, no, nic) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __no = no;
    var __nic = nic;

    this.getCustomerID = function () {
        return __id;
    }
    this.getCustomerName = function () {
        return __name;
    }
    this.getCustomerAddress = function () {
        return __address;
    }
    this.getCustomerNo = function () {
        return __no;
    }
    this.getCustomerNic = function () {
        return __nic;
    }

///////////////////////////////////////////////////////////////////////////////

    this.setCustomerID = function (newID) {
        __id = newID;
    }
    this.setCustomerName = function (newName) {
        __name = newName;
    }
    this.setCustomerAddress = function (newAddress) {
        __address = newAddress;
    }
    this.setCustomerNo = function (newNo) {
        __no = newNo;
    }
    this.setCustomerNic = function (newNic) {
        __nic = newNic;
    }

}

var rootMenu = basicUrl + '/api/v1/menus';
var rootIngrdient = basicUrl + '/api/v1/ingredients';
var rootRecipe = basicUrl + '/api/v1/recipes';
var selectedUserId = 0;
var user_info = JSON.parse(window.localStorage.getItem('user_info'));
var dt;
var totalAmount = 0;
var bankId = 0;
var custId = 0;
var isGoods = 0;
var isBranch = 0;
var goodsId = 0;
$(document).ready(function () {
    $('#afterUpdateBtn').hide();
    setIngredients();
    setMenus();

});

function setMenus() {
    var api = rootMenu + '/all';
    $.ajax({
        type: "GET",
        url: api,
        headers: {'Authorization': 'Bearer ' + user_info.token},
        contentType: 'application/json',
        error: function (res) {
            console.log(JSON.stringify(res));
            alert(JSON.stringify(res));
        },
        success: function (res) {
            var selectOption = new Option("--Select One--", "", false, false);
            $('#menuName').append(selectOption);
            var len = res.content.length;
            for (var i = 0; i < len; i++) {
                var options = new Option(res.content[i].menuName, res.content[i].id, false, false);
                $('#menuName').append(options);
            }
        }
    });
}


function setIngredients() {
    var api = rootIngrdient + '/all';
    $.ajax({
        type: "GET",
        url: api,
        headers: {'Authorization': 'Bearer ' + user_info.token},
        contentType: 'application/json',
        error: function (res) {
            console.log(JSON.stringify(res));
            alert(JSON.stringify(res));
        },
        success: function (res) {
            var selectOption = new Option("--Select One--", "", false, false);
            $('#ingredientName').append(selectOption);
            var len = res.content.length;
            for (var i = 0; i < len; i++) {
                var options = new Option(res.content[i].name, res.content[i].id, false, false);
                $('#ingredientName').append(options);
            }
        }
    });
}

function hideBtn() {
    $('#afterUpdateBtn').show();
    $('#mainBtn').hide();
}


//Compose template string
String.prototype.compose = (function () {
    var re = /\{{(.+?)\}}/g;
    return function (o) {
        return this.replace(re, function (_, k) {
            return typeof o[k] != 'undefined' ? o[k] : '';
        });
    }
}());


$('#tableBtn').click(function () {
    var i = 0;

    // var rowCount = $('table#myTable tr:last').index() + 1;
    var rowCount = Math.floor((Math.random() * 10000) + 1);

    var tbody = $('#myTable').children('tbody');
    var table = tbody.length ? tbody : $('#myTable');
    var row = '<tr id="row_' + rowCount + '">' +
        '<td style="display: none">{{id}}</td>' +
        '<td id="ingredientName_' + rowCount + '">{{description}}</td>' +
        // '<td id="goodQuantity_' + rowCount + '">{{quantity}}</td>' +
        // '<td id="goodUnitPrice_' + rowCount + '">{{unitPrice}}</td>' +
        // '<td id="goodUnit_' + rowCount + '">{{unit}}</td>' +
        // '<td id="goodAmount_' + rowCount + '">{{totalAmount}}</td>' +
        // '<td id="goodPackMarks_' + rowCount + '">{{packMarks}}</td>' +
        '<td><i value="Delete" type="button" alt="Delete6" class="deleteIcon fa fa-trash"></i></button></td>'
    '</tr>';
    //Add row
    table.append(row.compose({
        'id': rowCount,
        'description': $('#ingredientName').val(),
        // 'quantity': $('#goodQuantity').val(),
        // 'unitPrice': $('#goodsUnitPrice').val(),
        // 'unit': $('#goodsUnit').val(),
        // 'totalAmount': $('#goodsAmount').val(),
        // 'packMarks': $('#goodPackOrMarks').val(),

    }));
});


$(document).ready(function () {
    // $('.select2').select2();
    // custDropDown();
    // bankDropDown();
    // bankBranchDropDown();

    getAllRecipe();
    $('.datepicker').datepicker();

    var i = 0;
    $(".add").click(function () {
        i++;
        var total_element = $(".element").length;
        // last <div> with element class id
        var lastid = $(".element:last").attr("id");
        var split_id = lastid.split("_");
        var nextindex = (split_id[1]) + i;
        var max = 5;
        // Check total number elements
        if (total_element < max) {
            // Adding new div container after last occurance of element class
            $(".element:last").after("<div class='element' id='div_" + nextindex + "'></div>");
            // Adding element to <div>
            $("#div_" + nextindex).append("<br>" +
                "<div class=\"border border-secondary\">" +
                "<br>" +
                "<div id='txt_" + nextindex + "'>" +
                "<div class=\"form-group row\">" +
                "<label for=\"goodsDesc\" class=\"col-sm-2 col-form-label\">Goods Desc.</label>" +
                "<div class=\"col-sm-8\"><input  class=\"form-control select2\" name='goodsDesc_" + nextindex + "' id='goodsDesc_" + nextindex + "'/></div>" +
                " <div class=\"col-sm-2\">\n" +
                "  <button id='remove_" + nextindex + "' class='remove' type=\"button\" onclick=\"removeTotal(this.id)\"\n" +
                " ><i class=\"fa fa-close\"></i>\n" +
                "</button>\n" +
                "</div>" +
                "</div>" +
                " <div class=\"form-group row\">\n" +
                " <input name='goodsId_" + nextindex + "' type=\"hidden\" id='goodsId_" + nextindex + "'>" +
                "                                                            <label for=\"goodQuantity\"\n" +
                "                                                                   class=\"col-sm-2 col-form-label\">Quantity</label>\n" +
                "                                                            <div class=\"col-sm-2\">\n" +
                "                                                                <input type=\"text\" class=\"form-control\"\n" +
                "                                              onkeyup=\"calculateTotal(this.id,this.value)\" name='goodsQuantity_" + nextindex + "' id='goodsQuantity_" + nextindex + "'>\n" +
                "                                                            </div>\n" +
                "                                                            <label for=\"goodsUnitPrice\"\n" +
                "                                                                   class=\"col-sm-2 col-form-label\">Unit\n" +
                "                                                                Price</label>\n" +
                "                                                            <div class=\"col-sm-2\">\n" +
                "                                                                <input type=\"text\" class=\"form-control\"\n" +
                "                                                                     onkeyup=\"calculateTotal(this.id,this.value)\" id='goodsUnitPrice_" + nextindex + "' name='goodsUnitPrice_" + nextindex + "'>\n" +
                "                                                            </div>\n" +
                "                                                            <label for=\"goodsUnit\"\n" +
                "                                                                   class=\"col-sm-2 col-form-label\">Unit</label>\n" +
                "                                                            <div class=\"col-sm-2\">\n" +
                "                                                                <input type=\"text\" class=\"form-control\"\n" +
                "                                                                       id='goodsUnit_" + nextindex + "' name='goodsUnit_" + nextindex + "'>\n" +
                "                                                            </div>\n" +
                "                                                        </div>\n" +
                "                                                        <div class=\"form-group row\">\n" +
                "                                                            <label for=\"goodPackOrMarks\"\n" +
                "                                                                   class=\"col-sm-2 col-form-label\">Pack\n" +
                "                                                                / Marks</label>\n" +
                "                                                            <div class=\"col-sm-2\">\n" +
                "                                                                <input type=\"text\" class=\"form-control\"\n" +
                "                                                                       id='goodPackOrMarks_" + nextindex + "' name='goodPackOrMarks_" + nextindex + "'>\n" +
                "                                                            </div>\n" +

                "                                                            <label for=\"goodsAmount\"\n" +
                "                                                                   class=\"col-sm-2 col-form-label\">Total\n" +
                "                                                                Amount</label>\n" +
                "                                                            <div class=\"col-sm-2\">\n" +
                "                                                                <input type=\"text\" class=\"form-control\"\n" +
                "                                                                        id='goodsAmount_" + nextindex + "'>\n" +
                "                                                            </div>\n" +
                "                                                        </div>" +

                "</div>" +
                "</div>" +
                "<br>");

        }

        var des = $('#goodsDesc').val();
        // sectionDropdown(des, nextindex);

        var id = $('#goodsId').val();
        var q = $('#goodQuantity').val();
        var up = $('#goodsUnitPrice').val();
        var u = $('#goodsUnit').val();
        var pom = $('#goodPackOrMarks').val();
        var total = $("#goodsAmount").val();
        // totalAmount = Number(totalAmount) + Number(total);

        $('#goodsDesc_' + nextindex).val(des);
        $('#goodsId').val("");
        $('#goodQuantity').val("");
        $('#goodsUnitPrice').val("");
        $('#goodsUnit').val("");
        $('#goodPackOrMarks').val("");
        $("#goodsAmount").val("");

        $('#goodsId_' + nextindex).val(id);
        $('#goodsQuantity_' + nextindex).val(q);
        $('#goodsUnitPrice_' + nextindex).val(up);
        $('#goodsUnit_' + nextindex).val(u);
        $('#goodPackOrMarks_' + nextindex).val(pom);
        $('#goodsAmount_' + nextindex).val(total);
        // $("#goodsTotalAmount").val(totalAmount);
    });

    $('.container').on('click', '.remove', function () {

        var id = this.id;
        var split_id = id.split("_");
        var deleteindex = split_id[1];

        // Remove <div> with id
        $("#div_" + deleteindex).remove();

    });
});

function sectionDropdown(des, index) {
    if (user_info == null) {
        window.location = 'index.html';
    }
    $('#pUser').html(user_info.name);
    var des = des;
    var nextindex = index;
    var api = rootGoods + '/all';
    $.ajax({
        type: "GET",
        url: api,
        headers: {'Authorization': 'Bearer ' + user_info.token},
        contentType: 'application/json',
        error: function (res) {
            console.log(JSON.stringify(res));
            alert(JSON.stringify(res));
        },
        success: function (res) {


            var len = res.content.length;
            var options;
            for (var i = 0; i < len; i++) {
                if (res.content[i].id == des) {
                    options = new Option(res.content[i].description, res.content[i].id, false, true);
                    $('#goodsDesc_' + nextindex).append(options);
                    continue;
                }
                options = new Option(res.content[i].description, res.content[i].id, false, false);
                $('#goodsDesc_' + nextindex).append(options);


            }
        }
    });
}

var selectedUserId = 0;
var user_info = JSON.parse(window.localStorage.getItem('user_info'));
var dt;
function saveRecipe(val) {
    if (val == "createNew") {
        selectedUserId = 0
    }
    var tableColumnIdVal = $('#myTable tr').find('td:first').map(function () {
        return $(this).text()
    }).get();
    var goodsDesc = $('#myTable tr').find('td:nth-child(2)').map(function () {
        return $(this).text()
    }).get();


    var tableLength = $('#myTable tbody tr').length;
    var id, quantity, unitPrice, unit, packOrMarks, desc, price;
    var arr = [];
    var total_element = $(".element").length;
    for (i = 1; i < tableLength; i++) {
        desc = goodsDesc[i];
        var goods = {
            "id": Number(desc)
        };
        arr.push(goods);

    }


    var $form = $("#form_data");
    // var data = getFormData($form);
    var data = ($("#form_date").serializeArray()); //  <-----------
    var indexed_array = {};

    $.map(data, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    var api = "";
    var idMain = "";
    if (selectedUserId == 0) {
        api = rootRecipe + '/create';
        idMain = "";
    } else {
        api = rootRecipe + '/' + selectedUserId;
        idMain = selectedUserId;
    }

    var payload = {
        id: idMain,
        recipeName: indexed_array.recipeName,
        instruction: indexed_array.instruction,
        ratings: indexed_array.ratings,
        comments: indexed_array.comments,
        chef: indexed_array.chef,
        menu: {id: Number(indexed_array.menuName)},
        ingredients: arr
    };
    $.ajax({
        type: selectedUserId == 0 ? "POST" : "PUT",
        url: api,
        data: JSON.stringify(payload),
        headers: {'Authorization': 'Bearer ' + user_info.token},
        contentType: 'application/json',
        error: function (res) {
            alert(JSON.stringify(res));
        },
        success: function (res) {
            var msg = selectedUserId == 0 ? 'Sales Created Successfully' : 'Sales Updated Successfully';
            alert(msg);
            $("#exampleModal").modal('hide');
            window.setTimeout(function () {
                window.location.reload();
            }, 1000);
            // refreshForm();
        }

    });
    // return indexed_array;
    console.log(indexed_array);
    return false; //don't submit

}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

setInputFilter(document.getElementById("ratings"), function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

function refreshForm() {
    // var selectOption = new Option("Select Customer", "", false, false);
    // $('#purchaserName').append(selectOption);
    $("#form_date")[0].reset();
    var rowCount = myTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        myTable.deleteRow(i);
    }
    var idArray = [];

    $('.remove').each(function () {

        idArray.push(this.id);


    });
    var len = idArray.length;
    for (var i = 0; i < len; i++) {
        if (idArray[i] != "") {
            var id = idArray[i];
            var split_id = id.split("_");
            var deleteindex = split_id[1];
            $("#div_" + deleteindex).remove();
        }

    }
    // var id = this.id;
    // var split_id = id.split("_");
    // var deleteindex = split_id[1];
    //
    // // Remove <div> with id
    // $("#div_" + deleteindex).remove();

}

function removeRecipe(id) {


    var api = rootRecipe + '/' + id;
    if (window.confirm('Are you sure to delete user?')) {
        $.ajax({
            type: "DELETE",
            url: api,
            headers: {'Authorization': 'Bearer ' + user_info.token},
            contentType: 'application/json',
            error: function (res) {
                console.log(JSON.stringify(res));
                alert(JSON.stringify(res));
            },
            success: function (res) {
                alert('Sales Deleted Successfully');
                window.setTimeout(function () {
                    window.location.reload();
                }, 1000);
            }
        });
    }
}

// function updateSales(btn) {
//     var data = dt.row($(btn).parents('tr')).data();
//     var id = data[0];
//     selectedUserId = id;
//     var api = rootRecipe + '/' + id;
//     $.ajax({
//         type: "GET",
//         url: api,
//         headers: {'Authorization': 'Bearer ' + user_info.token},
//         contentType: 'application/json',
//         error: function (res) {
//             alert(JSON.stringify(res));
//         },
//         success: function (res) {
//
//             $("#proformaInvoiceNo").val(res.content.proformaInvoiceNo);
//             $("#piDate").val(res.content.piDate);
//             $("#purchaserName").val();
//             $("#bankName").val(res.content.advisingBank.id).change();
//             $("#lcBankName").val(res.content.lcBank.id).change();
//             $("#billOfExcDate").val(res.content.exchangeDate);
//             $("#lcDays").val(res.content.lcDays);
//             $("#lcNo").val(res.content.lcNo);
//             $("#expLcNo").val(res.content.exportLcNo);
//             $("#lcDate").val(res.content.lcDate);
//             $("#countryOrigin").val(res.content.county);
//             $("#placePfLanding").val(res.content.loadingPlace);
//             $("#partialShipment").val(res.content.partialShipment);
//             $("#placeOdDischarge").val(res.content.placeOfDischarge);
//             $("#lcOpenDays").val(res.content.lcOpenDays);
//             $("#paymentAtDays").val(res.content.paymentDays);
//             $("#shipmentWithinDays").val(res.content.shipmentWithinDays);
//             $("#chalanNo").val(res.content.challanNo);
//             $("#chalanDate").val(res.content.challanDate);
//             $("#truckChalanSerialNo").val(res.content.truckChallanSerialNo);
//             $("#truckNo").val(res.content.truckNo);
//             $("#truckChalanDate").val(res.content.truckChallanDate);
//             $("#vatNo").val(res.content.vatNo);
//             $("#tinNo").val(res.content.tinNo);
//             $("#date").val(res.content.date);
//             $("#finalDestination").val(res.content.finalDestination);
//             $("#modeOfShipment").val(res.content.shipmentMode);
//             if (res.content.goodsList.length == 1) {
//                 $("#goodsDesc").val(res.content.goodsList[0].id);
//             } else {
//                 var len = res.content.goodsList.length;
//                 var i = 0, j;
//                 for (j = 0; j < len; j++){
//                     if (j == 0) {
//                         $("#goodsDesc").val(res.content.goodsList[j].id);
//                     } else {
//                         i++;
//                         var total_element = $(".element").length;
//                         // last <div> with element class id
//                         var lastid = $(".element:last").attr("id");
//                         var split_id = lastid.split("_");
//                         var nextindex = (split_id[1]) + i;
//                         var max = 5;
//                         // Check total number elements
//                         if (total_element < max) {
//                             // Adding new div container after last occurance of element class
//                             $(".element:last").after("<div class='element' id='div_" + nextindex + "'></div>");
//                             // Adding element to <div>
//                             $("#div_" + nextindex).append("<br>" +
//                                 "<div class=\"border border-secondary\">" +
//                                 "<br>" +
//                                 "<div id='txt_" + nextindex + "'>" +
//                                 "<div class=\"form-group row\">" +
//                                 "<label for=\"goodsDesc\" class=\"col-sm-2 col-form-label\">Goods Desc.</label>" +
//                                 "<div class=\"col-sm-8\"><input   class=\"form-control select2\" name='goodsDesc_" + nextindex + "' id='goodsDesc_" + nextindex + "'/></div>" +
//                                 " <div class=\"col-sm-2\">\n" +
//                                 "  <button id='remove_" + nextindex + "' class='remove' type=\"button\" onclick=\"removeTotal(this.id)\"\n" +
//                                 " ><i class=\"fa fa-close\"></i>\n" +
//                                 "</button>\n" +
//                                 "</div>" +
//                                 "</div>" +
//                                 " <div class=\"form-group row\">\n" +
//                                 " <input name='goodsId_" + nextindex + "' type=\"hidden\" id='goodsId_" + nextindex + "'>" +
//                                 "                                                            <label for=\"goodQuantity\"\n" +
//                                 "                                                                   class=\"col-sm-2 col-form-label\">Quantity</label>\n" +
//                                 "                                                            <div class=\"col-sm-2\">\n" +
//                                 "                                                                <input type=\"text\" class=\"form-control\"\n" +
//                                 "                                              name='goodsQuantity_" + nextindex + "' id='goodsQuantity_" + nextindex + "'>\n" +
//                                 "                                                            </div>\n" +
//                                 "                                                            <label for=\"goodsUnitPrice\"\n" +
//                                 "                                                                   class=\"col-sm-2 col-form-label\">Unit\n" +
//                                 "                                                                Price</label>\n" +
//                                 "                                                            <div class=\"col-sm-2\">\n" +
//                                 "                                                                <input type=\"text\" class=\"form-control\"\n" +
//                                 "                                                                      id='goodsUnitPrice_" + nextindex + "' name='goodsUnitPrice_" + nextindex + "'>\n" +
//                                 "                                                            </div>\n" +
//                                 "                                                            <label for=\"goodsUnit\"\n" +
//                                 "                                                                   class=\"col-sm-2 col-form-label\">Unit</label>\n" +
//                                 "                                                            <div class=\"col-sm-2\">\n" +
//                                 "                                                                <input type=\"text\" class=\"form-control\"\n" +
//                                 "                                                                       id='goodsUnit_" + nextindex + "' name='goodsUnit_" + nextindex + "'>\n" +
//                                 "                                                            </div>\n" +
//                                 "                                                        </div>\n" +
//                                 "                                                        <div class=\"form-group row\">\n" +
//                                 "                                                            <label for=\"goodPackOrMarks\"\n" +
//                                 "                                                                   class=\"col-sm-2 col-form-label\">Pack\n" +
//                                 "                                                                / Marks</label>\n" +
//                                 "                                                            <div class=\"col-sm-2\">\n" +
//                                 "                                                                <input type=\"text\" class=\"form-control\"\n" +
//                                 "                                                                       id='goodPackOrMarks_" + nextindex + "' name='goodPackOrMarks_" + nextindex + "'>\n" +
//                                 "                                                            </div>\n" +
//
//                                 "                                                            <label for=\"goodsAmount\"\n" +
//                                 "                                                                   class=\"col-sm-2 col-form-label\">Total\n" +
//                                 "                                                                Amount</label>\n" +
//                                 "                                                            <div class=\"col-sm-2\">\n" +
//                                 "                                                                <input type=\"text\" class=\"form-control\"\n" +
//                                 "                                                                        id='goodsAmount_" + nextindex + "'>\n" +
//                                 "                                                            </div>\n" +
//                                 "                                                        </div>" +
//
//                                 "</div>" +
//                                 "</div>" +
//                                 "<br>");
//                         }
//                         $("#goodsId_id1"+i).val(res.content.goodsList[j].id);
//                         sectionDropdown(res.content.goodsList[j].id,nextindex);
//                         att="goodsDesc_id1"+i;
//                         goodsDate(res.content.goodsList[j].id,att);
//                         // $("#goodsDesc_id1"+i).val(res.content.goodsList[j].id).change();
//
//                     }
//
//                 }
//
//             }
//
//
//         }
//     });
// }

function updateSales(id) {
    refreshForm();
    // var data = dt.row($(btn).parents('tr')).data();
    // var id = data[0];
    selectedUserId = id;
    var api = rootRecipe + '/' + id;
    $.ajax({
        type: "GET",
        url: api,
        headers: {'Authorization': 'Bearer ' + user_info.token},
        contentType: 'application/json',
        error: function (res) {
            alert(JSON.stringify(res));
        },
        success: function (res) {

            $("#proformaInvoiceNo").val(res.content.proformaInvoiceNo);
            $("#piDate").val(res.content.piDate);
            if (res.content.customer != null) {
                $("#purchaserName").val(res.content.customer.name);
                getCustById(res.content.customer.id);
            }
            $("#bankName").val(res.content.advisingBank.name);
            $("#lcBankName").val(res.content.lcBank.name);
            $("#advisingBranch").val(res.content.advisingBranch);
            $("#lcBranch").val(res.content.lcBranch);
            $("#billOfExcDate").val(res.content.exchangeDate);
            $("#lcDays").val(res.content.lcDays);
            $("#lcNo").val(res.content.lcNo);
            $("#expLcNo").val(res.content.exportLcNo);
            $("#lcDate").val(res.content.lcDate);
            $("#countryOrigin").val(res.content.county);
            $("#placePfLanding").val(res.content.loadingPlace);
            $("#partialShipment").val(res.content.partialShipment);
            $("#placeOdDischarge").val(res.content.placeOfDischarge);
            $("#lcOpenDays").val(res.content.lcOpenDays);
            $("#paymentAtDays").val(res.content.paymentDays);
            $("#shipmentWithinDays").val(res.content.shipmentWithinDays);
            $("#chalanNo").val(res.content.challanNo);
            $("#chalanDate").val(res.content.challanDate);
            $("#truckChalanSerialNo").val(res.content.truckChallanSerialNo);
            $("#truckNo").val(res.content.truckNo);
            $("#truckChalanDate").val(res.content.truckChallanDate);
            $("#vatNo").val(res.content.vatNo);
            $("#tinNo").val(res.content.tinNo);
            $("#date").val(res.content.date);
            $('#invoiceNo').val(res.content.invoiceNo);
            $("#finalDestination").val(res.content.finalDestination);
            $("#modeOfShipment").val(res.content.shipmentMode);
            $("#goodsTotalAmount").val(res.content.totalAmount);

            var len = res.content.goodsList.length;
            var i = 0, j;
            for (j = 0; j < len; j++) {
                var rowCount = Math.floor((Math.random() * 10000) + 1);

                var tbody = $('#myTable').children('tbody');
                var table = tbody.length ? tbody : $('#myTable');
                var row = '<tr id="row_' + rowCount + '">' +
                    '<td style="display:none;">{{id}}</td>' +
                    '<td id="goodDesc_' + rowCount + '">{{description}}</td>' +
                    '<td id="goodQuantity_' + rowCount + '">{{quantity}}</td>' +
                    '<td id="goodUnitPrice_' + rowCount + '">{{unitPrice}}</td>' +
                    '<td id="goodUnit_' + rowCount + '">{{unit}}</td>' +
                    '<td id="goodAmount_' + rowCount + '">{{totalAmount}}</td>' +
                    '<td id="goodPackMarks_' + rowCount + '">{{packMarks}}</td>' +
                    '<td><i value="Delete" type="button" alt="Delete6" class="deleteIcon fa fa-trash"></i></button></td>'
                '</tr>';
                //Add row
                var q = res.content.goodsList[j].quantity;
                var u = res.content.goodsList[j].unitPrice;
                table.append(row.compose({
                    'id': rowCount,
                    'description': res.content.goodsList[j].description,
                    'quantity': res.content.goodsList[j].quantity,
                    'unitPrice': res.content.goodsList[j].unitPrice,
                    'unit': res.content.goodsList[j].unit,
                    'totalAmount': q * u,
                    'packMarks': res.content.goodsList[j].packOrMarks

                }));

            }


        }
    });
}

function getAllByPerforma(pin) {
    if (pin == null || pin == "") {
        return;
    }
    // refreshForm();

    var api = rootRecipe + '/name?pin=' + encodeURIComponent(pin);
    $.ajax({
        type: "GET",
        url: api,
        headers: {'Authorization': 'Bearer ' + user_info.token},
        contentType: 'application/json',
        error: function (res) {
            alert(JSON.stringify(res));
        },
        success: function (res) {
            if (res.statusCode >= 400) {
                return;
            }
            hideBtn();
            selectedUserId = res.content.id;
            $("#proformaInvoiceNo").val(res.content.proformaInvoiceNo);
            $("#piDate").val(res.content.piDate);
            if (res.content.customer != null) {
                $("#purchaserName").val(res.content.customer.name);
                getCustById(res.content.customer.id);
            }

            $("#bankName").val(res.content.advisingBank.name);
            $("#lcBankName").val(res.content.lcBank.name);
            $("#advisingBranch").val(res.content.advisingBranch);
            $("#lcBranch").val(res.content.lcBranch);
            $("#billOfExcDate").val(res.content.exchangeDate);
            $("#lcDays").val(res.content.lcDays);
            $("#lcNo").val(res.content.lcNo);
            $("#expLcNo").val(res.content.exportLcNo);
            $("#lcDate").val(res.content.lcDate);
            $("#countryOrigin").val(res.content.county);
            $("#placePfLanding").val(res.content.loadingPlace);
            $("#partialShipment").val(res.content.partialShipment);
            $("#placeOdDischarge").val(res.content.placeOfDischarge);
            $("#lcOpenDays").val(res.content.lcOpenDays);
            $("#paymentAtDays").val(res.content.paymentDays);
            $("#shipmentWithinDays").val(res.content.shipmentWithinDays);
            $("#chalanNo").val(res.content.challanNo);
            $("#chalanDate").val(res.content.challanDate);
            $("#truckChalanSerialNo").val(res.content.truckChallanSerialNo);
            $("#truckNo").val(res.content.truckNo);
            $("#truckChalanDate").val(res.content.truckChallanDate);
            $("#vatNo").val(res.content.vatNo);
            $("#tinNo").val(res.content.tinNo);
            $("#date").val(res.content.date);
            $('#invoiceNo').val(res.content.invoiceNo);
            $("#finalDestination").val(res.content.finalDestination);
            $("#modeOfShipment").val(res.content.shipmentMode);
            $("#goodsTotalAmount").val(res.content.totalAmount);

            var len = res.content.goodsList.length;
            var i = 0, j;
            for (j = 0; j < len; j++) {
                var rowCount = Math.floor((Math.random() * 10000) + 1);

                var tbody = $('#myTable').children('tbody');
                var table = tbody.length ? tbody : $('#myTable');
                var row = '<tr id="row_' + rowCount + '">' +
                    '<td style="display:none;">{{id}}</td>' +
                    '<td id="goodDesc_' + rowCount + '">{{description}}</td>' +
                    '<td id="goodQuantity_' + rowCount + '">{{quantity}}</td>' +
                    '<td id="goodUnitPrice_' + rowCount + '">{{unitPrice}}</td>' +
                    '<td id="goodUnit_' + rowCount + '">{{unit}}</td>' +
                    '<td id="goodAmount_' + rowCount + '">{{totalAmount}}</td>' +
                    '<td id="goodPackMarks_' + rowCount + '">{{packMarks}}</td>' +
                    '<td><i value="Delete" type="button" alt="Delete6" class="deleteIcon fa fa-trash"></i></button></td>'
                '</tr>';
                //Add row
                var q = res.content.goodsList[j].quantity;
                var u = res.content.goodsList[j].unitPrice;
                table.append(row.compose({
                    'id': rowCount,
                    'description': res.content.goodsList[j].description,
                    'quantity': res.content.goodsList[j].quantity,
                    'unitPrice': res.content.goodsList[j].unitPrice,
                    'unit': res.content.goodsList[j].unit,
                    'totalAmount': q * u,
                    'packMarks': res.content.goodsList[j].packOrMarks

                }));

            }


        }
    });
}


function getAllRecipe() {
    var editBtn = '<button type="button" class="btn btn-success save" onclick="updateSales(this),hideBtn()">Edit</button>';
    var removeBtn = '<button type="button" class="btn btn-danger remove" onclick="removeRecipe(this)">Remove</button>';
    var count = 0;
    var api = rootRecipe + '/all';
    var tbody = $('#myTable2').children('tbody');
    var table = tbody.length ? tbody : $('#myTable');
    var row = '<tr >' +
        '<td style="display: none">{{id}}</td>' +
        '<td>{{serial}}</td>' +
        '<td >{{performaInvoice}}</td>' +
        '<td >{{piDate}}</td>' +

        '<td><button type="button" class="btn btn-success " onclick="updateSales({{editId}}),hideBtn()"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button> <button type="button" class="btn btn-danger " onclick="removeRecipe({{editId}})"><i class="fa fa-trash" aria-hidden="true"></i></button></td>' +
        '</tr>';

    $.ajax({
        type: "GET",
        url: api,
        headers: {'Authorization': 'Bearer ' + user_info.token},
        contentType: 'application/json',
        error: function (res) {
            alert(JSON.stringify(res));
        },
        success: function (res) {
            // $(" td:nth-child(5)").hide();

            var totalData = res.totalCount;
            var totalFractionalPage = totalData / 20;
            var totalPage = Math.ceil(totalFractionalPage);
            $('#myTable2').after('<div id="nav" class="pagination"></div>');
            for (var i = 0; i < res.content.length; i++) {
                count++;
                table.append(row.compose({
                    'id': res.content[i].id,
                    'serial': count,
                    'performaInvoice': res.content[i].proformaInvoiceNo,
                    'piDate': res.content[i].piDate,
                    'editId': res.content[i].id
                }));
            }
            for (i = 0; i < totalPage; i++) {
                var pageNum = i + 1;
                $('#nav').append('<button type="button" class="btn btn-success save" id="pagination" value="' + i + '" onclick="getVal(this.value,this.id)">' + pageNum + '</button> ');
            }
            // $('#nav').append('<button type="button">&raquo;</button>');
            // $('#mytable2 td:nth-child(0),th:nth-child(0)').hide();
            //
            //
            // $('#myTable2_wrapper').attr("hidden", "hidden");
            // var tableHead = "<thead id='theadUser'></thead>" +
            //     "<tbody id='tbodyUser'></tbody>"
            // $('#myTable2').html(tableHead);
            // $('#myTable2_wrapper').removeAttr("hidden", "hidden");
            // destroyTable('myTable2');
            // var headArr = ['#', 'Performa Invoice', 'Performa Date', 'Action'];
            // createHeader('theadUser', headArr);
            // prepareListDataGrid(res, 'tbodyUser');
            // createWithButton('myTable2', [0, 1, 2], "Sales List", [5, 10, 30, 50, 'All'])

        }

    });
}



function white_space(field) {
    field.value = field.value.replace(/^\\s+/, "");
}



var rootIngrdient = basicUrl + '/api/v1/ingredients';
var IngrdientList = [];
var selectedUserId = 0;
var user_info = JSON.parse(window.localStorage.getItem('user_info'));
var dt;

$(document).ready(function () {
    var user_info = JSON.parse(window.localStorage.getItem('user_info'));
    if (user_info == null) {
        window.location = 'index.html';
    }
    $('#pUser').html(user_info.name);
    getAllIngredient();
});

function addIngredient() {
    var id = $("#id").val();
    var name = $("#ingredientName").val();
    var api = "";
    if (selectedUserId == 0) {
        api = rootIngrdient + '/create';
    } else {
        api = rootIngrdient + '/' + selectedUserId;
    }
    console.log(api);
    var payload = {id: id, name: name};
    if (name == 'undefined' || name.length == 0 ) {
        alert('Mandatory fields should not be empty');
    } else {
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
                var msg = selectedUserId == 0 ? 'Ingredient Created Successfully' : 'Ingredient Updated Successfully';
                alert(msg);
                $("#exampleModal").modal('hide');
                getAllIngredient();
            }

        });
    }
}

function showModal(ingredient) {
    if (ingredient == null) {
        $("#exampleModalLabel").html("Add ingredient");
        selectedUserId = 0;
        $("#id").val("");
        $("#ingredientName").val("");

    } else {
        selectedUserId = ingredient.id;

        $("#id").val(ingredient.id);
        $("#ingredientName").val(ingredient.name);


    }
    $('#exampleModal').modal().show();
}

function updateIngredient(btn) {
    var data = dt.row($(btn).parents('tr')).data();
    var id = data[0];
    var name = data[2];
    var ingredient = {id: id, name: name};
    showModal(ingredient);
}

function removeIngredient(btn) {
    var data = dt.row($(btn).parents('tr')).data();
    var id = data[0];
    if (data != null && data[3] == 'admin@abc.com') {
        alert('Admin User is not deletable');
        return;
    }
    var api = rootIngrdient + '/' + id;
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
                alert('ingredient Deleted Successfully');
                getAllIngredient();
            }
        });
    }
}


function getAllIngredient() {
    var editBtn = '<button type="button" class="btn btn-success save" onclick="updateIngredient(this)">Edit</button>';
    var removeBtn = '<button type="button" class="btn btn-danger remove" onclick="removeIngredient(this)">Remove</button>';

    var api = rootIngrdient + '/all';

    $.ajax({
        type: "GET",
        url: api,
        headers: {'Authorization': 'Bearer ' + user_info.token},
        contentType: 'application/json',
        error: function (res) {
            alert(JSON.stringify(res));
        },
        success: function (res) {

            var dataSet = [];
            var i = 1;
            $.each(res.content, function (k, v) {
                var arr = [];
                arr.push(v.id);
                arr.push(i++);
                arr.push(v.name);


                arr.push(editBtn + ' ' + removeBtn);
                dataSet.push(arr);
            });

            customerList = dataSet;

            $('#resultContainer').empty();
            $('<table id="example" class="table table-striped table-bordered table-sm" width="100%"></table>').appendTo('#resultContainer');
            dt = $('#example').DataTable({

                data: dataSet,
                columns: [
                    {title: "Id"},
                    {title: "Serial Number"},
                    {title: "Ingredient"},


                    {title: "Actions"}
                ],
                "columnDefs": [
                    {
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    }
                ]
            });
        }

    });
}
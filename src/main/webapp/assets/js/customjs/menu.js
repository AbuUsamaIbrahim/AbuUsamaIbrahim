var rootMenu = basicUrl + '/api/v1/menus';
var user_info = JSON.parse(window.localStorage.getItem('user_info'));
var dt;

function saveMenu() {
    var menuId = $('#id').val();
    var name = $('#menuName').val();
    var weekNo = $('#weekNo').val();
    var payload = {id: menuId,weekNo:weekNo ,menuName: name};
    var api = "";
    if (selectedUserId == 0) {
        api = rootMenu + '/create';
    } else {
        api = rootMenu + '/' + selectedUserId;
    }
    if (name == 'undefined' || name.length == 0) {
        alert('Mendatory fields should not be empty');
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
                $("#exampleModal").modal('hide');
                var msg = selectedUserId == 0 ? 'Menu Created Successfully' : 'Menu Updated Successfully';
                alert(msg);
                getAllMenu();
            }

        });
    }
}


var userList = [];
var selectedUserId = 0;
$(document).ready(function () {
    var user_info = JSON.parse(window.localStorage.getItem('user_info'));
    if (user_info == null) {
        window.location = 'index.html';
    }
    $('#pUser').html(user_info.name);
    getAllMenu();
});

function showModal(menu) {
    if (menu == null) {
        selectedUserId = 0;
        $("#id").val("");
        $("#menuName").val("");
        $("#weekNo").val("");
    } else {
        selectedUserId = menu.id;
        $("#id").val(menu.id);
        $("#menuName").val(menu.menuName);
        $("#weekNo").val(menu.weekNo);
    }
    $('#exampleModal').modal().show();
}


function updateMenu(btn) {
    var data = dt.row($(btn).parents('tr')).data();
    var id = data[0];
    var name = data[2];
    var weekNo = data[3];
    var menu = {id: id,weekNo:weekNo ,menuName: name};
    showModal(menu);
}

function removeMenu(btn) {
    var data = dt.row($(btn).parents('tr')).data();
    var id = data[0];
    var api = rootMenu + '/' + id;
    if (window.confirm('Are you sure to delete menu?')) {
        $.ajax({
            type: "DELETE",
            url: api,
            headers: {'Authorization': 'Bearer ' + user_info.token},
            contentType: 'application/json',
            error: function (res) {
                alert(JSON.stringify(res));
            },
            success: function (res) {
                alert('menu Deleted Successfully');
                getAllMenu();
            }
        });
    }
}


function getAllMenu(val, elementId) {
    var editBtn = '<button type="button" class="btn btn-success save" onclick="updateMenu(this)">Edit</button>';
    var removeBtn = '<button type="button" class="btn btn-danger remove" onclick="removeMenu(this)">Remove</button>';


    var api = rootMenu + "/all";
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
                arr.push(v.menuName);
                arr.push(v.weekNo);

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
                    {title: "Name"},
                    {title: "Week"},

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


function logout() {
    window.localStorage.removeItem('user_info');
    window.location = 'index.html';
}

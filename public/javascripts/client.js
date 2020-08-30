let newCompany = {
  name: "",
  registrationCode: "",
  city: "",
  state: "",
  phoneNumber: "",
  registrationDate: "",
};
let titles = ["name", "city", "phoneNumber"];
let flag = true;
let titles2 = [
  "name",
  "registrationCode",
  "city",
  "state",
  "phoneNumber",
  "registrationDate",
];
let info;
let x;
$.ajax({
  type: "GET",
  url: "/company/getAllUsers",
  async: false,
  success: function (response) {
    if (response.status) {
      $(".main_danger").addClass("d-none");
      info = response.message;
      for (let i = 0; i < response.message.length; i++) {
        //adding table
        $("table")
          .find("tbody")
          .append(
            '<tr> <th scope="row">' +
              (i + 1) +
              '</th><td></td><td></td><td></td><td><i class="fa fa-pencil-square-o' +
              " " +
              i +
              '" aria-hidden="true"></i> <i class="fa fa-trash' +
              " " +
              i +
              '" aria-hidden="true" style="font-size: 16px; color: red;"></i><i class="fa fa-search' +
              " " +
              i +
              '" aria-hidden="true"></i></td></tr>'
          );
        for (let j = 0; j < 3; j++) {
          $("tr")
            .eq(i + 1)
            .find("td")
            .eq(j)
            .text(response.message[i][titles[j]]);
        }
      }
    } else $(".main_danger").removeClass("d-none").text(response.message);
  },
  error: function (err) {
    console.log(err);
  },
});

$(".addbt").click(function () {
  $(".alert-danger").css("display", "none").text("please fill all of inputs");
  $(".alert-success").css("display", "none");
});

$(".savebtn").click(function () {
  //add new company button
  $(".alert-danger").css("display", "none");
  $(".alert-success").css("display", "none");
  flag = true;
  for (i = 0; i < 6; i++) {
    newCompany[titles2[i]] = $(".addInput").eq(i).val();
    if ($(".addInput").eq(i).val() === "") {
      flag = false;
    }
  }
  if (flag) {
    $.ajax({
      type: "POST",
      // data: newCompany,
      url: "/company/addUser",
      success: function (response) {
        console.log(response);
        if (response.status) {
          $(".second-danger").css("display", "none").text("");
          $(".addInput").css("border-color", "lightgray");
          $(".alert-danger").css("display", "none");
          $(".alert-success").css("display", "block");
          info.push(response.message);
          $("tbody").remove();
          $("table").append("<tbody></tbody>");
          for (i = 0; i < info.length; i++) {
            //adding table
            $("table")
              .find("tbody")
              .append(
                '<tr> <th scope="row">' +
                  (i + 1) +
                  '</th><td></td><td></td><td></td><td><i class="fa fa-pencil-square-o' +
                  " " +
                  i +
                  '" aria-hidden="true"></i> <i class="fa fa-trash' +
                  " " +
                  i +
                  '" aria-hidden="true" style="font-size: 16px; color: red;"></i><i class="fa fa-search' +
                  " " +
                  i +
                  '" aria-hidden="true"></i></td></tr>'
              );
            for (j = 0; j < 3; j++) {
              $("tr")
                .eq(i + 1)
                .find("td")
                .eq(j)
                .text(info[i][titles[j]]);
            }
          }
        } else
          $(".second-danger").css("display", "block").text("something went wrong");
      },
      error: function (err) {
        console.log(err);
      },
    });
  } else {
    for (i = 0; i < 6; i++) {
      if ($(".addInput").eq(i).val() === "") {
        $(".addInput").eq(i).css("border-color", "red");
      } else {
        $(".addInput").eq(i).css("border-color", "lightgray");
      }
    }
    $(".alert-danger").css("display", "block");
  }
});

$(document).on("click", ".fa-trash", function () {
  //delete butoon
  for (i = 0; i < $(".fa-trash").length; i++) {
    if ($(this).hasClass(i)) {
      deleteAlert(i);
    }
  }
});
function deleteAlert(x) {
  //alert for make sure
  let r = confirm("are you sure to delete this company!");
  if (r == true) {
    $.ajax({
      type: "DELETE",
      url: "/company/deleteUser/" + info[x]._id,
      success: function (response) {
        if (response.status) {
          $(".second-danger").css("display", "none").text("");
          info.splice(x, 1);
          $("tbody").remove();
          $("table").append("<tbody></tbody>");
          for (i = 0; i < info.length; i++) {
            //adding table
            $("table")
              .find("tbody")
              .append(
                '<tr> <th scope="row">' +
                  (i + 1) +
                  '</th><td></td><td></td><td></td><td><i class="fa fa-pencil-square-o' +
                  " " +
                  i +
                  '" aria-hidden="true"></i> <i class="fa fa-trash' +
                  " " +
                  i +
                  '" aria-hidden="true" style="font-size: 16px; color: red;"></i><i class="fa fa-search' +
                  " " +
                  i +
                  '" aria-hidden="true"></i></td></tr>'
              );
            for (j = 0; j < 3; j++) {
              $("tr")
                .eq(i + 1)
                .find("td")
                .eq(j)
                .text(info[i][titles[j]]);
            }
          }
        }
        else $(".second-danger").css("display", "block").text(response.message);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
}

$(document).on("click", ".fa-pencil-square-o", function () {
  //edit butoon
  $(".alert-danger").css("display", "none");
  $(".alert-success").css("display", "none");
  for (i = 0; i < $(".fa-pencil-square-o").length; i++) {
    if ($(this).hasClass(i)) {
      for (j = 0; j < 6; j++) {
        $(".editInput").eq(j).val(info[i][titles2[j]]);
      }
      $("#editModal").modal("show");
      x = i;
      break;
    }
  }
});
$(".savebtn2").click(function () {
  //save button2 clicked
  $(".alert-danger").css("display", "none");
  $(".alert-success").css("display", "none");
  flag = true;
  for (j = 0; j < 6; j++) {
    newCompany[titles2[j]] = $(".editInput").eq(j).val();
    if ($(".editInput").eq(j).val() === "") {
      flag = false;
    }
  }
  if (flag) {
    $.ajax({
      type: "PUT",
      data: newCompany,
      url: "/company/updateUser/" + info[x]._id,
      success: function (response) {
        console.log(response);
        if(response.status){
          console.log("sdkf");
          $(".editInput").css("border-color", "lightgray");
          $(".second-danger").css("display", "none");
          $(".alert-success").css("display", "block");
          for (j = 0; j < 6; j++) {
            //changing info array
            info[x][titles2[j]] = response.message[titles2[j]];
          }
          $("tbody").remove();
          $("table").append("<tbody></tbody>");
          for (i = 0; i < info.length; i++) {
            //adding table
            $("table")
              .find("tbody")
              .append(
                '<tr> <th scope="row">' +
                  (i + 1) +
                  '</th><td></td><td></td><td></td><td><i class="fa fa-pencil-square-o' +
                  " " +
                  i +
                  '" aria-hidden="true"></i> <i class="fa fa-trash' +
                  " " +
                  i +
                  '" aria-hidden="true" style="font-size: 16px; color: red;"></i><i class="fa fa-search' +
                  " " +
                  i +
                  '" aria-hidden="true"></i></td></tr>'
              );
            for (j = 0; j < 3; j++) {
              $("tr")
                .eq(i + 1)
                .find("td")
                .eq(j)
                .text(info[i][titles[j]]);
            }
          }
        }
        else $(".second-danger").css("display", "block").text(response.message);
        
      },
      error: function (err) {
        console.log(err);
      },
    });
  } else {
    for (i = 0; i < 6; i++) {
      if ($(".editInput").eq(i).val() === "") {
        $(".editInput").eq(i).css("border-color", "red");
      } else {
        $(".editInput").eq(i).css("border-color", "lightgray");
      }
    }
    $(".alert-danger").css("display", "block");
  }
});

$(document).on("click", ".fa-search", function () {
  //show more
  for (i = 0; i < $(".fa-search").length; i++) {
    if ($(this).hasClass(i)) {
      console.log(i);
      for (let k = 0; k < info.length; k++) {
        if (
          $("tr")
            .eq(i + 1)
            .find("td")
            .eq(0)
            .text() === info[k].name
        ) {
          console.log(
            $("tr")
              .eq(i + 1)
              .find("td")
              .eq(0)
              .text()
          );

          for (j = 0; j < 6; j++) {
            $(".companyDetails")
              .eq(j)
              .text(titles2[j] + ": " + info[k][titles2[j]]);
          }
        }
      }

      $("#showMoreModal").modal("show");
    }
  }
});

$(".btn-info").click(function () {
  $.ajax({
    type: "POST",
    data: {
      since: $(".form-control").eq(0).val(),
      till: $(".form-control").eq(1).val(),
    },
    url: "/company/searchByDate",
    success: function (response) {
      if(response.status){
        $(".main-danger").addClass("d-none").text("");
        $("tbody").remove();
        $("table").append("<tbody></tbody>");
        for (i = 0; i < response.message.length; i++) {
          //adding table
          $("table")
            .find("tbody")
            .append(
              '<tr> <th scope="row">' +
                (i + 1) +
                '</th><td></td><td></td><td></td><td><i class="fa fa-pencil-square-o' +
                " " +
                i +
                '" aria-hidden="true"></i> <i class="fa fa-trash' +
                " " +
                i +
                '" aria-hidden="true" style="font-size: 16px; color: red;"></i><i class="fa fa-search' +
                " " +
                i +
                '" aria-hidden="true"></i></td></tr>'
            );
          for (j = 0; j < 3; j++) {
            $("tr")
              .eq(i + 1)
              .find("td")
              .eq(j)
              .text(response[i][titles[j]]);
          }
        }
      }
      else $(".main-danger").removeClass("d-none").text(response.message);
     
    },
    error: function (err) {
      console.log(err);
    },
  });
});

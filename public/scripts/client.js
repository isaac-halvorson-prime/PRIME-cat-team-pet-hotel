$(document).ready(function() {
   getPets();
   $('#submitNewOwner').on('click', function() {
     event.preventDefault();
     var ownerName = {};
     ownerName.firstName = $('#firstName').val();
     ownerName.lastName = $('#lastName').val();
     newOwner(ownerName);
     console.log('ownerName: ', ownerName);
   });
   $('#submitPet').on('click', function() {
     event.preventDefault();
     var petInfo = {};
     petInfo.name = $('#petName').val();
     petInfo.color = $('#color').val();
     petInfo.breed = $('#breed').val();
     submitPet(petInfo);

   });
});

function getPets() {
  $.ajax({
    type: 'GET',
    url: '/pets',
    success: function(pets) {
      console.log('pets get ajax success');
      appendPets(pets);
    },
    error: function() {
      console.log('Database error');
    }
  });
}

// - put request  - //
// function updatePets() {
//     var id = $(this).parent().data('id');
//     console.log(id);
//
//     // - make pet object - //
//     var pets = {};
//     var fields = $(this).parent().children().serializeArray();
//     fields.forEach(function(field) {
//         pets[field.name] = field.value;
//     });
//     console.log(book);
//
//     $.ajax({
//         type: 'PUT',
//         url: '/pets/' + id,
//         data: book,
//         success: function(result) {
//             console.log('updated!!!!');
//             getPets();
//         },
//         error: function(result) {
//             console.log('could not update book!');
//         }
//     });
// }


function appendPets(pets) {
  $("tbody").empty();

  for (var i = 0; i < pets.length; i++) {

    $el = $('tbody');
    var pet = pets[i];
    //$el.data('id', pet.id);

    $el.append(
      '<tr><td>' + pet.first_name + ' ' + pet.last_name +  '</td>' +
      '<td><input type="text" value="' + pet.name + '"></td>' +
      '<td><input type="text" value="' + pet.breed + '"></td>' +
      '<td><input type="text" value="' + pet.color + '"></td>' +
      '<td><button class="go">GO</button></td>' +
      '<td><button class="delete">DELETE</button></td>' +
      '<td><button class="inOut">In</button></td></tr>'
    );
  }
}
// function deleteRow(this){
//
// }

function newOwner(owner) {
    $.ajax({
      type: 'POST',
      url: '/owners',
      data: owner,
      success: function(response) {
        console.log('owner post success');
      },
      error: function() {
        console.log('could not post a new owner');
      }
    });

}

function submitPet(petInfo) {
  $.ajax({
    type: 'POST',
    url: '/pets',
    data: petInfo,
    success: function(response) {
      getPets();
    },
    error: function() {
      console.log('could not post a new pet');
    }
  });

}

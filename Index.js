class Pet { 
constructor(name) {
    this.name=name;
    this.rooms=[];
}

}




class PetService {  //Setting up each function to work alongside and use the url when called upon.
static url = 'https://crudcrud.com/api/dec8e0f5a8b54e95ad0a234cdd884b08';

static getAllPets() { 
    return $.get(this.url)
}

static getPet(id) {

    return $.get(this.url + `/${id}`)
}

static createPet(pet){
 return $.post(this.url, pet);

}

static updatePet(pet) { 
    return $.ajax({
        url: this.url + `/${pet._id}` ,
        dataType: 'json',
        data: JSON.stringify(pet),
        contentType: 'application/json' ,
        type: 'PUT'
    })
}

static deletePet(id) { 
return $.ajax({

    url: this.url+`/${id}`,
    type: 'DELETE'
})
}
}

class DOMManager {
static pets = "";


static createPet(name) { //creating a new pet in the DOM and rendering it
    PetService.createPet(new Pet(name))
    .then(() =>{
        return PetService.getAllPets();
    })
    .then((pets) => this.render(pets))
}


static getAllPets() {  // Listing each pet from the API
    PetService.getAllPets().then(pets => this.render(pets));
}

static deletePet(id) { // Ran when deleting a pet from the DOM and API
    PetService.deletePet(id)
    .then(()=> {
        return PetService.getAllPets();
    })
    .then((pets) => this.render(pets))
}

static render(pets) { //Rendering the pets with there respective delete buttons.
 this.pets =pets;
 $('#app').empty();
 for(let pets of pets) {
    $('#app').prepend(
        `<div id="${pet._id}" class ="card"> 
        <div class="card_header">
        <h2>${pet.name} </h2>
        <button class="btn btn-danger" onclick="DOMManager.deletePet('${pet._id}')">Delete</button>
        </div>
        </div>
        
        `
    )
 }
}

}

$('#create-new-pet').click(()=> { //Running the create new pet fucntion when the button is clicked.
    DOMManager.createPet($('#new-pet-name').val())
    $('#new-pet-name').val('');
})

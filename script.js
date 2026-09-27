let contacts=JSON.parse(localStorage.getItem("contacts")) || [];

const form=document.getElementById("contactForm");

const nameInput=document.getElementById("name");
const phoneInput=document.getElementById("phone");
const emailInput=document.getElementById("email");
const categoryInput=document.getElementById("category");
const searchInput=document.getElementById("search");
const filterInput=document.getElementById("filter");
const contactList=document.getElementById("contactList");
let editIndex=-1;

//add or update contact
form.addEventListener("submit",function(event){
    event.preventDefault();
    const name=nameInput.value.trim();
    const phone=phoneInput.value.trim();
    const email=emailInput.value.trim();
    const category=categoryInput.value;

    //Validation
    if(name==="" || phone==="" || email==="" || category===""){
        alert("Please fill in all fields.");
        return;
    }

    if(!/^[0-9]{10}$/.test(phone)){
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if(!email.includes("@")){
        alert("Please enter a valid email address.");
        return;
    }

    const contact={
        name: name,
        phone: phone,
        email: email,
        category: category
    };  

    //add new contact
    if(editIndex===-1){
        contacts.push(contact);
    } 
    
    //update existing contact
    else {
        contacts[editIndex] = contact;
        editIndex=-1;
    }
    saveContacts();
    displayContacts();
    form.reset();
});

//save contacts to local storage
function saveContacts(){
    localStorage.setItem("contacts",JSON.stringify(contacts));
}

//display contacts
function displayContacts(){
    const searchText=searchInput.value.toLowerCase();
    const selectedCategory=filterInput.value;
    contactList.innerHTML="";
    const filteredContacts=contacts.filter(function(contact){
        const matchesSearch=contact.name.toLowerCase().includes(searchText) 
                 || contact.phone.includes(searchText) 
                 || contact.email.toLowerCase().includes(searchText);
        const matchesCategory=selectedCategory==="All" 
                 || contact.category===selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if(filteredContacts.length===0){
        contactList.innerHTML="<p>No contacts found.</p>";
        return;
    }

    filteredContacts.forEach(function(contact){
        const index=contacts.indexOf(contact);
        const card=document.createElement("div");
        card.innerHTML=`<h3>${contact.name}</h3>
                         <p>Phone: ${contact.phone}</p>
                         <p>Email: ${contact.email}</p>
                         <p>Category: ${contact.category}</p>
                         <button onclick="editContact(${index})">Edit</button>
                         <button onclick="deleteContact(${index})">Delete</button>`;
        contactList.appendChild(card);
    });
}

//edit contact

function editContact(index){
    const contact=contacts[index];
    nameInput.value=contact.name;
    phoneInput.value=contact.phone;
    emailInput.value=contact.email;
    categoryInput.value=contact.category;
    editIndex=index;
}

//delete contact
function deleteContact(index){
    if(confirm("Are you sure you want to delete this contact?")){
        contacts.splice(index,1);
        saveContacts();
        displayContacts();
    }
}

//search contacts
searchInput.addEventListener("input",displayContacts);

//filter contacts
filterInput.addEventListener("change",displayContacts);

//initial display
displayContacts();

let contacts=JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = -1;
const form = document.getElementById("contactForm");
const list = document.getElementById("contactList");
const search = document.getElementById("search");
const filter=document.getElementById("filter");
form.addEventListener("submit", e =>{
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let category = document.getElementById("category").value.trim();
    if(!name || !phone || !email || !category)
        return alert("Please fill in all fields");
    if(!/^\d{10}$/.test(phone))
        return alert("Please enter a valid 10-digit phone number.");
    if(!email.includes("@"))
        return alert("Enter a valid Email.");
    let contact = {name, phone, email, category};
    editIndex<0 ? contacts.push(contact) : contacts[editIndex] = contact;
    editIndex = -1;
    save();
    form.reset();
    show();
});
function save(){
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
function show(){
    let text=search.value.toLowerCase();
    let cat=filter.value;
    list.innerHTML = "";
    contacts.forEach((contact, index) => {
        if((contact.name.toLowerCase().includes(text) 
            || c.phone.includes(text)
             || c.email.toLowerCase().includes(text))
             && (cat === "All" || contact.category === cat)){
                list.innerHTML += `<div>
                <h3>${contact.name}</h3>
                <p>Phone: ${contact.phone}</p>
                <p>Email: ${contact.email}</p>
                <p>Category: ${contact.category}</p>
                <button onclick="edit(${index})">Edit</button>
                <button onclick="remove(${index})">Delete</button>
                </div>`;
        }
    });
    if(!list.innerHTML)
        list.innerHTML="<p>No contacts found.</p>";
}
function edit(index){
    let contact = contacts[index];
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;
    document.getElementById("category").value = contact.category;
    editIndex = index;
}
function remove(index){
    if(confirm("Are you sure you want to delete this contact?")){
        contacts.splice(index, 1);
        save();
        show();
    }
}
search.addEventListener("input", show);
filter.addEventListener("change", show);
show();

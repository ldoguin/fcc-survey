const form = document.getElementById("survey-form");
form.addEventListener('submit', handleForm);

async function handleForm(event) {
    event.preventDefault();
    console.log("A Form was Submitted !!!!");
    const data = new FormData(event.target);
    const jsonObject = Object.fromEntries(data);
    const details = `data: ${jsonObject.name}`;
    console.log(jsonObject);


    return false;
}
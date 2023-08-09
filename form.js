const form = document.getElementById("survey-form");
form.addEventListener('submit', handleForm);

async function handleForm(event) {
    event.preventDefault();
    console.log("A Form was Submitted !!!!");
    const data = new FormData(event.target);
    const jsonObject = Object.fromEntries(data);
    const details = `data: ${jsonObject.name}`;
    console.log(jsonObject);

    const response = await fetch(".netlify/functions/hello-world", {
       method: 'POST',
       header: {
        'Content-type': 'application/json'
       },
       body: JSON.stringify(jsonObject)
    });

    if (response.status == 200) {
        console.log(await response.text())
    }

    return false;
}
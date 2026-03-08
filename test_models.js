const url = "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyDyb8eLQ38irlEhfE_TTww4C6P7AQfTF9I";
fetch(url).then(r => r.json()).then(d => {
    console.log(d.models.map(m => m.name));
}).catch(console.error);

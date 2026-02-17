const cloudname="Precet_5C"
const preset="dnu57rgek"

const inputf=document.getElementById("fileinput")
const imagen=document.getElementById("imagen")

const subirimg=()=>{
    const foto=inputf.files[0]

    const formdata= new FormData()
    formdata.append('file',foto)
    formdata.append('upload_preset', preset)

    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,{
        method:'POST',
        body:formdata
    })
    .then(response=>{
        if(!response.ok) 
            throw new Error("Falla al subir la imagen")
        return response.json()
    })
    .then(data=>{
        alert("Imagen subida con exito")
        imagen.src=data.secure_url
    })
    
}
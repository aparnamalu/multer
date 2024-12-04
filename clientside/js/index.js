document.getElementById("frm").addEventListener("submit",(e)=>{
    e.preventDefault();
    const data=new FormData(e.target);
    console.log(data);
    
    fetch("http://localhost:3000/api/upload",{
        method:"POST",
        body:data
    }).then(async(res)=>{
        const result=await res.json()
        alert(result.msg)
    }).catch((error)=>{
        console.log(error);
        
    })
    
})
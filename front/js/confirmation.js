// pour récuprére les paramétres 
const urlParam = new URLSearchParams(window.location.search);
const orderId = urlParam.get("order");
console.log(orderId);
// Pour insérer le ID dans le HTML 
document.getElementById("orderId").innerText = orderId; 
const named='hola mundo';
function cosanostra(x,candidate=null){
    const shape=candidate||named;
    return shape;
}
console.log(cosanostra(6,'adios mundo'))
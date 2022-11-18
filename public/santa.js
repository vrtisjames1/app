// $(()=>{
//     $.ajax({
//         url:'http://localhost:3000'
//     }).then(
//         (data)=>{
//             console.log('data');
//         },
//         ()=>{
//             console.log('bad request');
//         }
//     );
// })
$.ajax({
    url: "http://localhost:3000/",
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
        console.log(res);
        alert(res);
    }
});
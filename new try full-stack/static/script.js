  
        $(document).ready(function(){
            alert("sivaraj 1")
            receive()
        })


        function receive(){
          $.ajax({
            type : 'GET',
            url:"/add_event",
            data:{},
            success:function(response){
               let eve= (response['events'])
               for (let i=1;i<eve.length;i++){
                  let e_name=eve[i]['name']
                  let e_des = eve[i]['des']
                  let e_date=eve[i]['date']
                  let e_time=eve[i]['time']
                  let e_poster=eve[i]['poster']
                  let e_loc=eve[i]['loc']
                  let e_mail=eve[i]['mail']

                  let html = `<div class="col">
                  <div class="card">
                    <img src="${e_poster}" class="card-img-top" alt="${e_name}">
                    <div class="card-body">
                      <h5 class="card-title">${e_name}</h5>
                      <p class="card-text">${e_des}</p>
                    </div>
                  </div>`

                  let table=` <tr>
                  <th scope="row">${e_name}</th>
                  <td>${e_des}</td>
                  <td>${e_loc}</td>
                  <td>${e_date}</td>
                </tr>`

                  $('#eve_live').append(html)
                  $("#table_body").append(table)



               }

            }
           })
        }

        function upload(){

            let e_name=$("#floatingInputGroup1").val()
            let e_des=$("#floatingTextarea2").val()
            let e_date=$("#event_date").val()
            let e_time=$("#event_time").val()
            let e_poster=$("#formFile").val()
            let e_loc=$("#floatingTextarea").val()
            let e_mail=$("#floatingInput").val()

            list=[e_name,e_des,e_date,e_time,e_poster,e_loc,e_mail]
            console.log(e_poster)

          $.ajax({
            type : 'POST',
            url:"/add_event",
            data:{'name': e_name,
               'des': e_des,
               'date':e_date,
               'time':e_time,
               'poster':e_poster,
               'loc':e_loc,
               'mail':e_mail
            },
            success:function(response){
               alert(response['msg'])
               window.location.reload()
            }
           })
        }

function taskList(){
    var params = {
        type: 0,
        consumer_id: 2,
        page: 0
    }
    Ajax({
        "url": "/works",
        "param": signOfParam(params),
        "successBack": function (data) {
            if (data.code == 200) {

            }
        }
    })
}
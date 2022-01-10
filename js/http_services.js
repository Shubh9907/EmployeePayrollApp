function makeServiceCall(methodType, url, async = true, data = null) {
    console.log("makeServiceCall");
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if(xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handle 400 Clint error or 500 Service Error");
                }
            }
        }

        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: this.statusText
            });
        };
        
        xhr.open(methodType, url, async);
        if(data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType+" request sent to the server ");
    });
}
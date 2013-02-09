

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
});

function getEmployeeList() {
	
    éécanvas test
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.moveTo(0,0);
        ctx.lineTo(200,100);
        ctx.stroke();
	    
		$.getJSON('http://ryanapp1.azurewebsites.net/srv.svc/rest/getInvoiceSum', function(data) {
			    $('#employeeList li').remove();
			    employees = data;
			
				$('#employeeList').append('<li><a href="employeedetails.html?id="><h4> Invoice : ' + employees.invoiceID + '</h4>' );
						
			
			    $('#employeeList').listview('refresh');
			
			
			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;

			//$(document).bind("deviceready", function()
			document.addEventListener("deviceready", function()
			{

                //Find and print  contacts
                var options = new ContactFindOptions();
                options.filter=""; 
                var fields = ["name", "phoneNumbers", "emails"];
                navigator.contacts.find(fields, onSuccess, onError, options);

                function onSuccess(contacts) {
                    for (var i=0; i<contacts.length; i++) {
                        $('#employeeList').append('<li><a>'+YAHOO.lang.dump(contacts[i])+'</a></li>');
                    }
                }
                function onError(contactError) {alert('onError!');}

                //Notification
                function alertDismissed() {}
                navigator.notification.alert(
                    'You are the winner!',  // message
                    alertDismissed,         // callback
                    'Game Over',            // title
                    'Done'                  // buttonName
                );
            /*
                $('#employeeList').append('<li><a>'+window.device.name+'</a></li>');
                $('#employeeList').append('<li><a>'+window.device.cordova+'</a></li>');
                $('#employeeList').append('<li><a>'+window.device.platform+'</a></li>');
                $('#employeeList').append('<li><a>'+window.device.uuid+'</a></li>');
                $('#employeeList').append('<li><a>'+window.device.version+'</a></li>');
            */
            //Accelerometer
            navigator.accelerometer.watchAcceleration(onSuccessAcc, onErrorAcc, { frequency: 1000 });
            function onSuccessAcc(a) {
                //$('#employeeList').append('<li><a>'+a.x+' - '+a.y+' - '+a.z+' - '+a.timestamp+'</a></li>');
            }
            function onErrorAcc() { }
            //GeoLocation
            navigator.geolocation.watchPosition(onSuccessGeo, onErrorGeo, { frequency: 1000 });
            function onSuccessGeo(p) {
                //$('#employeeList').append('<li><a>'+p.coords.latitude+' - '+p.coords.longitude+'</a></li>');
            }
            function onErrorGeo() { }



             return;
				navigator.notification.alert("You clicked me", function () 
				{
					navigator.camera.getPicture(onSuccessCam, onErrorCam,
					{
						quality: 95,
						destinationType: navigator.camera.DestinationType.FILE_URI,
                        //sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
						//destinationType: Camera.DestinationType.DATA_URL
						//sourceType: navigator.camera.PictureSourceType
						

					});
					function onSuccessCam(fileuri) {
						$('#employeeList').append('<li><a id="prog"></a></li>');
						
						$('#employeeList').append('<li><a href="employeedetails.html?id=' + '">' +
						'<img id="testImg" width="80px" height="80px" src="' + fileuri +  '" />' );
						
						$('#employeeList').listview('refresh');
						
						     document.getElementById("testImg").src = "data:image/jpeg;base64," + fileuri;


							function success(f) {
								$('#employeeList').append('<li>Success</li>');
								$('#employeeList').listview('refresh');
							}
							function fail(error) {
								$('#employeeList').append('<li>'+YAHOO.lang.dump(error)+'</li>');
								$('#employeeList').listview('refresh');	
							}
							var options = new FileUploadOptions();
								options.fileKey = "data";
								options.fileName = fileuri.substr(fileuri.lastIndexOf('/') + 1);
								options.mimeType = "image/jpeg";
								
								$('#employeeList').append('<li>file options added</li>');
								$('#employeeList').listview('refresh');
								
							var params = {};
								params.value1 = "sample text";
								params.value2 = "another sample";
								options.params = params;
								
								$('#employeeList').append('<li>params added</li>');
								$('#employeeList').listview('refresh');
								
							var ft = new FileTransfer();
							ft.onprogress=function(data)
							{
								$('#prog').html('<li>'+(data.loaded/data.total)+'</li>');
							}
								ft.upload(fileuri, encodeURI("http://phonegapbackend.azurewebsites.net/home/upload"), success, fail, options);
								$('#employeeList').append('<li>upload started</li>');
								$('#employeeList').listview('refresh');
								return;
								
								
								
							//UPLOAD
							
							   $.ajax({
									type: "POST",
									url: 'http://phonegapbackend.azurewebsites.net/home/upload',
									data: { data: fileuri },
									beforeSend: function() {
										
									},
									success: function (data) {
										$('#employeeList').append('<li>success</li>' );
										$('#employeeList').listview('refresh');
									},
									error: function (request,error){
										$('#employeeList').append('<li>'+YAHOO.lang.dump(request)+'</li>' );
										$('#employeeList').listview('refresh');
									}
								});
						
					}
					function onErrorCam(fileuri) 
					{
						$('#employeeList').append('<li><a href="employeedetails.html?id=' + '">' +
						'<h4> Erro </h4>' );
						
						$('#employeeList').listview('refresh');
					}
				}, "Click", "OK");	
			}, false);

			
			
			
			
			return;
			$.each(employees, function(index, employee) {
				$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
						
						'<h4>' + employee.invoiceID +  '</h4>' );
						
			});
			$('#employeeList').listview('refresh');
		});
	
}








    
    
var facebookCtrl;
(function ($) {

    facebookCtrl = cls.define(
    { 
         id:null,


         login: function () {
             $.ajax(
             {
                 url: "facebook/json_get_facebook_keys",
                 type: "get"
             }).done(function (data) {

                 var qs =
                 {
                     client_id: data.appid,
                     redirect_uri: data.url+"/facebook/getLoginPage", //to strip access code and pass to server
                     state: 'true',
                     display: 'popup',
                     scope: 'friends_groups,publish_stream,read_friendlists,email,user_photos,read_stream,user_about_me,user_birthday,user_checkins,user_groups,user_location,user_photo_video_tags,user_status',
                     response_type: "token"

                 }

                 var qsStringify = '';
                 for (var x in qs)
                     qsStringify += (x + '=' + qs[x] + '&');

                 window.open('http://www.facebook.com/dialog/oauth/?' + qsStringify, '_blank', 'left=300px,top=250px,height=300px,width=600px');
             });
         }//Login ------------------------------------------------
    });

} (jQuery));


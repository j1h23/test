var Practice='Y';
var Area='';
var Class='';
var Topic='';
var TestName='Smart Procedure Test';
var QuestionIndex=0;
var bookMarked='N';
var RemainingTime='';
var PointsAwardedString='0';
var TestType='Static';
var TestDescription='';
var displayTime='N';
var ExitAllowed='N';
var ShowTestResults='N';
var ImmediateDeferred='';
var DisplayCorrectAnswer='Y';
var DisplayScorePercentage='N';
var DisplayScoreCount='Y';
var DisplayScoreInResults='N';
var DontKnowCredit=0;
var NumOfQuestions=1;
var SaveScoring='';
var PartialCreditMCMA='N';
var PartialCreditMatching='N';
var ShowQuestionId='Y';
var ShowQuestionValue='Y';
var AllowBookmark='N';
var AllowReview='N';
var ResultPrinting='';
var RandomizeResponses='Y';
var ExamTimeLimit='';
var QuestionMaxTime='';
var ForcedRemediation='N';
var PlayCorrectIncorrectSoundsvalue='N';
var PlayQuestionRemediation='N';
var isRemedial='';
var remedialTestCount='';
var RemedialTests='';
var ActionDisableRemedial='';
var DKSRequired='N';
var BookMarkedResponse='';
var Status='';
var numAttempts=1;
var maxAttempts=1;
var gradeAction=70;
var gradeNeeded=80;
var hasEssay='False';
var passRemediation='0';
var failRemediation='0';
var TotalCorrectScore='0';
var TotalMarks=100;
/*CRIPT FOR Question ListBUTTON*/
var m_QMultipleChoice$0$btnQuestionListimgLeftCapImageMouseOver=new Image();

m_QMultipleChoice$0$btnQuestionListimgLeftCapImageMouseOver.src='images/button-left.gif';
var m_QMultipleChoice$0$btnQuestionListimgRightCapImageMouseOver=new Image();
m_QMultipleChoice$0$btnQuestionListimgRightCapImageMouseOver.src='images/button-right.gif';
var m_QMultipleChoice$0$btnQuestionListimgMiddleCapImageMouseOver=new Image();
m_QMultipleChoice$0$btnQuestionListimgMiddleCapImageMouseOver.src='images/button-middle.gif';
var m_QMultipleChoice$0$btnQuestionListimgLeftCapImageMouseDown=new Image();
m_QMultipleChoice$0$btnQuestionListimgLeftCapImageMouseDown.src='images/LeftCapImageMouseDown.gif';
var m_QMultipleChoice$0$btnQuestionListimgRightCapImageMouseDown=new Image();
m_QMultipleChoice$0$btnQuestionListimgRightCapImageMouseDown.src='images/RightCapImageMouseDown.gif';
var m_QMultipleChoice$0$btnQuestionListimgMiddleCapImageMouseDown=new Image();
m_QMultipleChoice$0$btnQuestionListimgMiddleCapImageMouseDown.src='images/MiddleCapImageMouseDown.gif';
var m_QMultipleChoice$0$btnQuestionListimgLeftCapImage=new Image();
m_QMultipleChoice$0$btnQuestionListimgLeftCapImage.src='images/button-left-50.gif';
var m_QMultipleChoice$0$btnQuestionListimgRightCapImage=new Image();
m_QMultipleChoice$0$btnQuestionListimgRightCapImage.src='images/button-right-50.gif';
var m_QMultipleChoice$0$btnQuestionListimgMiddleCapImage=new Image();
m_QMultipleChoice$0$btnQuestionListimgMiddleCapImage.src='images/button-middle-50.gif';
function m_QMultipleChoice$0$btnQuestionListmOverBtn(divBtn){
if(m_QMultipleChoice$0$btnQuestionListisBtnEnabled()){
document.all('m_QMultipleChoice$0$btnQuestionListtdLeftCap').background=m_QMultipleChoice$0$btnQuestionListimgLeftCapImageMouseOver.src;
try{document.all('m_QMultipleChoice$0$btnQuestionListtdRightCap').background=m_QMultipleChoice$0$btnQuestionListimgRightCapImageMouseOver.src;}catch(Exception){}
try{document.all('m_QMultipleChoice$0$btnQuestionListtdButtonImage').background=m_QMultipleChoice$0$btnQuestionListimgMiddleCapImageMouseOver.src;}catch(Exception){}
try{document.all('m_QMultipleChoice$0$btnQuestionListtdContent').background=m_QMultipleChoice$0$btnQuestionListimgMiddleCapImageMouseOver.src;}catch(Exception){}
}
}
function m_QMultipleChoice$0$btnQuestionListmDownBtn(divBtn){
if(m_QMultipleChoice$0$btnQuestionListisBtnEnabled()){
document.all('m_QMultipleChoice$0$btnQuestionListtdLeftCap').background=m_QMultipleChoice$0$btnQuestionListimgLeftCapImageMouseDown.src;
try{document.all('m_QMultipleChoice$0$btnQuestionListtdRightCap').background=m_QMultipleChoice$0$btnQuestionListimgRightCapImageMouseDown.src;}catch(Exception){}
try{document.all('m_QMultipleChoice$0$btnQuestionListtdButtonImage').background=m_QMultipleChoice$0$btnQuestionListimgMiddleCapImageMouseDown.src;}catch(Exception){}
try{document.all('m_QMultipleChoice$0$btnQuestionListtdContent').background=m_QMultipleChoice$0$btnQuestionListimgMiddleCapImageMouseDown.src;}catch(Exception){}
}
}
function  m_QMultipleChoice$0$btnQuestionListisBtnEnabled()
{
var enabled=true;
try
{
enabled=document.all('m_QMultipleChoice_0_btnQuestionList').enabled;
if(enabled=='false')
{
enabled=false;
}
if(enabled=='true')
{
enabled=true;
}
if(enabled==null)
{
enabled=true;
}
}
catch(Exception){}
	return enabled;
}
function  m_QMultipleChoice$0$btnQuestionListbtnClick()
{if(m_QMultipleChoice$0$btnQuestionListisBtnEnabled()){
document.all("m_QMultipleChoice_0_btnQuestionList").click();
}
}
function  m_QMultipleChoice$0$btnQuestionListmOutBtn(divBtn)
{if(m_QMultipleChoice$0$btnQuestionListisBtnEnabled()){
document.all('m_QMultipleChoice$0$btnQuestionListtdLeftCap').background=m_QMultipleChoice$0$btnQuestionListimgLeftCapImage.src;
try{document.all('m_QMultipleChoice$0$btnQuestionListtdRightCap').background=m_QMultipleChoice$0$btnQuestionListimgRightCapImage.src;}catch(Exception){}
try{document.all('m_QMultipleChoice$0$btnQuestionListtdButtonImage').background=m_QMultipleChoice$0$btnQuestionListimgMiddleCapImage.src;}catch(Exception){}
try{document.all('m_QMultipleChoice$0$btnQuestionListtdContent').background=m_QMultipleChoice$0$btnQuestionListimgMiddleCapImage.src;}catch(Exception){}
}
}
function  m_QMultipleChoice$0$btnQuestionListBtnPropertyChange()
{if(event.srcElement.id=='m_QMultipleChoice_0_btnQuestionList')
{
if(event.propertyName=='value')
{
document.all('m_QMultipleChoice$0$btnQuestionListtxt').innerText=document.all('m_QMultipleChoice$0$btnQuestionList').value;
}
if(event.propertyName=='imageUrl')
{
document.all('m_QMultipleChoice$0$btnQuestionListimgLeft').src=document.all('m_QMultipleChoice_0_btnQuestionList').imageUrl;
}
if(event.propertyName=='rightImageURL')
{
document.all('m_QMultipleChoice$0$btnQuestionListimgRight').src=document.all('m_QMultipleChoice_0_btnQuestionList').rightImageURL;
}
if(event.propertyName=='backGroundImageUrl')
{
document.all('m_QMultipleChoice$0$btnQuestionListtdContent').background=document.all('m_QMultipleChoice_0_btnQuestionList').backGroundImageUrl;
}
if(event.propertyName=='disabledImageUrl')
{
}
if(event.propertyName=='enabled')
{
if(m_QMultipleChoice$0$btnQuestionListisBtnEnabled()){
document.all('m_QMultipleChoice$0$btnQuestionListtxt').className='propLabelBold';
}else{
document.all('m_QMultipleChoice$0$btnQuestionListtxt').className='propLabelDisabled';
}
}
}
}
function m_QMultipleChoice$0$btnQuestionListEnterPress(){
if(event.keyCode==13){
if(m_QMultipleChoice$0$btnQuestionListisBtnEnabled()){}m_QMultipleChoice$0$btnQuestionListbtnClick();}
}
/*SCRIPT FOR Question ListBUTTON*/

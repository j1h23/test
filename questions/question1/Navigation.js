var Questionindex;
function dispQuestion(Qindex) {

  //alert(Questionindex + "Qindex= " + Qindex);
  //Logic for not letting to go to next Question If Forced Remediation is not taken	
  evalstr = "oQ_" + Questionindex + ".answered";
  var answered = eval(evalstr);

  if (ForcedRemediation == 'Y' && answered == 'true') {
    evalstr = "document.all['btn_remediation" + Questionindex + "'].style.display";
    //rem = eval(evalstr);
    var Took_rem = eval("oQ_" + Questionindex + ".Took_rem");
    //alert(rem + Took_rem );

    if (!Took_rem) {
      alert("You may not proceed to the next question until you have received remediation.");
      return;
    }
  }
  //End Logic for not letting to go to next Question If Remediation is not taken


  layerNamehide = "Q" + Questionindex + "div";
  Questionindex = Qindex;
  layerNameshow = "Q" + Qindex + "div";
  hideLayer(layerNamehide);
  showLayer(layerNameshow);

  evalstr = "oQ_" + Qindex + ".QPointValue";
  //document.testprop.Score.value = eval(evalstr);


  //document.testprop.txtQcount.value=(parseInt(Questionindex)+1) + " of " + (NumOfQuestions);
  if (ShowQuestionId == "Y") {
    var qid = eval("oQ_" + parseInt(Qindex) + ".Qid");
    //document.testprop.Qid.value = qid;
  } else {
    //document.testprop.Qid.value ="";
  }

  showNextBack();


  //showHideAcceptAnswer();

  //Show the Question Score
  if (DisplayScoreCount == "Y") {
    evalstr = "oQ_" + Questionindex + ".Score";
    //alert(evalstr);
    //				document.testprop.Score.value = eval(evalstr);
  }

  //Till here







  //logic for MArk Question
  evalstr = "oQ_" + Questionindex + ".answered";
  var answered = eval(evalstr);
  var testType = ImmediateDeferred;
  /*if (testType!="D"&&testType!="N"){	
  document.all['do_ITLater'].style.visibility='hidden';
  document.all['spando_ITLater'].style.visibility='hidden';
  }*/
  if (answered == 'true') {
    document.all("div_quizFooter$btnAccpet").style.visibility = "hidden";
    //alert("H");
    //document.all['do_ITLater'].checked=false;
    //evalstr = "oQ_"+Questionindex+".Do_It_Later='N'";
    //eval(evalstr);
    //document.all['do_ITLater'].style.visibility='hidden';
    //document.all['spando_ITLater'].style.visibility='hidden';	
  }
  else {
    document.all("div_quizFooter$btnAccpet").style.visibility = "visible";
    //alert("LA");
    if (testType != "D" && testType != "N") {
      //document.all['do_ITLater'].style.visibility='hidden';
      //document.all['spando_ITLater'].style.visibility='hidden';
    } else {
      //document.all['do_ITLater'].style.visibility='visible';
      //document.all['spando_ITLater'].style.visibility='visible';
    }

    //var marked = eval("oQ_"+Questionindex+".Do_It_Later");
    var marked = 'N';
    //alert(marked);
    if (marked == "Y") {
      //alert("H");
      //document.all['do_ITLater'].checked=true;
    } else {
      //alert("LA");
      //document.all['do_ITLater'].checked=false;
    }
  }
  //End Login for MArkQuestion
}
//Function for DIsplaying Question
function showNextBack() {
  if (!isRemedial) {
    if (Questionindex != 0) {
      evstr = "document.all('div_quizFooter$btnBack').style.visibility='visible'";
    } else {
      evstr = "document.all('div_quizFooter$btnBack').style.visibility='hidden'";
    }
    eval(evstr);
    if (Questionindex != (NumOfQuestions - 1)) {
      evstr = "document.all('div_quizFooter$btnNext').style.visibility='visible'";
    } else {
      evstr = "document.all('div_quizFooter$btnNext').style.visibility='hidden'";
    }
    eval(evstr);
  } else {
    var n = getNextBackRem("Next");

    if (n) {
      evstr = "document.all('div_quizFooter$btnNext').style.visibility='visible'";
    } else {
      evstr = "document.all('div_quizFooter$btnNext').style.visibility='hidden'";
    }
    eval(evstr);
    if (getNextBackRem("Back")) {
      evstr = "document.all('div_quizFooter$btnBack').style.visibility='visible'";
    } else {
      evstr = "document.all('div_quizFooter$btnBack').style.visibility='hidden'";
    }
    eval(evstr);
  }




  //Do not display previous button if test type is immediate lenier
  var testType = ImmediateDeferred;
  var srbackb = "images\/previousBLANK.gif";
  if (testType == "I") {
    evstr = "document.all('div_quizFooter$btnBack').style.visibility='hidden'";
    eval(evstr);
  }

  //not previous	


}

//Function for deciding whether to show next and back buttons ends here
function getNextBackRem(what) {
  var TotalQuestions = parseInt(NumOfQuestions);
  var i;
  var exist = false;
  var retVal;
  for (i = 0; i < QIDSAnswered.length; i++) {
    //I have commented the below part since it gave problem with 1 question (Graphical interaction
    //if(parseInt(QIDSAnswered[i])==parseInt(Qindex)){
    if (parseInt(QIDSAnswered[i]) == parseInt(Questionindex)) {
      exist = true;
      break;
    }
  }

  if (what == "Next") {
    if (Questionindex == (TotalQuestions - 1)) {
      retVal = false;
    } else {
      retVal = false;
      //alert(QIDSAnswered.length);
      for (i = Questionindex; i < (QIDSAnswered.length - 1); i++) {
        //alert("i = " + i + "QIndex = " + Questionindex+ "Qidans=" +QIDSAnswered[i+1]);
        if (parseInt(QIDSAnswered[i + 1]) == -1) {
          retVal = true;
          break;
        } else {
          retVal = false;
        }
      }

    }

  } else {
    if (Questionindex == 0) {
      retVal = false;

    } else {
      retVal = false;
      for (i = Questionindex; i > 0; i--) {
        if (parseInt(QIDSAnswered[i - 1]) == -1) {
          retVal = true;
          break;
        }
      }

    }

  }
  return retVal;
}
//End Function for showing the remediai test
function showLayer(layerName) {
  document.all(layerName).style.display = '';
}
function hideLayer(layerName) {
  document.all(layerName).style.display = 'None';
}
//Function for next back click

function GoNext() {

  var testType = ImmediateDeferred;
  evalstr = "oQ_" + Questionindex + ".answered";
  var answered = eval(evalstr);
  //Logic for not letting to go to next Question If the Question is now answered
  /*if(!QtimeOut){
  if (testType=="I"){
  if(answered!='true'){
  alert("You may not proceed to the next question until the question is scored")
  return;
  }
  }
  }*/
  //End Logic for not letting to go to next Question If the Question is now answered

  Qindex = parseInt(Questionindex) + 1;

  if (!isRemedial) {
    if (Questionindex != (NumOfQuestions - 1)) {
      dispQuestion(Qindex);
    }
  } else {
    if (getNextBackRem("Next")) {
      //showRemedialQuestion(Qindex,"Next");
      return;
    }
  }

}

function GoBack() {

  Qindex = parseInt(Questionindex) - 1;
  if (isRemedial) {
    if (getNextBackRem("Back")) {
      showRemedialQuestion(Qindex, "Back");
      return;
    } else {
      return;
    }
  }


  dispQuestion(Qindex);
}
//Function for next back click Ends here

//function Showing QUestion List
function showQuestionlist() {
  argObject = new Object();
  argObject.ShowQuestionId = ShowQuestionId;
  argObject.NumOfQuestions = NumOfQuestions;
  argObject.ImmediateDeferred = ImmediateDeferred;
  var QuestonArray=new Array();
  for(i=0;i<NumOfQuestions;i++){
  QuestionArrayString="oQ_"+i;
  QuestonArray[i]=eval(QuestionArrayString);
  }
 
  argObject.QuestonArray=QuestonArray;
  height = 400;
  width = (screen.availWidth - 20);
  var rnd = Math.random();
  feature = "unadorned:yes;dialogHeight: " + height + "px;dialogWidth: " + width + "px; edge: Raised; center: Yes; help: No; resizable: YES; status: No;scroll:NO ";
  window.showModalDialog("questionlist.htm?rnd="+rnd, argObject, feature);
  if (argObject.CMD == "GO")
  {
    dispQuestion(argObject.Qindex);
    }
}

//Function Showing Question list ends here
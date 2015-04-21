function ScoreMultipleChoice() {
  var Score = 0;
  var Qtype = eval("oQ_" + Questionindex + ".Qtype");
  var QPointValue = parseInt(eval("oQ_" + Questionindex + ".QPointValue"));
  var userResponses = [];

  
  var QTotalRightAnswer = parseInt(eval("oQ_" + Questionindex + ".QTotalRightAnswer"));
  //alert("QTotalRightAnswer="+QTotalRightAnswer);
  var ansChecked = false;
  var nullAns;
  Qtypes = "MultipleChoice";
  evalstr = "oQ_" + Questionindex + ".QTotalResponse";
  totresp = eval(evalstr);
  var correctAns = false;
  var RespNotNull = true;
  for (i = 0; i < totresp; i++) {
    evalstr = "oQ_" + Questionindex + ".QAns" + i + "";
    QAns = eval(evalstr);
    if (QAns != "") {
      ansChecked = true;
      break;
    }
  }
  //if(!QtimeOut){
  if (InitDone) {
    if (!ansChecked) {
      msg = "You did not enter a response before clicking the <br>&lt;Accept Answer&gt; Button. Is this correct?";
      returnVal = confirm(msg);
      height = 130;
      width = 400;
      backgroundcolor = "white";
      messageColor = "blue";
      okcancel = "YesNo";
      defaultClose = false;
      returnVal = 0;
      title = "No Response";
      //returnVal= messageBox(msg,height,width,backgroundcolor,messageColor,okcancel,defaultClose,returnVal,title);
      alert(returnVal);
      if (returnVal == 0) {
        noResponse();
        return false;
      }
    }
  }
  //}
  var incorrectRem = "";

  for (i = 0; i < totresp; i++) {
    correctAns = false;
    RespNotNull = true;
    evalstr = "oQ_" + Questionindex + ".QAns" + i + "";
    QAns = eval(evalstr);
    if (QAns != "") {
      for (j = 0; j < QTotalRightAnswer; j++) {
        evalstr = "oQ_" + Questionindex + ".Qrightanswer" + j + "";
        cAns = eval(evalstr);

        if (cAns == "") break;
        if (QAns == cAns) {
          correctAns = true;
          break;
        } else {
          if (cAns != "") {
          userResponses.push(QAns);
            correctAns = false;
            RespNotNull = false;
          }
        }
      }
      
      if ((PartialCreditMCMA) != "Y") {
        if (RespNotNull == false && correctAns == false) {
          Score = 0;
          //break;
        }
      }

      if (correctAns) {
        //	alert("inside if");
        if (QTotalRightAnswer != 0) {
          Score = Score + (QPointValue / QTotalRightAnswer);
          //	alert(Score + " one");
        } else {
          Score = Score + QPointValue;
          //	alert(Score + " two");
        }
      } else {

      
        if (QTotalRightAnswer != 0) {
          Score = Score - (QPointValue / QTotalRightAnswer * DontKnowCredit);
          //alert(Score + " three");
        } else {
          Score = Score - QPointValue;
          //alert(Score + " four");
        }
      }
    }
  }



  //alert("Comp Outer loop" + Score);
  nullAns = true;
  if (!ansChecked) {
    //alert("not ansChecked");
    for (i = 0; i < totresp; i++) {
      evalstr = "oQ_" + Questionindex + ".Qrightanswer" + i + "";
      cAns = eval(evalstr);
      //alert(cAns);
      if (cAns != "") {
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
  if ((PartialCreditMCMA) != "Y") {
    //alert(Math.round(Score));
    if (Math.round(Score) >= QPointValue) {
      Score = QPointValue;
      //alert(Score + " five");
    }
    if (Score < QPointValue) {
      Score = 0;
      //alert(Score + " six");
    }
  } else {
    if (Score > QPointValue) {
      Score = QPointValue;
      //							alert(Score + " seven");
    }
    if (Score < 0) {
      //	Score = 0;
      //alert(Score + " eight");
    }
  }
  //alert("Score=" + Score);
  Score = roundDec(Score);
  eval("oQ_" + Questionindex + ".Score =" + Score);
  //alert("Score =" + eval("oQ_"+Questionindex+".Score"));

  document.all("m_Q_" + Questionindex + "_lblQuestionScoreValue").innerHTML = Score

  //document.all("m_Q_" + Questionindex + "_lblQuestionScoreValue").innerHTML = Score;
  //Logic for showing correct answer
  if (DisplayCorrectAnswer == "Y") {

    for (i = 0; i < totresp; i++) {
      correctAns = false;
      evalstr = "oQ_" + Questionindex + ".Qresp" + i + "";
      Qresp = eval(evalstr);
      for (j = 0; j < QTotalRightAnswer; j++) {
        evalstr = "oQ_" + Questionindex + ".Qrightanswer" + j + "";
        cAns = eval(evalstr);
        if (cAns == "") break;
        if (Qresp == cAns) {
          correctAns = true;
          break
        }
      }

      //alert("Comp inner loop");

      if (correctAns) {

        img = "CorrectResp.bmp";

      } else {
        img = "inCorrectResp.bmp";
      }
      evalstr = "document.all['btn_resp" + Questionindex + "info" + i + "'].src='images\/" + img + "'"
      //eval(evalstr);
      evalstr = "document.all['btn_resp" + Questionindex + "info" + i + "'].style.display='inline'";
      //eval(evalstr);		
      evalstr = "document.all['btn_resp" + Questionindex + "info" + i + "'].style.cursor='auto'";
      //eval(evalstr);					
    }
   
  }

  if (Score != QPointValue) {
    evalstr = "oQ_" + Questionindex + ".InCorrectRemediation";
    var IncorrectRemediation = eval(evalstr);
    for (var i = 0; i < userResponses.length; i++) {
      for (var j = 0; j < IncorrectRemediation.length; j++) {
        if (userResponses[i] == IncorrectRemediation[j][0]) {
          incorrectRem = IncorrectRemediation[j][1];
          AddIncorrectRemediation(incorrectRem, userResponses[i]);
        }
      }
    }
  }
  //End Logic for showing correct answer
}

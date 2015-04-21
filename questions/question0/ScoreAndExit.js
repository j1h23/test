
function ScoreandExit() {



  var BookMark;

  var BookMarkID = "";
  var TimeLeft = "";
  var i = 0;
  var noExit = false;
  var ResultPrinting = "";
  var performRem = false;
  if (ImmediateDeferred != "D") {

    for (i = 0; i < NumOfQuestions; i++) {
      evalstr = "oQ_" + i + ".answered";
      answered = eval(evalstr);
      if (answered != "true") {
        alert("You must first press Accept Answer button for every question before quitting");
        noExit = true;
        break;
      }
    }
  }
  //scoreFlag is "B Forr Bookmark" or "S" -- I think Scorm does not need to support this option
  preSave("S");

  
  TestPercentage = getPercentageforAnswered();
  var isPassed = false;
  if (TestPercentage >= gradeNeeded) {
    isPassed = true;
    alert("Passed");
  } else {
    isPassed = false;
    alert("Failed");
  }
  try {
    var SD = window.parent;
    
    SD.SetScore(TestPercentage, 100, 0);

    if (isPassed) {
      SD.SetPassed();
      
    }
    else {
      SD.SetFailed();
      
    }
    SD.SetReachedEnd();
    alert("Course Completed");
    try {
      SD.ConcedeControl();
    } catch (e) { }
  } catch (e) {
    alert("Not in SCORM");
  }
  var xmlResult = "<TestResult Score=\"" + TestScore + "\" EXAM_ID=\"0000\">" + AnswerString + "</TestResult>";
  //alert(xmlResult);

  //alert(ResponseString);
  //YOU CAN RETURN THIS TO THE DATABASE FOR STORING.. NEED TO KNOW WHAT ALL WE NEED TO PASS.
}
function preSave(scoreFlag) 
{
  var QCount = 0;
  TotalCorrectScore = 0;
  //alert(TotalCorrectScore);
  for (QCount = 0; QCount < NumOfQuestions; QCount++) {
    TotalCorrectScore = ScoreAll(QCount, TotalCorrectScore);
  }
  TestScore = roundDec((TotalCorrectScore / TotalMarks) * 100);
  getAns_RespString(scoreFlag);

}
//Function for making the whole response string for submission
function getAns_RespString(scoreFlag) {
  AnswerString = "";
  ResponseString = "";

  //var xmlTestScore = "<TestResult>";
  var xmlScore = "<QuestionUserScore>";
  //var xmlResponse = "<UserResponse>";
  var Qtypes = "c";
  var i = 0;
  //var Exam_ID = document.testData.Exam_ID.value;
  var Exam_ID = "CheckNeededTODO";
  var r;
  for (i = 0; i < NumOfQuestions; i++) {
    //var Question = eval("oQ_"+i+".Question.value") ;
    var Qtype = eval("oQ_" + i + ".Qtype");
    var Qid = eval("oQ_" + i + ".Qid");
    var QScore = eval("oQ_" + i + ".Score");
    var QPointValue = eval("oQ_" + i + ".QPointValue");
    evalstr = "oQ_" + i + ".answered";
    var answered = eval(evalstr);
    //alert(answered);
    if (scoreFlag == "B") {
      if (answered == "true") {
        lock = "Y";
      } else {
        lock = "N";
      }

    } else {
      if (answered == "true" || scoreFlag == "S") {
        lock = "Y";
      } else {
        lock = "N";
      }
    }
    //alert(lock);
    xmlScore += "<QuestionScore QID=\"" + Qid + "\"  Score=\"" + QScore + "\" PointValue=\"" + QPointValue + "\" Locked=\"" + lock + "\" SequentialNumber=\"" + (i + 1) + "\" >";
    AnswerString = AnswerString + Qid + "|ATRCONCAT|";
    AnswerString = AnswerString + Exam_ID + "|ATRCONCAT|";
    AnswerString = AnswerString + QScore + "|ATRCONCAT|";
    AnswerString = AnswerString + QPointValue + "|ATRCONCAT|";
    AnswerString = AnswerString + lock + "|ATRCONCAT|" + (i + 1) + "|ATRCONCAT|";
    xmlScore += "<Answers>";
    switch (Qtype) {
      case "MultipleChoice":
        Qtypes = "MultipleChoice";
        evalstr = "oQ_" + i + ".QTotalResponse";
        totresp = eval(evalstr);
        var correctAns = false;
        var QAns = "";
        for (r = 0; r < totresp; r++) {
          evalstr = "oQ_" + i + ".QAns" + r + "";
          QAns = eval(evalstr);
          //if(QAns!=""){
          //xmlResponse += "<Response QID=\"" + Qid + "\" Exam_ID=\"0000\" Answer=\"" + QAns + "\" />";
          xmlScore += "<Answer UserResponse=\"" + QAns + "\" />";
          ResponseString = ResponseString + Qid + "|ATRCONCAT|";
          ResponseString = ResponseString + QAns + "|ATRCONCAT|";
          ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

          //}
        }
        break;
      case "S":
        Qtypes = "Sound Identification";
        evalstr = "oQ_" + i + ".QTotalResponse";
        totresp = eval(evalstr);
        var correctAns = false;
        var QAns = "";
        for (r = 0; r < totresp; r++) {
          evalstr = "oQ_" + i + ".QAns" + r + "";
          QAns = eval(evalstr);
          //if(QAns!=""){
          ResponseString = ResponseString + Qid + "|ATRCONCAT|";
          ResponseString = ResponseString + QAns + "|ATRCONCAT|";
          ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

          //}
        }
        break;
      case "M":
        Qtypes = "Match";
        totresp = eval("oQ_" + i + ".QTotalRightAnswer");
        //eval("oQ_"+QIndex+".Qresp0.focus()");

        for (r = 0; r < totresp; r++) {
          evalstr = "oQ_" + i + ".Qresp" + r + "";
          QAnsnum = eval(evalstr);
          evalstr = "oQ_" + i + ".Qmatch" + r + "";
          ReturnQuestion = eval(evalstr);
          if (QAnsnum != "") {
            evalstr = "oQ_" + i + ".Qmatchresp" + (parseInt(QAnsnum) - 1) + "";
            QAns = eval(evalstr);
            ResponseString = ResponseString + Qid + "|ATRCONCAT|";
            ResponseString = ResponseString + ReturnQuestion;
            ResponseString = ResponseString + "~~";
            ResponseString = ResponseString + QAnsnum;
            ResponseString = ResponseString + "~~";
            ResponseString = ResponseString + QAns + "|ATRCONCAT|";
            ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

          } else {
            ResponseString = ResponseString + Qid + "|ATRCONCAT|";
            ResponseString = ResponseString + ReturnQuestion
            ResponseString = ResponseString + "~~|ATRCONCAT|";
            ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
          }
        }



        break;
      case "F":
        Qtypes = "Fill in the Blank";
        QAns = eval("oQ_" + i + ".QAns");
        ResponseString = ResponseString + Qid + "|ATRCONCAT|";
        ResponseString = ResponseString + QAns + "|ATRCONCAT|";
        ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
        break;
      case "T":
        Qtypes = "True/False";
        evalstr = "oQ_" + i + ".QAns";
        QAns = eval(evalstr);
        ResponseString = ResponseString + Qid + "|ATRCONCAT|";
        ResponseString = ResponseString + QAns + "|ATRCONCAT|";
        ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
        break;
      case "Y":
        Qtypes = "Yes/No";
        evalstr = "oQ_" + i + ".QAns";
        QAns = eval(evalstr);
        ResponseString = ResponseString + Qid + "|ATRCONCAT|";
        ResponseString = ResponseString + QAns + "|ATRCONCAT|";
        ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
        break;
      case "R":
        Qtypes = "Graphical Response";
        evalstr = "oQ_" + i + ".QTotalResponse";
        totresp = eval(evalstr);
        var correctAns = false;
        var QAns = "";
        for (r = 0; r < totresp; r++) {
          evalstr = "oQ_" + i + ".QAns" + r + "";
          QAns = eval(evalstr);
          //if(QAns!=""){
          ResponseString = ResponseString + Qid + "|ATRCONCAT|";
          ResponseString = ResponseString + QAns + "|ATRCONCAT|";
          ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";

          //}
        }
        break;
      case "I":
        Qtypes = "Graphical Interaction";
        evalstr = "oQ_" + i + ".Xresp";
        x = parseFloat(eval(evalstr));
        evalstr = "oQ_" + i + ".Yresp";
        y = parseFloat(eval(evalstr));
        ResponseString = ResponseString + Qid + "|ATRCONCAT|";
        ResponseString = ResponseString + x + " ";
        ResponseString = ResponseString + y + " ";
        ResponseString = ResponseString + "|ATRCONCAT|";
        //ResponseString = ResponseString + Questions(i).Score + "|ATRCONCAT|";
        ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
        break;
      case "E":
        Qtypes = "Essay";
        evalstr = "oQ_" + i + ".QEssay";
        QAns = eval(evalstr);
        ResponseString = ResponseString + Qid + "|ATRCONCAT|";
        ResponseString = ResponseString + QAns + "|ATRCONCAT|";
        ResponseString = ResponseString + Exam_ID + "|ATRCONCAT|";
        break;
    }
    xmlScore += "</Answers>";
    xmlScore += "</QuestionScore>";
    //Adding code for disabling the elements for reviewing the test
    evalstr = "oQ_" + i + ".answered='true'";
    //alert(evalstr);
    eval(evalstr);
    evalstr = "document.Q" + i + "form.elements";
    frmElement = eval(evalstr);
    var k = 0;
    for (k = 0; k < frmElement.length; k++) {
      //alert(frmElement[k].type);
      frmElement[k].disabled = true;
    }
    //		alert(ResponseString);
    //Till here
  }

  xmlScore += "</QuestionUserScore>";


  AnswerString = xmlScore;
}

//End Function for making the whole response string for submission
function ScoreAll(QIndex, totalCorrectScore) {
  //alert("in Score All");
  var evalstr;
  var Score = 0;
  evalstr = "oQ_" + QIndex + ".answered";
  var answered = eval(evalstr);
  var Qtype = eval("oQ_" + QIndex + ".Qtype");
  var QPointValue = parseInt(eval("oQ_" + QIndex + ".QPointValue"));
  
  
  var QTotalRightAnswer = parseInt(eval("oQ_" + QIndex + ".QTotalRightAnswer"));
  
  var ansChecked = false;
  var nullAns;

  //if(answered=='true'){
  evalstr = "document.Q" + Questionindex + "form.elements";
  frmElement = eval(evalstr);
  for (i = 0; i < frmElement.length; i++) {
    frmElement[i].disabled = true;
  }
  //	}


  switch (Qtype) {

    case "S":
      Qtypes = "Sound Identification";
      evalstr = "oQ_" + QIndex + ".QTotalResponse";
      totresp = eval(evalstr);
      var correctAns = false;
      for (i = 0; i < totresp; i++) {
        evalstr = "oQ_" + QIndex + ".QAns" + i + "";
        //alert(evalstr);
        QAns = eval(evalstr);
        //alert("Evaluated");
        if (QAns != "") {
          ansChecked = true;
        }
      }

      for (i = 0; i < totresp; i++) {
        correctAns = false;
        RespNotNull = true;
        evalstr = "oQ_" + QIndex + ".QAns" + i + "";
        //alert(evalstr);
        QAns = eval(evalstr);
        //alert("Evaluated");
        if (QAns != "") {
          for (j = 0; j < totresp; j++) {
            evalstr = "oQ_" + QIndex + ".Qrightanswer" + j + "";
            //alert(evalstr);
            cAns = eval(evalstr);
            //alert("Evaluated");
            //alert("C Answer=" + cAns + "User Answer=" + QAns);
            if (cAns == "") break;
            if (QAns == cAns) {
              //alert("C Answer=" + cAns + "User Answer=" + QAns + "Inside c");
              correctAns = true;
              break;
            } else {
              if (cAns != "") {
                correctAns = false;
                RespNotNull = false;
              }

            }
          }

          //alert("Comp inner loop");
          if (RespNotNull == false && correctAns == false) {
            Score = 0;
            break;
          }
          if (correctAns) {
            //alert("inside if");
            if (QTotalRightAnswer != 0) {
              Score = Score + (QPointValue / QTotalRightAnswer);
              //alert(Score + " one");
            } else {
              Score = Score + QPointValue;
              //alert(Score + " two");
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



      //alert("Comp Outer loop");
      nullAns = true;
      if (!ansChecked) {
        //alert("not ansChecked");
        for (i = 0; i < totresp; i++) {
          evalstr = "oQ_" + QIndex + ".Qrightanswer" + i + "";
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
        if (Score > QPointValue) {
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
      eval("oQ_" + QIndex + ".Score =" + Score);

      //from accept answer till here


      if (Score == QPointValue) {
        evalstr = "oQ_" + QIndex + ".CorrectAnsFlag='true'";
        eval(evalstr);
      }




      break;


    case "M":
      Qtypes = "Match";
      totresp = eval("oQ_" + QIndex + ".QTotalRightAnswer");
      //eval("oQ_"+QIndex+".Qresp0.focus()");
      var totalCorrect = 0
      for (i = 0; i < totresp; i++) {
        var QHidden = eval("oQ_" + QIndex + ".Qresp" + i + ".type=='hidden'");
        if (!QHidden) {
          correctAns = false;
        } else {
          correctAns = true;
        }

        evalstr = "oQ_" + QIndex + ".Qresp" + i + "";
        QAnsnum = eval(evalstr);
        if (QAnsnum != "") {
          evalstr = "oQ_" + QIndex + ".Qmatchresp" + (parseInt(QAnsnum) - 1) + "";
          QAns = eval(evalstr);
        } else {
          QAns = "";
        }
        if (QAns != "") {
          evalstr = "oQ_" + QIndex + ".Qrightanswer" + i + "";
          cAns = eval(evalstr);
          if (QAns == cAns) {
            correctAns = true;
          }

          if (correctAns) {

            if (QTotalRightAnswer != 0) {
              Score = Score + (QPointValue / QTotalRightAnswer);
            } else {
              Score = Score + QPointValue;
            }
            totalCorrect++;
          } else {
            if (QTotalRightAnswer != 0) {
              Score = Score - (QPointValue / QTotalRightAnswer * DontKnowCredit);
            } else {
              Score = Score - QPointValue;
            }
          }
        }
      }

      if ((PartialCreditMatching) != "Y") {
        if (Score > QPointValue) {
          Score = QPointValue;
        }
        if (Score < QPointValue) {
          Score = 0;
        }
        if (totalCorrect == QTotalRightAnswer) {
          Score = QPointValue;
        }
      } else {
        if (Score > QPointValue) {
          Score = QPointValue;
        }
        if (Score < 0) {
          //	Score = 0;
        }
        if (totalCorrect == QTotalRightAnswer) {
          Score = QPointValue;
        }
      }
      Score = roundDec(Score);

      //				alert(Score+"Match");

      eval("oQ_" + QIndex + ".Score =" + Score);

      if (Score == QPointValue) {
        evalstr = "oQ_" + QIndex + ".CorrectAnsFlag='true'";
        eval(evalstr);
      }

      break;
    case "MultipleChoice":

      Qtypes = "MultipleChoice";
      ScoreMultipleChoice(QIndex);

      eval("Score=oQ_" + QIndex + ".Score");

      break;
    case "T":
      Score = 0;
      Qtypes = "True/False";
      evalstr = "oQ_" + QIndex + ".Qrightanswer0";
      cAns = eval(evalstr);
      evalstr = "oQ_" + QIndex + ".QAns";
      QAns = eval(evalstr);
      if (QAns == cAns) {
        Score = QPointValue;
      }
      Score = roundDec(Score);
      //				alert(Score+"True");
      eval("oQ_" + QIndex + ".Score =" + Score);

      if (Score == QPointValue) {
        evalstr = "oQ_" + QIndex + ".CorrectAnsFlag='true'";
        eval(evalstr);
      }

      break;
    case "Y":
      Qtypes = "Yes/No";
      Score = 0;
      evalstr = "oQ_" + QIndex + ".Qrightanswer0";
      cAns = eval(evalstr);
      evalstr = "oQ_" + QIndex + ".QAns";
      QAns = eval(evalstr);
      if (QAns == cAns) {
        Score = QPointValue;
      }
      Score = roundDec(Score);
      //				alert(Score+"Yes");
      eval("oQ_" + QIndex + ".Score =" + Score);

      if (Score == QPointValue) {
        evalstr = "oQ_" + QIndex + ".CorrectAnsFlag='true'";
        eval(evalstr);
      }

      break;
    case "R":
      Qtypes = "Graphical Response";
      evalstr = "oQ_" + QIndex + ".QTotalResponse";
      totresp = eval(evalstr);
      var correctAns = false;
      for (i = 0; i < totresp; i++) {
        evalstr = "oQ_" + QIndex + ".QAns" + i + "";
        QAns = eval(evalstr);
        if (QAns != "") {
          ansChecked = true;
        }
      }
      for (i = 0; i < totresp; i++) {
        correctAns = false;
        RespNotNull = true;
        evalstr = "oQ_" + QIndex + ".QAns" + i + "";
        QAns = eval(evalstr);





        if (QAns != "") {
          for (j = 0; j < totresp; j++) {
            evalstr = "oQ_" + QIndex + ".Qrightanswer" + j + "";
            cAns = eval(evalstr);
            if (cAns == "") break;
            if (QAns == cAns) {
              correctAns = true;
              break
            } else {
              if (cAns != "") {
                correctAns = false;
                RespNotNull = false;
              }

            }
          }


          if (RespNotNull == false && correctAns == false) {
            Score = 0;
            break;
          }
          if (correctAns) {

            if (QTotalRightAnswer != 0) {
              Score = Score + (QPointValue / QTotalRightAnswer);

            } else {
              Score = Score + QPointValue;

            }
          } else {
            if (QTotalRightAnswer != 0) {
              Score = Score - (QPointValue / QTotalRightAnswer * DontKnowCredit);

            } else {
              Score = Score - QPointValue;

            }
          }
        }
      }




      nullAns = true;
      if (!ansChecked) {

        for (i = 0; i < totresp; i++) {
          evalstr = "oQ_" + QIndex + ".Qrightanswer" + i + "";
          cAns = eval(evalstr);

          if (cAns != "") {
            nullAns = false;
            break;
          }
        }

        if (nullAns) {
          Score = (QPointValue);
        }
      }
      if ((PartialCreditMCMA) != "Y") {
        if (Score > QPointValue) {
          Score = QPointValue;
        }
        if (Score < QPointValue) {
          Score = 0;

        }
      } else {
        if (Score > QPointValue) {
          Score = QPointValue;
        }
        if (Score < 0) {
          //	Score = 0;

        }
      }
      Score = roundDec(Score);
      //				alert(Score+"Graphical Resp");
      eval("oQ_" + QIndex + ".Score =" + Score);


      if (Score == QPointValue) {
        evalstr = "oQ_" + QIndex + ".CorrectAnsFlag='true'";
        eval(evalstr);
      }

      break;



    case "I":
      //alert(Qtype);
      Qtypes = "Graphical Interaction";
      var totresp;
      evalstr = "oQ_" + QIndex + ".QTotalResponse";
      tr = eval(evalstr);
      totresp = parseInt(tr);
      var Xval = new Array();
      var Yval = new Array();
      var Xextentval = new Array();
      var Yextentval = new Array();
      var Corr_InCorr_Resp = new Array();
      frm = "oQ_" + QIndex + ".Xresp";
      x = parseFloat(eval(frm));
      frm = "oQ_" + QIndex + ".Yresp";
      y = parseFloat(eval(frm));
      correctAns = false;
      for (i = 0; i < totresp; i++) {
        xvalstr = "oQ_" + QIndex + ".X" + i + "";
        xvalstr = eval(xvalstr);
        Xval[i] = parseFloat(xvalstr);
        yvalstr = "oQ_" + QIndex + ".Y" + i + "";
        yvalstr = eval(yvalstr);
        Yval[i] = parseFloat(yvalstr);
        xextentvalstr = "oQ_" + QIndex + ".Xextent" + i + "";
        xextentvalstr = eval(xextentvalstr);
        Xextentval[i] = parseFloat(xextentvalstr);
        yextentvalstr = "oQ_" + QIndex + ".Yextent" + i + "";
        yextentvalstr = eval(yextentvalstr);
        Yextentval[i] = parseFloat(yextentvalstr);
        Corr_InCorr_Resp[i] = eval("oQ_" + QIndex + ".Corr_InCorr_Resp" + i + "");
        if (Corr_InCorr_Resp[i] == "Y") {
          if (x >= Xval[i] && x <= Xextentval[i]) {
            if (y >= Yval[i] && y <= Yextentval[i]) {
              correctAns = true;
              break
            }
          }
        }
      }
      //alert(correctAns);
      if (correctAns) {
        Score = QPointValue;
        evalstr = "oQ_" + QIndex + ".CorrectAnsFlag='true'";
        eval(evalstr);
      } else {
        Score = 0;
      }
      Score = roundDec(Score);
      eval("oQ_" + QIndex + ".Score =" + Score);
      //Code for disabling the Pick hot spot button for reviewing test				
      
      if (ImmediateDeferred == "D") {
        objimg = "document.all['img_PickCorrect" + QIndex + "'].style.display='none'";
        //	alert(objimg);
        eval(objimg);
      }
      //Till here		
      //			alert(Score+"Inter");	

      if (Score == QPointValue) {
        evalstr = "oQ_" + QIndex + ".CorrectAnsFlag='true'";
        eval(evalstr);
      }

      break;
    case "E":
      Qtypes = "Essay";
      break;
  }

  totalCorrectScore = totalCorrectScore + parseFloat(Score);
  return totalCorrectScore;

}
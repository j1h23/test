
function acceptAnswer(what) {
    var evalstr;
    var Score = 0;
    evalstr = "oQ_" + Questionindex + ".answered";
    var answered = eval(evalstr);
    if (what == "accept") {
        evalstr = "oQ_" + Questionindex + ".answered='true'";
        //alert(evalstr);
        eval(evalstr);
        //evalstr = "document.all['btn_acceptanswer" + Questionindex + "'].style.display='none'";
        //evalstr = "document.all['btn_acceptanswer"+Questionindex+"'].style.visibility='hidden'";
        //eval(evalstr);

        document.all("div_quizFooter$btnAccpet").style.visibility = "hidden";

    } else {
        evalstr = "oQ_" + Questionindex + ".answered='false'";
        eval(evalstr);

    }

    var Qtype = eval("oQ_" + Questionindex + ".Qtype");
    var QPointValue = parseInt(eval("oQ_" + Questionindex + ".QPointValue"));



    var QTotalRightAnswer = parseInt(eval("oQ_" + Questionindex + ".QTotalRightAnswer"));
    //alert("QTotalRightAnswer="+QTotalRightAnswer);
    var ansChecked = false;
    var nullAns;
    switch (Qtype) {

        case "SoundIdentification":
        case "MultipleChoice":
        case "GraphicalResponse":
            ScoreMultipleChoice();
            break;
        case "Matching":
            Qtypes = "Matching";
            ScoreMatching();
            break;
        case "Sequencing":
            ScoreSequencing();
            break;
        case "WhatIf":
            ScoreWhatIF();
            break;
        case "FillintheBlank":
            Qtypes = "Fill in the Blank";

            /* (lang != "en") {
            QAns = (eval("oQ_" + Questionindex + ".QAns"));
            } else {
            QAns = escape(eval("oQ_" + Questionindex + ".QAns"));
            QAns = replaceStr(QAns, "%A0", " ");
            }*/
            var QAns = eval("document.all('" + Questionindex + "FillBlankResponse').value");
            eval("document.all('" + Questionindex + "FillBlankResponse').disabled=true");
            var isCaseSensitive = (eval("oQ_" + Questionindex + ".IsCaseSensitive"));
            var CorrectResponses = eval("oQ_" + Questionindex + ".CorrectResponses")
            totresp = CorrectResponses.length;
            correctAns = false;
            for (j = 0; j < totresp; j++) {

                //evalstr = "oQ_" + Questionindex + ".Qrightanswer" + j + "";
                cAns = CorrectResponses[j];
                if (cAns == "") break;
                re = /\*/;            //Create regular expression pattern.
                var hasStar = cAns.search(re);
                if (hasStar != -1) {
                    correctAns = matchIT(cAns, QAns);
                    if (correctAns) {
                        break;
                    }
                }
                re = /\?/;            //Create regular expression pattern.
                var hasQmark = cAns.search(re);
                if (hasQmark != -1) {
                    //alert(cAns+QAns);
                    correctAns = matchQmark(cAns, QAns, isCaseSensitive);
                    //alert(correctAns);
                    if (correctAns) {
                        break;
                    }
                }
                //End Logic wild charecter
                if (isCaseSensitive == "N") {
                    if (QAns.toUpperCase() == cAns.toUpperCase()) {
                        correctAns = true;
                        break;
                    }
                } else {
                    if (QAns == cAns) {
                        correctAns = true;
                        break;
                    }
                }
            }
            if (correctAns) {
                Score = QPointValue;
            }
            else {
                Score = 0;
            }
            Score = roundDec(Score);
            eval("oQ_" + Questionindex + ".Score =" + Score);
            //Logic for showing correct answer
            if (DisplayCorrectAnswer == "Y") {
                layer = Questionindex + 'Qcorrectans';
                evalstr = "document.all['" + layer + "']";
                AnswerLayer = eval(evalstr);
                evalstr = "document.all['" + layer + "'].innerText";
                cAnsLayer = eval(evalstr);
                cAnsLayerAr = cAnsLayer.split(":");
                cAnsLayer = cAnsLayerAr[1];
                QansQuote = unescape(QAns);
                if (correctAns) {
                    if ($.trim(QansQuote) != $.trim(cAnsLayer)) {
                        evalstr = "document.all['" + layer + "'].innerHTML=\"<FONT face=Arial color=green size=4>Yes, but the preferred answer is: " + $.trim(cAnsLayer) + "</FONT>\"";
                        eval(evalstr);
                    }
                }
                AnswerLayer.style.display = "";
            }
            //Logic for showing correct answer
            break;
        case "TrueFalse":
        case "YesNo":
            Score = 0;
            Qtypes = "True/False";
            evalstr = "oQ_" + Questionindex + ".Qrightanswer0";
            cAns = eval(evalstr);
            evalstr = "oQ_" + Questionindex + ".QAns";
            QAns = eval(evalstr);
            if (QAns == cAns) {
                Score = QPointValue;
            }
            Score = roundDec(Score);
            eval("oQ_" + Questionindex + ".Score =" + Score);
            //Logic for showing correct answer
            if (DisplayCorrectAnswer == "Y") {
                layer = 'Q" + Questionindex + "cans'
                //showLayer(layer);
            }

            //Logic for showing correct answer
            break;
        case "Graphical Interaction":
            ScoreGraphicalInteraction();
            Qtypes = "Graphical Interaction";
            break;
        case "E":
            Qtypes = "Essay";
            break;
    }


    Score = eval("oQ_" + Questionindex + ".Score;");
    //Score = eval(evalstr);

    var totalCorrectAnswer = parseFloat(TotalCorrectScore);
    if (answered != "true") {
        totalCorrectAnswer = totalCorrectAnswer + parseFloat(Score);
    }
    TotalCorrectScore = totalCorrectAnswer;
    if (DisplayScoreCount == "Y") {
        if (DisplayScorePercentage == "Y") {
            document.all("_quizHeader_lblCumScoreValue").innerText = totalCorrectAnswer + " (" + getPercentageforAnswered() + "%)";
        } else {
            document.all("_quizHeader_lblCumScoreValue").innerText = totalCorrectAnswer;
        }
        //	document.testprop.Score=parseFloat(Score);
    } else {
        if (DisplayScorePercentage == "Y") {
            document.all("_quizHeader_lblCumScoreValue").innerText = " (" + getPercentageforAnswered() + "%)";
            //	document.testprop.Score=parseFloat(Score);
        }
    }
    document.all("m_Q_" + Questionindex + "_lblQuestionScoreValue").innerHTML = Score;

    //Show remediation button
    showRem = false;
    var remType = new Array();
    if (Score == QPointValue) {
        evalstr = "oQ_" + Questionindex + ".CorrectAnsFlag=true";
        eval(evalstr);
        evalstr = "oQ_" + Questionindex + ".CorrectRemediationService";
        rem = eval(evalstr);
        if ((rem != "Error" && rem != "No_Service" && rem != "")) {
            showRem = true;
        }
    } else {
        evalstr = "oQ_" + Questionindex + ".CorrectAnsFlag=false";
        eval(evalstr);
        evalstr = "oQ_" + Questionindex + ".IncorrectRemediationService";
        rem = eval(evalstr);
        evalstr = "oQ_" + Questionindex + ".Remediation.length";
        var remLength = eval(evalstr);
        if (rem != "") {
            evalstr = "oQ_" + Questionindex + ".Remediation[" + remLength + "]=['Question Remediation','" + rem + "']";
            eval(evalstr);
            evalstr = "oQ_" + Questionindex + ".RemediationViewed[" + remLength + "]=['Question Remediation',false]";
            eval(evalstr);
        }
    }
    evalstr = "oQ_" + Questionindex + ".Remediation";
    var Remediation = eval(evalstr);
    if (Remediation.length > 0) {
        showRem = true;
    }
    if (showRem) {
        evalstr = "document.all['" + Questionindex + "RemButton'].style.display='inline'";
        eval(evalstr);
    } else {
        evalStr = "oQ_" + Questionindex + ".Took_rem=true";
        eval(evalStr);
    }
    try {
        parent.window.populateQuestionScore(Score, QPointValue);
    } catch (e) {
    }

}
function matchIT(cAns, enteredStr) {

    cAnsAr = cAns.split('*');
    retVal = true;
    for (i = 0; i < cAnsAr.length; i++) {
        if (enteredStr.indexOf(cAnsAr[i]) == -1) {
            retVal = false;
        }
    }

    return retVal;

}
function matchQmark(cAns, enteredStr, isCaseSensitive) {
    var indAr = new Array();
    var ind = 0;
    var retVal = false;
    for (i = 0; i < cAns.length; i++) {
        if (cAns.charAt(i) == '?') {
            indAr[ind] = i;
            ind++;
        }
    }
    var strC = "";
    for (j = 0; j < enteredStr.length; j++) {
        for (i = 0; i < indAr.length; i++) {
            //alert(indAr[i]);
            var notFound = false;
            //alert("j=" + j + " indAr[i]=   "+indAr[i]);
            //alert(j==indAr[i]);
            if (j == indAr[i]) {
                notFound = true;
                break;
            }
        }
        if (!notFound) {
            strC += enteredStr.charAt(j);
        } else {
            strC += '?';
        }
    }

    var isTrue = false;
    if (isCaseSensitive == "Y") {
        isTrue = cAns == strC
    } else {
        isTrue = cAns.toUpperCase() == strC.toUpperCase();
    }
    if (isTrue) {
        retVal = true;
    } else {
        retVal = false;
    }

    return retVal;


}
function roundDec(num) {
    num = num.toString();
    var i = num.indexOf('.');
    if (i == -1) {
        return parseFloat(num);
    }
    else {
        var t = num.substring(0, i + 1) + num.substring(i + 1, i + 3)
        return parseFloat(t);
    }


}

function Exit(option) {
    strProp = "exitWin.htm";
    height = 300;
    width = 450;
    myObject = new Object();
    myObject.bookMarkAllowed = AllowBookmark;
    myObject.abandonAllowed = ExitAllowed;
    myObject.what = "";
    myObject.ieSupport = ieSupport;
    feature = "unadorned:yes;dialogHeight: " + height + "px; dialogWidth: " + width + "px; edge: Raised; center: Yes; help: No; resizable: No; status: No;scroll:No";
    myObject.feature = feature;
    win = window.showModalDialog(strProp, myObject, feature);
    if (myObject.what == "abandon") {
        AssignSeqNum = assignseqnum;
        CourseName = courseName;
        TaskSeqNum = taskSeqNum;
        PersonID = personID;
        Exam_ID = Exam_ID;
        lc = "TestName=" + TestName + "&AssignSeqNum=" + AssignSeqNum + "&CourseName=" + CourseName + "&TaskSeqNum=" + TaskSeqNum + "&PersonID=" + PersonID + "&Exam_ID=" + Exam_ID + "&noab=";
        loc = "abondontest.asp?" + lc
        location.href = loc;
    }
    if (myObject.what == "score") {
        ScoreandExit();
    }
    if (myObject.what == "bookmark") {
        BookmarkandExit();
    }
}
//function exit click ends here
function noResponse() {
    evalstr = "oQ_" + Questionindex + ".answered='false'";
    eval(evalstr);
    document.all("div_quizFooter$btnAccpet").style.visibility = "visible";
}
function getPercentageforAnswered() {
    var i;
    var totQansMark;
    var answered = "false";
    var QPointValue;
    totQansMark = 0;
    var totQAnswered = 0;
    for (i = 0; i < NumOfQuestions; i++) {
        evalstr = "oQ_" + i + ".answered";
        //alert("answered = " +evalstr);
        answered = eval(evalstr);
        //alert("answered = " +answered);
        if (answered == "true") {
            evalstr = "oQ_" + i + ".QPointValue";
            QPointValue = parseFloat(eval(evalstr));
            //alert(QPointValue);
            totQansMark = QPointValue + totQansMark;
            totQAnswered++;
        }
    }
    var totalCorrectAnswer = parseFloat(TotalCorrectScore);
    var scPer = (totalCorrectAnswer * 100) / totQansMark;
    //var scPer = (totalCorrectAnswer * 100) / totQAnswered;
    var scPerv = scPer.toString();
    var sc = scPerv.split(".");
    if (sc.length == 2) {
        sc1 = sc[1];
        sc1 = sc1.slice(0, 2);
        scPerv = sc[0] + "." + sc1;
    } else {
        scPerv = scPerv
    }
    return (scPerv);
}

function ScoreMatching() {
    var Score = 0;
    evalstr = "oQ_" + Questionindex + ".RespCount";
    var RespCount = eval(evalstr);
    evalstr = "oQ_" + Questionindex + ".MatchResponses";
    var MatchResponses = eval(evalstr);
    var QPointValue = parseInt(eval("oQ_" + Questionindex + ".QPointValue"));
    evalstr = "oQ_" + Questionindex + ".CorrectResponses";
    var CorrectResponses = eval(evalstr);
    QTotalRightAnswer = CorrectResponses.length;
    var totalCorrect = 0;
    for (i = 0; i < MatchResponses.length; i++) {
        evalstr = "oQ_" + Questionindex + ".MatchResponses[" + i + "][1];";
        var answer = eval(evalstr);
        evalstr = "oQ_" + Questionindex + ".MatchResponses[" + i + "][0];";
        var question = eval(evalstr);
        if (answer != "") {
            var answerArray = answer.split("~~");
            answer = answerArray[1];
        }
        var incorrectRem = "";
        for (j = 0; j < CorrectResponses.length; j++) {
            if (question == CorrectResponses[j][0]) {
                evalstr = "oQ_" + Questionindex + ".Answer[" + j + "]='" + answer + "'";
                eval(evalstr);
                if (answer == CorrectResponses[j][1]) {
                    correctAns = true;
                } else {
                    correctAns = false;
                    evalstr = "oQ_" + Questionindex + ".InCorrectRemediation";
                    var IncorrectRemediation = eval(evalstr);
                    incorrectRem = IncorrectRemediation[j][1];
                }
            }
        }
        if (correctAns) {
            Score = Score + (QPointValue / QTotalRightAnswer);
            totalCorrect++;
        } else {
            Score = Score - (QPointValue / QTotalRightAnswer * DontKnowCredit);
            AddIncorrectRemediation(incorrectRem, question);
        }
    }
    if ((PartialCreditMatching) != "Y") {
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
    }
    Score = roundDec(Score);
    eval("oQ_" + Questionindex + ".Score =" + Score);
    //alert("Score =" + eval("oQ_"+QuestionIndexToScore+".Score"));
    document.all("m_Q_" + Questionindex + "_lblQuestionScoreValue").innerHTML = Score;
    if (DisplayCorrectAnswer == "Y") {
        ShowCorrectMatching();
    }
}
function ShowCorrectMatching() {
    var CorrectResponses = eval("oQ_" + Questionindex + ".CorrectResponses");
    //var seqInfo = eval("oQ_" + Questionindex + ".seqInfo");
    var Answer = eval("oQ_" + Questionindex + ".Answer");
    var tblCorrectAnswer = "#tblResponseMatching" + Questionindex;

    var tblCorrectAnswerRows = tblCorrectAnswer + " tr";
    $(tblCorrectAnswerRows).remove();
    $(tblCorrectAnswer).append('<tr class="Headercss"><td style="width:34%;">Question</td><td style="width:33%;">User Response</td><td align="center" class="correctSequnce" style="width:33%;">Correct Match</td></tr>');
    for (i = 0; i < CorrectResponses.length; i++) {

        var docTd = "";
        // if (seqInfo[i] != '') {
        // docTd = "<td>seqInfo[i]</td>"
        //}

        var cssClass = "";
        if (((i + 1) % 2) == 0) {
            cssClass = "TableAlternatingItem";
        }
        else {
            cssClass = "TableItem";
        }
        var CorrectClass = "correctSequence";
        if (Answer[i] != CorrectResponses[i][1]) {
            var CorrectClass = "inCorrectResponseStyle";
        }
        $(tblCorrectAnswer).append('<tr  class="' + cssClass + '"><td align="left" >' + CorrectResponses[i][0] + '</td><td align="left" class="' + CorrectClass + '">' + Answer[i] + '</td><td align="left" class="correctSequence" >' + CorrectResponses[i][1] + '</td></tr>');

    }

}
function GenerateUniqueColors(colors, count) {
    for (var i = 0; i < count; i++) {
        var color = generateColor(false);
        while (DoesColorExist(color, colors)) {
            color = generateColor(false);
        }
        colors[i] = color;
    }
    return colors;
}



function DoesColorExist(color, colors) {
    var exist = false;
    for (var i = 0; i < colors.length; i++) {
        if (colors[i] == color) {
            exist = true;
            break;
        }
    }
    return exist;
}

function generateColor(ranges) {
    if (!ranges) {
        ranges = [
										[150, 256],
										[0, 190],
										[0, 30]
        ];
    }
    var g = function () {
        //select random range and remove
        var range = ranges.splice(Math.floor(Math.random() * ranges.length), 1)[0];
        //pick a random number from within the range
        return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
    }
    return "rgb(" + g() + "," + g() + "," + g() + ")";
};

function ScoreSequencing() {
    var Score = 0;
    var QPointValue = parseInt(eval("oQ_" + Questionindex + ".QPointValue"));

    var seqData = eval("oQ_" + Questionindex + ".seqData");
    var pointForSingeResponse = QPointValue / seqData.length;
    var AnswerArray = new Array();
    for (var i = 0; i < seqData.length; i++) {
        AnswerArray[i] = seqData[i][1];
    }
    var CorrectSequenceArray = eval("oQ_" + Questionindex + ".CorrectSequence");
    var CorrectAnswerArray = new Array();
    for (var i = 0; i < CorrectSequenceArray.length; i++) {
        CorrectAnswerArray[i] = CorrectSequenceArray[i][1];
    }

    for (var i = 0; i < CorrectSequenceArray.length; i++) {
        if (CorrectAnswerArray[i] == AnswerArray[i]) {
            Score += pointForSingeResponse;
        }
    }
    if (!(PartialCreditMCMA)) {
        if (roundDec(Score) >= QPointValue) {
            Score = QPointValue;
        }
        if (Score < QPointValue) {
            Score = 0;
        }
    }
    else {
        if (Score > QPointValue) {
            Score = QPointValue;
        }
    }
    Score = roundDec(Score);
    eval("oQ_" + Questionindex + ".Score =" + Score);
    document.all("m_Q_" + Questionindex + "_lblQuestionScoreValue").innerHTML = Score;
    if (DisplayCorrectAnswer == "Y") {
        ShowCorrectSequence();
    }
}


function ShowCorrectSequence() {
    var seqData = eval("oQ_" + Questionindex + ".seqData");
    var seqInfo = eval("oQ_" + Questionindex + ".seqInfo");
    var CorrectSequenceArray = eval("oQ_" + Questionindex + ".CorrectSequence");
    var tblSequencing = "#tblSequencing" + Questionindex;
    var tblSequencingRows = tblSequencing + " tr";
    $(tblSequencingRows).remove();
    $(tblSequencing).append('<tr class="Headercss"><td style="width:50%;">User Response</td><td align="center" class="correctSequnce" style="width:50%;">Correct Sequence</td></tr>');

    for (i = 0; i < seqData.length; i++) {

        var docTd = "";
        if (seqInfo[i] != '') {
            docTd = "<td>seqInfo[i]</td>"
        }
        var upArrow = '<img src="images/arrowup-small.gif" onClick="DoUp(this)" seq="' + seqData[i][0] + '">';
        if (i == 0) {
            upArrow = '';
        }
        var downArrow = '<img src="images/arrowdown-small.gif" onClick="DoDown(this)" seq="' + seqData[i][0] + '">';
        if (i == seqData.length - 1) {
            downArrow = '';
        }
        var cssClass = "";
        if ((seqData[i][0] % 2) == 0) {
            cssClass = "TableAlternatingItem";
        }
        else {
            cssClass = "TableItem";
        }
        $(tblSequencing).append('<tr class="' + cssClass + '"><td style="width:50%;">' + seqData[i][1] + '</td><td align="left" class="correctSequence" style="width:50%;">' + CorrectSequenceArray[i][1] + '</td></tr>');

    }
}
/*Sequencing*/
/*What IF*/

function ScoreWhatIF() {
    var Score = 0;
    evalstr = "oQ_" + Questionindex + ".UserResponses";
    var UserResponses = eval(evalstr);
    var QPointValue = parseInt(eval("oQ_" + Questionindex + ".QPointValue"));
    evalstr = "oQ_" + Questionindex + ".CorrectResponses";
    var CorrectResponses = eval(evalstr);
    QTotalRightAnswer = CorrectResponses.length;
    var totalCorrect = 0;
    for (i = 0; i < UserResponses.length; i++) {
        for (j = 0; j < CorrectResponses.length; j++) {
            if (UserResponses[i][0] == CorrectResponses[j][0]) {
                if (UserResponses[i][1] == CorrectResponses[j][1]) {
                    correctAns = true;
                    break;
                } else {
                    correctAns = false;
                }
            }
        }

        if (correctAns) {

            Score = Score + (QPointValue / QTotalRightAnswer);
            totalCorrect++;
        } else {
            Score = Score - (QPointValue / QTotalRightAnswer * DontKnowCredit);
        }
    }
    if ((PartialCreditMatching) != "Y") {
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

    }
    Score = roundDec(Score);
    eval("oQ_" + Questionindex + ".Score =" + Score);
    //alert("Score =" + eval("oQ_"+QuestionIndexToScore+".Score"));

    document.all("m_Q_" + Questionindex + "_lblQuestionScoreValue").innerHTML = Score;
    ShowCorrecWhatIF();
}
function ShowCorrecWhatIF() {
    evalstr = "oQ_" + Questionindex + ".UserResponses";
    var UserResponses = eval(evalstr);
    evalstr = "oQ_" + Questionindex + ".CorrectResponses";
    var CorrectResponses = eval(evalstr);
    evalstr = "oQ_" + Questionindex + ".QuestionArray";
    var QuestionArray = eval(evalstr);
    var tblWhatif = "#tblWhatif" + Questionindex;
    var tblWhatifRows = tblWhatif + " tr";
    $(tblWhatifRows).remove();
    $(tblWhatif).append('<tr class="Headercss"><td style="width:40%;">Question</td><td style="width:30%;">User Response</td><td align="center" class="correctSequnce" style="width:30%;">Correct Answer</td></tr>');
    for (var i = 0; i < QuestionArray.length; i++) {
        var cssClass = "";
        if ((i % 2) == 0) {
            cssClass = "TableAlternatingItem";
        }
        else {
            cssClass = "TableItem";
        }
        var userResponseText = "";
        for (var j = 0; j < QuestionArray.length; j++) {
            if (CorrectResponses[i][0] == UserResponses[j][0]) {
                userResponseText = UserResponses[j][1];
                break;
            }
        }

        $(tblWhatif).append('<tr class="' + cssClass + '"><td>' + QuestionArray[i] + '</td><td>' + GetWhatIFProcessText(userResponseText) + '</td><td align="left" class="correctSequence" >' + GetWhatIFProcessText(CorrectResponses[i][1]) + '</td></tr>');

    }
}
function GetWhatIFProcessText(val) {
    retValue = "";
    switch (val.toUpperCase()) {
        case "DONTKNOW":
            retValue = "Cannot Determine";
            break;
        case "GODOWN":
            retValue = "Down";
            break;
        case "GODOWNUP":
            retValue = "Down Then Up";
            break;
        case "STAYSAME":
            retValue = "No Change";
            break;
        case "GOUP":
            retValue = "Up";
            break;
        case "GOUPDOWN":
            retValue = "Up Then Down";
            break;
    }
    return retValue;
}
function ScoreGraphicalInteraction() {
    var QPointValue = parseInt(eval("oQ_" + Questionindex + ".QPointValue"));
    var totresp;
    evalstr = "oQ_" + Questionindex + ".QTotalResponse";
    tr = eval(evalstr);
    totresp = parseInt(tr);
    evalstr = "oQ_" + Questionindex + ".GraIntXValues";

    var Xval = eval(evalstr);
    evalstr = "oQ_" + Questionindex + ".GraIntYValues";
    var Yval = eval(evalstr);
    evalstr = "oQ_" + Questionindex + ".GraIntXExtentValues";
    var Xextentval = eval(evalstr);
    evalstr = "oQ_" + Questionindex + ".GraIntYExtentValues";
    var Yextentval = eval(evalstr);
    evalstr = "oQ_" + Questionindex + ".Corr_InCorr_Resp";
    var Corr_InCorr_Resp = eval(evalstr);
    frm = "oQ_" + Questionindex + ".UserxvalStreval";
    x = parseFloat(eval(frm));
    frm = "oQ_" + Questionindex + ".UseryvalStreval";
    y = parseFloat(eval(frm));
    correctAns = false;
    for (i = 0; i < Xval.length; i++) {
        if (Corr_InCorr_Resp[i] == "Y") {
            if (x >= Xval[i] && x <= Xextentval[i]) {
                if (y >= Yval[i] && y <= Yextentval[i]) {
                    correctAns = true;
                    break
                }
            }
        }
    }

    if (correctAns) {
        Score = QPointValue;
    } else {
        Score = 0;
    }
    Score = roundDec(Score);
    eval("oQ_" + Questionindex + ".Score =" + Score);
    //alert(DisplayCorrectAnswer);
    if (DisplayCorrectAnswer == "Y") {
        objimg = "document.all['" + Questionindex + "btnHotSpottxt'].innerText='Show Answer'";
        eval(objimg);
    }
    else {
        objimg = "document.all['" + Questionindex + "TRGintSelectHotSpot'].style.display='none'";
        //alert(objimg);
        eval(objimg);

    }
}
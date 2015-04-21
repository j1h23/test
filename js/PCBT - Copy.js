// Example header text. Can be configured in the options.
var AVERAGE_WPM = 200,
    ReviewModeOn,
    vEventInstance = "",
    GTrainingID,
    msgScript = "",
    vMsgInputValue,
    bShowMOCBtn = true,
    bShowAcknowledgeBtn = true,
    VHeightContent = 100,
    ShowMessageGOTOStep = false,
    tblMainWidth = 0,
    tblMainHeight = 0,
    oWindowMOC,
    hasTable = false,
    isProperExit = false,
    HeightSettingCompleted = false,
    CurrentZoom = DEFAULT_ZOOM = 24,
    CurrentFontSize = 24,
    divStepHTMHeightWithAttachment,
    divStepHTMHeightWithoutAttachment,
    CurrentStepIndex = 0,
    CurrentQuestionIndexInStep = -1,
    VHeightContent,
    SPEECH_ACTIVEX_ERROR = "Member not found.\r\n",
    CurrentSectionID = 0,
    CompletionCriteriaLogic,
    CurrentSpeechContent = "",
    CompletionCriteriaEnum = {
        AckModStepAndAtt: { Id: "M", CheckAtt: true, StepTypeOfInterest: "Changed" },
        AckChngStep: { Id: "C", CheckAtt: false, StepTypeOfInterest: "Changed" },
        AckAllStepsAndAtt: { Id: "A", CheckAtt: true, StepTypeOfInterest: "All" },
        AckAllStepsNoAtt: { Id: "S", CheckAtt: false, StepTypeOfInterest: "All" },
        InteractiveMode: { Id: "I", CheckAtt: false, StepTypeOfInterest: "Interactive" }
    },
    AcknowledgeCriteriaEnum = {
        ManualAcknowledge: "M",
        AutoAdvanceOnAcknowledge: "A",
        AutoAcknowledgeOnNext: "N"
    },
    NotePairingModeEnum = {
        WithPreviousStep: "P",
        WithFollowingStep: "F"
    };

$(document).ready(function () {
    $(window).resize(function () {
        ResizeWindow();
        ResizeAttachmentViewer();
        ResizePageDividers(CurrentQuestionIndexInStep);
    });
    LoadKendoControls();
    ResizeWindow();
    ResizePageDividers(CurrentQuestionIndexInStep);
    RenderReviewGrid();
    RenderProcUserFieldGrid();
    InitializeDocuments();
    LoadCompletionCriteriaLogic();
    LoadReviewModeControls();
    LoadInteractiveModeButtons();
    SetOptionsDisplay(null);
});

function LoadInteractiveModeButtons() {
    var interactiveModeButtons = $("#noteButton, #attButton");
    if (CompletionCriteriaLogic.StepTypeOfInterest === "Interactive") {
        interactiveModeButtons.show();
    } else {
        interactiveModeButtons.hide();
    }
}

function LoadReviewModeControls() {
    if (CompletionCriteriaLogic.StepTypeOfInterest === "All") {
        ToggleReviewMode(false);
        $(".reviewMode").hide();
    } else {
        ToggleReviewMode(true);
        if (CompletionCriteriaLogic.StepTypeOfInterest === "Changed") {
            $(".reviewModeText").text("Change Review Mode");
        } else if (CompletionCriteriaLogic.StepTypeOfInterest === "Interactive") {
            $(".reviewModeText").text("Interactive Review Mode");
        }
        $(".reviewMode").show();
    }
}

function ToggleReviewMode(reviewMode) {
    ReviewModeOn = reviewMode;
    var imageSrc;
    if (reviewMode === true) {
        imageSrc = "images/checkbox-on.png";
        $(".reviewMode").removeClass("red").removeClass("blue");
    } else {
        imageSrc = "images/checkbox-off.png";
        $(".reviewMode").removeClass("blue").addClass("red");
    }
    $(".imgReviewModeChkbx").attr("src", imageSrc);
}

function ReviewModeMouseDown(reviewModeCtrl) {
    reviewModeCtrl = $(reviewModeCtrl);
    reviewModeCtrl.removeClass("red").addClass("blue");
}

function LoadKendoControls() {
    $("#divSettings").hover(function () { }, function () {
        $(this).fadeOut(400);
    });
    //closes settings menu when clicking outside
    $(document).click(function () {
        $("#divSettings").fadeOut(400);
    });
    //prevents on click function from bubbling in to clicks on the settings Button (prevent close of settings menu)
    $("#settingsButton").click(function (e) {
        e.stopPropagation();
    });
    $("#divSettings").click(function (e) {
        e.stopPropagation();
    });
    $("#ProcedureDetailstabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
    $(".kendoBtn").kendoButton({
    });
    $("#textSizeSlider").kendoSlider({
        change: SliderTextHandleClientValueChange,
        min: 10,
        max: 40,
        tickPlacement: "none",
        value: DEFAULT_ZOOM,
    });
    $("#slideSpeedSlider").kendoSlider({
        min: 0,
        max: 3,
        value: 1,
        largeStep: 1,
        tickPlacement: "none",
        tooltip: {
            enabled: false
        },
    });
    $("#volumeSlider").kendoSlider({
        change: SliderVolumeHandleClientValueChange,
        min: 0,
        max: 100,
        tickPlacement: "none",
        value: Volume,
    });
    var contextMenuNext = $("#contextMenuNext").kendoContextMenu({
        target: "#btnNextContext",
        animation: {
            open: {
                effects: "slideIn:up"
            }
        },
        alignToAnchor: true
    }).data("kendoContextMenu");
    $("#btnNextContext").click(function (e) {
        contextMenuNext.open();
    });
    var contextMenuPrev = $("#contextMenuPrev").kendoContextMenu({
        target: "#btnPreviousContext",
        animation: {
            open: {
                effects: "slideIn:up"
            }
        },
        alignToAnchor: true
    }).data("kendoContextMenu");
    $("#btnPreviousContext").click(function () {
        contextMenuPrev.open();
    });
    $("#window").kendoWindow({
        actions: ["Close"],
        draggable: false,
        height: "450px",
        modal: true,
        resizable: false,
        width: "600px",
        iframe: true
    });
}

function InitializeDocuments() {
    var docIndex, docId, i, stepWithDocuments;
    for (i = IntroSlidesCount; i < TotalSlidesCount; i++) {
        if (window["step" + i] != null) {
            stepWithDocuments = window["step" + i];
            if (stepWithDocuments.NumberOfStepDocuments > 0) {
                for (docIndex = 0; docIndex < stepWithDocuments.NumberOfStepDocuments; docIndex++) {
                    docId = stepWithDocuments.documents[docIndex].ID;
                    stepWithDocuments.documents[docIndex].FileName = DocFileName(docId);
                }
            }
        }
    }
    for (docIndex = 0; docIndex < ProcedureDocuments.length; docIndex++) {
        docId = ProcedureDocuments[docIndex].ID;
        ProcedureDocuments[docIndex].FileName = DocFileName(docId);
    }
}
function DocFileName(docId) {
    var docName = "";
    for (var i = 0; i < documents.length; i++) {
        if (documents[i][0] == docId) {
            docName = documents[i][1];
            break;
        }
    }
    return docName;
}

function ScormGetStudentName() {
    window.parent.GetStudentName();
}

function populateQuestionScore(pointsEarned, pointsPossible) {
    var stepInfo = window["step" + CurrentStepIndex],
        quesIndex = stepInfo.Questions[CurrentQuestionIndexInStep];
    QuesInfoSortedByIndex[quesIndex].PointsEarned = pointsEarned;
    QuesInfoSortedByIndex[quesIndex].PointsPossible = pointsPossible;
}

function LoadCompletionCriteriaLogic() {
    $.each(CompletionCriteriaEnum, function (i, criteria) {
        if (criteria.Id === COMPLETION_CRITERIA) {
            CompletionCriteriaLogic = criteria;
            return false;
        }
    });
}

function callInitButton() {
    try {
        if (HeightSettingCompleted) {
            document.all("btnInitialButton").click();
        } else {
            setTimeout(callInitButton(), 100);
        }
    } catch (exception) {
        alert(exception);
    }
};

function GoToStepUsingStepIndex(stepIndex, questionInStepIndex) {
    ClearTimeSpentOnCurrentSlide();
    $("video").each(function () {
        $(this).get(0).pause();
    });
    DisplayStep(stepIndex, questionInStepIndex);
    UpdateCurrentSpeechContent();
    var origIsAutoPlay = IsAutoPlay;
    StopAutoPlay();
    if (!$('#chkDisableSpeech').is(':checked')) {
        ReadCurrentContent();
    }
    if (origIsAutoPlay) {
        AutoPlay();
    }
};

function ClearTimeSpentOnCurrentSlide() {
    AutoPlayTimeOnSlideMs = 0;
}

function DisplayStep(stepIndex, questionInStepIndex) {
    if (questionInStepIndex === undefined || questionInStepIndex === null) {
        questionInStepIndex = -1;
    }
    CurrentStepIndex = stepIndex;
    CurrentQuestionIndexInStep = questionInStepIndex;
    $(".wcnRtnBtn").hide();
    var currentStep;
    ResizePageDividers(questionInStepIndex);
    if (typeof window['step' + CurrentStepIndex] !== "undefined") {
        currentStep = window["step" + CurrentStepIndex];
        SetAttachmentSectionDisplay(currentStep);
        SetStepAsViewedAndAcknowledged();
    }
    SetStepStatusBarDisplay(currentStep, CurrentSectionID);
    SetOptionsDisplay(currentStep);
    SetFlagBtnDisplay(currentStep);
    SetAcknowledgeBtnDisplay(currentStep);
    SetStatusBarStyle();
    DoZoom();
    var zoomId = "#divZoomStepHTML" + CurrentStepIndex;
    var stepContentHeight = $(zoomId).height();
    var imageHeight = VHeightContent - stepContentHeight;
    var img = $("#imgSingleAttachment" + CurrentStepIndex);
    if (img.length > 0) {
        ResizeSingleImage(imageHeight);
    }
    if (questionInStepIndex !== -1) {
        ResizeQuestionsIframe();
    }
}

function SetOptionsDisplay(currentStep) {
    if (currentStep == null) {
        $("#divMarkerMenu").hide();
    } else {
        $("#divMarkerMenu").show();
    }
}

function UpdateCurrentSpeechContent() {
    var textReadCtrl,
        textRead = "";
    if (CurrentQuestionIndexInStep === -1) {
        textReadCtrl = $("#divZoomStepHTML" + CurrentStepIndex);
        if (textReadCtrl && textReadCtrl.length) {
            textRead = textReadCtrl.text();
        }
    }
    CurrentSpeechContent = textRead;
}

function ResizeQuestionsIframe() {
    if (CurrentQuestionIndexInStep != -1) {
        var currentStep = window["step" + CurrentStepIndex];
        if (currentStep) {
            var quesIndex = currentStep.Questions[CurrentQuestionIndexInStep];
            window.frames["divMiddleContentFrameQ" + quesIndex].Initialize();
        }
    }
}

function ResizePageDividers(questionInStepIndex) {
    var stepVar,
        quesIndex,
        i,
        contentHeight;

    for (i = 0; i < TotalSlidesCount; i++) {
        $("#divCBTHeader" + i).css("display", "none");
        $("#divMiddleContent" + i).css("display", "none");
    }
    for (i = 0; i < QuesInfoSortedByIndex.length; i++) {
        $("#divMiddleContentQ" + i).css("display", "none");
    }
    $("#divCBTHeader" + CurrentStepIndex).css("display", "");
    contentHeight = window.innerHeight - ($("#divCBTHeader0").height() + $("#divFooter").height()) - 11;
    if (questionInStepIndex != -1) {
        stepVar = window["step" + CurrentStepIndex];
        quesIndex = stepVar.Questions[questionInStepIndex];
        $("#divMiddleContentQ" + quesIndex).css("display", "");
        $("#divMiddleContentFrameQ" + quesIndex).css("height", contentHeight - 10);
    } else {
        $("#divMiddleContent" + CurrentStepIndex).css("display", "");
        $("#divMiddleContent" + CurrentStepIndex).css("height", contentHeight);
    }
}
function SetAttachmentSectionDisplay(currentStep) {
    var bShow = false;
    if (currentStep) {
        if (currentStep.NumberOfStepDocuments > 0) {
            bShow = true;
        } else {
            //todo: add in logic here to not show attachment if it is a single displayable picture or video
        }
    }
    ShowHideAttachment(bShow);
}
function SetStepStatusBarDisplay(currentStep, previousIndex) {
    $("#divStepStatus" + previousIndex).css("display", "none");
    if (currentStep != null) {
        CurrentSectionID = currentStep.ParentSectionID;
    } else {
        CurrentSectionID = 0;
    }
    $("#divStepStatus" + CurrentSectionID).css("display", "");

}
function SetFlagBtnDisplay(currentStep) {
    if (currentStep != null) {
        if (currentStep.Flagged) {
            $("#btnFlag").attr("src", "images/button-flag-on.png");
        } else {
            $("#btnFlag").attr("src", "images/button-flag.png");
        }
        $("#divFlag").css("display", "inline-block");
    } else {
        CurrentSectionID = 0;
        $("#divFlag").hide();
    }
}
function SetAcknowledgeBtnDisplay(currentStep) {
    if (ACKNOWLEDGE_CRITERIA != null && ACKNOWLEDGE_CRITERIA !== AcknowledgeCriteriaEnum.AutoAcknowledgeOnNext) {
        if (currentStep != null) {
            $("#divAcknowledge").css("display", "inline-block");
            if (currentStep.Acknowledged) {
                $("#btnReviewed").attr("src", "images/check-acknowledged.png");
            } else {
                $("#btnReviewed").attr("src", "images/check-box.png");
            }
        } else {
            $("#divAcknowledge").hide();
        }
    } else {
        $("#divAcknowledge").hide();
    }
}
function FlagStep() {
    var currentStep = window["step" + CurrentStepIndex];
    currentStep.Flagged = !currentStep.Flagged;
    DisplayStep(CurrentStepIndex, -1);
}
function AcknowledgeStep() {
    var currentStep = window["step" + CurrentStepIndex];
    currentStep.Acknowledged = !currentStep.Acknowledged;
    if (ACKNOWLEDGE_CRITERIA === AcknowledgeCriteriaEnum.AutoAdvanceOnAcknowledge &&
        currentStep.Acknowledged) {
        DoNext();
    } else {
        DisplayStep(CurrentStepIndex, -1);
    }
}
function SetStatusBarStyle() {
    var currentStepLayer, currentSectionStepLayer, className;
    //set all layers for section progress
    for (var stepIndex = 4; stepIndex < TotalSlidesCount; stepIndex++) {
        if (GetStepStatus("Flagged", stepIndex)) {
            className = 'clsStepStatusFlaggedCell';
        } else if (GetStepStatus("Acknowledged", stepIndex)) {
            className = 'clsStepStatusAcknowledgedCell';
        } else if (GetStepStatus("Viewed", stepIndex)) {
            className = 'clsStepStatusVisitedCell';
        } else {
            className = 'clsStepStatusCell';
        }
        currentStepLayer = $("#divStepStatusCell" + stepIndex);
        currentStepLayer.removeClass().addClass(className);
        if (className === 'clsStepStatusCell') {
            className = 'ClassNameSectionPreProcedure';
        }
        currentSectionStepLayer = $("#SectionStatusStep" + StepIdSortedByIndex[stepIndex]);
        currentSectionStepLayer.removeClass().addClass(className);
    }
    //clear all layers for overall progress
    $('.CurrentSectionSeparator').removeClass().addClass('SectionSeparator');
    $('.clsSectionAcknowledgedStatusCurrentCell').removeClass();
    $('.clsSectionPartiallyVisitedStatusCurrentCell').removeClass().addClass('clsSectionPartiallyVisitedStatusCell'); //todo: class only needs to be added because the introduction slides are not integrated; fix this later
    //set layers for current step in overall progress
    var stepCssClass;
    if (GetStepStatus("Flagged", CurrentStepIndex)) {
        stepCssClass = 'clsStepStatusFlaggedCurrentCell';
    }
    else if (GetStepStatus("Acknowledged", CurrentStepIndex)) {
        stepCssClass = 'clsStepStatusAcknowledgedCurrentCell';
    } else {
        stepCssClass = 'clsStepStatusVisitedCurrentCell';
    }
    //unused available css class 'clsSectionPartiallyVisitedStatusCell'
    currentStepLayer = $("#divStepStatusCell" + CurrentStepIndex);
    currentStepLayer.removeClass().addClass(stepCssClass);
    $("#SectionStatus" + CurrentSectionID).removeClass().addClass('CurrentSectionSeparator');
    //todo: it really doesn't matter if it is acknowledged or partially visited, clean up code later to just add a class for current cell and skip the isSectionAllViewed logic
    if (IsSectionAllViewed(CurrentSectionID)) {
        $("#SectionStepStatus" + CurrentSectionID).removeClass().addClass('clsSectionAcknowledgedStatusCurrentCell');
    } else {
        $("#SectionStepStatus" + CurrentSectionID).removeClass().addClass('clsSectionPartiallyVisitedStatusCurrentCell');
    }
}
function GetStepStatus(property, stepIndex) {
    var currentStep = window["step" + stepIndex];
    var propertyResult = null;
    if (currentStep != null)
        propertyResult = currentStep[property];
    return propertyResult;
}

function SetStepAsViewedAndAcknowledged() {
    var currentStep = window["step" + CurrentStepIndex];
    if (currentStep != null) {
        currentStep.Viewed = 'Y';
        if (ACKNOWLEDGE_CRITERIA === AcknowledgeCriteriaEnum.AutoAcknowledgeOnNext)
            currentStep.Acknowledged = true;
    }
};

function UpdateSectionProperty(sectionInfo, property) {
    var allAcknowledged = true;
    for (var i = 0; i < sectionInfo.StepIndices.length; i++) {
        var step = window["step" + sectionInfo.StepIndices[i]];
        if (!step[property]) {
            allAcknowledged = false;
            break;
        }
    }
    sectionInfo["All"+property] = allAcknowledged;
}

function GetSectionInfoFromSectionId(sectionId) {
    var section;
    for (var j = 0; j < Sections.length; j++) {
        if (Sections[j].SectionId == sectionId) {
            section = Sections[j];
            break;
        }
    }
    if (section) {
        return section;
    } else {
        throw new Error("Could not find section");
    }
};

function IsSectionAllViewed(sectionId) {
    var sectionInfo;
    if (sectionId > 0) {
        sectionInfo = GetSectionInfoFromSectionId(sectionId);
        UpdateSectionProperty(sectionInfo, "Viewed");
        return sectionInfo.AllViewed;
    } else {
        return false;
    }
};
function GetStepIndexFromStepId(stepId) {
    for (var i = 0; i < StepIdSortedByIndex.length; i++) {
        if (StepIdSortedByIndex[i] == stepId) {
            return i;
        }
    }
    return -1;
};
function ResizeSingleImage(maxHeight) {
    var img = document.all("imgSingleAttachment" + CurrentStepIndex);
    var dimension = ResizeImage(img.src, 800, maxHeight);
    $("#imgSingleAttachment" + CurrentStepIndex).css("height", dimension[1]);
    //document.all("imgSingleAttachment").height = dimension[1];
    $("#imgSingleAttachment" + CurrentStepIndex).css("width", dimension[0]);
    //document.all("imgSingleAttachment").width = dimension[0];
    if (dimension[1] < maxHeight && dimension[0] < 800) {
        document.all("imgSingleAttachment" + CurrentStepIndex).removeAttribute("onClick");
        document.all("imgSingleAttachment" + CurrentStepIndex).style.cursor = "default";
    }
};
function ResizeImage(originalFile, newWidth, maxHeight) {
    var fullsizeImage = new Image();
    fullsizeImage.src = originalFile;
    return GetThumbNailImageSize(fullsizeImage.height, fullsizeImage.width, newWidth, maxHeight);
};
function GetThumbNailImageSize(actualHeight,
                               actualWidth,
                               lnWidth,
                               lnHeight) {
    var calculatedWidth = actualWidth;
    var calculatedHeight = actualHeight;
    var orWantedHeight = lnHeight;
    var orWantedWidth = lnWidth;

    try {
        var lnRatio;

        var lnNewWidth = 0;
        var lnNewHeight = 0;
        if (actualWidth < lnWidth &&
            actualHeight < lnHeight) {
            return [actualWidth, actualHeight];
        }
        var lnTemp;
        if (actualWidth > actualHeight) {
            lnRatio = lnWidth / actualWidth;
            lnNewWidth = lnWidth;
            lnTemp = actualHeight * lnRatio;
            lnNewHeight = lnTemp;
        } else {
            lnRatio = lnHeight / actualHeight;
            lnNewHeight = lnHeight;
            lnTemp = actualWidth * lnRatio;
            lnNewWidth = lnTemp;
        }
        if (lnNewHeight > orWantedHeight) {
            lnRatio = orWantedHeight / lnNewHeight;
            lnNewHeight = orWantedHeight;
            lnTemp = lnNewWidth * lnRatio;
            lnNewWidth = lnTemp;
        }
        if (lnNewWidth > orWantedWidth) {
            lnRatio = orWantedWidth / lnNewWidth;

            lnNewHeight = orWantedHeight;

            lnTemp = lnNewWidth * lnRatio;

            lnNewWidth = lnTemp;
        }

        calculatedWidth = lnNewWidth;
        calculatedHeight = lnNewHeight;
    } catch (excpetion) {
    }
    return [calculatedWidth, calculatedHeight];
};

function DoNext() {
    var origStepIndex = CurrentStepIndex,
        origQuestionIndex = CurrentQuestionIndexInStep,
        nextStep = GetNextStepIndex(CurrentStepIndex, CurrentQuestionIndexInStep, true);
    if (nextStep.exists &&
        (nextStep.stepIndex !== origStepIndex || nextStep.quesIndex !== origQuestionIndex)) {
        GoToStepUsingStepIndex(nextStep.stepIndex, nextStep.quesIndex);
    } else {
        StopAutoPlay();
        DisplayStep(origStepIndex, origQuestionIndex);
    }
}

function GetNextStepIndex(currentStepIndex, currentQuestionIndexInStep, bIncludeQuestions) {
    var stepInfo,
        nextStepInfo,
        nextStepIndex = currentStepIndex,
        nextQuestionIndexInStep = currentQuestionIndexInStep,
        exists = false;
    if (currentStepIndex < IntroSlidesCount) {
        nextStepIndex = currentStepIndex + 1;
        nextQuestionIndexInStep = -1;
        exists = true;
    } else {
        stepInfo = window["step" + currentStepIndex];
        if (stepInfo != null) {
            if (currentStepIndex < TotalSlidesCount) {
                if (bIncludeQuestions &&
                    stepInfo.Questions != null && stepInfo.Questions.length > 0 &&
                    currentQuestionIndexInStep + 1 < stepInfo.Questions.length) {
                    nextQuestionIndexInStep = currentQuestionIndexInStep + 1;
                    exists = true;
                } else if (window["step" + (currentStepIndex + 1)]) {
                    nextStepIndex = currentStepIndex + 1;
                    nextQuestionIndexInStep = -1;
                    exists = true;
                }
            }
        }
    }
    if (exists && ReviewModeOn && nextStepIndex >= IntroSlidesCount) {
        nextStepInfo = window["step" + nextStepIndex];
        if (CompletionCriteriaLogic.StepTypeOfInterest === "Changed" && !nextStepInfo.Changed ||
            CompletionCriteriaLogic.StepTypeOfInterest === "Interactive" && INTERACTIVE_STEP_TYPES.indexOf(nextStepInfo.Type) === -1) {
            return GetNextStepIndex(nextStepIndex, nextQuestionIndexInStep, bIncludeQuestions);
        }
    }
    return {
        stepIndex: nextStepIndex,
        quesIndex: nextQuestionIndexInStep,
        exists: exists
    }
}

function DoPrevious() {
    var origStepIndex = CurrentStepIndex,
        origQuestionIndex = CurrentQuestionIndexInStep,
        prevStep = GetPreviousStepIndex(CurrentStepIndex, CurrentQuestionIndexInStep, true);
    if (prevStep.stepIndex !== origStepIndex || prevStep.quesIndex !== origQuestionIndex) {
        GoToStepUsingStepIndex(prevStep.stepIndex, prevStep.quesIndex);
    }
};

function GetPreviousStepIndex(currentStepIndex, currentQuestionIndexInStep, bIncludeQuestions) {
    var stepInfo,
        prevStepInfo,
        prevStepIndex = currentStepIndex,
        prevQuestionIndexInStep = currentQuestionIndexInStep,
        exists = false;
    if (currentStepIndex > 0) {
        if (currentStepIndex <= IntroSlidesCount && currentQuestionIndexInStep == -1) {
            prevStepIndex = currentStepIndex - 1;
            prevQuestionIndexInStep = -1;
            exists = true;
        } else {
            if (bIncludeQuestions && currentQuestionIndexInStep >= 0) {
                prevQuestionIndexInStep = currentQuestionIndexInStep - 1;
                exists = true;
            } else {
                stepInfo = window["step" + (currentStepIndex - 1)];
                if (stepInfo != null) {
                    prevStepIndex = currentStepIndex - 1;
                    exists = true;
                    if (bIncludeQuestions && stepInfo.Questions != null && stepInfo.Questions.length > 0) {
                        prevQuestionIndexInStep = stepInfo.Questions.length - 1;
                    } else {
                        prevQuestionIndexInStep = -1;
                    }
                }
            }
            if (exists && ReviewModeOn) {
                prevStepInfo = window["step" + prevStepIndex];
                if (CompletionCriteriaLogic.StepTypeOfInterest === "Changed" && !prevStepInfo.Changed ||
                    CompletionCriteriaLogic.StepTypeOfInterest === "Interactive" && INTERACTIVE_STEP_TYPES.indexOf(prevStepInfo.Type) === -1) {
                    return GetPreviousStepIndex(prevStepIndex, prevQuestionIndexInStep, bIncludeQuestions);
                }
            }
        }
    }
    return {
        stepIndex: prevStepIndex,
        quesIndex: prevQuestionIndexInStep,
        exists: exists
    }
}

function DoNextSection() {
    var nextSectionIndex = CurrentStepIndex;
    var currentParentId = -1;
    for (var i = CurrentStepIndex; i < TotalSlidesCount; i++) {
        if ((typeof window['step' + i]) !== "undefined") {
            var currentstep = window["step" + i];
            if (i == CurrentStepIndex) {
                currentParentId = currentstep.ParentSectionID;
            } else if (currentstep.ParentSectionID !== currentParentId) {
                nextSectionIndex = i;
                break;
            }
        }
    }
    GoToStepUsingStepIndex(nextSectionIndex, -1);
};

function DoPreviousSection() {
    var prevSectionIndex = CurrentStepIndex;
    var currentParentId = -1;
    var prevParentId = -1;
    for (var i = CurrentStepIndex; i > 0; i--) {
        if ((typeof window['step' + i]) != "undefined") {
            var currentstep = window["step" + i];
            if (i === CurrentStepIndex) {
                currentParentId = currentstep.ParentSectionID;
            } else if (currentstep.ParentSectionID !== currentParentId) {
                if (prevParentId === -1) {
                    prevParentId = currentstep.ParentSectionID;
                } else if (prevParentId !== currentstep.ParentSectionID) {
                    prevSectionIndex = i + 1;
                    break;
                }
            }
        } else {
            prevSectionIndex = i + 1;
            break;
        }
    }
    GoToStepUsingStepIndex(prevSectionIndex, -1);
};

function IsTrainingComplete() {
    var currentstep,
        i,
        incompleteQuestionInStepIndex;
    if (CompletionCriteriaLogic) {
        for (i = IntroSlidesCount; i < TotalSlidesCount; i++) {
            currentstep = window["step" + i] || null;
            if (currentstep) {
                if (IsStepIncomplete(currentstep)) {
                    return false;
                } else {
                    incompleteQuestionInStepIndex = GetIndexOfIncompleteQuestionInStep(currentstep);
                    if (incompleteQuestionInStepIndex != -1) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function DoNextIncompleteStep() {
    var currentstep,
        i,
        incompleteQuestionInStepIndex;
    if (CompletionCriteriaLogic) {
        for (i = CurrentStepIndex + 1; i < TotalSlidesCount; i++) {
            currentstep = window["step" + i] || null;
            if (currentstep) {
                if (IsStepIncomplete(currentstep)) {
                    GoToStepUsingStepIndex(i, -1);
                    break;
                } else {
                    incompleteQuestionInStepIndex = GetIndexOfIncompleteQuestionInStep(currentstep);
                    if (incompleteQuestionInStepIndex != -1) {
                        GoToStepUsingStepIndex(i, incompleteQuestionInStepIndex);
                        break;
                    }
                }
            }
        }
    }
}

function DoPreviousIncompleteStep() {
    var currentstep,
        i,
        incompleteQuestionInStepIndex;
    if (CompletionCriteriaLogic) {
        for (i = CurrentStepIndex - 1; i > 0; i--) {
            currentstep = window["step" + i] || null;
            if (currentstep) {
                if (IsStepIncomplete(currentstep)) {
                    GoToStepUsingStepIndex(i, -1);
                    break;
                } else {
                    incompleteQuestionInStepIndex = GetIndexOfIncompleteQuestionInStep(currentstep);
                    if (incompleteQuestionInStepIndex != -1) {
                        GoToStepUsingStepIndex(i, incompleteQuestionInStepIndex);
                        break;
                    }
                }
            }
        }
    }
}

function GetIndexOfIncompleteQuestionInStep(currentStepInfo) {
    var incompleteQuestion = -1;
    if (!currentStepInfo.Changed && CompletionCriteriaLogic.StepTypeOfInterest === "Changed" ||
        CompletionCriteriaLogic.StepTypeOfInterest === "Interactive") {
        return -1;
    }
    if (currentStepInfo.Questions) {
        $.each(currentStepInfo.Questions, function (index, value) {
            if (QuesInfoSortedByIndex[value].Score === null) {
                incompleteQuestion = index;
                return false;
            }
        });
    }
    return incompleteQuestion;
}

function IsStepIncomplete(currentStep) {
    if (CompletionCriteriaLogic.StepTypeOfInterest === "Changed" && !currentStep.Changed) {
        return false;
    }
    if (currentStep.Acknowledged != true ||
    (CompletionCriteriaLogic.CheckAtt && !IsAllDocumentComplete(currentStep))) {
        return true;
    }
    return false;
}

function IsAllDocumentComplete(currentstep) {
    //todo: have to add in logic for single attachments; likely elsewhere to mark document as viewed
    var allAttViewed = true;
    if (currentstep.NumberOfStepDocuments > 0) {
        $.each(currentstep.documents, function (i, value) {
            if (value.Viewed !== 'Y') {
                allAttViewed = false;
                return false;
            }
        });
    }
    return allAttViewed;
}

function DoFirstStep() {
    GoToStepUsingStepIndex(0, -1);
}

function DoLastStep() {
    GoToStepUsingStepIndex(TotalSlidesCount-1, -1);
}

function DoNextFlag() {
    var nextFlaggedStep = CurrentStepIndex;
    for (var i = CurrentStepIndex + 1; i < TotalSlidesCount; i++) {
        if ((typeof window['step' + i]) !== "undefined") {
            var currentstep = window["step" + i];
            if (currentstep.Flagged) {
                nextFlaggedStep = i;
                break;
            }
        }
    }
    GoToStepUsingStepIndex(nextFlaggedStep, -1);
}

function DoPreviousFlag() {
    var prevFlaggedStep = CurrentStepIndex;
    for (var i = CurrentStepIndex - 1; i >= 0; i--) {
        if ((typeof window['step' + i]) !== "undefined") {
            var currentstep = window["step" + i];
            if (currentstep.Flagged) {
                prevFlaggedStep = i;
                break;
            }
        }
    }
    GoToStepUsingStepIndex(prevFlaggedStep, -1);
}

function showGlossary(obj, glossaryterm, description) {
    description = "<div style='padding-bottom:5px;padding-top:10px;padding-left:5px;padding-right:10px ;font-size:16px; font-family:Tahoma;color:Blue;font-weight:bold'>" + description + "</div>";
    var tooltip = $find("RadToolTipGlossary");
    tooltip.set_text(description);
    tooltip.set_targetControlID("");
    tooltip.set_targetControlID(obj.id);
    window.setTimeout(function () {
        tooltip.show();
    }, 1);
    //msgScripts = "('" + description + "','OK','Glossary','Information',false,'Something','ERROR')";
    //eval(msgScript + msgScripts);
};

function hideGlossary() {
    var tooltip = $find("RadToolTipGlossary");
    tooltip.hide();
    RadToolTipGlossaryHide(tooltip, null);
};

function RadToolTipGlossaryHide(sender, eventArgs) {
    sender.set_targetControlID("");
};

function ShowMessageNotComplete(message) {
    msgScripts = "('" + message + "','YESNO','Go To Last Step','Question',false,'Something','NOTCOMPLETE')";
    eval(msgScript + msgScripts);
};

function ShowMessageGOTOChanged(message) {
    msgScripts = "('" + message + "','OK','No Step Found','Information',false,'Something','NOSTEPFOUND')";
    eval(msgScript + msgScripts);
};

function ShowMessageExit(message) {
    //	alert("T");
    msgScripts = "('" + message + "','YESNO','Confirm','Question',false,'Something','EXITPROCEDURE')";
    eval(msgScript + msgScripts);
};

function ShowMessageChangeRequest(message) {
    msgScripts = "('" + message + "','YESNO','Confirm','Question',false,'Something','SUBMITCHANGEREQUEST')";
    eval(msgScript + msgScripts);
};

function ShowMessageExitAndSubmitChangeRequest(message) {
    msgScripts = "('" + message + "','YESNO','Confirm','Question',false,'Something','EXITPROCEDURESUBMITCHANGEREQUEST')";
    eval(msgScript + msgScripts);
};

function MsgCancelClicked() {
    var Instance = eval(vEventInstance);
    switch (Instance) {
        case "GETINITSTEP":
            document.all("btnInit").click();
            break;
        case "EXITPROCEDURE":
            isProperExit = true;
            document.all("btnExitProcDelete").click();
            break;
        case "SUBMITCHANGEREQUEST":
            ShowMessageExit("Do you want to save this session?");
            break;
        case "EXITPROCEDURESUBMITCHANGEREQUEST":
            GoToChangeRequest("N");
            break;
    }
};

function MsgOkClicked() {
    var Instance = eval(vEventInstance);
    switch (Instance) {
        case "NOTCOMPLETE":
            //GoToChangeRequest();
            parent.window.close();
            break;
        case "GETINITSTEP":
            document.all("hiddenCurrentStepIDX").value = "0";
            document.all("btnStepChanger").click();
            break;
        case "GETMOCCOMMENT":
            var MocComment = eval(vMsgInputValue);
            document.all("hiddenMOCComment").value = MocComment;
            document.all("btnMOCUpdate").click();
            break;
        case "EXITPROCEDURE":
            document.all("btnExitProcSave").click();

            break;
        case "STARTERROR":
            parent.window.close();
            break;
        case "SUBMITCHANGEREQUEST":
            ShowMessageExitAndSubmitChangeRequest("Do you want to save this session?");
            break;
        case "EXITPROCEDURESUBMITCHANGEREQUEST":
            GoToChangeRequest("Y");
            break;
    }
};

function HideME() {
};

function ClosePrint() {
    oWindowPD.close();
};

function doPrint(IDREF) {
    URL = '../../ProcView/Procedure.aspx?IDRefNo=' + IDREF + '&ToPrint=Y';
    window.open(URL);
};

function hideSettings() {
    try {
        var isDiv = false;
        var objParent = event.srcElement;
        if (objParent.id != "imgSettings") {
            do {
                if (objParent.id == "divSettings") {
                    isDiv = true;
                    break;
                }
                objParent = objParent.offsetParent;
                if (objParent.id == "divSettings") {
                    isDiv = true;
                    break;
                }
            } while (objParent != null);
        } else {
            isDiv = true;
        }
    } catch (x) {
    }
    if (!isDiv) {
        document.all("divSettings").style.display = 'None';
    }
};

function ShowSettings(obj) {
    var pos = findPos(obj);
    document.all("divSettings").style.display = '';
    var top = pos[1] - document.all("divSettings").offsetHeight + 20;
    document.all("divSettings").style.top = top + "px";
    document.all("divSettings").style.left = pos[0] + "px";
};

var hasSideBar = false;

function BlinkWCN(objID) {
    hasSideBar = true;
    obj = document.getElementById(objID);
    if (obj != null) {
        if (obj.style.visibility == '') {
            obj.style.visibility = 'hidden';
        } else {
            obj.style.visibility = '';
        }
        setTimeout(function () {
            BlinkWCN(objID);
        }, 1000);
    }
};

function EndCBT() {
    oWindowCR.close();
    var mClose = document.all("hiddenClose").value;
    var url = document.all("hiddenEndURL").value;
    if (mClose == "Y") {
        parent.window.close();
    } else {
        location.href = url;
    }
};

function CloseChangeRequest() {
    oWindowCR.close();
};

function GoToChangeRequest() {
    GoToChangeRequest("N");
};

function GoToChangeRequest(mDelete) {
    height = document.body.offsetHeight;
    heightForWindow = height - 25;
    var mClose = document.all("hiddenClose").value;
    var num = Math.random();
    URL = "ChangeRequest.aspx?InstanceID=" + GInstanceID + "&TrainingID=" + GTrainingID + "&r=" + num + "&Close=" + mClose + "&Delete=" + mDelete;
    var manager = GetRadWindowManager();
    oWindowCR = manager.GetWindowByName("WindowWithoutTitleBar");
    oWindowCR.setUrl(URL);
    oWindowCR.SetSize(document.body.offsetWidth + 22, heightForWindow);
    oWindowCR.show();
    oWindowCR.set_title("Change Request");
    oWindowCR.moveTo(-10, -10);
};

var GInstanceID;
//var CurrentFontSize = 12;
var Volume = 75;
var oWindowM;
var FontSizeSet = false;

function ShowStepToolTipJOb() {
};

function ShowStepToolTip() {
};

function CloseProcedureDetails() {
    oWindowPD.close();
};

var oWindowPD;

function ShowProcedureDetails(InstanceID, ShowAttachment, Type) {
    //todo: Show Procedure Details logic
    //var num = Math.random();
    //height = document.all("trMainContent").offsetHeight;
    //heightForWindow = height - 100;
    //URL = "PropertiesTab.aspx?InstanceID=" + InstanceID + "&Type=" + Type + "&TrainingID=" + GTrainingID + "&ShowAttachment=" + ShowAttachment + "&r=" + num + "&height=" + heightForWindow;
    //var manager = GetRadWindowManager();
    //oWindowPD = manager.GetWindowByName("ModalWindowWithoutTitleBar");
    //oWindowPD.setUrl(URL);
    //oWindowPD.show();
    //oWindowPD.set_title("Procedure Details");
    //var top = document.all("trMainContent").offsetTop;
    //oWindowPD.SetSize(tblMainWidth, height);
    //oWindowPD.moveTo(0, top);
    //StopReading();
};

function showMoc(val) {
    bShowMOCBtn = true;
    val = "true";
    if (val.toUpperCase() == "TRUE") {
        bShowMOCBtn = true;
        document.all("btnMOC").style.visibility = '';
    } else {
        bShowMOCBtn = false;
        document.all("btnMOC").style.visibility = 'hidden';
    }
};

function showAcknowledgeBtn(val) {
    if (val.toUpperCase() == "TRUE") {
        bShowAcknowledgeBtn = true;
        document.all("divAcknowledge").style.visibility = 'hidden';
    } else {
        bShowAcknowledgeBtn = false;
        document.all("divAcknowledge").style.visibility = 'hidden';
    }
};

function doInfoClick(obj) {
    //todo: fix logic
    //var num = Math.random();
    //height = document.all("trMainContent").offsetHeight;
    //var equipHeight = height - 100;
    //var equipWidth = tblMainWidth - 50;
    //URL = "PropertiesTab.aspx?InstanceID=" + GInstanceID + "&StepID=" + document.all("hiddenCurrentStepIDX").value + "&Type=S&height=" + equipHeight + "&width=" + equipWidth + "&r=" + num;

    //heightForWindow = height - 100;
    //var manager = GetRadWindowManager();
    //oWindowPD = manager.GetWindowByName("ModalWindowWithoutTitleBar");
    //oWindowPD.setUrl(URL);
    //oWindowPD.show();
    //oWindowPD.set_title("Procedure Details");
    //var top = document.all("trMainContent").offsetTop;
    //oWindowPD.SetSize(tblMainWidth, height);
    //oWindowPD.moveTo(0, top);
    //StopReading();
};

function doContextMenubtnPrevious(obj) {
    var top = obj.offsetTop;
    var left = obj.offsetLeft + 20;
    document.all("divPreviousRightClick").style.top = top + "px";
    document.all("divPreviousRightClick").style.left = left + "px";
    document.all("divPreviousRightClick").style.display = 'none';
    return false;
};

function GetMOComment() {
    var w = 480, h = 340;

    w = document.body.offsetWidth;
    h = document.body.offsetHeight;

    var popW = 440, popH = 280; //change this to match your RadWindow Width and Height

    var leftPos = (w - popW) / 2;
    var topPos = (h - popH) / 2;

    var num = Math.random();
    URL = "Comments.aspx?InstanceID=" + GInstanceID + "&TrainingID=" + GTrainingID + "&r=" + num;
    var manager = GetRadWindowManager();
    oWindowMOC = manager.GetWindowByName("ModalWindowWithoutTitleBar");
    oWindowMOC.setUrl(URL);
    oWindowMOC.show();
    oWindowMOC.SetSize(popW, popH);
    oWindowMOC.MoveTo(leftPos, topPos);
    StopReading();
};

function CloseMOComment(exist) {
    oWindowMOC.close();
    if (exist.toUpperCase() == "TRUE") {
        document.all("btnMOC").src = "images/button-moc-on.png";
    }
};

function ReadCurrentContent() {
    Speak(CurrentSpeechContent);
}

function Speak(speechContent) {
    try {
        document.all("SpeechControl").Speak(speechContent, Volume);
    } catch (e) {
        if (e.message === SPEECH_ACTIVEX_ERROR) {
            HandleActiveXSecuritySpeechControlError();
        } else {
            throw e;
        }
    }
};

function HandleActiveXSecuritySpeechControlError() {
    var disableSpeechChkbx = $("#chkDisableSpeech");
    if (!disableSpeechChkbx.prop("checked")) {
        disableSpeechChkbx.prop("checked", true);
        chkDisableSpeechChanged(disableSpeechChkbx);
        alert("Speech has been disabled. Please enable ActiveX to enable speech.");
    }
}

function StopReading() {
    try {
        document.all("SpeechControl").StopReading();
    } catch (e) {
        if (e.message === SPEECH_ACTIVEX_ERROR) {
            HandleActiveXSecuritySpeechControlError();
        } else {
            throw e;
        }
    }
};

function BtnReplayClick() {
    StopReading();
    Speak(CurrentSpeechContent);
}

function IsSpeechComplete() {
    try {
        var speechStatus = document.all("SpeechControl").Getstatus();
    } catch (e) {
        if (e.message == SPEECH_ACTIVEX_ERROR) {
            HandleActiveXSecuritySpeechControlError();
            return true;
        } else {
            throw e;
        }
    }
    if (speechStatus == 1) {
        return true;
    }
    return false;
};

function SliderVolumeHandleClientValueChange(sender) {
    try {
        Volume = sender.value;
        var speechControl = document.all("SpeechControl");
        if (speechControl.GetStatus() !== "NA") {
            speechControl.ChangeVolume(Volume);
        }
    } catch (e) {
        if (e.message == SPEECH_ACTIVEX_ERROR) {
            HandleActiveXSecuritySpeechControlError();
        } else {
            throw e;
        }
    }
};

function ShowAttachmentFile(strUrl, strUncPath, attachmentId) {
    var num = Math.random();
    document.all("ifrDownload").src = 'downloadfile.aspx?URL=' + strUrl + '&UNC=' + strUncPath + "&r=" + num;
    LogAttachmentViewed(attachmentId);
};

function ShowAttachmentFromStep(attachmentId) {
    ShowAttachment(attachmentId);
    SetAttachmentStyle(attachmentId, CurrentStepIndex);
};

function SetAttachmentStyle(attachmentId, stepIndex) {
    if (stepIndex < IntroSlidesCount) {
        $('#spanViewed' + attachmentId).text("Yes");
    } else {
        $("#tcMainAttachment" + attachmentId + stepIndex).removeClass("tcMainAttachmentClass");
        $("#tblAttachment" + attachmentId + stepIndex).removeClass("tblAttachmentClass");
        $("#tcAttImage" + attachmentId + stepIndex).removeClass("StyleClassForImageAtt");
        $("#SpanAttachmentName" + attachmentId + stepIndex).removeClass("SpanAttachmentNameClass");
        $("#tcMainAttachment" + attachmentId + stepIndex).addClass("tcMainAttachmentClassViewed");
        $("#tblAttachment" + attachmentId + stepIndex).addClass("tblAttachmentClassViewed");
        $("#tcAttImage" + attachmentId + stepIndex).addClass("StyleClassForImageAttViewed");
        $("#SpanAttachmentName" + attachmentId + stepIndex).addClass("SpanAttachmentNameClassViewed");
        $("#ImgViewed" + attachmentId + stepIndex).css("visibility", "visible");
    }
};

function getCurrentStepAttachment(attachmentId) {
    var attachment,
        i;
    if (CurrentStepIndex == 1) {
        for (i = 0; i < ProcedureDocuments.length; i++) {
            if (ProcedureDocuments[i].ID == attachmentId) {
                attachment = ProcedureDocuments[i];
                break;
            }
        }
    } else {
        var currentStep = eval("step" + CurrentStepIndex);
        for (i = 0; i < currentStep.documents.length; i++) {
            if (currentStep.documents[i].ID == attachmentId) {
                attachment = currentStep.documents[i];
                break;
            }
        }
    }
    return attachment;
}


function getContentHeight() {
    var height = document.all("cbtStepContentS").offsetHeight;
    return height;
};

function ShowEffectiveChange() {
    StopReading();

    var height = document.all("cbtStepContentS").offsetHeight;
    height = VHeightContent + 200;
    var theight = height - 157;

    //var height = document.all("cbtStepContentS").offsetHeight;
    //	height = VHeightContent + 120;
    //	var theight = height - 90;
    var num = Math.random();
    URL = "EffectiveChanges.aspx?InstanceID=" + GInstanceID + "&height=" + theight + "&rand=" + num;
    var manager = GetRadWindowManager();
    oWindowM = manager.GetWindowByName("WindowWithoutTitleBar");
    oWindowM.setUrl(URL);

    oWindowM.SetSize(tblMainWidth, height);
    oWindowM.show();
    var top = document.all("trMainContent").offsetTop;
    oWindowM.moveTo(-10, -10);
};

var hasAttachment = false;

function ShowHideAttachment(bShow) {
    var attachmentSection = $('.MainTableAttachmentClass');
    if (attachmentSection) {
        if (bShow) {
            hasAttachment = true;
            attachmentSection.css('display', '');
            //todo: need to implement logic for attachment scroller
            //var wrapperDiv = document.getElementById('Attachment_wrapper');
            //var contentDiv = document.getElementById('Attachment_content');
            //if (contentDiv.scrollWidth > wrapperDiv.offsetWidth) {
            //    document.all('divAttachmentSlider').style.visibility = '';
            //} else {
            //    document.all('divAttachmentSlider').style.visibility = 'hidden';
            //}
            try {
                WCNSetUP();
            } catch (e) {
            }
        } else {
            hasAttachment = false;
            attachmentSection.css('display', 'none');
        }
    }
};

function DoMouseOver(obj, url) {
    obj.src = url;
};

function DoMouseOut(obj, url) {
    obj.src = url;
};

function playBtnDoMouseOver(playBtn) {
    if (IsAutoPlay) {
        playBtn.src = "images/pause-on.png";
    } else {
        playBtn.src = "images/button-play-on.png";
    }
}

function playBtnDoMouseOut(playBtn) {
    if (IsAutoPlay) {
        playBtn.src = "images/pause.png";
    } else {
        playBtn.src = "images/button-play.png";
    }
}

function OpenProcedureDetails() {
    //todo: fix procedure data link
    //ShowProcedureDetails(GInstanceID, false, 'P');
};

function doProcAttachmentClick() {
};

function HideEffectiveChange() {
    oWindowM.Close();
};

var SliderClientID;
var objSliderProgress;
var sliderMaxVal;

function clientLoaded(sender, eventArgs) {
    //objSliderProgress = sender;
};

function ShowSharedProcAttachment(url) {
    window.open(url);
    return false;
};

function DoZoom() {
    var objectsToZoom = document.all("divZoomStepHTML" + CurrentStepIndex);
    if (objectsToZoom != null && objectsToZoom.style != null) {
        objectsToZoom.style.fontSize = CurrentZoom + "pt";
    }
};

function SliderSlideIntervalHandleClientValueChange(sender, eventArgs) {
    var speed = sender.get_value();
};

function SliderTextHandleClientValueChange(sender, eventArgs) {
    CurrentZoom = sender.value;
    DoZoom();
};

function AdjustPadding(HasTable) {
    hasTable = HasTable;
};

/*
function showVolumeSlider(obj)
{
var pos = findPos(obj);
var objSliderDiv = document.all("divSliderVolume");
objSliderDiv.style.display = '';
objSliderDiv.style.position = 'absolute';
objSliderDiv.style.left = pos[0] - 40;
objSliderDiv.style.top = pos[1] - 40;
}
function hideVolumeSlider()
{

switch (event.srcElement.id)
{
case "RadSliderWrapper_RadSliderVolume":
case "RadSliderTrack_RadSliderVolume":
case "RadSliderSelected_RadSliderVolume":
case "btnSpeechControl":
case "btnPlaySpeed":
return;
break;
default:
var objSliderDiv = document.all("divSliderVolume");
objSliderDiv.style.display = 'none';
}
}
function hidePlaySpeedSlider()
{

switch (event.srcElement.id)
{
case "RadSliderWrapper_radSliderSlideSpeed":
case "RadSliderTrack_radSliderSlideSpeed":
case "RadSliderSelected_radSliderSlideSpeed":
case "btnSpeechControl":
case "btnFontSize":
case "btnPlaySpeed":
return;
break;
default:
var objSliderDiv = document.all("divPlaySpeed");
objSliderDiv.style.display = 'none';
}
}
function hideSliders()
{
hideTextSlider();
hideVolumeSlider();
hidePlaySpeedSlider();
}

function showTextSlider(obj)
{
var pos = findPos(obj);
var objSliderDiv = document.all("divSliderText");
objSliderDiv.style.display = '';
objSliderDiv.style.position = 'absolute';
objSliderDiv.style.left = pos[0] - 40;
objSliderDiv.style.top = pos[1] - 40;

}
function hideTextSlider()
{
switch (event.srcElement.id)
{
case "RadSliderSelected_RadSliderText":
case "RadSliderWrapper_RadSliderText":
case "RadSliderTrack_RadSliderText":
case "btnFontSize":
case "btnPlaySpeed":
return;
break;

default:
var objSliderDiv = document.all("divSliderText");
objSliderDiv.style.display = 'none';
}
}*/
var initialValue2;

function SliderAttachmentHandleClientValueChange(sender, eventArgs) {
    var wrapperDiv = document.getElementById('Attachment_wrapper');
    var contentDiv = document.getElementById('Attachment_content');
    var oldValue = (eventArgs) ? eventArgs.get_oldValue() : sender.get_minimumValue();
    var change = sender.get_value() - oldValue;
    var contentDivWidth = contentDiv.scrollWidth - wrapperDiv.offsetWidth;
    var calculatedChangeStep = contentDivWidth / ((sender.get_maximumValue() - sender.get_minimumValue()) / sender.get_value());
    initialValue2 = initialValue2 - change * calculatedChangeStep;
    if (sender.get_value() == sender.get_minimumValue()) {
        contentDiv.style.left = 0 + 'px';
        initialValue2 = sender.get_minimumValue();
    } else {
        contentDiv.style.left = initialValue2 + 'px';
    }
};

function SliderAttachmentHandleClientLoaded(sender, eventArgs) {
    initialValue2 = sender.get_minimumValue();
    SliderAttachmentHandleClientValueChange(sender, null);
};

function alertSize() {
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
};
var InBetweenSlideWaitTimerId, RecursivePlayTimerId;
var IsAutoPlay = false;
function btnPlayClick(btnPlay) {
    if (IsAutoPlay) {
        btnPlay.src = "images/button-play-on.png";
        StopAutoPlay();
    } else {
        btnPlay.src = "images/pause-on.png";
        DoNext();
        AutoPlay();
    }
};

function StopAutoPlay() {
    IsAutoPlay = false;
    try {
        document.all("SpeechControl").StopReading();
    } catch (e) {
        if (e.message == SPEECH_ACTIVEX_ERROR) {
            HandleActiveXSecuritySpeechControlError();
        } else {
            throw e;
        }
    }
    if (RecursivePlayTimerId) {
        clearTimeout(RecursivePlayTimerId);
    }
    if (InBetweenSlideWaitTimerId) {
        clearTimeout(InBetweenSlideWaitTimerId);
    }
}

function ShowSliderSpeed(obj) {
    var pos = findPos(obj);
    var objSliderDiv = document.all("divPlaySpeed");
    objSliderDiv.style.display = '';
    objSliderDiv.style.position = 'absolute';
    objSliderDiv.style.left = pos[0] - 40;
    objSliderDiv.style.top = pos[1] - 40;
};

var AutoPlayTimeOnSlideMs = 0;
var AUTOPLAY_MIN_MS_ON_SLIDE = 3000; //At Normal Speed (Speed Slider Value 1)
var AUTOPLAY_MS_BETWEEN_SLIDE_W_DIALOG = 1000;

function AutoPlay() {
    var waitTimeMs,
        speedFactor;
    IsAutoPlay = true;
    if ($("#chkDisableSpeech").prop("checked")) {
        speedFactor = GetSpeedFactor();
        waitTimeMs = GetSilentReadTime(speedFactor);
        //console.log(waitTimeMs + " " + CurrentStepIndex + " Initial");
        if (waitTimeMs < AUTOPLAY_MIN_MS_ON_SLIDE) {
            waitTimeMs = AUTOPLAY_MIN_MS_ON_SLIDE;
        }
        //if (InBetweenSlideWaitTimerId) {
        //    clearTimeout(InBetweenSlideWaitTimerId);
        //}
        InBetweenSlideWaitTimerId = setTimeout(function () { DoNext(); }, waitTimeMs);
        //console.log(waitTimeMs + " " + CurrentStepIndex);
    } else {
        var speakingDone = IsSpeechComplete();
        //console.log("speaking done: " + speakingDone);
        if (speakingDone && AutoPlayTimeOnSlideMs >= AUTOPLAY_MIN_MS_ON_SLIDE - AUTOPLAY_MS_BETWEEN_SLIDE_W_DIALOG) {
            //console.log(AUTOPLAY_MS_BETWEEN_SLIDE_W_DIALOG+" " + CurrentStepIndex + " " + CurrentQuestionIndexInStep);
            InBetweenSlideWaitTimerId = setTimeout(function () { DoNext(); }, AUTOPLAY_MS_BETWEEN_SLIDE_W_DIALOG);
        } else {
            AutoPlayTimeOnSlideMs += 500;
            //console.log("500 " + CurrentStepIndex + " " + CurrentQuestionIndexInStep + " " + AutoPlayTimeOnSlideMs/1000);
            RecursivePlayTimerId = setTimeout(function () { AutoPlay(); }, 500);
        }
    }
};

function GetSpeedFactor() {
    var speedFactor,
        speedSliderValue = $("#slideSpeedSlider").data("kendoSlider").value();
    switch (speedSliderValue) {
        case 0:
            speedFactor = 1.25;
            break;
        case 1:
            speedFactor = 1;
            break;
        case 2:
            speedFactor = .75;
            break;
        case 3:
            speedFactor = .5;
            break;
        default:
            throw "Invalid Speed Setting!";
    }
    return speedFactor;
}

function GetSilentReadTime(speedFactor) {
    var waitTimeMs,
        words;
    words = CurrentSpeechContent.split(' ').length;
    waitTimeMs = words / AVERAGE_WPM * 60 * speedFactor * 1000;
    return waitTimeMs;
}

var ATRTimerID = null;
function CallOnCountDown(secs, prname) {
    if (secs > 0) {
        secs--;
        ATRTimerID = setTimeout("CallOnCountDown(" + secs + ",\"" + prname + "\")", 1000);
    } else {
        if (secs == 0) {
            clearTimeout(ATRTimerID);
            eval(prname);
        }
        ATRTimerID = setTimeout("CallOnCountDown(-1)", 1000);
    }
}

var TimerTurnedOff = false;

function showWarningCautionNote(stepIndex) {
    GoToStepUsingStepIndex(stepIndex, -1);
    $("#btnWCNReturnToStepspanMain" + stepIndex).show();
}

function WCNClose(IDS) {
    document.all("hiddenWCNAcknowledge").value = IDS;
    document.all("btnCWNAcknowledge").click();
    oWindowM.Close();
    if (TimerTurnedOff) {
        btnPlayClick();
    }
};

var msg = "<center><IMG  src='../../images/please-wait.gif' border=0 ><center>";

function OnRequestStart(sender, args) {
    //var obj = document.getElementById("imgPleaseWait");
    //obj.style.display = '';
    //obj.src = 'images/please-wait.gif'
    hideGlossary();
    StopReading();
    document.body.style.cursor = "Wait";
    FontSizeSet = false;
};

var WidthTableSideBar = 0;
var WidthTableNoSideBar = 0;
var WidthSideBar = 0;
var WidthNoSideBar = 0;

function OnResponseEnd(sender, args) {
    if (args.get_eventTarget() == "btnInitialButton") {
        // body_onload();
    } else {
        if (hasTable) {
            document.all("tdStepHTML").className = 'tdStepHTMWithTable';
        } else {
            if (hasSideBar) {
                document.all("tdStepHTML").className = 'tdStepHTMNoTableWithSidebar';
            } else {
                document.all("tdStepHTML").className = 'tdStepHTMNoTable';
            }
        }

        if (WidthTableSideBar == 0) {
            WidthTableSideBar = document.all("tdStepHTML").offsetWidth - 30;
        }
        if (WidthTableNoSideBar == 0) {
            WidthTableNoSideBar = document.all("tdStepHTML").offsetWidth + 70;
        }
        if (WidthSideBar == 0) {
            WidthSideBar = document.all("tdStepHTML").offsetWidth - 100;
        }
        if (WidthNoSideBar == 0) {
            WidthNoSideBar = document.all("tdStepHTML").offsetWidth;
        }

        ShowMessageGOTOStep = false;
        try {
            if (hasTable) {
                document.all("divStepHTM").style.width = WidthTableSideBar;
                if (hasSideBar) {
                } else {
                    document.all("divStepHTM").style.width = WidthTableNoSideBar;
                }
            } else {
                if (hasSideBar) {
                    document.all("divStepHTM").style.width = WidthSideBar;
                } else {
                    document.all("divStepHTM").style.width = WidthNoSideBar;
                }
            }
        } catch (exception) {
        }

        if (document.all("tdSideBar").innerHTML == "") {
            document.all("tdParentSideBar").style.display = "none";
            document.all("tdStepHTML").width = "100%";
        } else {
            //document.all("tdParentSideBar").style.display = "none";
            document.all("tdParentSideBar").style.display = "";
            //alert(document.all("tdStepHTML").width);
        }

        hasSideBar = false;
        var tempimgType = imgType;
        //SetFontSize();
    }
    setTimeout("SetHeight()", 500);
    document.body.style.cursor = "Default";
    try {
        WCNSetUP();
    } catch (e) {
    }
};

var InitHeight = 0;

function ShowHideNav() {
    if (InitHeight == 0) {
        InitHeight = (document.all("trMainContent").offsetHeight - 100);
    }
    if (document.all("trNavigationControls").style.display == "none") {
        document.all("trNavigationControls").style.display = "";
        //document.all("trMainContent").height = InitHeight - 64;
    } else {
        //document.all("trMainContent").style.height = InitHeight + 64;
        document.all("trNavigationControls").style.display = "none";
    }
};

function PreviousContextClick(obj, e) {
    var menu = $find("contextShowPreviousMenu");
    var left = getAbsoluteLeft(obj);
    var top = getAbsoluteTop(obj);
    top = top - (menu.get_items().get_count() / 2) * 30;
    //	alert(top + " Left=" + left);
    menu.showAt(left, top);
    $telerik.cancelRawEvent(e);
    e.cancelBubble = true;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
};

function NextContextClick(obj, e) {
    var menu = $find("contextShowNextMenu");
    var left = getAbsoluteLeft(obj) - 120;
    var top = getAbsoluteTop(obj);
    menu.showAt(left, top - (menu.get_items().get_count() / 2) * 30);
    $telerik.cancelRawEvent(e);
};

var imgType = "";
var imgid = "";

function reziseStepAttachment(type, id) {
    imgType = type;
    imgid = id;
    if (document.all("spanStepHTML") != null) {
        var maxHeight = document.all("divStepHTM").offsetHeight - document.all("spanStepHTML").offsetHeight - 70;
        if (maxHeight < 96) {
            maxHeight = 96;
        }
    }
    try {
        if (type == "I") {
            //alert(document.all("imgSingleAttachment"));
            if (document.all("imgSingleAttachment") != null) {
                //alert(document.all("imgSingleAttachment").src);
                var dimension = ResizeImage(document.all("imgSingleAttachment").src, 800, maxHeight);
                //alert(dimension[1]);
                document.all("imgSingleAttachment").height = dimension[1];
                document.all("imgSingleAttachment").width = dimension[0];
                if (dimension[1] < maxHeight && dimension[0] < 800) {
                    document.all("imgSingleAttachment").removeAttribute("onClick");
                    document.all("imgSingleAttachment").style.cursor = "default";
                }
            }
        } else {
            if (document.all(id) != null) {
                //document.all(id).width = '100%';
                if (document.all(id).height != "") {
                    if (document.all(id).height > maxHeight) {
                        document.all(id).height = maxHeight;
                    }
                }
            }
        }
    } catch (exception) {
    }
};

function doKeyPress(e) {
    switch (e.keyCode) {
        case 32:
        case 13:
        case 39:
            document.all("btnNext").click();

            break;
        case 8:
        case 37:
            document.all("btnPrevious").click();

            break;
    }
};

function doMouseClickOnBody(e) {
    //document.all("btnNext").click();
};

function GoToStepIntro(value) {
    document.all("hiddenStepIndex").value = value;
    document.all("btnStepChangerForIntro").click();
};

function ContextMenuItemClicked(sender, args) {
    var itemValue = args.get_item().get_value();
    switch (itemValue) {
        case "EC":
            //document.all("btnShowEffectiveChangesScreen").click();
            ShowEffectiveChange();
            break;
        case "B":
            document.all("btnPrevious").click();
            break;
        case "N":
            document.all("btnNext").click();
            break;
        case "P":
            document.all("btnGoToPreviousSection").click();
            break;
        case "NS":
            document.all("btnGoToNextSection").click();
            break;
        case "PCS":
            document.all("btnGoToPreviousChangedStep").click();
            break;
        case "NCS":
            document.all("btnGoToNextChangedStep").click();
            break;
        case "S":
            document.all("btnGoToBeggining").click();
            break;
        case "E":
            document.all("btnGoToEnd").click();
            break;
        case "PFS":
            document.all("btnGoToPreviousFlaggedStep").click();
            break;
        case "NFS":
            document.all("btnGoToNextFlaggedStep").click();
            break;
        case "EN":

        case "NP":
            document.all("btnSwitchNavigation").click();
            break;
        case "PIS":
            document.all("btnGoToPreviousIncompleteStep").click();
            break;
        case "NIS":
            document.all("btnGoToNextIncompleteStep").click();
            break;
    }
};

function doUnderLine(obj) {
    obj.className = 'propLabelWhiteSmallUnderline';
};

function undoUnderLine(obj) {
    obj.className = 'propLabelLightgreySmall';
};

function GoFromWcnToStep() {
    try {
        var stepInfo,
            nextStep = GetReturnWcnNextStep(CurrentStepIndex);
        while (true) {
            stepInfo = window["step" + nextStep.stepIndex];
            if (!stepInfo.IsWarning && !stepInfo.IsCaution && !stepInfo.IsNote) {
                GoToStepUsingStepIndex(nextStep.stepIndex, -1);
                break;
            } else {
                nextStep = GetReturnWcnNextStep(nextStep.stepIndex);
            }
        }
    } catch (err) {
        alert("An error occurred during navigation: " + err);
    }
}

function GetReturnWcnNextStep(currentStepIndex) {
    if (NOTE_PAIRING_MODE == NotePairingModeEnum.WithFollowingStep) {
        return GetNextStepIndex(currentStepIndex, -1, false);
    } else if (NOTE_PAIRING_MODE == NotePairingModeEnum.WithPreviousStep) {
        return GetPreviousStepIndex(currentStepIndex, -1, false);
    } else {
        throw "Invalid Warning Caution Note Pairing Mode!";
    }
}

function chkDisableSpeechChanged(chkbxDisableSpeech) {
    if (chkbxDisableSpeech.checked) {
        try {
            document.all("SpeechControl").StopReading();
        } catch (e) {
            if (e.message == SPEECH_ACTIVEX_ERROR) {
                HandleActiveXSecuritySpeechControlError();
            } else {
                throw e;
            }
        }
    }
}

function LaunchDocument(docid, viewedId) {
    var i;
    for (i = 0; i < documents.length; i++) {
        if (documents[i][0] == docid) {
            ShowAttachment(docid);
            break;
        }
    }
    for (i = 0; i < ProcedureDocuments.length; i++) {
        if (ProcedureDocuments[i].ID == docid) {
            ProcedureDocuments[i].Viewed = "Y";
            break;
        }
    }
    $("#" + viewedId).text("Yes");
};

function ResizeWindow() {
    var contentHeight = window.innerHeight - ($("#divCBTHeader0").height() + $("#divFooter").height());
    if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6) { //Firefox
        //Allow
    } else if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15) { //Chrome
        contentHeight = contentHeight - 60;
    } else if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Version') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Version') + 8).split(' ')[0]) >= 5) { //Safari
        //Allow
    } else {
        contentHeight = contentHeight - 11;
    }

    $("#divStepContent").css("height", contentHeight);
    VHeightContent = contentHeight - 170;
    divStepHTMHeightWithAttachment = VHeightContent;
    divStepHTMHeightWithoutAttachment = contentHeight;
}

$(document).ready(function () {
    //alert($("#divCBTHeader0").height());
    //alert($("#divFooter").height());
    var contentWidth = document.all("divStepContent").offsetWidth;
    contentWidth = contentWidth - 100;
    for (var i = IntroSlidesCount; i < TotalSlidesCount; i++) {
        var StepContents = document.all("divZoomStepHTML" + i);
        //$(StepContents).width(contentWidth-100);
        //$(StepContents).height(ContentHeight);
    }

    //var ObjectsToZoom = $("#spanStepHTML");
    /*if (ObjectsToZoom != null) {
if (ObjectsToZoom.length > 1) {
for (var i = 0; i < ObjectsToZoom.length; i++) {
ObjectsToZoom[i].style.height = divStepHTMHeightWithoutAttachment;
ObjectsToZoom[i].style.width = document.all("tdStepHTMNoTable")[i].style.offsetWidth;
}
} else {
ObjectsToZoom.style.width = document.all("tdStepHTMNoTable").style.offsetWidth;
}
}*/
    //document.all("divStepHTM").style.height = VHeightContent - 184;
    //SetHeight();
    //callInitButton();

    //doLoad();

    // $("#ifrDetail").css("height", VHeightContent);
    //tblMainWidth = $(window).width() + 30;
    //tblMainHeight = VHeightContent + 30;
    $("#divBtnExit").bind('selectstart', function () {
        return false;
    });
    $("#btnProcedurePropertiesspanMain").bind('selectstart', function () {
        return false;
    });
    DoZoom();
});

function btnExitCBTbtnClick() {
    var sd = window.parent,
        scoreInfo;
    if (IsTrainingComplete()) {
        scoreInfo = GetCbtScore();
        try {
            sd.SetReachedEnd();
            sd.SetScore(scoreInfo.pointsEarned, scoreInfo.totalPoints, 0);
            sd.ConcedeControl();
        } catch (e) {
            alert("Not in SCORM");
        }
    } else {
        var diag = confirm("You have not completed all required training. Are you sure you want to exit? Your progress will be lost. ");
        if (diag) {
            try {
                sd.ConcedeControl();
            } catch (e) {
                alert('Not In SCORM');
            }
        }
    }
}

function GetCbtScore() {
    var i,
        quesInfo,
        stepInfo,
        pointsEarned = 0,
        totalPoints = 0;
    if (CompletionCriteriaLogic.StepTypeOfInterest === "Interactive") {
        for (i = 0; i < QuesInfoSortedByIndex.length; i++) {
            quesInfo = QuesInfoSortedByIndex[i];
            if (quesInfo.PointsEarned !== null && quesInfo.PointsPossible !== null) {
                if (CompletionCriteriaLogic.StepTypeOfInterest === "Changed") {
                    stepInfo = GetStepInfoFromQuesIndex(i);
                    if (stepInfo.Changed !== true) {
                        break;
                    }
                }
                pointsEarned += quesInfo.PointsEarned;
                totalPoints += quesInfo.PointsPossible;
            }
        }
    }
    return {
        pointsEarned: pointsEarned,
        totalPoints: totalPoints
    }
}

function GetStepInfoFromQuesIndex(quesIndex) {
    var i,
        stepInfo;
    for (i = IntroSlidesCount; i < TotalSlidesCount; i++) {
        stepInfo = window["step" + i];
        if ($.inArray(quesIndex, stepInfo.Questions) > -1) {
            return stepInfo;
        }
    }
    return null;
}

function showhideNavigationBar() {
    //todo: fix show hide logic
    //if (document.all("trMainStepStatusControls").style.display == 'none') {
    //    document.all("trMainStepStatusControls").style.display = "";
    //    document.all("trShowHideBar").style.display = "none";
    //} else {
    //    document.all("trMainStepStatusControls").style.display = "none";
    //    document.all("trShowHideBar").style.display = "";
    //}
    //SetHeight();
};

var WidthSetForStatusBar = false;
var tdDivStepStatusWidth = 0;
var tdStepStatusAttachment_WrapperWidth = 0;

function SetHeight() {
    var divStepHtm = document.all("divStepHTM");
    if (divStepHtm) {
        if (hasAttachment) {
            if (document.all("trMainStepStatusControls").style.display == 'none') {
                divStepHtm.style.height = VHeightContent - 177;
            } else {
                divStepHtm.style.height = VHeightContent - 184;
            }
        } else {
            if (document.all("trMainStepStatusControls").style.display == 'none') {
                divStepHtm.style.height = VHeightContent - 2;
            } else {
                divStepHtm.style.height = VHeightContent - 37;
            }
        }
    }
    if (document.all("trMainStepStatusControls").style.display == 'none') {
        // alert("trMainStepStatusControls display=none");
        var heightToDeduct = 35;
        document.all("tblInnerContent" + CurrentStepIndex).style.height = VHeightContent + heightToDeduct;
        //document.all("cbtStepContentS").style.height = VHeightContent + heightToDeduct;
        //document.all("divCBTFrameandStep").style.height = VHeightContent + heightToDeduct;
        //document.all("trAllContent").style.height = VHeightContent + heightToDeduct;
        //document.all("tblContent").style.height = VHeightContent + heightToDeduct;
        //document.all("dvMainContentTblWrap").style.height = VHeightContent + heightToDeduct;
        document.all("tdMainContent").style.height = VHeightContent + heightToDeduct;
        document.all("trMainContent").style.height = VHeightContent + heightToDeduct;
    } else {
        // alert("trMainStepStatusControls display=NOT none");
        document.all("tblInnerContent" + CurrentStepIndex).style.height = VHeightContent - 37;
        //document.all("cbtStepContentS").style.height = VHeightContent - 13;
        //document.all("divCBTFrameandStep").style.height = VHeightContent + 3;
        //document.all("trAllContent").style.height = VHeightContent + 3;
        //document.all("tblContent").style.height = VHeightContent + 3;
        //document.all("dvMainContentTblWrap").style.height = VHeightContent + 3;
        document.all("tdMainContent").style.height = VHeightContent + 3;
        document.all("trMainContent").style.height = VHeightContent + 3;
        // alert(document.all("cbtStepContentS").style.height);
    }
    VHeightContent = VHeightContent - 0;
    var IframeHeight = VHeightContent;
    if (document.all("trMainStepStatusControls").style.display == 'none') {
        IframeHeight = VHeightContent + 35;
    } else {
        IframeHeight = VHeightContent;
    }
    //document.all("ifrDetail").style.height = IframeHeight;
    //alert("IframeHeight"+IframeHeight);
    reziseStepAttachment(imgType, imgid);
    //if (!WidthSetForStatusBar) {
    var statusbarWidth = document.all("tdStepStatus").offsetWidth;
    //alert(statusbarWidth);
    if (statusbarWidth != 0) {
        //	alert("setting");
        if (tdDivStepStatusWidth == 0) {
            tdDivStepStatusWidth = statusbarWidth - 2;
            tdStepStatusAttachment_WrapperWidth = tdDivStepStatusWidth - 1;
        }
        //if (document.all("hiddentdDivStepStatusWidth").value == "") {
        //    document.all("hiddentdDivStepStatusWidth").value = tdDivStepStatusWidth + "px";
        //    document.all("hiddentdStepStatusAttachment_WrapperWidth").value = tdStepStatusAttachment_WrapperWidth + "px";
        //}
        //document.all("tdStepStatusAttachment_Wrapper").style.cssText = 'width:' + statusbarWidth + ' !important';
        //document.all("tdStepStatusAttachment_Wrapper").setAttribute("style","width:"+ statusbarWidth+ " !important")
        //alert(tdStepStatusAttachment_WrapperWidth);
        //WidthSetForStatusBar = true;
    }
    //var wrapperDiv = document.getElementById('tdStepStatusAttachment_Wrapper');
    //var contentDiv = document.getElementById('tdStepStatusAttachment_Content');
    //var contentDivWidth = contentDiv.scrollWidth - wrapperDiv.offsetWidth;
    ////alert(contentDivWidth);
    //if (contentDivWidth == 0) {
    //    document.all("tdScrollRight").style.display = "none";
    //    document.all("tdScrollLeft").style.display = "none";
    //} else {
    //    document.all("tdScrollRight").style.display = "";
    //    document.all("tdScrollLeft").style.display = "";
    //}
};

function ViewEquipment(obj) {
    lEquipmentRefID = obj.EquipmentID;
    var WinSettings = "center:yes;resizable:no;dialogHeight:675px;dialogWidth:900px;scroll:no;status:no;";
    var vRet = "";
    vRet = window.showModalDialog('../../Equipment/Reports/Equipment.aspx?EID=' + lEquipmentRefID + '&Mode=View',
        vRet,
        WinSettings);
    // window.radopen('../../Equipment/Properties/ATREquipmentProperties.aspx?lEquipmentRefID=' + lEquipmentRefID + "&From=CBT", "EquipmentDialog");
    return false;
};

function WCNSetUP() {
    if (hasAttachment) {
        if (document.all("trMainStepStatusControls").style.display == 'none') {
            document.all("wcnMaterTable").style.height = VHeightContent - 270;
        } else {
            document.all("wcnMaterTable").style.height = VHeightContent - 280;
        }
    } else {
        if (document.all("trMainStepStatusControls").style.display == 'none') {
            document.all("wcnMaterTable").style.height = VHeightContent - 102;
        } else {
            document.all("wcnMaterTable").style.height - 137;
        }
    }
    //alert("T");
    // document.all("wcnMaterTable").height = document.all("divStepHTM").offsetHeight;
    // document.all("wcnMaterTable").width = document.all("divStepHTM").offsetWidth-100;
};

var scrollValue = 0;

function ScrollStatusBar(dir, val) {
    var wrapperDiv = document.getElementById('tdStepStatusAttachment_Wrapper');
    var contentDiv = document.getElementById('tdStepStatusAttachment_Content');

    var contentDivWidth = contentDiv.scrollWidth - wrapperDiv.offsetWidth;
    scrollValue = scrollValue + val;
    //alert(scrollValue);
    var ContentLeft = Math.abs(parseInt(contentDiv.style.left));
    //alert(AvailWidth);

    if (isNaN(ContentLeft)) {
        ContentLeft = 0;
    }
    //alert(dir);
    if (dir == "R") {
        if (wrapperDiv.offsetWidth < contentDiv.scrollWidth - ContentLeft) {
            contentDiv.style.left = scrollValue + 'px';
        }
    } else {
        var cLeft = parseInt(contentDiv.style.left);
        if (isNaN(cLeft)) {
            cLeft = 0;
        }
        //alert(cLeft);
        if (cLeft <= 0) {
            contentDiv.style.left = scrollValue + 'px';
        }
    }
};

//Script for Exit Button
var btnExitCBTimgLeftCapImageMouseOver = new Image();

btnExitCBTimgLeftCapImageMouseOver.src = 'images/button-left-over.png';

var btnExitCBTimgRightCapImageMouseOver = new Image();

btnExitCBTimgRightCapImageMouseOver.src = 'images/button-right-over.png';

var btnExitCBTimgMiddleCapImageMouseOver = new Image();

btnExitCBTimgMiddleCapImageMouseOver.src = 'images/button-middle-over.png';

var btnExitCBTimgLeftCapImageMouseDown = new Image();

btnExitCBTimgLeftCapImageMouseDown.src = '';

var btnExitCBTimgRightCapImageMouseDown = new Image();

btnExitCBTimgRightCapImageMouseDown.src = '';

var btnExitCBTimgMiddleCapImageMouseDown = new Image();

btnExitCBTimgMiddleCapImageMouseDown.src = '';

var btnExitCBTimgLeftCapImage = new Image();

btnExitCBTimgLeftCapImage.src = 'images/button-left.png';

var btnExitCBTimgRightCapImage = new Image();

btnExitCBTimgRightCapImage.src = 'images/button-right.png';

var btnExitCBTimgMiddleCapImage = new Image();

btnExitCBTimgMiddleCapImage.src = 'images/button-middle.png';

function btnExitCBTmOverBtn(divBtn) {
    document.all('btnExitCBTtdLeftCap').style.backgroundImage = "url(images/button-left-over.png)";
    document.all('btnExitCBTtdRightCap').style.backgroundImage = "url('images/button-right-over.png')";
    document.all('btnExitCBTtdButtonImage').style.backgroundImage = "url('images/button-middle-over.png')";
};

function btnExitCBTmOutBtn(divBtn) {
    document.all('btnExitCBTtdLeftCap').style.backgroundImage = "url(images/button-left.png)";
    document.all('btnExitCBTtdRightCap').style.backgroundImage = "url(images/button-right.png)";
    document.all('btnExitCBTtdButtonImage').style.backgroundImage = "url(images/button-middle.png)";
};

//End Script for Exit Button
function findPos(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft;
        curtop = obj.offsetTop;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        }
    }
    return [curleft, curtop];
};

//More Details Button from Procedure Details
function btnProcedurePropertiesmOverBtn(divBtn) {
    document.all('btnProcedurePropertiestdLeftCap').background = 'images/button-left-over.png';
    try {
        document.all('btnProcedurePropertiestdRightCap').background = 'images/button-right-over.png';
    } catch (Exception) {
    }
    try {
        document.all('btnProcedurePropertiestdButtonImage').background = 'images/button-middle-over.png';
    } catch (Exception) {
    }
    try {
        document.all('btnProcedurePropertiestdContent').background = 'images/button-middle-over.png';
    } catch (Exception) {
    }
};

function btnProcedurePropertiesmOutBtn(divBtn) {
    document.all('btnProcedurePropertiestdLeftCap').background = 'images/button-left.png';
    try {
        document.all('btnProcedurePropertiestdRightCap').background = 'images/button-right.png';
    } catch (Exception) {
    }
    try {
        document.all('btnProcedurePropertiestdButtonImage').background = 'images/button-middle.png';
    } catch (Exception) {
    }
    try {
        document.all('btnProcedurePropertiestdContent').background = 'images/button-middle.png';
    } catch (Exception) {
    }
};

//End More Details Button from Procedure Details

function OpenStepList() {
    var title = "Step Tree",
        url = "StepList.htm";
    OpenKendoWindow(title, url);
}

function OpenNoteDialogue() {
    var title = "Notes",
    url = "NoteDialogue.html";
    OpenKendoWindow(title, url);
}

function OpenAttachmentDialogue() {
    var title = "Upload Attachments",
    url = "AttachmentDialogue.html";
    OpenKendoWindow(title, url);
}

function OpenKendoWindow(title, url) {
    var kendoWindow = $("#window").data("kendoWindow").title(title);
    $(".k-window-content k-content k-window-iframecontent").css('overflow', 'auto');
    $(".k-window-content").css('overflow', 'auto');
    $(".k-content").css('overflow', 'auto');
    $(".k-window-iframecontent").css('overflow', 'auto');

    kendoWindow.center();
    kendoWindow.open();
    kendoWindow.refresh({
        url: url,
    });
};

function CloseStepListAndNavigate(stepId) {
    $("#window").data("kendoWindow").close();
    GoToStepUsingStepId(stepId);
};

function GoToStepUsingStepId(stepId) {
    var stepIndex = GetStepIndexFromStepId(stepId);
    GoToStepUsingStepIndex(stepIndex, -1);
};

//End Step Tree

//Show Attachments
//function CloseAttachmentViewer() {
//    $("#window").data("kendoWindow").close();
//};

function LogAttachmentViewed(attachmentId) {
    getCurrentStepAttachment(attachmentId).Viewed = "Y";
    SetAttachmentStyle(attachmentId, CurrentStepIndex);
};

var oWindowMAttachment;

function ResizeAttachmentViewer() {
    var kendoAttachmentwindow = $("#KendoAttachmentwindow"),
        contentHeight,
        contentWidth;
    if (kendoAttachmentwindow && kendoAttachmentwindow.data("kendoWindow")) {
        contentHeight = $("#tdMainContent").outerHeight() + $("#divFooter").outerHeight();
        contentWidth = window.innerWidth;
        kendoAttachmentwindow.data("kendoWindow").setOptions({
            height: contentHeight,
            width: contentWidth
        });
    }
}

function ShowAttachment(id) {
    var kendoAttachmentwindow = $("#KendoAttachmentwindow");
    kendoAttachmentwindow.kendoWindow({
        draggable: false,
        modal: true,
        resizable: false,
        title: false,
        iframe: true,
        position: {
            top: 65,
            left: 0
        },
    });
    ResizeAttachmentViewer();
    oWindowMAttachment = kendoAttachmentwindow.data("kendoWindow");
    $(".k-window-content k-content k-window-iframecontent").css('overflow', 'hidden');
    $(".k-window-content").css('overflow', 'hidden');
    $(".k-content").css('overflow', 'hidden');
    $(".k-window-iframecontent").css('overflow', 'hidden');
    oWindowMAttachment.open();
    oWindowMAttachment.refresh({
        url: "AttachmentViewer.htm?attID=" + id
    });
    StopReading();
};

function CloseAttachmentViewer() {
    oWindowMAttachment.close();
};

function GetAttachments() {
    if (CurrentStepIndex == 1) {
        return ProcedureDocuments;
    } else {
        var currentStep = eval("step" + CurrentStepIndex);
        return currentStep.documents;
    }
};

//End ShowAttachments
function RenderReviewGrid() {
    $("#gridReview").kendoGrid({
        dataSource: {
            data: ReviewData,
            schema: {
                model: {
                    fields: {
                        Version: { type: "string" },
                        oldStatus: { type: "string" },
                        newStatus: { type: "string" },
                        dateChanged: { type: "string" },
                        AuthorizedBy: { type: "string" },
                        ChangeNotes: { type: "string" }
                    }
                }
            },
            pageSize: 50,
        },

        scrollable: false,
        sortable: true,

        columns: [
            {
                field: "Version",
                title: "Version",
                width: "10%",
                align: "Center"
            }, {
                field: "oldStatus",

                title: "Old Status",
                width: "10%"
            }, {
                field: "newStatus",

                title: "New Status",
                width: "10%"
            }, {
                field: "dateChanged",

                title: "Date Changed",
                width: "10%"
            }, {
                field: "AuthorizedBy",

                title: "Authorized By",
                width: "10%"
            }, {
                field: "ChangeNotes",

                title: "Change Notes",

            }
        ]
    });
};

function RenderProcUserFieldGrid() {
    $("#gridProcUserField").kendoGrid({
        dataSource: {
            data: ProcUserFieldData,
            schema: {
                model: {
                    fields: {
                        Name: { type: "string" },
                        Value: { type: "string" },
                    }
                }
            },
            pageSize: 50,
        },

        scrollable: false,
        sortable: true,

        columns: [
            {
                field: "Name",
                title: "Name",
                width: "50%",
                align: "Right"
            }, {
                field: "Value",

                title: "Value",
                align: "Left",
                width: "50%"
            }
        ]
    });
};
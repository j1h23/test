var FilteredListDataSummary;

$(document).ready(function () {
    StepSummaryContentList = [{
        StepId: "Title",
        StepContent: ProcedureTitle,
        StepTreeLine: ProcedureTitle,
        Children: StepSummaryContentList[0],
    }];
    FilteredListDataSummary = FlattenData(StepSummaryContentList);
    InitializeKendo();
    InitializeTreeViewCheckMark();
    PreSelect();
});

function InitializeKendo() {
    InitializeTreeViewAll();
}

function InitializeTreeViewAll() {
    var treeViewAllData = new kendo.data.HierarchicalDataSource({
        data: StepSummaryContentList,
        schema: {
            model: {
                id: "StepId",
                children: "Children"
            }
        }
    });
    $("#treeView").kendoTreeView({
        dataSource: treeViewAllData,
        dataTextField: "StepTreeLine",
        template: "<img src=\"images/check.png\" id=\"check-viewed#= item.StepId #\" style=\"display:none;\"/>#= item.StepTreeLine #",
        loadOnDemand: false,
        select: onSelect,
    });
}

function onSelect(e) {
    var stepId = $("#treeView").data('kendoTreeView').dataItem(e.node).id;
    if (stepId !== "Title") {
        parent.window.CloseStepListAndNavigate(stepId);
    }
}
function PreSelect() {
    var currentStepId,
        selectTreeNode,
        selectTreeNodeDataItem,
        currentIndex = parent.CurrentStepIndex,
        totalIntroSlideCount = parent.IntroSlidesCount,
        treeView = $("#treeView").data("kendoTreeView");
    if (currentIndex < totalIntroSlideCount) {
        treeView.expandPath(["Title"]);
        
    } else {
        currentStepId = parent.GetStepStatus("StepID", currentIndex);
        selectTreeNodeDataItem = treeView.dataSource.get(currentStepId);
        selectTreeNode = treeView.findByUid(selectTreeNodeDataItem.uid);
        treeView.expandTo(currentStepId);
        treeView.select(selectTreeNode);
    }
}

function InitializeTreeViewCheckMark() {
    var stepIndex,
        stepId,
        stepInfo,
        chkViewed;
    for (stepIndex = parent.IntroSlidesCount; stepIndex < parent.TotalSlidesCount; stepIndex++) {
        stepInfo = parent.window["step" + stepIndex];
        if (!stepInfo) {
            continue;
        }
        stepId = stepInfo.StepID;
        if (!stepId) {
            continue;
        }
        chkViewed = $("#check-viewed" + stepId);
        if (stepInfo.Viewed) {
            chkViewed.show();
        } else {
            chkViewed.hide();
        }
    }
}

function FlattenData(rawDataList) {
    var i,
        currentRawData,
        outputData=[];
    for (i = 0; i < rawDataList.length; i++) {
        currentRawData = rawDataList[i];
        outputData.push(
                {
                    StepSectionNumber: currentRawData.StepSectionNumber,
                    StepId: currentRawData.StepId,
                    StepContent: currentRawData.StepContent
                }
        );
        if (currentRawData.Children !== null) {
            $.merge(outputData, FlattenData(currentRawData.Children));
        }
    }
    return outputData;
}

function RefreshList() {
    var checked = $("input[name=list-filter]:checked").val(),
    $filteredList = $('#filtered-list'),
    $allTreeView = $('#treeView');
    switch (checked) {
        case "All":
            $filteredList.hide();
            $allTreeView.show();
            break;
        case "Viewed":
        case "Not-Viewed":
        case "Flagged":
            $filteredList.show();
            $allTreeView.hide();
            $filteredList.empty();
            if (FilteredListDataSummary) {
                $.each(FilteredListDataSummary, function (index, filteredListData) {
                    var bIncludeInList,
                        stepIndex = parent.GetStepIndexFromStepId(filteredListData.StepId),
                        stepInfo = parent.window["step" + stepIndex];
                    if (stepInfo) {
                        switch (checked) {
                            case "Viewed":
                                bIncludeInList = stepInfo.Viewed;
                                break;
                            case "Not-Viewed":
                                bIncludeInList = !stepInfo.Viewed;
                                break;
                            case "Flagged":
                                bIncludeInList = stepInfo.Flagged;
                                break;
                        }
                        if (bIncludeInList) {
                            var sectionNumber;
                            if (filteredListData.StepSectionNumber.length > 0)
                                sectionNumber = filteredListData.StepSectionNumber;
                            else {
                                sectionNumber = "*";
                            }
                            $filteredList.append($('<tr></tr>')
                                .append($('<td></td>', {
                                    text: sectionNumber,
                                    onclick: "parent.window.CloseStepListAndNavigate(" + filteredListData.StepId + ")"
                                })
                                    .append($('<input></input>', {
                                        val: filteredListData.StepId,
                                        type: "hidden",
                                        "class": "stepid",
                                    }))
                                )
                                .append($('<td></td>')
                                    .append($('<input></input>', {
                                        val: filteredListData.StepId,
                                        type: "hidden",
                                        "class": "stepid",
                                    }))
                                    .append($('<div></div>', {
                                        text: filteredListData.StepContent,
                                        id: "summary-content" + filteredListData.StepId,
                                        onclick: "parent.window.CloseStepListAndNavigate(" + filteredListData.StepId + ")"
                                    })))
                            );
                        }
                    }
                });
            }
            break;
        default:
            throw "Invalid View Selected!";
    }
}
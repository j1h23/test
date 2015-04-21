var FilteredListDataSummary;

$(document).ready(function () {
    StepSummaryContentList = [{
        StepIndex: "Title",
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
                id: "StepIndex",
                children: "Children"
            }
        }
    });
    $("#treeView").kendoTreeView({
        dataSource: treeViewAllData,
        dataTextField: "StepTreeLine",
        template: "<img src=\"images/check.png\" id=\"check-viewed#= item.StepIndex #\" style=\"display:none;\"/>#= item.StepTreeLine #",
        loadOnDemand: false,
        select: onSelect,
    });
}

function onSelect(e) {
    var stepIndex = $("#treeView").data('kendoTreeView').dataItem(e.node).id;
    if (stepIndex !== "Title") {
        parent.window.CloseStepListAndNavigate(stepIndex); 
    }
}
function PreSelect() {
    var selectTreeNode,
        selectTreeNodeDataItem,
        currentIndex = parent.CurrentStepIndex,
        totalIntroSlideCount = parent.IntroSlidesCount,
        treeView = $("#treeView").data("kendoTreeView");
    if (currentIndex < totalIntroSlideCount) {
        treeView.expandPath(["Title"]);
        
    } else {
        selectTreeNodeDataItem = treeView.dataSource.get(currentIndex);
        selectTreeNode = treeView.findByUid(selectTreeNodeDataItem.uid);
        treeView.expandTo(currentIndex);
        treeView.select(selectTreeNode);
    }
}

function InitializeTreeViewCheckMark() {
    var stepIndex,
        stepInfo,
        chkViewed;
    for (stepIndex = parent.IntroSlidesCount; stepIndex < parent.TotalSlidesCount; stepIndex++) {
        stepInfo = parent.window["step" + stepIndex];
        if (!stepInfo) {
            continue;
        }
        chkViewed = $("#check-viewed" + stepIndex);
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
                    StepIndex: currentRawData.StepIndex,
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
                        stepInfo = parent.window["step" + filteredListData.StepIndex];
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
                                    onclick: "parent.window.CloseStepListAndNavigate(" + filteredListData.StepIndex + ")"
                                })
                                    .append($('<input></input>', {
                                        val: filteredListData.StepIndex,
                                        type: "hidden",
                                        "class": "stepIndex",
                                    }))
                                )
                                .append($('<td></td>')
                                    .append($('<input></input>', {
                                        val: filteredListData.StepIndex,
                                        type: "hidden",
                                        "class": "stepIndex",
                                    }))
                                    .append($('<div></div>', {
                                        text: filteredListData.StepContent,
                                        id: "summary-content" + filteredListData.StepIndex,
                                        onclick: "parent.window.CloseStepListAndNavigate(" + filteredListData.StepIndex + ")"
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
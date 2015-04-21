//<!--Footer Script Start-->
var _quizFooter$btnBackimgLeftCapImageMouseOver = new Image();
_quizFooter$btnBackimgLeftCapImageMouseOver.src = 'images/button-left.gif';
var _quizFooter$btnBackimgRightCapImageMouseOver = new Image();
_quizFooter$btnBackimgRightCapImageMouseOver.src = 'images/button-right.gif';
var _quizFooter$btnBackimgMiddleCapImageMouseOver = new Image();
_quizFooter$btnBackimgMiddleCapImageMouseOver.src = 'images/button-middle.gif';
var _quizFooter$btnBackimgLeftCapImageMouseDown = new Image();
_quizFooter$btnBackimgLeftCapImageMouseDown.src = 'images/LeftCapImageMouseDown.gif';
var _quizFooter$btnBackimgRightCapImageMouseDown = new Image();
_quizFooter$btnBackimgRightCapImageMouseDown.src = 'images/RightCapImageMouseDown.gif';
var _quizFooter$btnBackimgMiddleCapImageMouseDown = new Image();
_quizFooter$btnBackimgMiddleCapImageMouseDown.src = 'images/MiddleCapImageMouseDown.gif';
var _quizFooter$btnBackimgLeftCapImage = new Image();
_quizFooter$btnBackimgLeftCapImage.src = 'images/button-left-50.gif';
var _quizFooter$btnBackimgRightCapImage = new Image();
_quizFooter$btnBackimgRightCapImage.src = 'images/button-right-50.gif';
var _quizFooter$btnBackimgMiddleCapImage = new Image();
_quizFooter$btnBackimgMiddleCapImage.src = 'images/button-middle-50.gif';
function _quizFooter$btnBackmOverBtn(divBtn) {
  if (_quizFooter$btnBackisBtnEnabled()) {
    document.all('_quizFooter$btnBacktdLeftCap').background = _quizFooter$btnBackimgLeftCapImageMouseOver.src;
    try { document.all('_quizFooter$btnBacktdRightCap').background = _quizFooter$btnBackimgRightCapImageMouseOver.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnBacktdButtonImage').background = _quizFooter$btnBackimgMiddleCapImageMouseOver.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnBacktdContent').background = _quizFooter$btnBackimgMiddleCapImageMouseOver.src; } catch (Exception) { }
  }
}
function _quizFooter$btnBackmDownBtn(divBtn) {
  if (_quizFooter$btnBackisBtnEnabled()) {
    document.all('_quizFooter$btnBacktdLeftCap').background = _quizFooter$btnBackimgLeftCapImageMouseDown.src;
    try { document.all('_quizFooter$btnBacktdRightCap').background = _quizFooter$btnBackimgRightCapImageMouseDown.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnBacktdButtonImage').background = _quizFooter$btnBackimgMiddleCapImageMouseDown.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnBacktdContent').background = _quizFooter$btnBackimgMiddleCapImageMouseDown.src; } catch (Exception) { }
  }
}
function _quizFooter$btnBackisBtnEnabled() {
  var enabled = true;
  try {
    enabled = document.all('_quizFooter_btnBack').enabled;
    if (enabled == 'false') {
      enabled = false;
    }
    if (enabled == 'true') {
      enabled = true;
    }
    if (enabled == null) {
      enabled = true;
    }
  }
  catch (Exception) { }
  return enabled;
}
function _quizFooter$btnBackbtnClick() {
  if (_quizFooter$btnBackisBtnEnabled()) {
    //document.all("_quizFooter_btnBack").click();
    GoBack();
  }
}
function _quizFooter$btnBackmOutBtn(divBtn) {
  if (_quizFooter$btnBackisBtnEnabled()) {
    document.all('_quizFooter$btnBacktdLeftCap').background = _quizFooter$btnBackimgLeftCapImage.src;
    try { document.all('_quizFooter$btnBacktdRightCap').background = _quizFooter$btnBackimgRightCapImage.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnBacktdButtonImage').background = _quizFooter$btnBackimgMiddleCapImage.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnBacktdContent').background = _quizFooter$btnBackimgMiddleCapImage.src; } catch (Exception) { }
  }
}
function _quizFooter$btnBackBtnPropertyChange() {
  if (event.srcElement.id == '_quizFooter_btnBack') {
    if (event.propertyName == 'value') {
      document.all('_quizFooter$btnBacktxt').innerText = document.all('_quizFooter$btnBack').value;
    }
    if (event.propertyName == 'imageUrl') {
      document.all('_quizFooter$btnBackimgLeft').src = document.all('_quizFooter_btnBack').imageUrl;
    }
    if (event.propertyName == 'rightImageURL') {
      document.all('_quizFooter$btnBackimgRight').src = document.all('_quizFooter_btnBack').rightImageURL;
    }
    if (event.propertyName == 'backGroundImageUrl') {
      document.all('_quizFooter$btnBacktdContent').background = document.all('_quizFooter_btnBack').backGroundImageUrl;
    }
    if (event.propertyName == 'disabledImageUrl') {
    }
    if (event.propertyName == 'enabled') {
      if (_quizFooter$btnBackisBtnEnabled()) {
        document.all('_quizFooter$btnBacktxt').className = 'propLabelBold';
      } else {
        document.all('_quizFooter$btnBacktxt').className = 'propLabelDisabled';
      }
    }
  }
}
function _quizFooter$btnBackEnterPress() {
  if (event.keyCode == 13) {
    if (_quizFooter$btnBackisBtnEnabled()) { } _quizFooter$btnBackbtnClick();
  }
}

//<!--Footer Script End-->

//<!--Footer Script Start-->
var _quizFooter$btnAccpetimgLeftCapImageMouseOver = new Image();
_quizFooter$btnAccpetimgLeftCapImageMouseOver.src = 'images/button-left.gif';
var _quizFooter$btnAccpetimgRightCapImageMouseOver = new Image();
_quizFooter$btnAccpetimgRightCapImageMouseOver.src = 'images/button-right.gif';
var _quizFooter$btnAccpetimgMiddleCapImageMouseOver = new Image();
_quizFooter$btnAccpetimgMiddleCapImageMouseOver.src = 'images/button-middle.gif';
var _quizFooter$btnAccpetimgLeftCapImageMouseDown = new Image();
_quizFooter$btnAccpetimgLeftCapImageMouseDown.src = 'images/LeftCapImageMouseDown.gif';
var _quizFooter$btnAccpetimgRightCapImageMouseDown = new Image();
_quizFooter$btnAccpetimgRightCapImageMouseDown.src = 'images/RightCapImageMouseDown.gif';
var _quizFooter$btnAccpetimgMiddleCapImageMouseDown = new Image();
_quizFooter$btnAccpetimgMiddleCapImageMouseDown.src = 'images/MiddleCapImageMouseDown.gif';
var _quizFooter$btnAccpetimgLeftCapImage = new Image();
_quizFooter$btnAccpetimgLeftCapImage.src = 'images/button-left-50.gif';
var _quizFooter$btnAccpetimgRightCapImage = new Image();
_quizFooter$btnAccpetimgRightCapImage.src = 'images/button-right-50.gif';
var _quizFooter$btnAccpetimgMiddleCapImage = new Image();
_quizFooter$btnAccpetimgMiddleCapImage.src = 'images/button-middle-50.gif';
function _quizFooter$btnAccpetmOverBtn(divBtn) {
  if (_quizFooter$btnAccpetisBtnEnabled()) {
    document.all('_quizFooter$btnAccpettdLeftCap').background = _quizFooter$btnAccpetimgLeftCapImageMouseOver.src;
    try { document.all('_quizFooter$btnAccpettdRightCap').background = _quizFooter$btnAccpetimgRightCapImageMouseOver.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnAccpettdButtonImage').background = _quizFooter$btnAccpetimgMiddleCapImageMouseOver.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnAccpettdContent').background = _quizFooter$btnAccpetimgMiddleCapImageMouseOver.src; } catch (Exception) { }
  }
}
function _quizFooter$btnAccpetmDownBtn(divBtn) {
  if (_quizFooter$btnAccpetisBtnEnabled()) {
    document.all('_quizFooter$btnAccpettdLeftCap').background = _quizFooter$btnAccpetimgLeftCapImageMouseDown.src;
    try { document.all('_quizFooter$btnAccpettdRightCap').background = _quizFooter$btnAccpetimgRightCapImageMouseDown.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnAccpettdButtonImage').background = _quizFooter$btnAccpetimgMiddleCapImageMouseDown.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnAccpettdContent').background = _quizFooter$btnAccpetimgMiddleCapImageMouseDown.src; } catch (Exception) { }
  }
}
function _quizFooter$btnAccpetisBtnEnabled() {
  var enabled = true;
  try {
    enabled = document.all('_quizFooter_btnAccpet').enabled;
    if (enabled == 'false') {
      enabled = false;
    }
    if (enabled == 'true') {
      enabled = true;
    }
    if (enabled == null) {
      enabled = true;
    }
  }
  catch (Exception) { }
  return enabled;
}
function _quizFooter$btnAccpetbtnClick() {
  if (_quizFooter$btnAccpetisBtnEnabled()) {
    //document.all("_quizFooter_btnAccpet").click();
    acceptAnswer("accept");

  }
}
function _quizFooter$btnAccpetmOutBtn(divBtn) {
  if (_quizFooter$btnAccpetisBtnEnabled()) {
    document.all('_quizFooter$btnAccpettdLeftCap').background = _quizFooter$btnAccpetimgLeftCapImage.src;
    try { document.all('_quizFooter$btnAccpettdRightCap').background = _quizFooter$btnAccpetimgRightCapImage.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnAccpettdButtonImage').background = _quizFooter$btnAccpetimgMiddleCapImage.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnAccpettdContent').background = _quizFooter$btnAccpetimgMiddleCapImage.src; } catch (Exception) { }
  }
}
function _quizFooter$btnAccpetBtnPropertyChange() {
  if (event.srcElement.id == '_quizFooter_btnAccpet') {
    if (event.propertyName == 'value') {
      document.all('_quizFooter$btnAccpettxt').innerText = document.all('_quizFooter$btnAccpet').value;
    }
    if (event.propertyName == 'imageUrl') {
      document.all('_quizFooter$btnAccpetimgLeft').src = document.all('_quizFooter_btnAccpet').imageUrl;
    }
    if (event.propertyName == 'rightImageURL') {
      document.all('_quizFooter$btnAccpetimgRight').src = document.all('_quizFooter_btnAccpet').rightImageURL;
    }
    if (event.propertyName == 'backGroundImageUrl') {
      document.all('_quizFooter$btnAccpettdContent').background = document.all('_quizFooter_btnAccpet').backGroundImageUrl;
    }
    if (event.propertyName == 'disabledImageUrl') {
    }
    if (event.propertyName == 'enabled') {
      if (_quizFooter$btnAccpetisBtnEnabled()) {
        document.all('_quizFooter$btnAccpettxt').className = 'buttonClass';
      } else {
        document.all('_quizFooter$btnAccpettxt').className = 'buttonDisabledClass';
      }
    }
  }
}
function _quizFooter$btnAccpetEnterPress() {
  if (event.keyCode == 13) {
    if (_quizFooter$btnAccpetisBtnEnabled()) { } _quizFooter$btnAccpetbtnClick();
  }
}

//<!--Footer Script End-->
//<!--Footer Script Start-->
var _quizFooter$btnNextimgLeftCapImageMouseOver = new Image();
_quizFooter$btnNextimgLeftCapImageMouseOver.src = 'images/button-left.gif';
var _quizFooter$btnNextimgRightCapImageMouseOver = new Image();
_quizFooter$btnNextimgRightCapImageMouseOver.src = 'images/button-right.gif';
var _quizFooter$btnNextimgMiddleCapImageMouseOver = new Image();
_quizFooter$btnNextimgMiddleCapImageMouseOver.src = 'images/button-middle.gif';
var _quizFooter$btnNextimgLeftCapImageMouseDown = new Image();
_quizFooter$btnNextimgLeftCapImageMouseDown.src = 'images/LeftCapImageMouseDown.gif';
var _quizFooter$btnNextimgRightCapImageMouseDown = new Image();
_quizFooter$btnNextimgRightCapImageMouseDown.src = 'images/RightCapImageMouseDown.gif';
var _quizFooter$btnNextimgMiddleCapImageMouseDown = new Image();
_quizFooter$btnNextimgMiddleCapImageMouseDown.src = 'images/MiddleCapImageMouseDown.gif';
var _quizFooter$btnNextimgLeftCapImage = new Image();
_quizFooter$btnNextimgLeftCapImage.src = 'images/button-left-50.gif';
var _quizFooter$btnNextimgRightCapImage = new Image();
_quizFooter$btnNextimgRightCapImage.src = 'images/button-right-50.gif';
var _quizFooter$btnNextimgMiddleCapImage = new Image();
_quizFooter$btnNextimgMiddleCapImage.src = 'images/button-middle-50.gif';
function _quizFooter$btnNextmOverBtn(divBtn) {
  if (_quizFooter$btnNextisBtnEnabled()) {
    document.all('_quizFooter$btnNexttdLeftCap').background = _quizFooter$btnNextimgLeftCapImageMouseOver.src;
    try { document.all('_quizFooter$btnNexttdRightCap').background = _quizFooter$btnNextimgRightCapImageMouseOver.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnNexttdButtonImage').background = _quizFooter$btnNextimgMiddleCapImageMouseOver.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnNexttdContent').background = _quizFooter$btnNextimgMiddleCapImageMouseOver.src; } catch (Exception) { }
  }
}
function _quizFooter$btnNextmDownBtn(divBtn) {
  if (_quizFooter$btnNextisBtnEnabled()) {
    document.all('_quizFooter$btnNexttdLeftCap').background = _quizFooter$btnNextimgLeftCapImageMouseDown.src;
    try { document.all('_quizFooter$btnNexttdRightCap').background = _quizFooter$btnNextimgRightCapImageMouseDown.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnNexttdButtonImage').background = _quizFooter$btnNextimgMiddleCapImageMouseDown.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnNexttdContent').background = _quizFooter$btnNextimgMiddleCapImageMouseDown.src; } catch (Exception) { }
  }
}
function _quizFooter$btnNextisBtnEnabled() {
  var enabled = true;
  try {
    enabled = document.all('_quizFooter_btnNext').enabled;
    if (enabled == 'false') {
      enabled = false;
    }
    if (enabled == 'true') {
      enabled = true;
    }
    if (enabled == null) {
      enabled = true;
    }
  }
  catch (Exception) { }
  return enabled;
}
function _quizFooter$btnNextbtnClick() {
  if (_quizFooter$btnNextisBtnEnabled()) {
    //document.all("_quizFooter_btnNext").click();
    GoNext();
  }
}
function _quizFooter$btnNextmOutBtn(divBtn) {
  if (_quizFooter$btnNextisBtnEnabled()) {
    document.all('_quizFooter$btnNexttdLeftCap').background = _quizFooter$btnNextimgLeftCapImage.src;
    try { document.all('_quizFooter$btnNexttdRightCap').background = _quizFooter$btnNextimgRightCapImage.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnNexttdButtonImage').background = _quizFooter$btnNextimgMiddleCapImage.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnNexttdContent').background = _quizFooter$btnNextimgMiddleCapImage.src; } catch (Exception) { }
  }
}
function _quizFooter$btnNextBtnPropertyChange() {
  if (event.srcElement.id == '_quizFooter_btnNext') {
    if (event.propertyName == 'value') {
      document.all('_quizFooter$btnNexttxt').innerText = document.all('_quizFooter$btnNext').value;
    }
    if (event.propertyName == 'imageUrl') {
      document.all('_quizFooter$btnNextimgLeft').src = document.all('_quizFooter_btnNext').imageUrl;
    }
    if (event.propertyName == 'rightImageURL') {
      document.all('_quizFooter$btnNextimgRight').src = document.all('_quizFooter_btnNext').rightImageURL;
    }
    if (event.propertyName == 'backGroundImageUrl') {
      document.all('_quizFooter$btnNexttdContent').background = document.all('_quizFooter_btnNext').backGroundImageUrl;
    }
    if (event.propertyName == 'disabledImageUrl') {
    }
    if (event.propertyName == 'enabled') {
      if (_quizFooter$btnNextisBtnEnabled()) {
        document.all('_quizFooter$btnNexttxt').className = 'propLabelBold';
      } else {
        document.all('_quizFooter$btnNexttxt').className = 'propLabelDisabled';
      }
    }
  }
}
function _quizFooter$btnNextEnterPress() {
  if (event.keyCode == 13) {
    if (_quizFooter$btnNextisBtnEnabled()) { } _quizFooter$btnNextbtnClick();
  }
}

//<!--Footer Script End-->
//<!--Footer Script Start-->
var _quizFooter$btnExitimgLeftCapImageMouseOver = new Image();
_quizFooter$btnExitimgLeftCapImageMouseOver.src = 'images/button-left.gif';
var _quizFooter$btnExitimgRightCapImageMouseOver = new Image();
_quizFooter$btnExitimgRightCapImageMouseOver.src = 'images/button-right.gif';
var _quizFooter$btnExitimgMiddleCapImageMouseOver = new Image();
_quizFooter$btnExitimgMiddleCapImageMouseOver.src = 'images/button-middle.gif';
var _quizFooter$btnExitimgLeftCapImageMouseDown = new Image();
_quizFooter$btnExitimgLeftCapImageMouseDown.src = 'images/LeftCapImageMouseDown.gif';
var _quizFooter$btnExitimgRightCapImageMouseDown = new Image();
_quizFooter$btnExitimgRightCapImageMouseDown.src = 'images/RightCapImageMouseDown.gif';
var _quizFooter$btnExitimgMiddleCapImageMouseDown = new Image();
_quizFooter$btnExitimgMiddleCapImageMouseDown.src = 'images/MiddleCapImageMouseDown.gif';
var _quizFooter$btnExitimgLeftCapImage = new Image();
_quizFooter$btnExitimgLeftCapImage.src = 'images/button-left-50.gif';
var _quizFooter$btnExitimgRightCapImage = new Image();
_quizFooter$btnExitimgRightCapImage.src = 'images/button-right-50.gif';
var _quizFooter$btnExitimgMiddleCapImage = new Image();
_quizFooter$btnExitimgMiddleCapImage.src = 'images/button-middle-50.gif';
function _quizFooter$btnExitmOverBtn(divBtn) {
  if (_quizFooter$btnExitisBtnEnabled()) {
    document.all('_quizFooter$btnExittdLeftCap').background = _quizFooter$btnExitimgLeftCapImageMouseOver.src;
    try { document.all('_quizFooter$btnExittdRightCap').background = _quizFooter$btnExitimgRightCapImageMouseOver.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnExittdButtonImage').background = _quizFooter$btnExitimgMiddleCapImageMouseOver.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnExittdContent').background = _quizFooter$btnExitimgMiddleCapImageMouseOver.src; } catch (Exception) { }
  }
}
function _quizFooter$btnExitmDownBtn(divBtn) {
  if (_quizFooter$btnExitisBtnEnabled()) {
    document.all('_quizFooter$btnExittdLeftCap').background = _quizFooter$btnExitimgLeftCapImageMouseDown.src;
    try { document.all('_quizFooter$btnExittdRightCap').background = _quizFooter$btnExitimgRightCapImageMouseDown.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnExittdButtonImage').background = _quizFooter$btnExitimgMiddleCapImageMouseDown.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnExittdContent').background = _quizFooter$btnExitimgMiddleCapImageMouseDown.src; } catch (Exception) { }
  }
}
function _quizFooter$btnExitisBtnEnabled() {
  var enabled = true;
  try {
    enabled = document.all('_quizFooter_btnExit').enabled;
    if (enabled == 'false') {
      enabled = false;
    }
    if (enabled == 'true') {
      enabled = true;
    }
    if (enabled == null) {
      enabled = true;
    }
  }
  catch (Exception) { }
  return enabled;
}
function _quizFooter$btnExitbtnClick() {
  if (_quizFooter$btnExitisBtnEnabled()) {
    document.all("_quizFooter_btnExit").click();
  }
}
function _quizFooter$btnExitmOutBtn(divBtn) {
  if (_quizFooter$btnExitisBtnEnabled()) {
    document.all('_quizFooter$btnExittdLeftCap').background = _quizFooter$btnExitimgLeftCapImage.src;
    try { document.all('_quizFooter$btnExittdRightCap').background = _quizFooter$btnExitimgRightCapImage.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnExittdButtonImage').background = _quizFooter$btnExitimgMiddleCapImage.src; } catch (Exception) { }
    try { document.all('_quizFooter$btnExittdContent').background = _quizFooter$btnExitimgMiddleCapImage.src; } catch (Exception) { }
  }
}
function _quizFooter$btnExitBtnPropertyChange() {
  if (event.srcElement.id == '_quizFooter_btnExit') {
    if (event.propertyName == 'value') {
      document.all('_quizFooter$btnExittxt').innerText = document.all('_quizFooter$btnExit').value;
    }
    if (event.propertyName == 'imageUrl') {
      document.all('_quizFooter$btnExitimgLeft').src = document.all('_quizFooter_btnExit').imageUrl;
    }
    if (event.propertyName == 'rightImageURL') {
      document.all('_quizFooter$btnExitimgRight').src = document.all('_quizFooter_btnExit').rightImageURL;
    }
    if (event.propertyName == 'backGroundImageUrl') {
      document.all('_quizFooter$btnExittdContent').background = document.all('_quizFooter_btnExit').backGroundImageUrl;
    }
    if (event.propertyName == 'disabledImageUrl') {
    }
    if (event.propertyName == 'enabled') {
      if (_quizFooter$btnExitisBtnEnabled()) {
        document.all('_quizFooter$btnExittxt').className = 'buttonClass';
      } else {
        document.all('_quizFooter$btnExittxt').className = 'buttonDisabledClass';
      }
    }
  }
}
function _quizFooter$btnExitEnterPress() {
  if (event.keyCode == 13) {
    if (_quizFooter$btnExitisBtnEnabled()) { } _quizFooter$btnExitbtnClick();
  }
}

//<!--Footer Script End-->

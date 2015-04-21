//Var variable Declaration
Var downLoadGI As Boolean
Var rtClick As Boolean
Var picFile As String
Var resultL As Long
Var tempFolderName As String
Var cntrl_Visible As Boolean
Var QIDSAnswered()
Var TestOver As Boolean 'This variable for deffered to know whether Test is over
Var Drawline As Boolean
Var DefferedExitOtion As String
Var ElHr As Integer, ElMin As Integer, ElSec As Integer
Var QnoCheckForBookMark As String
Var from_The_Next As Boolean
Var from_The_Exit As Boolean
Var First_Time_Next As Boolean
Var hasError As Boolean
Var Exit_Time_Out As Boolean
Var Took_rem As Boolean
Var ld_start As Date
Var m_Number() As Integer
Var b As Integer
Var N As Integer
Var m As Integer
Var i As Integer
Var r As Integer
Var L1 As Integer
Var L2 As Integer
Var lstX
Var TestHou As Integer
Var TestMin As Integer
Var TestSec As Integer
Var QuestionMin As Integer
Var QuestionSec As Integer
Var li_s As Integer
Var AnswerString As String
Var ResponseString As String
Var BookMarked As String
Var BookMark As String
Var BookMarkID As String
Var AssignSeqNum As String
Var CourseName As String
Var TaskSeqNum As String
Var CorrectString As String
Var PersonID As String
Var Print_Cert As String
Var DupicateNo As Boolean
Var FirstClick As Boolean
Var UserPickedX As Double
Var UserPickedY As Double
Var NewX As Variant
Var NewY As Variant
Var ResponseScore As Integer
Var QIDAnswered() As Integer
Var PointsAwarded() As Integer
Var TimeLeft As Integer
Var RemainingTime As Double
Var NotAccept As Boolean
Var TestScore As Double
    
Var QuestionIndex As Integer
Var MaxQuestionIndex As Integer
Var TotalMarks As Double
Var TotalCorrcetScore As Double
Var TestName As String
Var CopyrightDate As String
Var GraphicPath As String
Var TotalGraphic As Integer
Var mstrPictureFromURL As String

Var Type Question
QMatchResponseNotRandom() As String
tookRemediation As Boolean
Qid As Integer
QType As String
QDiff As String
QPointValue As Double
Question As String
QTotalResponse As Integer
QTotalRightAnswer As Integer
QRightAnswer() As String
QResponse() As String
QResponseLock() As String
QResponselocknum() As Integer
QResponseTotRem As Integer
QResponseRem() As Variant
QResponseTotInfo As Integer
QresponseInfo() As Variant

'QGraphicID As Integer
QGraphicID As String
MatchQuestion() As String
InfoService As Variant
IncorrectRemediationService As Variant
CorrectRemediationService As Variant
OpenBookService As Variant
UserResponse() As String
Do_It_Later As Boolean
UserResponseStatus As Integer
X() As Double
Y() As Double
Xextent() As Double
Yextent() As Double
CorrectResponse() As String
CorrectAnsFlag As Boolean
ReturnQuestion() As String
ReturnNumber() As Integer
ReturnAnswer() As String
Score As Double
QuestioBookMarked As Boolean
PictureURL As String
Rand_Responses() As String

Sound_Path() As String

End Type

Var Questions() As Question

'   Define custom data type TestOptions to store test options
 TestOptionType{
    standard1Message As String
    standard2Message As String
    standard3Message As String
    passRemediation As String
    failRemediation As String
    isRemedial As Boolean
    remedialTestCount As Integer
    hasEssay As Boolean
    Exam_ID As Integer
    Area As String
    Class As String
    Topic As String
    TestType As String
    RemedialTests As Integer
    ActionDisableRemedial As String * 2
    DKSRequired As String
    TestDescription As String
    displayTime As String * 2
    ExitAllowed As String * 2
    ShowTestResults As String * 2
    ImmediateDeferred As String * 2
    DisplayCorrectAnswer As String * 2
    DisplayScorePercentage As String * 2
    DisplayScoreCount As String * 2
    DisplayScoreInResults As String * 2
    DontKnowCredit As Double
    NumOfQuestions As Integer
    SaveScoring As String * 2
    PartialCreditMCMA As String * 2
    PartialCreditMatching As String * 2
    ShowQuestionId As String * 2
    ShowQuestionValue As String * 2
    AllowBookmark As String * 2
    AllowReview As String * 2
    ResultPrinting As String * 2
    PassingScore  As String * 2
    ActionScore   As String * 2
    RandomizeResponses As String * 2
    ExamTimeLimit As String
    QuestionMaxTime As String
    ForcedRemediation As String
    PlayCorrectIncorrectSounds As String
    PlayQuestionRemediation As String
    CorrectSound As String
    InCorrectSound As String
    numAttempts As Integer
    maxAttempts As Integer
    gradeAction As Integer
    gradeNeeded As Integer
    Status As String
    TotalTestPoints As Integer
    TotalCorrectScore As Integer
}


Var l As Integer
Var Arraycount As Integer
Var R_Picture As Boolean
Var I_Picture As Boolean

'   Constants for Question Types

Const MULTIPLE_CHOICE As String = "C"
Const SOUND_IDENT As String = "S"
Const MATCH  As String = "M"
Const FILL_IN_BLANKS  As String = "F"
Const TRUE_FALSE  As String = "T"
Const YES_NO  As String = "Y"
Const GRAPHICAL_RESPONSE As String = "R"
Const GRAPHICAL_INTERACTION As String = "I"
Const ESSAY_RESPONSE As String = "E"

'   constants for internal use
Const YES  As String = "Y"
Const NO As String = "N"

Const m_def_QueAnsInfo = "0"

'Default Property Values:
Const m_def_TestOptions As String = "0"
Const m_def_UserName As String = "0"
Const m_def_TotalQuestions  As String = "0"
Const O As Integer = 0

'Property Variables:
Var m_UserName As String
Var m_TestOptions As String
Var m_QueAnsInfo As String
Var m_TotalQuestions As String


var blog={};
var step=[];
var stepType=[];
blog.step = step;
blog.stepType = stepType;
var configure;
var stepId=0;
var configBtnId=0;
var operationVariable;
var opvarid=0;
var processor;
var processorid=0;
var reader;
var readerid=0;
var writer;
var writerid=0;
var configIdIndex;
var _dirtyFlag=false;
var modalHtml = "";
var readerObj;
var processorObj;
var writerObj;


function getElemIdSeq(elemId){
    var indexArr = elemId.split('_');
    var index = indexArr[1];
    console.log("getElemIdSeq method, element Id : "+elemId +" Index : "+index);
    return index;
}

function addStep(elemId){
    var elemVal = $("#"+elemId).val();
    var index = getElemIdSeq(elemId);
    stepType[index] = elemVal;
    console.log("addStep method, element Id : "+elemId +" Index : "+index);
}

function addOperationVariable(elemId){
    var elemVal = $("#"+elemId).val();
    var index = getElemIdSeq(elemId);
    operationVariable[index] = elemVal;
    console.log("addOperationVariable method, element Id : "+elemId +" Index : "+index);
}

function addProcessor(elemId) {
    var elemVal = $("#"+elemId).val();
    var index = getElemIdSeq(elemId);
    processorObj = {};
        processorObj.value = elemVal;
        processorObj.params = [];
        processor[index] = processorObj;

    if(elemVal !== "" ) {
        createProParamFields(elemId,elemVal, index);
    }else{
        $("#pmaindiv").remove();
        $("#pParamDiv").hide();
    }
    console.log("addProcessor method, element Id : "+elemId +" Index : "+index);
}

function addProcessorParamValues(fId){
var labelId = $("#"+fId)[0].previousSibling.id;
var labelVal = $("#"+labelId)[0].innerHTML;
var fVal = $("#"+fId).val();
processorObj.params.push({"label": labelVal, "value":fVal});
console.log(labelId);
}

function createProParamFields(elemId,elemVal, index){

    $("#pmaindiv"+index).remove();
    var paramString = (elemVal.split("("))[1];
    var params=[];
    params = paramString.split(",");
    $("#pParamDiv_"+index).show();
    var parentDiv = document.getElementById("pParamDiv_"+index);
    var maindiv= document.createElement('div');
    maindiv.id = "pmaindiv_"+index;
    parentDiv.appendChild(maindiv);
    for(var i=0; i<params.length; i++){
            var newdiv = document.createElement('div');
            newdiv.id = "div";
            newdiv.innerHTML = "<label id='pPLabel"+index+"_" +i+"'>params label</label><input type='text' id='pParam"+index+"_" + i + "' class='form-control form-control-sm' style=\"width:89.5%; display:inline;\" onblur='addProcessorParamValues(this.id)'>"
            maindiv.appendChild(newdiv);
            $("#pPLabel"+index+"_"+i).text(params[i].replace(")", ""));
        }
}

function addReader(elemId) {
    var elemVal = $("#"+elemId).val();
    var index = getElemIdSeq(elemId);
    readerObj = {};
        readerObj.value = elemVal;
        readerObj.params = [];
        reader[index] = readerObj;
    console.log("addReader method, element Id : "+elemId +" Index : "+index);

    if(elemVal !== "" ) {
        createParamFields(elemId,elemVal, index);
    }else{
        $("#maindiv").remove();
        $("#rParamDiv").hide();
    }
}

function addReaderParamValues(fId){
var labelId = $("#"+fId)[0].previousSibling.id;
var labelVal = $("#"+labelId)[0].innerHTML;
var fVal = $("#"+fId).val();
readerObj.params.push({"label": labelVal, "value":fVal});

//readerParamMap.set(labelVal, fVal);
console.log(labelId);
}

function createParamFields(elemId,elemVal, index){
    $("#maindiv"+index).remove();
    var paramString = (elemVal.split("("))[1];
    var params=[];
    params = paramString.split(",");
    $("#rParamDiv_"+index).show();
    var parentDiv = document.getElementById("rParamDiv_"+index);
    var maindiv= document.createElement('div');
    maindiv.id = "maindiv_"+index;
    parentDiv.appendChild(maindiv);
    for(var i=0; i<params.length; i++){
            var newdiv = document.createElement('div');
            newdiv.id = "div";
            newdiv.innerHTML = "<label id='rPLabel"+index+"_" +i+"'>params label</label><input type='text' id='rParam"+index+"_" + i + "' class='form-control form-control-sm' style=\"width:89.5%; display:inline;\" onblur='addReaderParamValues(this.id)'>"
            maindiv.appendChild(newdiv);
            $("#rPLabel"+index+"_"+i).text(params[i].replace(")", ""));
        }

}

function addWriter(elemId) {
    var elemVal = $("#"+elemId).val();
    var index = getElemIdSeq(elemId);
   writerObj = {};
        writerObj.value = elemVal;
        writerObj.params = [];
        writer[index] = writerObj;

    if(elemVal !== "" ) {
        createWParamFields(elemId,elemVal, index);
    }else{
        $("#wmaindiv").remove();
        $("#wParamDiv").hide();
    }

    console.log("addWriter method, element Id : "+elemId +" Index : "+index);
}

function addWriterParamValues(fId){
var labelId = $("#"+fId)[0].previousSibling.id;
var labelVal = $("#"+labelId)[0].innerHTML;
var fVal = $("#"+fId).val();
writerObj.params.push({"label": labelVal, "value":fVal});
console.log(labelId);
}

function createWParamFields(elemId,elemVal, index){

    $("#wmaindiv"+index).remove();
    var paramString = (elemVal.split("("))[1];
    var params=[];
    params = paramString.split(",");
    $("#wParamDiv_"+index).show();
    var parentDiv = document.getElementById("wParamDiv_"+index);
    var maindiv= document.createElement('div');
    maindiv.id = "wmaindiv_"+index;
    parentDiv.appendChild(maindiv);
    for(var i=0; i<params.length; i++){
            var newdiv = document.createElement('div');
            newdiv.id = "div";
            newdiv.innerHTML = "<label id='wPLabel"+index+"_" +i+"'>params label</label><input type='text' id='wParam"+index+"_" + i + "' class='form-control form-control-sm' style=\"width:89.5%; display:inline;\" onblur='addWriterParamValues(this.id)'>"
            maindiv.appendChild(newdiv);
            $("#wPLabel"+index+"_"+i).text(params[i].replace(")", ""));
        }
}

function openConfigureDialog(cd){

    $('#stepname').val(cd[0]);
    $('#stepType').val(cd[1]);
    var opvarLength = cd[2].length;
    for(var i=0; i<opvarLength; i++) {
        $('#opvar_' +i).val((cd[2])[i]);
        operationVariable[i] = (cd[2])[i];
    }
    var rLength = cd[3].length;
    for(var i=0; i<rLength; i++) {
        var rObj = (cd[3])[i];
        var rDropValue = rObj.value;
        var rParams = rObj.params;
        $('#reader_' +i).val(rDropValue);
        for(var k=0; k<rParams.length; k++) {
            $("#rParam" + i + "_" + k).val(rParams[k].value);
        }
        }
    var pLength = cd[4].length;
    for(var i=0; i<pLength; i++) {
        var pObj = (cd[4])[i];
        var pDropValue = pObj.value;
        $('#processor_' +i).val(pDropValue);
        var pParams = pObj.params;
        for(var k=0; k<pParams.length; k++) {
            $("#pParam" + i + "_" + k).val(pParams[k].value);
        }
    }
    var wLength = cd[5].length;
    for(var i=0; i<wLength; i++) {
        var wObj = (cd[5])[i];
        var wDropValue = wObj.value;
        $('#writer_' +i).val(wDropValue);
        var wParams = wObj.params;
        for(var k=0; k<wParams.length; k++) {
            $("#wParam" + i + "_" + k).val(wParams[k].value);
        }
    }
}

$(document).ready( function () {

    modalHtml = $(".modal").html();

        $("#workflow").submit( function(e) {
            console.log("workflow submit function called");
            e.preventDefault();
            blog.name = $('#name').val();
            blog.description = $('#description').val();
            console.log(JSON.stringify(blog));

            $.ajax({
                type: "GET",
                url: "/workflowStepDetail",
                data: {blogData : JSON.stringify(blog)},
                dataType: "json",
                success:function(data){
                    console.log("Final Data sent to backend : "+data);
            },
            error:function(xhr, status, error){
                console.log("status="+status+",xhr="+xhr.responseText+",errth="+error);
            }

            })
        });

        $("#workflowStepDetail").change(function(){
           console.log("Change detected in workflowStepDetail form (Configure Button form)");
           _dirtyFlag=true;
           console.log("_dirtyFlag is set to true");
        });

        $("#workflowStepDetail").submit( function(e) {
            e.preventDefault();
            console.log("workflowStepDetail (Configure) submit function called");
            var stepName = $('#stepname').val();
            var stepType = $('#stepType').val();
            if(step.length !==0 && step[configIdIndex] !== undefined &&
                            (step[configIdIndex]).includes(stepName) && _dirtyFlag){
                console.log("updating workflowStepDetail form values in request");
                (step[configIdIndex])[0] = stepName;
                (step[configIdIndex])[1] = stepType;
                (step[configIdIndex])[2] = operationVariable;
                (step[configIdIndex])[3] = reader;
                (step[configIdIndex])[4] = processor;
                (step[configIdIndex])[5] = writer;
            }else {
                configure.push(stepName);
                configure.push(stepType);
                configure.push(operationVariable);
                configure.push(reader);
                configure.push(processor);
                configure.push(writer);
                step.push(configure);
            }
            $(".modal").modal("hide");
        });

        /*$(".modal").on("hidden.bs.modal", function () {
    $('.modal').html("");
    });*/

        $(document).on('click', '.myconfigure', function() {
        stepid=$(this).parent().find('input').val();
        if(stepid === undefined || stepid === "" || stepid === null){
            alert("Step is mandatory, Enter Step Name.");
            //return;
        }else {
            configure = [];
            document.getElementById("workflowStepDetail").reset();

            // below code is modal code

            var modal = document.getElementById("myModal");
                /*if(modal.innerHTML === ""){
                    $(".modal").html(modalHtml);
                }*/
            // Get the button that opens the modal


            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            //modal.style.display = "block";
            $(".modal").modal("show");
            name = $('#name').val();

            document.getElementById("stepname").value = stepid;
            document.getElementById("foldername").value = name;
            document.getElementById("name").value = name;
            var index = getElemIdSeq(this.id);
            configIdIndex = index;
            var configData = step[index];
            var stepNameFromArray;
            if (configData !== undefined) {
                stepNameFromArray = configData[0];
            }

            operationVariable = [];
            processor = [];
            reader = [];
            writer = [];
            //readerParamMap = new Map();
            readerMap = new Map();
            processorMap = new Map();
            writerMap = new Map();

            if (step.length !== 0 && stepNameFromArray === stepid) {
                openConfigureDialog(configData);
            }
        }
        //code end
        });

        $("#appendStep").click( function(e) {
         e.preventDefault();
         stepId = stepId+1;
         configBtnId = configBtnId+1;
        $(".mydivStep").append('<div class="controls"><input type="text" id="stepid_' +stepId+ '" name="step[]" required class="form-control form-control-sm" placeholder="Enter step" style="width:78%; display:inline;" onblur="addStep(this.id)">  <a href="#"  style="display:inline;" class="remove_this btn btn-danger btn-sm active" role="button" aria-pressed="true">Remove</a> <button href="#" style="display:inline;"  id="configBtn_' +configBtnId+'" class="btn btn-warning btn-sm active myconfigure" type=button role="button" aria-pressed="true">Configure</button><br/><br/></div>');
        return false;

        });

    $(document).on('click', '.remove_this', function() {
        var elemId = jQuery(this).siblings(this)[0].id;
        var elemValue = jQuery(this).siblings(this)[0].value;
        var elemArr = elemId.split("_");
        var elemIndex = elemArr[1];
        if(elemArr[0].includes("op")){
            operationVariable.splice(elemIndex);
        }else if(elemArr[0].includes("re")){
            reader.splice(elemIndex);
        }else if(elemArr[0].includes("pr")){
            processor.splice(elemIndex);
        }else if(elemArr[0].includes("wr")){
            writer.splice(elemIndex);
        }
        jQuery(this).parent().remove();
        return false;
        });

    $("input[type=submit]").click(function(e) {
       e.preventDefault();
       $(this).next("[name=textbox]")
       .val(
        $.map($(".inc :text"), function(el) {
          return el.value
        }).join(",\n")
      )
    })
  });
/*
function blockModel() {
  modal.style.display = "block";
  name = $('#name').val();
      //  stepid = $('#stepid').val();
        document.getElementById("stepname").value = stepid;
        document.getElementById("foldername").value = name;
}
*/
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  //modal.style.display = "none";
    $("#myModal").modal("hide");

}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    //modal.style.display = "none";
      $("#myModal").modal("hide");
  }
}

// Down code for configure code

jQuery(document).ready( function () {

        $("#append_Operation_Variable").click( function(e) {
         e.preventDefault();
         opvarid=opvarid+1;
        $(".mydiv").append('<div class="controls"><input type="text" name="OperationVariable[]" id="opvar_' +opvarid+ '" class="form-control form-control-sm" placeholder="Enter operation variable" style="width:89.5%; display:inline;" onblur="addOperationVariable(this.id)">  <a href="#"  style="display:inline;" class="remove_this btn btn-danger btn-sm active" role="button" aria-pressed="true">Remove</a> <br/><br/></div>');
        return false;
        });

        $("#append_Reader").click( function(e) {
         e.preventDefault();
         readerid=readerid+1;
        $("#rParamDiv_"+(readerid-1)).after('<div class="controls"><select name="Select_reader[]" id="reader_' +readerid+ '" class="form-control form-control-sm" style="width:89.5%; display:inline;" onblur="addReader(this.id)"><option value="">Select reader</option><option value="OracleDataRead(SOURCEIDENTIFIER,SOURCENAME,GETSOURCESQL)">OracleDataRead(SOURCEIDENTIFIER,SOURCENAME,GETSOURCESQL)</option>\n' +
            '    <option value="CSVDataRead(SOURCEIDENTIFIER,SOURCEFILENAME,FILEPATH)">CSVDataRead(SOURCEIDENTIFIER,SOURCEFILENAME,FILEPATH)</option>\n' +
            '    <option value="EXCELDataRead(SOURCEIDENTIFIER,SOURCEFILEPATH,PATTERN)">EXCELDataRead(SOURCEIDENTIFIER,SOURCEFILEPATH,PATTERN)</option>\n' +
            '    <option value="SftpRead(SOURCEREMOTESERVERNAME,SOURCEREMOTEPORTNO,SOURCEREMOTEUSERNAME,SOURCEREMOTEPASSWORD,SOURCELOCALFILEPATH,SOURCEREMOTEFILENAME)">SftpRead(SOURCEREMOTESERVERNAME,SOURCEREMOTEPORTNO,SOURCEREMOTEUSERNAME,SOURCEREMOTEPASSWORD,SOURCELOCALFILEPATH,SOURCEREMOTEFILENAME)</option></select>  <a href="#"  style="display:inline;" class="remove_this btn btn-danger btn-sm active" role="button" aria-pressed="true">Remove</a> <br/><br/></div>' +
            '<div class=\'form-group mydivReaderParam\' id="rParamDiv_' +readerid+ '"></div>');
        return false;
        });

        $("#append_Processor").click( function(e) {
         e.preventDefault();
         processorid=processorid+1;
        $("#pParamDiv_"+(processorid-1)).after('<div class="controls"><select name="selectProcessor[]" id="processor_' +processorid+ '" class="form-control form-control-sm" style="width:89.5%; display:inline;" onblur="addProcessor(this.id)"><option value="">Select processor</option>\n' +
            '    <option value="PythonDataProcessor(SCRIPTNAME,METHOD)">PythonDataProcessor(SCRIPTNAME,METHOD)</option>\n' +
            '    <option value="FileChecker(FOLDERPATH,PATTERN,SCHEDULESTOPPER)">FileChecker(FOLDERPATH,PATTERN,SCHEDULESTOPPER)</option>\n' +
            '    <option value="FILEMOVEPROCCESOR(SOURCEFILENAME,TARGETFILENAME,MOVETYPE,PATTERN)">FILEMOVEPROCCESOR(SOURCEFILENAME,TARGETFILENAME,MOVETYPE,PATTERN)</option></select>  <a href="#"  style="display:inline;" class="remove_this btn btn-danger btn-sm active" role="button" aria-pressed="true">Remove</a> <br/><br/></div>'+
        '<div class=\'form-group mydivProcessorParam\' id="pParamDiv_' +processorid+ '"></div>');
        return false;
        });

        $("#append_Writer").click( function(e) {
         e.preventDefault();
         writerid=writerid+1;
        $("#wParamDiv_"+(writerid-1)).after('<div class="controls"><select name="selectWriter[]" id="writer_' +writerid+ '" class="form-control form-control-sm" style="width:89.5%; display:inline;" onblur="addWriter(this.id)"><option value="">Select Writer</option>\n' +
            '    <option value="EXCELDATAWRITER(INPUTSOURCEFORWRITER,FILENAME,FILEPATH,SHEETNAME,HEADERREQUIRED)">EXCELDATAWRITER(INPUTSOURCEFORWRITER,FILENAME,FILEPATH,SHEETNAME,HEADERREQUIRED)</option>\n' +
            '    <option value="CSVDataWrite(INPUTSOURCEFORWRITER,TARGETFILENAME,TARGETDELIMITER,FILEPATH)">CSVDataWrite(INPUTSOURCEFORWRITER,TARGETFILENAME,TARGETDELIMITER,FILEPATH)</option>\n' +
            '    <option value="OracleDataWrite(INPUTSOURCE,TARGETNAME,TARGETTABLENAME,TARGETCOLUMNLIST)">OracleDataWrite(INPUTSOURCE,TARGETNAME,TARGETTABLENAME,TARGETCOLUMNLIST)</option>\n' +
            '    <option value="OracleDataDelInsert(INPUTSOURCE,TARGETNAME,TARGETTABLENAME,TARGETCOLUMNLIST,DELETEKEY)">OracleDataDelInsert(INPUTSOURCE,TARGETNAME,TARGETTABLENAME,TARGETCOLUMNLIST,DELETEKEY)</option></select>  <a href="#"  style="display:inline;" class="remove_this btn btn-danger btn-sm active" role="button" aria-pressed="true">Remove</a> <br/><br/></div>'+
        '<div class=\'form-group mydivWriterParam\' id="wParamDiv_' +writerid+ '"></div>');
        return false;
        });

    jQuery(document).on('click', '.remove_this', function() {
        jQuery(this).parent().remove();
        return false;
        });
    $("input[type=submit]").click(function(e) {
      e.preventDefault();
      $(this).next("[name=textbox]")
      .val(
        $.map($(".inc :text"), function(el) {
          return el.value
        }).join(",\n")
      )
    })
  });
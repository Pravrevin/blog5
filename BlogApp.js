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
    processor[index] = elemVal;
    console.log("addProcessor method, element Id : "+elemId +" Index : "+index);
}

function addReader(elemId) {
    var elemVal = $("#"+elemId).val();
    var index = getElemIdSeq(elemId);
    reader[index] = elemVal;
    console.log("addReader method, element Id : "+elemId +" Index : "+index);
}

function addWriter(elemId) {
    var elemVal = $("#"+elemId).val();
    var index = getElemIdSeq(elemId);
    writer[index] = elemVal;
    console.log("addWriter method, element Id : "+elemId +" Index : "+index);
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
        $('#reader_' +i).val((cd[3])[i]);
        reader[i] = (cd[3])[i];
    }
    var pLength = cd[4].length;
    for(var i=0; i<pLength; i++) {
        $('#processor_' +i).val((cd[4])[i]);
        processor[i] = (cd[4])[i]
    }
    var wLength = cd[5].length;
    for(var i=0; i<wLength; i++) {
        $('#writer_' +i).val((cd[5])[i]);
        writer[i] = (cd[5])[i];
    }
}

$(document).ready( function () {

        $("#workflow").submit( function(e) {
            console.log("workflow submit function called");
            e.preventDefault();
            blog.name = $('#name').val();
            blog.description = $('#description').val();
            console.log(JSON.stringify(blog));

            $.ajax({
                type: "GET",
                url: '/workflowdata',
                data: { blogdata :blog},
                dataType: "json",
                success:function(data){
                    console.log("Final Data sent to backend : "+data);
            },
            error:function(){
                alert("data not received");
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
            modal.style.display = "none";
        });

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

            // Get the button that opens the modal


            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
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
  modal.style.display = "none";

}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
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
        $(".mydivReader").append('<div class="controls"><select name="Select_reader[]" id="reader_' +readerid+ '" class="form-control form-control-sm" style="width:89.5%; display:inline;" onblur="addReader(this.id)"><option value="Select Reader">Select Reader</option><option value="Firefox">Firefox</option><option value="Chrome">Chrome</option><option value="Opera">Opera</option><option value="Safari">Safari</option></select>  <a href="#"  style="display:inline;" class="remove_this btn btn-danger btn-sm active" role="button" aria-pressed="true">Remove</a> <br/><br/></div>');
        return false;
        });

        $("#append_Processor").click( function(e) {
         e.preventDefault();
         processorid=processorid+1;
        $(".mydivProcessor").append('<div class="controls"><select name="selectProcessor[]" id="processor_' +processorid+ '" class="form-control form-control-sm" style="width:89.5%; display:inline;" onblur="addProcessor(this.id)"><option value="Select processor">Select processor</option><option value="Firefox">Firefox</option><option value="Chrome">Chrome</option><option value="Opera">Opera</option><option value="Safari">Safari</option></select>  <a href="#"  style="display:inline;" class="remove_this btn btn-danger btn-sm active" role="button" aria-pressed="true">Remove</a> <br/><br/></div>');
        return false;
        });

        $("#append_Writer").click( function(e) {
         e.preventDefault();
         writerid=writerid+1;
        $(".mydivWriter").append('<div class="controls"><select name="selectWriter[]" id="writer_' +writerid+ '" class="form-control form-control-sm" style="width:89.5%; display:inline;" onblur="addWriter(this.id)"><option value="Select Writer">Select writer</option><option value="Firefox">Firefox</option><option value="Chrome">Chrome</option><option value="Opera">Opera</option><option value="Safari">Safari</option></select>  <a href="#"  style="display:inline;" class="remove_this btn btn-danger btn-sm active" role="button" aria-pressed="true">Remove</a> <br/><br/></div>');
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
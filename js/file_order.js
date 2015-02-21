function file_order_up(editor_sequence){
	jQuery('#uploaded_file_list_'+editor_sequence+' option:selected').each( function() {
    	var newPos = jQuery('#uploaded_file_list_'+editor_sequence+' option').index(this) - 1;
		
        if (newPos > -1) {

			//this는 현재 셀렉트된 값 jQuery(this).val()
			//this의 바로 위의 시퀀스 값
			var newVal = jQuery('#uploaded_file_list_'+editor_sequence+' option').eq(newPos).val();
			var formData = {editor_sequence:editor_sequence,file_srl:jQuery(this).val(),file_srl2:newVal};
			
		 	var request = jQuery.ajax({
				url: './addons/file_order/tpl/updown.php',type:'POST',dataType:'json',data:formData,
				success: function(result){
					if(result.ok == "ok"){
				 		removeUploadedFile_1sam(editor_sequence,newPos);
					}else if(result.ok == "bad"){
				}},
				global:false,cache:false,headers:{"cache-control":"no-cache","pragma":"no-cache"},	async:false,	error: function(){alert(result);}
			});
        }
    });

}

function file_order_down(editor_sequence){
	var	preview = jQuery('#preview_uploaded_'+editor_sequence);
	//preview.html('안녕');
	//preview.removeAttr('id');
	//preview.attr('id', '#preview_uploadedx_'+editor_sequence);
	
    var countOptions = jQuery('#uploaded_file_list_'+editor_sequence+' option').size();
    jQuery('#uploaded_file_list_'+editor_sequence+' option:selected').each( function() {			
        var newPos = jQuery('#uploaded_file_list_'+editor_sequence+' option').index(this) + 1;

        if (newPos < countOptions) {
			var newVal = jQuery('#uploaded_file_list_'+editor_sequence+' option').eq(newPos).val();
			var formData = {editor_sequence:editor_sequence,file_srl:jQuery(this).val(),file_srl2:newVal};
		 	var request = jQuery.ajax({
				url: './addons/file_order/tpl/updown.php',type:'POST',dataType:'json',data:formData,
				success: function(result){
					if(result.ok == "ok"){
						removeUploadedFile_1sam(editor_sequence,newPos);
					}else if(result.ok == "bad"){
				}},
				global:false,cache:false,headers:{"cache-control":"no-cache","pragma":"no-cache"},	async:false,	error: function(){alert(result);}
			});
        }
    });
}


//파일정렬을 변경하였을 때
//구체적으로 수정은 하지 않았으나 나중에 해야함
//idx는 리로드 된 후에 셀렉트 되어야할 인덱스값임


function removeUploadedFile_1sam(editorSequence,idx) {
	var cfg = uploaderSettings[editorSequence];
	var fileListAreaID = cfg.fileListAreaID;
	var fileListObj = get_by_id(fileListAreaID);
	
	var params = {
		mid : current_mid,
		file_list_area_id : cfg.fileListAreaID,
		editor_sequence   : cfg.editorSequence,
		upload_target_srl : cfg.uploadTargetSrl
	};

	function on_completex(ret, response_tags) {
		(function($){
			var $list, seq, files, target_srl, up_status, remain, items, i, c, itm, file_srl;
	
			seq   = ret.editor_sequence;
			files = ret.files;
			up_status  = ret.upload_status;
			target_srl = ret.upload_target_srl;
			//remain     = Math.floor((parseInt(ret.left_size,10)||0)/1024);
	
			$list = $('#'+cfg.fileListAreaID).empty();
	
			if(target_srl) {
				if(editorRelKeys[seq].primary.value != target_srl) {
					editorRelKeys[seq].primary.value = target_srl;
					//autosave();
				}
	
				editorRelKeys[seq].primary.value = target_srl;
				cfg.uploadTargetSrl = target_srl;
			}
	
			$('#'+cfg.uploaderStatusID).html(up_status);
			$('#'+cfg.previewAreaID).empty();
	
			if(files && files.item) {
				items = files.item;
				if(!$.isArray(items)) items = [items];
				for(i=0,c=items.length; i < c; i++) {
					itm = items[i];
	
					file_srl = itm.file_srl;
					uploadedFiles[file_srl] = itm;
	
					itm.previewAreaID = cfg.previewAreaID;
	
					/*if(/\.(jpe?g|png|gif)$/i.test(itm.download_url)) {
						loaded_images[file_srl] = jQuery('<img />').attr('src', itm.download_url).get(0);
					}*/
					$('<option />')
						.text(itm.source_filename + ' ('+itm.disp_file_size+' )')
						.attr('value', file_srl)
						.appendTo($list);
					/*if(i+1 == idx) {
						jQuery('<option />')
							.attr("selected", "selected");
					}*/
				}
				//jQuery(this).attr("selected","selected");
				//jQuery('#uploaded_file_list_'+editorSequence+' option').eq(idx).attr("selected", "selected");
				$list.prop('selectedIndex', idx).click();
			}
		
		})(jQuery);
	}

	exec_xml(
		'file',         // module
		'getFileList',  // act
		params,         // parameters
		on_completex,    // callback
		'error,message,files,upload_status,upload_target_srl,editor_sequence,left_size'.split(',') // response_tags
	);

}



function startProgress()
{
	var iFrame = document.createElement('iframe');
	document.getElementsByTagName('body')[0].appendChild(iFrame);
	iFrame.src = 'JsPush.php?progress';
}

function Zend_ProgressBar_Update(data)
{
	document.getElementById('pg-percent').style.width = data.percent + '%';

	document.getElementById('pg-text-1').innerHTML = data.text;
	document.getElementById('pg-text-2').innerHTML = data.text;
}

function Zend_ProgressBar_Finish()
{
	document.getElementById('pg-percent').style.width = '100%';

	document.getElementById('pg-text-1').innerHTML = 'Demo done';
	document.getElementById('pg-text-2').innerHTML = 'Demo done';
}

jQuery('#btn-up').bind('click', function() {
	jQuery('#uploaded_file_list_{$editor_sequence} option:selected').each( function() {
		var newPos = jQuery('#uploaded_file_list_{$editor_sequence} option').index(this) - 1;
		
		if (newPos > -1) {
			var newVal1 = $("#uploaded_file_list_{$editor_sequence} option").eq(newPos).val();


			jQuery('#uploaded_file_list_{$editor_sequence} option').eq(newPos).before("<option value='"+newVal1+"'>"+jQuery(this).text()+"</option>");
			jQuery('#uploaded_file_list_{$editor_sequence} option').eq(newPos + 1).val(jQuery(this).val());
			jQuery(this).remove();
			jQuery('#uploaded_file_list_{$editor_sequence} option').eq(newPos).attr("selected", "selected");
		}
	});
});

jQuery('#btn-down').bind('click', function() {
	var countOptions = jQuery('#uploaded_file_list_{$editor_sequence} option').size();
	jQuery('#uploaded_file_list_{$editor_sequence} option:selected').each( function() {			
		var newPos = jQuery('#uploaded_file_list_{$editor_sequence} option').index(this) + 1;
		
		if (newPos < countOptions) {
			var newVal1 = $("#uploaded_file_list_{$editor_sequence} option").eq(newPos).val();

			jQuery('#uploaded_file_list_{$editor_sequence} option').eq(newPos).after("<option value='"+newVal1+"'>"+jQuery(this).text()+"</option>");
			jQuery('#uploaded_file_list_{$editor_sequence} option').eq(newPos).val(jQuery(this).val());
			
			jQuery(this).remove();
			jQuery('#uploaded_file_list_{$editor_sequence} option').eq(newPos).attr("selected", "selected");
		}
	});
});

		
		

	

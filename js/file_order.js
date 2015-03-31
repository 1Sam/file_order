function file_order_up(seq){
	//jQuery('#uploaded_file_list_'+seq+' option:selected').each( function() {
    	//var newPos = jQuery('#uploaded_file_list_'+seq+' option').index(this) - 1;
		var newPos = jQuery('#uploaded_file_list_'+seq+' option:selected').index() - 1;
		
        if (newPos >= 0) {

			//this는 현재 셀렉트된 값 jQuery(this).val()
			//this의 바로 위의 시퀀스 값
			var thisVal = jQuery('#uploaded_file_list_'+seq+' option:selected').val();
			var newVal = jQuery('#uploaded_file_list_'+seq+' option').eq(newPos).val();
			var formData = {editor_sequence:seq,file_srl:thisVal,file_srl2:newVal};
			//alert(JSON.stringify(formData));
			
		 	var request = jQuery.ajax({
				url: './addons/file_order/file_order.ajax.php',type:'POST',dataType:'json',data:formData,
				success: function(result){
				
					if(result.error == 0){
				 		reload_filelists(seq,newPos);
					} else {
						alert(JSON.stringify(result));
					}
				},
				global:false,cache:false,headers:{"cache-control":"no-cache","pragma":"no-cache"},	async:false, error: function(e){alert(JSON.stringify(e));}
			});
        }
	//});
}

function file_order_down(seq){
	//var	preview = jQuery('#preview_uploaded_'+seq);

    var countOptions = jQuery('#uploaded_file_list_'+seq+' option').size();
    //jQuery('#uploaded_file_list_'+seq+' option:selected').each( function() {			
        //var newPos = jQuery('#uploaded_file_list_'+seq+' option').index(this) + 1;
		var newPos = jQuery('#uploaded_file_list_'+seq+' option:selected').index() + 1;

        if (newPos < countOptions) {
			var thisVal = jQuery('#uploaded_file_list_'+seq+' option:selected').val();
			var newVal = jQuery('#uploaded_file_list_'+seq+' option').eq(newPos).val();
			var formData = {editor_sequence:seq,file_srl:thisVal,file_srl2:newVal};
			//alert(JSON.stringify(formData));
		 	var request = jQuery.ajax({
				url: './addons/file_order/file_order.ajax.php',type:'POST',dataType:'json',data:formData,
				success: function(result){
					if(result.error != -1){
						reload_filelists(seq,newPos);
					}},
				global:false,cache:false,headers:{"cache-control":"no-cache","pragma":"no-cache"},	async:false, error: function(e){alert(JSON.stringify(e));}
			});
        }
    //});
}


//파일정렬을 변경하였을 때
//구체적으로 수정은 하지 않았으나 나중에 해야함
//idx는 리로드 된 후에 셀렉트 되어야할 인덱스값임


function reload_filelists(editorSequence,idx) {
	var cfgx = uploaderSettings[editorSequence];
	//var fileListAreaIDx = cfgx.fileListAreaID;
	//var fileListObjx = get_by_id(cfgx.fileListAreaID);
	
	var params = {
		mid : current_mid,
		file_list_area_id : cfgx.fileListAreaID,
		editor_sequence   : cfgx.editorSequence,
		upload_target_srl : cfgx.uploadTargetSrl
	};

	function reload_filelists_callbak(ret) {

		var $list, seq, files, target_srl, up_status, remain, items, i, c, itm, file_srl;
		seq   = ret.editor_sequence;
		files = ret.files;
		up_status  = ret.upload_status;
		target_srl = ret.upload_target_srl;

		$list = jQuery('#'+cfgx.fileListAreaID).empty();


		if(target_srl) {
			if(editorRelKeys[seq].primary.value != target_srl) {
				editorRelKeys[seq].primary.value = target_srl;
			}

			editorRelKeys[seq].primary.value = target_srl;
			cfgx.uploadTargetSrl = target_srl;
		}

		if(files) {
			items = files;
			if(!jQuery.isArray(items)) items = [items];
			for(var i in items) {
				//alert(JSON.stringify(itm) );
				itm = items[i];

				file_srl = itm.file_srl;
				uploadedFiles[file_srl] = itm;
				itm.previewAreaID = cfgx.previewAreaID;

				jQuery('<option />')
					.text(itm.source_filename + ' ('+itm.disp_file_size+' )')
					.attr('value', file_srl)
					.appendTo($list);
			}
			$list.prop('selectedIndex', idx).click();
		}
	}

	exec_json(
		'file.getFileList',  // act
		params,         // parameters
		reload_filelists_callbak,    // callback
		''// response_tags
	);
}
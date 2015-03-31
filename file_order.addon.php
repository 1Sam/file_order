<?php
if(!defined('__XE__')) exit();
/**
 * @file_order.addon.php
 * @author 1Sam (csh@korea.com)
 * @brief 1SamOnline 첨부파일정렬 애드온
 **/

if($called_position == 'after_module_proc' && $this->act == 'dispBoardWrite') {

	$file_order = 0;
	
	if($addon_info->file_order_editor=='document'){
		if(Context::get('act')=='dispBoardWrite') $file_order = 1;
	} else if($addon_info->file_order_editor=='comment'){
		if(Context::get('document_srl')) $file_order = 1;
	} else if($addon_info->file_order_editor=='all'){
		if(Context::get('act')=='dispBoardWrite') $file_order = 1;
	}
	
	if($file_order==1){
		Context::addCSSFile('./addons/file_order/css/addon.css');
		Context::addJsFile('./addons/file_order/js/file_order.js', false ,'', null, 'body');
	
		$document_srl = Context::get('document_srl');
		//시퀀스값; 새글일 경우만 시퀀스값, 아니면 글번호값
		$seq = $document_srl ? $document_srl : $_SESSION[_editor_sequence_];
	
		// 리스트 순서 바꾸기 버튼
		$updown_btn = sprintf('<div class="file_order_box"><input class="btn btn-primary btn-xs" type="button" onClick="%s" value="Up"/><input class="btn btn-primary btn-xs" type="button" onClick="%s" value="Down"/></div>',"file_order_up('{$seq}');", "file_order_down('{$seq}');");
	
		$footer_content = sprintf('
			<script type="text/javascript">
				jQuery(document).ready(function(){
					jQuery(".fileUploadControl").append("%s");
				});
			</script>
		',addslashes($updown_btn));
	
		Context::addHtmlFooter($footer_content);
	}
}
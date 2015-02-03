<?php

if(!defined("__ZBXE__")) exit();
if(!defined("__XE__")) exit();
/**
 * @file_order.addon.php
 * @author 1Sam (csh@korea.com)
 * @brief 1SamOnline 첨부파일정렬 애드온
 **/

if($called_position == 'after_module_proc') {

	$file_order = 0;
	if($addon_info->file_order_editor=='document'){
		if(Context::get('act')=='dispBoardWrite'){
		  $file_order = 1;
		}
	} else if($addon_info->file_order_editor=='comment'){
		if(Context::get('document_srl')){
		  $file_order = 1;
	
		}
	} else if($addon_info->file_order_editor=='all'){
		if(Context::get('act')=='dispBoardWrite'){
			$file_order = 1;
		}
	}
  
	if($file_order==1){
		Context::addCSSFile('./addons/file_order/css/addon.css');
		Context::addJSFile('./addons/file_order/js/file_order.js');
		//Context::addJSFile('./modules/zend_picasa/tpl/js/zend_picasa.js');
		//$addon_path = getUrl('').'addons/file_order/';
	
		//$header_content = '';
	
		//Context::addHtmlheader($header_content);
	
		// 리스트 순서 바꾸기 버튼
		$updown_btn = '<div class=\"file_order_box\"\>\<input class=\"btn btn-primary btn-xs\" type=\"button\" onClick=\"file_order_up(jQuery(\'.xpress_xeditor_editing_area_container\').attr(\'id\').substr(20,10));\" value=\"Up\"><\/input><input class=\"btn btn-primary btn-xs\" type=\"button\" onClick=\"file_order_down(jQuery(\'.xpress_xeditor_editing_area_container\').attr(\'id\').substr(20,10));\" value=\"Down\"><\/input><\/div>';
	  
		$progressbar = sprintf('<style>#long-running-process {	position: absolute;	left: -100px\;	top: -100px\;	width: 1px\;	height: 1px\;}#zend-progressbar-container {	width: 100px\;	height: 30px\;	border: 1px solid #000000;	background-color: #ffffff\;}#zend-progressbar-done {	width: 0\;	height: 30px\;	background-color: #000000\;}<\/style><div id=\"zend-progressbar-container\"><div id=\"zend-progressbar-done\"><\/div><\/div><iframe src=\"long-running-process.php\" id=\"long-running-process\"><\/iframe>');
  
  
		$progressbar2 ='';
  
	  /*
	  $stickter_list = array();
	  $stickter_temp_list = FileHandler::readDir(_XE_PATH_.'addons/file_order/stickers');
	  
	  foreach($stickter_temp_list as $key => $val){
		$filename = strtolower($val);
		if(substr($filename,-3)=='gif' || substr($filename,-3)=='jpg' || substr($filename,-3)=='png'){
		  $stickter_list[] = $val;
		}
	  }
  
	  sort($stickter_list);
  
	  $stickter_list_html = '';
	  if(count($stickter_list)>0){
		$stickter_list_html .= '<div class="file_order"><ul class="stickter_list">';
		$sticker_url = addslashes('jQuery(this).children("img").attr("src")');
		
		foreach($stickter_list as $key => $val){
		  $stickter_list_html .= '<li><a href="#" onclick="insertSticker(jQuery(\\\'.xpress_xeditor_editing_area_container\\\').attr(\\\'id\\\').substr(20,10),jQuery(this).children(\\\'img\\\').attr(\\\'src\\\')); return false;"><img src="'.$addon_path.'stickers/'.$val.'" /></a></li>';
		}
		$stickter_list_html .= '</ul></div>';
	  }
	  
		$footer_content = '';*/
		$footer_content = sprintf('
			<script type="text/javascript">
				jQuery(document).ready(function(){
					jQuery(".fileUploadControl").append("%s%s%s");
				});
			</script>
		', $updown_btn, $progressbar, $progressbar2);
		Context::addHtmlFooter($footer_content);
	}
}

<?php
define('__XE__', true);
require_once '../../config/config.inc.php';

$oContext = &Context::getInstance();
$oContext->init();

class post_var {
	// $_POST 로 건네받은 변수를 키값으로 정리함
	static $posts;

	public function __construct() {
	}

	public function get_Postvars_Array() {
		if ($_POST) {
			$posts = array();
			foreach ($_POST as $key => $value) {
				$posts[$key] = $value;
			}
		}
		else {
			$posts = $_SERVER['QUERY_STRING'];
		}
		return $posts;
	}
}

// Object class에 연결하여 $this->add() 사용 가능  
class file_order extends Object {

	// 필요한 변수 설정
	public $editor_sequence;
	protected $f_0;
	static $f_1;

	public function __construct()
	{
		//sequence_srl, file_srl, file_srl2
		$_posts = new post_var;
		$post_vars = $_posts->get_Postvars_Array();
		
		// 필요한 변수 설정
		$this->editor_sequence = $post_vars[editor_sequence]; //에디터
		$this->f_0 = $post_vars[file_srl]; // 현재
		$this->f_1 = $post_vars[file_srl2]; // 상단 또는 하단
	}

	public function change_seq() {
		//file_srl 변경하기
		// 1. 현재값을 editor_sequence로 변경
		// 2. 상단 또는 하단의 값을 현재의 file_srl 로 수정
		// 3. editor_sequence 로 변경된 현재의 값을 file_srl2로 수정
		
		// 1. 현재값을 editor_sequence로 변경
		$args->file_srl = $this->f_0;
		$args->file_srl_temp = $this->editor_sequence; 

		$output = executeQueryArray('addons.file_order.updateFile_srl', $args);
		if(!$output->toBool()) return array('error' => '-1','message' => $output);
		
		// 2. 상단의 값을 현재의 file_srl 로 수정
		$args->file_srl = $this->f_1;
		$args->file_srl_temp = $this->f_0; 
		
		$output = executeQueryArray('addons.file_order.updateFile_srl', $args);
		if(!$output->toBool()) return array('error' => '-1','message' => $output);
		
		
		// 3. editor_sequence 로 변경된 현재의 값을 file_srl2로 수정
		$args->file_srl = $this->editor_sequence;
		$args->file_srl_temp = $this->f_1;
		
		$output = executeQueryArray('addons.file_order.updateFile_srl', $args);
		if(!$output->toBool()) return array('error' => '-1','message' => $output);
		
		//echo json_encode(array('ok' => 'ok','tt' => $args->file_srl_temp));

		$this->setError(0);
 		$this->setMessage('success_registed');
		$this->add('sequence_srl', $args->file_srl_temp);

		return $this;			
	}
}

$file_order = new file_order;
$result = $file_order->change_seq();

echo json_encode($result);

$oContext->close();
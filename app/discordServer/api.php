<?php

$confirmation_token = '1111';

define('TEXT_FILE', './2046269b-e31e-48b3-af33-4f10d66eee8a.txt');

function vk_msg_send($peer_id, $text){
	$request_params = array(
		'message' => $text, 
		'peer_id' => $peer_id, 
		'access_token' => "111111",
		'v' => '5.87' 
	);
	$get_params = http_build_query($request_params); 
	file_get_contents('https://api.vk.com/method/messages.send?'. $get_params);
}

function _check_user($userId){
    $userId = "".$userId."";
    return $userId == "1111111";
}

function _message_new($data){
    $message_text = $data -> object -> text;
	$chat_id = $data -> object -> peer_id;
	if (!_check_user($chat_id)){
	    vk_msg_send($chat_id, "Твой идентификатор ".$chat_id.". Обратись к админу группы");
	    return;
	}
	if ($message_text == '/view'){
	    $str = htmlentities(file_get_contents(TEXT_FILE));
	    vk_msg_send($chat_id, $str);
	    return;
	}
	if ($message_text == '/clear'){
	    vk_msg_send($chat_id, "Почистил");
	    file_put_contents(TEXT_FILE, "");
	    return;
	}
	$text = $message_text."\n";
	$text.= file_get_contents(TEXT_FILE);
    file_put_contents(TEXT_FILE, $text ."\n");
	vk_msg_send($chat_id, $text);
	return;
}

$data = json_decode(file_get_contents('php://input'));

if ($data->type == 'confirmation'){
    echo $confirmation_token;
    die;
}

if ($data->type == 'message_new'){
    _message_new($data);
    echo 'ok';
    die;
}
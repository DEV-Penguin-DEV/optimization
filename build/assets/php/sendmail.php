<?php
   
   if(isset($_POST['bot']) && $_POST['bot'] === "false"){
	   
	       // НАСТРОЙКИ получателя/отправителя
    $to_email       = "Blacklotus-nsk@mail.ru";        // Email получателя отчетов, например: 'admin@mysite.ru'
    $to_name        = "";                                // Имя получателя отчетов, например: 'Иван Петров'
    $from_email     = "info@black-lotus.vip";                                // Email отправителя, например: 'noreply@mysite.ru'
    $from_name      = "";                                // Имя, от которого отправляются отчеты, например: 'Мой Сайт'
    $subject        = "[blacklotus54.ru]";                   // Название сайта в квадратных скобках для подстановки в тему письма префиксом


    // НЕ ТРОГАЙТЕ КОД НИЖЕ ЭТОЙ СТРОКИ!!!

    $data["form"]       = strtolower(strip_tags($_REQUEST['form']));
    $data["name"]       = strip_tags($_REQUEST['name']);
    $data["phone"]      = strip_tags($_REQUEST['phone']);
    $data["review"]     = strip_tags($_REQUEST['review']);
    $data["girl"]       = strip_tags($_REQUEST['girl']);
    $data["program"]    = strip_tags($_REQUEST['program']);
    $data["action"]     = strip_tags($_REQUEST['action']);

    if (empty($data["form"])) exit;

    switch ($data["form"]) {


        case "form-callback":
            $headline = "Обратный звонок";
            break;
        case "form-girl":
            $headline = "Выбор девушки";
            break;
        case "form-program":
            $headline = "Выбор программы";
            break;
        case "form-review":
            $headline = "Отзыв";
            break;
        case "form-action":
            $headline = "Запись по акции";
            break;
        case "form-certificate":
            $headline = "Заказ сертификата";
            break;
        case "form-taxi":
            $headline = "Заказ такси";
            break;
        default:
            $headline = "Онлайн-заявка";
    };

    $subject .= " " . $headline;

    $to_email       = strip_tags(trim($to_email));
    $from_email     = strip_tags(trim($from_email));

    if (empty($from_email)) {$from_email = $to_email;}

    $headers  = "From: $from_name <$from_email>\r\n";
    $headers .= "Reply-To: $from_name <$from_email>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

    $message  = "<html><body style=\"font-family:Arial,sans-serif;\">\r\n";
    $message .= "<h2 style=\"border-bottom:1px solid #ccc;\">" . $headline. "</h2>\r\n";
    if (!empty($data["name"])){
        $message .= "<p><strong>Имя:</strong> " . $data["name"] . "</p>\r\n";
    };
    if (!empty($data["phone"])){
        $message .= "<p><strong>Телефон:</strong> " . $data["phone"] . "</p>\r\n";
    };
    if (!empty($data["review"])){
        $message .= "<p><strong>Отзыв:</strong> " . $data["review"] . "</p>\r\n";
    };
    if (!empty($data["girl"])){
        $message .= "<p><strong>Девушка:</strong> " . $data["girl"] . "</p>\r\n";
    };
    if (!empty($data["program"])){
        $message .= "<p><strong>Программа:</strong> " . $data["program"] . "</p>\r\n";
    };
    if (!empty($data["action"])){
        $message .= "<p><strong>Акция:</strong> " . $data["action"] . "</p>\r\n";
    };
    $message .= "</body></html>";

    $result = @mail($to_email, $subject, $message, $headers);
	
	
		if (isset($_POST['form']) && $_POST['form']) $form = $_POST['form'];
	if (isset($_POST['name']) && $_POST['name']) $name = $_POST['name'];
	if (isset($_POST['phone']) && $_POST['phone']) $phone = $_POST['phone'];
	if (isset($_POST['program']) && $_POST['program']) $program = $_POST['program'];
	if (isset($_POST['girl']) && $_POST['girl']) $girl = $_POST['girl'];
	if (isset($_POST['phone']) && $_POST['phone']) $phone = $_POST['phone'];

	
	// Данные должны быть в кодировке UTF-8! Иначе — это может привести к ошибке.
// Если вы используете кодировку Windows-1251, то можно преобразовать все переменные через $value = iconv("Windows-1251", "UTF-8", $value);
// или указать в доп. полях ключ 'charset' с используемой на сайте кодировкой, сервер Roistat, конвертирует все значения из указанной кодировки в UTF-8.
  
// ...
// Где-то здесь вызывается текущая функция создания сделки, например, функция mail().
// ...
  
$roistatData = array(
    'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null,
    'key'     => 'MjBkYmU0ZWEzYjBhMWI4OTZiNjE3NmQxYjBiZGM2MmU6OTQxODM=', // Ключ для интеграции с CRM, указывается в настройках интеграции с CRM.
    'title'   => "{$name}{visit}", // Название сделки
    'comment' => "Форма {$form}, Программа {$program}, Девушка {$girl}, {domain}", // Комментарий к сделке
    'name'    => "{$name}", // Имя клиента
    'phone'   => "{$phone}", // Номер телефона клиента
    'is_need_callback' => '1', // После создания в Roistat заявки, Roistat инициирует обратный звонок на номер клиента, если значение параметра рано 1 и в Ловце лидов включен индикатор обратного звонка.
    'callback_phone' => '79039314111', // Переопределяет номер, указанный в настройках обратного звонка.
    'sync'    => '0', // 
    'is_need_check_order_in_processing' => '0', // Включение проверки заявок на дубли
    'is_need_check_order_in_processing_append' => '0', // Если создана дублирующая заявка, в нее будет добавлен комментарий об этом
    'fields'  => array(
    // Массив дополнительных полей. Если дополнительные поля не нужны, оставьте массив пустым.
    // Примеры дополнительных полей смотрите в таблице ниже.
     //'charset' => 'UTF-8', // Сервер преобразует значения полей из указанной кодировки в UTF-8.
	 '1149265' => 824245
    ),
);
  
file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));
	

    if($result) {
        echo "true";
    } else {
        echo "false";
    }
	   
   }else{
	   
	   echo "BOT";
	   
   }


?>

<?php

include_once '../../../config/config.php';

$database = new Database();
$db = $database->getConnection();

$data = getInput();
try {
    $db->beginTransaction();
    $userid = checkAuth();

    $input = validate($data, [
        'guid' => 'required|string',
    ]);

    $board = Board::getByGuid($db, $input->guid);
    $statuses = $board->status();

    $cards = [];
    foreach ($statuses as $status) {
        $newCards = $status->cards();
        foreach ($newCards as $newCard) {
            $newCard->{'statusid'} =  $status->guid;
        }
        $cards = array_merge($cards, $newCards);
    }

    $db->commit();

    Response::sendResponse([
        "status" => true,
        "data" => $cards
    ]);
} catch (\Exception $th) {

    $db->rollBack();
    print_r(json_encode(array("status" => false, "message" => $th->getMessage(), "code" => $th->getCode())));
}
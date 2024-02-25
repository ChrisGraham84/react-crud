<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    include("DbConnect.php");
    $conn = new DbConnect();
    $db = $conn->connect();
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $sql = "SELECT * FROM user";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if(isset($path[2]) && is_numeric($path[2])) {
                $sql .= " WHERE id = :id";
                $stmt = $db->prepare($sql);
                $stmt->bindParam(':id', $path[2]);
                $stmt->execute();
                $users = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $stmt = $db->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
    
            echo json_encode($users);
            break;
        case 'POST':
            $user = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO user(id, name, email, mobile, created_at) values(null, :name, :email, :mobile, :created_at)";
            $stmt = $db->prepare($sql);
            $date = date('Y-m-d');
            $stmt->bindParam(':name', $user->name);
            $stmt->bindParam(':email', $user->email);
            $stmt->bindParam(':mobile', $user->mobile);
            $stmt->bindParam(':created_at', $date);
            if($stmt->execute()) {
                $data = ['status' => 1, 'message' => "Record successfully created"];
            } else {
                $data = ['status' => 0, 'message' => "Failed to create record."];
            }
            echo json_encode($data);
            break;
        case "PUT":
                $user = json_decode( file_get_contents('php://input') );
                $sql = "UPDATE user SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
                $stmt = $db->prepare($sql);
                $updated_at = date('Y-m-d');
                $stmt->bindParam(':id', $user->id);
                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':mobile', $user->mobile);
                $stmt->bindParam(':updated_at', $updated_at);
        
                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update record.'];
                }
                echo json_encode($response);
                break;
        
        case "DELETE":
                $sql = "DELETE FROM user WHERE id = :id";
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $stmt = $db->prepare($sql);
                $stmt->bindParam(':id', $path[2]);
        
                if($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
                break;
}
?>
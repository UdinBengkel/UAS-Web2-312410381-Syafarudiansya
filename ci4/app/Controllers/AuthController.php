<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController {
    public function login() {
        $username = $this->request->getJSON()->username ?? '';
        $password = $this->request->getJSON()->password ?? '';

        $db = \Config\Database::connect();
        $user = $db->table('users')
                   ->where('username', $username)
                   ->where('password', md5($password))
                   ->get()->getRow();

        if (!$user) {
            return $this->response->setStatusCode(401)
                ->setJSON(['message' => 'Username atau password salah']);
        }

        $token = bin2hex(random_bytes(32));
        $db->table('users')->where('id', $user->id)->update(['token' => $token]);

        return $this->response->setJSON([
            'message' => 'Login berhasil',
            'token'   => $token
        ]);
    }

    public function logout() {
        $authHeader = $this->request->getHeaderLine('Authorization');
        $token = substr($authHeader, 7);
        $db = \Config\Database::connect();
        $db->table('users')->where('token', $token)->update(['token' => null]);
        return $this->response->setJSON(['message' => 'Logout berhasil']);
    }
}
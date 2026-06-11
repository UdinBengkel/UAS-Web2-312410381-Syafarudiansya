<?php
namespace App\Filters;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface {
    public function before(RequestInterface $request, $arguments = null) {
        $authHeader = $request->getHeaderLine('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->setStatusCode(401)->setJSON(['message' => 'Unauthorized']);
        }
        $token = substr($authHeader, 7);
        $db = \Config\Database::connect();
        $user = $db->table('users')->where('token', $token)->get()->getRow();
        if (!$user) {
            return response()->setStatusCode(401)->setJSON(['message' => 'Token tidak valid']);
        }
    }
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}
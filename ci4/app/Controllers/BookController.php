<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use App\Models\BookModel;

class BookController extends ResourceController {
    protected $modelName = BookModel::class;
    protected $format    = 'json';

    // GET /books
    public function index() {
        $db = \Config\Database::connect();
        $books = $db->table('books b')
            ->select('b.*, g.name as genre_name')
            ->join('genres g', 'g.id = b.genre_id', 'left')
            ->get()->getResultArray();
        return $this->respond($books);
    }

    // GET /books/:id
    public function show($id = null) {
        $book = $this->model->find($id);
        if (!$book) return $this->failNotFound('Buku tidak ditemukan');
        return $this->respond($book);
    }

    // POST /books
    public function create() {
        $data = $this->request->getJSON(true);
        if (!$this->model->insert($data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respondCreated(['message' => 'Buku berhasil ditambahkan']);
    }

    // PUT /books/:id
    public function update($id = null) {
        $data = $this->request->getJSON(true);
        if (!$this->model->update($id, $data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['message' => 'Buku berhasil diupdate']);
    }

    // DELETE /books/:id
    public function delete($id = null) {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Buku tidak ditemukan');
        }
        return $this->respondDeleted(['message' => 'Buku berhasil dihapus']);
    }
}
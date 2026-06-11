<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use App\Models\BorrowingModel;

class BorrowingController extends ResourceController {
    protected $modelName = BorrowingModel::class;
    protected $format    = 'json';

    public function index() {
        $db = \Config\Database::connect();
        $data = $db->table('borrowings br')
            ->select('br.*, m.name as member_name, b.title as book_title')
            ->join('members m', 'm.id = br.member_id', 'left')
            ->join('books b', 'b.id = br.book_id', 'left')
            ->get()->getResultArray();
        return $this->respond($data);
    }

    public function show($id = null) {
        $item = $this->model->find($id);
        if (!$item) return $this->failNotFound('Data peminjaman tidak ditemukan');
        return $this->respond($item);
    }

    public function create() {
        $data = $this->request->getJSON(true);
        if (!$this->model->insert($data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respondCreated(['message' => 'Peminjaman berhasil ditambahkan']);
    }

    public function update($id = null) {
        $data = $this->request->getJSON(true);
        if (!$this->model->update($id, $data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['message' => 'Peminjaman berhasil diupdate']);
    }

    public function delete($id = null) {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Data peminjaman tidak ditemukan');
        }
        return $this->respondDeleted(['message' => 'Peminjaman berhasil dihapus']);
    }
}
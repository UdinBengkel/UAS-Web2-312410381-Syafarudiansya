<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use App\Models\MemberModel;

class MemberController extends ResourceController {
    protected $modelName = MemberModel::class;
    protected $format    = 'json';

    public function index() {
        return $this->respond($this->model->findAll());
    }

    public function show($id = null) {
        $member = $this->model->find($id);
        if (!$member) return $this->failNotFound('Member tidak ditemukan');
        return $this->respond($member);
    }

    public function create() {
        $data = $this->request->getJSON(true);
        if (!$this->model->insert($data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respondCreated(['message' => 'Member berhasil ditambahkan']);
    }

    public function update($id = null) {
        $data = $this->request->getJSON(true);
        if (!$this->model->update($id, $data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['message' => 'Member berhasil diupdate']);
    }

    public function delete($id = null) {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Member tidak ditemukan');
        }
        return $this->respondDeleted(['message' => 'Member berhasil dihapus']);
    }
}
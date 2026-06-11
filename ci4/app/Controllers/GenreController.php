<?php
namespace App\Controllers;
use CodeIgniter\RESTful\ResourceController;
use App\Models\GenreModel;

class GenreController extends ResourceController {
    protected $modelName = GenreModel::class;
    protected $format    = 'json';

    public function index() {
        return $this->respond($this->model->findAll());
    }

    public function show($id = null) {
        $genre = $this->model->find($id);
        if (!$genre) return $this->failNotFound('Genre tidak ditemukan');
        return $this->respond($genre);
    }

    public function create() {
        $data = $this->request->getJSON(true);
        if (!$this->model->insert($data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respondCreated(['message' => 'Genre berhasil ditambahkan']);
    }

    public function update($id = null) {
        $data = $this->request->getJSON(true);
        if (!$this->model->update($id, $data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['message' => 'Genre berhasil diupdate']);
    }

    public function delete($id = null) {
        if (!$this->model->delete($id)) {
            return $this->failNotFound('Genre tidak ditemukan');
        }
        return $this->respondDeleted(['message' => 'Genre berhasil dihapus']);
    }
}
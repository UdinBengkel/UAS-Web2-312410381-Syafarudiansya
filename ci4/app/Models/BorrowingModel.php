<?php
namespace App\Models;
use CodeIgniter\Model;

class BorrowingModel extends Model {
    protected $table      = 'borrowings';
    protected $primaryKey = 'id';
    protected $allowedFields = ['member_id', 'book_id', 'borrow_date', 'return_date', 'status'];
}
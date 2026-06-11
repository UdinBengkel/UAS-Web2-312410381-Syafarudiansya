<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

$routes->get('/', 'Home::index');
// Auth (public)
$routes->post('auth/login', 'AuthController::login');

// Public - hanya GET
$routes->get('books',    'BookController::index');
$routes->get('books/(:num)', 'BookController::show/$1');
$routes->get('genres',   'GenreController::index');
$routes->get('members',  'MemberController::index');
$routes->get('borrowings', 'BorrowingController::index');

// Protected - butuh token
$routes->group('', ['filter' => 'auth'], function($routes) {
    $routes->post('auth/logout',        'AuthController::logout');
    $routes->post('books',              'BookController::create');
    $routes->put('books/(:num)',        'BookController::update/$1');
    $routes->delete('books/(:num)',     'BookController::delete/$1');
    $routes->post('genres',             'GenreController::create');
    $routes->put('genres/(:num)',       'GenreController::update/$1');
    $routes->delete('genres/(:num)',    'GenreController::delete/$1');
    $routes->post('members',            'MemberController::create');
    $routes->put('members/(:num)',      'MemberController::update/$1');
    $routes->delete('members/(:num)',   'MemberController::delete/$1');
    $routes->post('borrowings',         'BorrowingController::create');
    $routes->put('borrowings/(:num)',   'BorrowingController::update/$1');
    $routes->delete('borrowings/(:num)','BorrowingController::delete/$1');
});

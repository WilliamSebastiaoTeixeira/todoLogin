<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->group("api", ['filter' => 'cors'], function ($routes) {
  $routes->post("registrar", "Register::index");
  $routes->post("login", "Login::index");
  $routes->get("users", "User::index", ['filter' => 'authFilter']);
});

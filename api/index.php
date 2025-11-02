<?php

// Vercel Serverless Entry Point for Laravel
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Set the public path to the actual public directory
$_SERVER['DOCUMENT_ROOT'] = __DIR__ . '/../public';

// Check for maintenance mode
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request
$app = require_once __DIR__.'/../bootstrap/app.php';

// Handle the request and send response
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Request::capture()
);

$response->send();

$kernel->terminate($request, $response);

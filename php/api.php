<?php

/**
 * API Script
 *
 * Author Jerry Shaw <jerry-shaw@live.com>
 * Author 秋水之冰 <27206617@qq.com>
 *
 * Copyright 2017 Jerry Shaw
 * Copyright 2018 秋水之冰
 *
 * This file is part of NervSys.
 *
 * NervSys is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NervSys is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NervSys. If not, see <http://www.gnu.org/licenses/>.
 */

declare(strict_types = 1);

//Check Version
if (version_compare(PHP_VERSION, '7.1.0', '<')) exit('NervSys needs PHP 7.1.0 or higher!');

//Load Basic Config
require __DIR__ . '/core/conf.php';

//Load Router CORS
\core\ctr\router::load_cors();

//Load Router Config
\core\ctr\router::load_conf();

//Run Process
'cli' !== PHP_SAPI ? \core\ctr\router\cgi::run() : \core\ctr\router\cli::run();

//Output Result
\core\ctr\router::output();
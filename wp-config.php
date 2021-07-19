<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
//define( 'DB_NAME', 'wordpress572' );

/** MySQL database username */
//define( 'DB_USER', 'root' );

/** MySQL database password */
//define( 'DB_PASSWORD', 'password' );

/** MySQL hostname */
//define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
//define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
//define( 'DB_COLLATE', '' );

$cleardb_url = "mysql://b1c2ec4629cbae:e5e76195@us-cdbr-east-04.cleardb.com/heroku_175821986883f1a?reconnect=true";

if(isset($cleardb_url)) {
    $db = parse_url($cleardb_url);
    define('DB_NAME', "sql6426365");
    define('DB_USER', "sql6426365");
    define('DB_PASSWORD', "Please wait");
    define('DB_HOST', "sql6.freemysqlhosting.net");
    define('DB_CHARSET', 'utf8');
    define('DB_COLLATE', '');
} else {
    die('No Database credentials!');
}

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'gw?D!,DY/opL([0?EJQ]S1`Pf-RL@=x--Kig>C}},.;1ywBUNAc2*mnxu:8}(lkA' );
define( 'SECURE_AUTH_KEY',  '.|, )GnQ80S#{vb-7u7o1FV,,%6^G%fPf8P_8%5q#_5A.EPKt)qzmb}3--Gu#tAf' );
define( 'LOGGED_IN_KEY',    '@G5&^izVB@g%S#Wo0WQIUysuy_MDlo{,{$-5VL;vKC[WKpfxcDr1Y5zW`,WxSa6t' );
define( 'NONCE_KEY',        'ixj&l47huN.=-^XO-#/Rp L;r>L Q-NX.K4O*KsN><,@K]9ah*Dj%W4`8@x$#hJZ' );
define( 'AUTH_SALT',        'u.;1$hE|M=VHM&J^u#8/7Zlp)3z:^u[-l) ~:tyu11$Bli:MPqPoq%QB.~;3,!x0' );
define( 'SECURE_AUTH_SALT', '&_|G;1F# ,ngM/Su1LpBff+hnr/G@P3J[*aMkR,pB7ZQb1Kz,`T/VDl5r+9`5Yu9' );
define( 'LOGGED_IN_SALT',   'jSd>j^{VVKP>-jb7M^(E[t% p;ve%PO!HQn6M+aakWaw?Xp]Qk?xN[*FG4HW+J4s' );
define( 'NONCE_SALT',       'z@>h4g$4JQax_4wi>Qo -@,u9aroO~ hU/+kgM7*{;{xA8_ RkyQ1- z7Wx@mO8=' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

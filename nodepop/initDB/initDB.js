'use strict'
const connection = require('../lib/connectMogoose')
const Ad = require('../model/Ads')

main().catch(err => console.log('Hubo un error ' + err))

async function main() {

    await initAd()
    connection.close()

}

async function initAd() {
    //Borro lo que hay
    const del = await Ad.deleteMany()
    console.log(`Se han borrado ${del.deletedCount}.`)

    //añado anuncios

    const insertAds = await Ad.insertMany(
        [
            {
                "name": "Cámara clásica Nikon F3",
                "sell": true,
                "price": 350,
                "photo": "nikon_f3.jpg",
                "tags": ["work", "lifestyle"]
            },
            {
                "name": "Teléfono móvil Nokia 3310",
                "sell": false,
                "price": 50,
                "photo": "nokia_3310.jpg",
                "tags": ["mobile", "lifestyle"]
            },
            {
                "name": "Consola clásica Nintendo Entertainment System (NES)",
                "sell": true,
                "price": 200,
                "photo": "nes.jpg",
                "tags": ["lifestyle"]
            },
            {
                "name": "Juego Super Mario Bros",
                "sell": true,
                "price": 30,
                "photo": "super_mario_bros.jpg",
                "tags": ["lifestyle"]
            },
            {
                "name": "Cámara clásica Leica M3",
                "sell": true,
                "price": 1200,
                "photo": "leica_m3.jpg",
                "tags": ["work", "lifestyle"]
            },
            {
                "name": "Teléfono móvil Motorola Razr V3",
                "sell": false,
                "price": 80,
                "photo": "motorola_razr_v3.jpg",
                "tags": ["mobile", "lifestyle"]
            },
            {
                "name": "Consola clásica Atari 2600",
                "sell": true,
                "price": 100,
                "photo": "atari_2600.jpg",
                "tags": ["lifestyle"]
            },
            {
                "name": "Juego Pac-Man",
                "sell": true,
                "price": 20,
                "photo": "pacman.jpg",
                "tags": ["lifestyle"]
            },
            {
                "name": "Cámara clásica Canon AE-1",
                "sell": true,
                "price": 250,
                "photo": "canon_ae1.jpg",
                "tags": ["work", "lifestyle"]
            },
            {
                "name": "Teléfono móvil BlackBerry Curve 8520",
                "sell": false,
                "price": 40,
                "photo": "blackberry_curve_8520.jpg",
                "tags": ["mobile", "work"]
            },
            {
                "name": "Consola clásica Sega Mega Drive (Genesis)",
                "sell": true,
                "price": 150,
                "photo": "sega_mega_drive.jpg",
                "tags": ["lifestyle"]
            },
            {
                "name": "Juego The Legend of Zelda",
                "sell": true,
                "price": 40,
                "photo": "legend_of_zelda.jpg",
                "tags": ["lifestyle"]
            },
            {
                "name": "Cámara clásica Pentax K1000",
                "sell": true,
                "price": 180,
                "photo": "pentax_k1000.jpg",
                "tags": ["work", "lifestyle"]
            },
            {
                "name": "Teléfono móvil Sony Ericsson T610",
                "sell": false,
                "price": 35,
                "photo": "sony_ericsson_t610.jpg",
                "tags": ["mobile", "lifestyle"]
            },
            {
                "name": "Consola clásica Super Nintendo Entertainment System (SNES)",
                "sell": true,
                "price": 180,
                "photo": "snes.jpg",
                "tags": ["lifestyle"]
            },
            {
                "name": "Juego Tetris",
                "sell": true,
                "price": 15,
                "photo": "tetris.jpg",
                "tags": ["lifestyle"]
            },
            {
                "name": "Cámara clásica Minolta X-700",
                "sell": true,
                "price": 300,
                "photo": "minolta_x700.jpg",
                "tags": ["work", "lifestyle"]
            },
            {
                "name": "Teléfono móvil Siemens S55",
                "sell": false,
                "price": 25,
                "photo": "siemens_s55.jpg",
                "tags": ["mobile", "work"]
            },
            {
                "name": "Consola clásica PlayStation 1 (PS1)",
                "sell": true,
                "price": 120,
                "photo": "ps1.jpg",
                "tags": ["lifestyle"]
            },
            {
                "name": "Juego Sonic the Hedgehog",
                "sell": true,
                "price": 25,
                "photo": "sonic_the_hedgehog.jpg",
                "tags": ["lifestyle"]
            }
        ]

    )
    console.log(`Se han creado ${insertAds.length} anuncios.`)

}
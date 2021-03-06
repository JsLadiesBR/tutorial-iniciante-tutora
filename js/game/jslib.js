'use strict'

var jogo;

const criarTelaJogo = function (largura, altura, preload, create, update) {
	jogo = new Phaser.Game(largura, altura, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update
	})
}

const carregarImagem = function (nome, url) {
	jogo.load.image(nome, url)
}

const carregarSprites = function (nome, url, urljson) {
	jogo.load.atlas(nome, url, urljson)
}

const carregarMapa = function (url, urlcvs) {
	jogo.load.tilemap('floor_0',urlcvs,null,Phaser.Tilemap.CSV)
	jogo.load.image('tiles', url)
}

const criarJogadora = function (x, y, nomeImagem) {
	const player = jogo.add.sprite(x,y,nomeImagem)
	jogo.physics.enable(player, Phaser.Physics.ARCADE)
	player.body.setSize(156,156,1,0)
	adicionarAnimacao(player)
	player.animations.play('down')

	return player
}

const adicionarAnimacao = function(jogadora){
	jogadora.animations.add('down', Phaser.Animation.generateFrameNames('sprite',1,3),10, true)
	return jogadora
}

const cameraSeguir = function (jogadora) {
	jogo.camera.follow(jogadora)
}

const criarMapa = function() {
	const map = jogo.add.tilemap('floor_0', 48, 48)
	map.addTilesetImage('tiles')
	const layer = map.createLayer(0)
	layer.resizeWorld()
}

const moverJogadora = function (mover) {
	mover()
}

function cima () {
	return jogo.input.keyboard.isDown(Phaser.Keyboard.UP)
}

function baixo () {
	return jogo.input.keyboard.isDown(Phaser.Keyboard.DOWN)
}

function esquerda () {
	return jogo.input.keyboard.isDown(Phaser.Keyboard.LEFT)
}

function direita () {
	return jogo.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
}

function iniciarAnimacao ( jogadora, direcao ) {
	jogadora.animations.play(direcao)
}

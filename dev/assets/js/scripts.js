'use strict';

import $ from 'jquery';
import 'slick-carousel';
import 'jquery-mask-plugin';

const $prevArrow = '<span class="o-slick-arrow o-slick-arrow--prev" aria-label="anterior"></span>',
$nextArrow = '<span class="o-slick-arrow o-slick-arrow--next" aria-label="próximo"></span>';

var APP = {

	common: {

		init: function () {

			//Show loading image during requisitions
			/*$(document).ajaxStart( () => $('.js-loader').show() );
			$(document).ajaxComplete( () =>	$('.js-loader').hide() );*/

		}
	},

	pages: {

		init: function () {

		},

		index: function () {
			let possibilidades = [
			'Até o final', 
			'Como um casal',
			'No milharal',
			'No café colonial',
			'Fazendo sexo anal',
			'Comendo pão integral',
			'Com o Sidney Magal',
			'No Domingo Legal',
			'Na Laboral',
			'Estudando o Relativismo Cultural',
			'Pulando no Carnaval',
			'Comendo cereal',
			'Dando fatality com o Kabal',
			'Contra o Estado Patriarcal',
			'Praticando sexo casual',
			'Usando linguagem formal',
			'Estudando a reforma gramatical',
			'No bacanal',
			'No mesmo canal',
			'No sarau',
			'Ouvindo metal',
			'Com o Guarda Florestal',
			'Dando cavalo de pau',
			'No tratamento dental',
			'No tratamento de canal',
			'No vendaval',
			'Vendo a aurora boreal',
			'No mesmo local',
			'Estudando o código penal',
			'Comendo sal',
			'Viajando pra Blumenau',
			'Dando um grau',
			'Comendo mingau',
			'Subindo degrau',
			'No litoral',
			'Fazendo abdominal',
			'Na Alemanha Ocidental',
			'No Programa Aeroespacial',
			'Com o Amaral',
			'Tomando antigripal',
			'Tomando anticoncepcional',
			'No arraial',
			'Torcendo pro Arsenal',
			'Usando avental',
			'Bebendo água mineral',
			'Na Bienal',
			'Rezando na catedral',
			'Assistindo Hannibal',
			'Lendo a carta capital',
			'No curral',
			'Na zona eleitoral',
			'Comprando o enxoval',
			'No culto espiritual',
			'No conversa com Bial',
			'Jogando Portal',
			'No show do Charlie Brown'
			];


			let button = document.getElementById('gerador'),
			texto = document.getElementById('texto');

			button.addEventListener('click', function(){
				let randomValue = possibilidades[Math.floor(possibilidades.length * Math.random())];
				texto.innerHTML = randomValue;

			});
		},
	}

};

var UTIL = {
	exec: function (controller, action) {
		var namespace = APP;
		action = (action === undefined) ? "init" : action;

		if (controller !== "" && namespace[controller] && typeof namespace[controller][action] == "function") {
			namespace[controller][action]();
		}
	},

	init: function () {
		var body = document.body;
		var controller = body.getAttribute("data-controller");
		var action = body.getAttribute("data-action");

		UTIL.exec("common");
		UTIL.exec(controller);
		UTIL.exec(controller, "common");
		UTIL.exec(controller, action);
	}
};

$(document).ready(UTIL.init);
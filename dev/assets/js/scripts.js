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
			let $audioPlayer = $('.js-audio'),
				$karaoke 	 = $('.js-karaoke'),
				$btn 		 = $('.js-btn');
			let music = [
				{'start': '0.154956', 'end': '0.643498', 'text': 'Diga o que ', 'insert': false},
				{'start': '0.643498', 'end': '1.930525', 'text': 'te fez ', 'insert': false},
				{'start': '2.005343', 'end': '2.559279', 'text': 'sentir ', 'insert': false}, 
				{'start': '2.559279', 'end': '4.075946', 'text': 'saudade. <br/>', 'insert': false},
				{'start': '4.456461', 'end': '5.211789', 'text': 'Bote um ', 'insert': false},
				{'start': '5.093975', 'end': '6.095257', 'text': 'ponto ', 'insert': false},
				{'start': '6.082425', 'end': '8.829874', 'text': 'finaaaal. <br/>', 'insert': false},
				{'start': '9.000000', 'end': '9.943571', 'text': 'Cole ', 'insert': false},
				{'start': '9.943571', 'end': '10.558583', 'text': 'de uma ', 'insert': false},
				{'start': '10.864018', 'end': '11.79269', 'text': 'vez ', 'insert': false},
				{'start': '11.29269', 'end': '12.3217', 'text': 'nossas ', 'insert': false},
				{'start': '12.26428', 'end': '13.917121', 'text': 'metades<br/> ', 'insert': false},
				{'start': '14.008146', 'end': '15', 'text': 'Juntos... ', 'insert': false}
			];

			$audioPlayer.on('timeupdate', function(e){
				$.each(music, function(index, el){
					if($audioPlayer[0].currentTime >= el.start && $audioPlayer[0].currentTime <= el.end && !el.insert){
						let $letter = $('<span></span>');
						
						$letter.html(el.text).hide();
						$karaoke.append($letter);
						$letter.fadeIn('fast');

						el.insert = true;
					}
					if($audioPlayer[0].currentTime > 14){
						$btn.stop().fadeIn('slow');
					}
				});
			});

			$('.js-play').on('click', function(){
				$(this).fadeOut('fast');
				document.getElementById('audio').play();	
			})
			
			

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

			let dump_possibilidades = possibilidades,
			$button = $('#gerador'),
			$texto = $('#texto');

			$button.on('click', function(){
				possibilidades.length == 0 ? possibilidades = dump_possibilidades : '';

				let randomValue = possibilidades[Math.floor(possibilidades.length * Math.random())];
				possibilidades = possibilidades.filter(item => item !== randomValue);

				$texto.hide().html(randomValue).fadeIn('fast');
				
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
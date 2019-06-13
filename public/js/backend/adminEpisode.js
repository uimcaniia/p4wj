//Exécuter ce code avant tout les autres aboutira à la création de la méthode Array.isArray()si elle n'est pas nativement prise en charge par le navigateur.
if(!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
//*****************************************************************
$(document).ready(function(){
//****************************************
	//action sur le bouton sélectionner un épisode à supprimer
	$('#goEpDel').click(function(){
		$('#confirmDeleteEpisode').fadeIn(600); // ouverture de la div pour demander confirmation
		$('#confirmDeleteEpisode span.fa-times').click(function(){
			$('#confirmDeleteEpisode').fadeOut(600);
		});
		$('#confirmDeleteEpisode span.fa-check').click(function(){
			var valEpDelet = $('#selectEpDel').val(); 
			$.post('index.php?action=delEpModif', {valEpDelet:valEpDelet}, function(donnee){
				$('#selectEpDel > option[value = "'+valEpDelet+'"').remove(); // maj des input select de toutes les parties
				$('#selectEpModif > option[value = "'+valEpDelet+'"').remove();
				$('#selectCom > option[value = "'+valEpDelet+'"').remove();
				$('#selectComSignal > option[value = "'+valEpDelet+'"').remove();
				$('#confirmDeleteEpisode').fadeOut(600);
				return false;
			});
		});
	});
//****************************************

	$('#saveEdit').click( function(){
		tinyMCE.triggerSave(true, true);
		var id= $('#blockWriteIdEp').text();
		idClean = id.replace(/ |\n|\r|\t/g, '');

		if(idClean == ''){
			var txtEpisode = $('#blockWriteEpisode textarea').val();
			var titleEpisode = $('#blockWriteTitleEpisode').val();
			console.log(txtEpisode);
			console.log(titleEpisode);
			$.post('index.php?action=saveNewEpisode', {txtEpisode:txtEpisode, titleEpisode:titleEpisode}, function(donnee){			
				$('<p>'+donnee+'</p>').appendTo('#blockWriteIdEp');
				$('#containtEpisodeAdmin > p:nth-child(2)').fadeIn(600);
				$('#containtEpisodeAdmin > p:nth-child(2)').text('La création et la sauvegarde a bien été effectuée.')
				$('#containtEpisodeAdmin > p:nth-child(2)').delay(2000).fadeOut(1000);
					return false;
				});
		}else{

			var res = $('#tinymce').text();
			console.log(res);
			var txtEpisode = $('#blockWriteEpisode textarea').val();
			var titleEpisode = $('#blockWriteTitleEpisode').val();
			console.log(txtEpisode);
			console.log(titleEpisode);
			idEpisode = $('#blockWriteIdEp p').text();
			$.post('index.php?action=saveEpisode', {txtEpisode:txtEpisode, titleEpisode:titleEpisode, idEpisode:idEpisode}, function(donnee){			
			$('#containtEpisodeAdmin > p:nth-child(2)').fadeIn(600);
			$('#containtEpisodeAdmin > p:nth-child(2)').text('La sauvegarde a bien été effectuée.');
			$('#containtEpisodeAdmin > p:nth-child(2)').delay(2000).fadeOut(1000);
				return false;
			});
		}
	});

	//****************************************

	$('#showEdit').click( function(){
		tinyMCE.triggerSave(true, true);
		var txtEpisode = $('#blockWriteEpisode textarea').val();
		var titleEpisode = $('#blockWriteTitleEpisode').val();
		$('#confirmPublishEpisode').fadeIn(600); // on demande confirmation

		$('#closePublishConfirm').click(function(){
			$('#confirmPublishEpisode').fadeOut(600);
		});
		
		$('#publishEp').click(function(){
			var id= $('#blockWriteIdEp').text();
			idClean = id.replace(/ |\n|\r|\t/g, '');

			if(idClean == ''){ // si il n'y a pas d'id, c'est que l'épisode n'existe pas en bdd, du coup on sauvegarde avant
				console.log($('#blockWriteIdEp').text());
				$.post('index.php?action=saveNewEpisode', {txtEpisode:txtEpisode, titleEpisode:titleEpisode}, function(donnee){	
					$('<p>'+donnee+'</p>').appendTo('#blockWriteIdEp');
					$.post('index.php?action=publishEpisode', {idEpisode:donnee}, function(donnee){	
					$('#containtEpisodeAdmin > p:nth-child(2)').fadeIn(600);	
						$('#containtEpisodeAdmin > p:nth-child(2)').text('La publication a bien été effectuée.')
						$('#containtEpisodeAdmin > p:nth-child(2)').delay(2000).fadeOut(1000);
						return false;
					});
					return false;
				});
				$('#confirmPublishEpisode').fadeOut(600);
			}else{
				idEpisode = $('#blockWriteIdEp p').text();
				$.post('index.php?action=saveEpisode', {txtEpisode:txtEpisode, titleEpisode:titleEpisode, idEpisode:idEpisode}, function(donnee){			
					$.post('index.php?action=publishEpisode', {idEpisode:idEpisode}, function(donnee){	
						console.log(donnee);		
					$('#containtEpisodeAdmin > p:nth-child(2)').fadeIn(600);
					$('#containtEpisodeAdmin > p:nth-child(2)').text('La publication a bien été effectuée.')
					$('#containtEpisodeAdmin > p:nth-child(2)').delay(2000).fadeOut(1000);
						return false;
					});
				$('#confirmPublishEpisode').fadeOut(600);
			});
			}
		});
	});


	//********************************************
	//action sur le bouton sélectionner un épisode à modifier
	$('#goEpModif').click(function(){

		var valEpModif = $('#selectEpModif').val(); 	
				$.post('index.php?action=selEpModif', {valEpModif:valEpModif}, function(donnee){
			var aDonnee = JSON.parse(donnee);
			console.log(aDonnee);
				$('#divModifSelectEp').fadeOut(0);
				$('#hideWriteEpisodeModif').fadeIn(300);

				var id = aDonnee[0]['id'];
				var title = aDonnee[0]['title'];
				var txt = aDonnee[0]['episode'];
				$('<p>'+id+'</p>').appendTo('#blockWriteIdEpModif');
				//$('#blockWriteIdEpModif').text(id);
				document.getElementById("blockWriteTitleEpisodeModif").value=title;
				tinyMCE.get('blockWriteEpisodeModif').setContent(txt) ;
		})
	});


	//****************************************
	//action sur le bouton sauvegarder un épisode Modifier
	$('#saveModif').click(function(){
		tinyMCE.triggerSave(true, true);
		var txtEpisode = $('#blockWriteEpisodeModif textarea').val();
		var titleEpisode = $('#blockWriteTitleEpisodeModif').val();
		var id= $('#blockWriteIdEpModif p').text();
		idEpisode = id.replace(/ |\n|\r|\t/g, '');

		$.post('index.php?action=saveEpisode', {txtEpisode:txtEpisode, titleEpisode:titleEpisode, idEpisode:idEpisode}, function(donnee){			

			console.log(donnee);		
			$('#containtEpisodeAdminModif > p:nth-child(2)').fadeIn(600);
			$('#containtEpisodeAdminModif > p:nth-child(2)').text('La publication a bien été effectuée.')
			$('#containtEpisodeAdminModif > p:nth-child(2)').delay(2000).fadeOut(1000);
				return false;
			});
				
		});
	});


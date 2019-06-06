<?php

function space()
{
	$user         = new User();
	$getInfosUser = $user->get('id', $_SESSION['idUser']);
	$user-> hydrate($getInfosUser[0]);

	$input       = new Input();
	$inputPseudo = $input->get(10); // array contenant les attribut du champs input pseudo

	$inputNewPassword    = $input->get(14);// array contenant les attribut du champs input password
	$inputRepeatPassword = $input->get(15);
	array_push($inputNewPassword, $inputRepeatPassword[0]); // assemblage des 2 array
	require('view/backend/spaceView.php');
}
//**********************************************************************
function admin()
{
	$admin         = new Admin();
	$getInfosAdmin = $admin->get('id', $_SESSION['idUser']);

	$input       = new Input();
	$inputPseudo = $input->get(10); // array contenant les attribut du champs input pseudo

	$inputNewPassword    = $input->get(14);// array contenant les attribut du champs input password
	$inputRepeatPassword = $input->get(15);
	array_push($inputNewPassword, $inputRepeatPassword[0]); // assemblage des 2 array

	$user  = new User();
	$aUser = $user->getAllUser(); // array contennt tous les utilisateurs

	$comment        = new Comment; 	
	$aCommentSignal = $comment->getAllCommentSignal(); // array contennt tous les commentaires signalés

	$episode  = new Episode; 
	$aEpisode = $episode->getAllEpisode(); // array contenant tous les épisodes

	$message         = new Message; 
	$aMessageSend    = $message->get('send', $_SESSION['idUser']); // array qui contiendra tout les message envoyés
	$aMessageReceive = $message->get('receive', $_SESSION['idUser']); // et les message reçut

	$aUserSignal     = getUserSignal($aUser);// on récupère tous les utilisateur signalés
	$aEpisodeSignal  = getEpisodeSignal($aCommentSignal, $episode);  // on récupère tous les épisodes ayant uncomment signalés
	$aMessageSend    = getMessageSend($aMessageSend);
	$aMessageReceive = getMessageReceive($aMessageReceive);
	
	require('view/backend/adminView.php');
}
//**********************************************************************
/*$aEpisode, $aUser, $aUserSignal, $aEpisodeSignal,*/
function getEpisodeSignal($aCommentSignal, $episode)
{
	$aEpisodeSignal = array();
	$akeyDoble = array(); // array qui contiendra les id des episode déjà chargé pour éviter les doublons

	for($i = 0 ; $i < count($aCommentSignal) ; $i++)
	{
		foreach ($aCommentSignal[$i] as $key => $value)
		{
			if($key =='idEpisode')
			{
				if(!in_array($value, $akeyDoble))
				{
					$episode = new Episode; 
					$aEpisode2 = $episode-> get($value);
					array_push($aEpisodeSignal, $aEpisode2[0]);
					array_push($akeyDoble, $value);
				}
			}
		}
	}
	return $aEpisodeSignal;
}
//**********************************************************************
function getUserSignal($aUser)
{
	$aUserSignal = array();  
	for($i = 0 ; $i < count($aUser) ; $i++) 
	{
		foreach ($aUser[$i] as $key => $value)
		{
			if($key =='reporting')
			{
				if($value != 0)
				array_push($aUserSignal, $aUser[$i]);
			}
		}
	}
	return $aUserSignal ;
}
//**********************************************************************
function getMessageSend($aMessageSend)
{
	for($i = 0 ; $i < count($aMessageSend) ; $i++)
	{
		foreach ($aMessageSend[$i] as $key => $value)
		{
			if($key =='receive')
			{
				$user = new User; 
				$aPseudo = $user-> get('id', $value);
				$aMessageSend[$i]['pseudo'] = $aPseudo[0]['pseudo'];
			}

		}
	}
	return $aMessageSend;
}
//**********************************************************************
function getMessageReceive($aMessageReceive)
{
	for($i = 0 ; $i < count($aMessageReceive) ; $i++)
	{
		foreach ($aMessageReceive[$i] as $key => $value)
		{
			if($key =='send')
			{
				$user = new User; 
				$aPseudo = $user-> get('id', $value);
				$aMessageReceive[$i]['pseudo'] = $aPseudo[0]['pseudo'];
			}

		}
	}
	return $aMessageReceive;
}
//**********************************************************************
function allReceiveMessage($idUser)
{
	require('view/backend/commonView.php');
}

function allSendMessage($idUser)
{
	require('view/backend/commonView.php');
}

function sendMessage($idUser, $idrecipient)
{
	require('view/backend/commonView.php');
}

function deleteMessage($idMess)
{
	require('view/backend/commonView.php');
}


function showCommentEpisode($idEpisode)
{
	require('view/backend/adminView.php');
}

function showCommentPseudo($idseudo)
{
	require('view/backend/adminView.php');
}

function showCommentCommentSignal($idEpisodeSignal)
{
	require('view/backend/adminView.php');
}

function showCommentPseudoSignal($idPseudoSignal)
{
	require('view/backend/adminView.php');
}
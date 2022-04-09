<?php 

//ロックを行う
function n_lock($key)
{
	$lockfile=sprintf("./temp/%s.lock",$key);
	clearstatcache();
	while(file_exists($lockfile)){clearstatcache();}
	$fp=fopen($lockfile,"wt");
	fclose($fp);
}

//ロックを解除
function n_unlock($key)
{
	$lockfile=sprintf("./temp/%s.lock",$key);
	unlink($lockfile);
}

$direc=$_POST["direc"];
$prace=$_POST["prace"];

$str="str=$direc;$prace";

n_lock("c1");
$fp=fopen("log.txt","r+");
fputs($fp,$str);
fclose($fp);
n_unlock("c1");
?>
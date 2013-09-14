#pragma strict
var hitpoints_max:float = 100;
var hitpoints:float = 100;

function Start () {

}

function Update () 
{
	
}

function TakeDamage(damage:float)
{
	hitpoints -= damage;
	
	hitpoints = Mathf.Clamp(hitpoints, 0, hitpoints_max);
	
	if (hitpoints <= 0)
	{
		Die();
	}
}

function Die()
{
	
}
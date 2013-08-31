#pragma strict
private var hit:RaycastHit;
private var enemy:Transform;
var tilt:float = 0;
var max_tilt:float = 70;

var speed:float = 4;

function Start () {

}

function Update () 
{
	rigidbody.velocity = transform.right * Input.GetAxis("Horizontal") * speed * 0.5 + transform.forward * Input.GetAxis("Vertical") * speed;
	
	if (Input.GetMouseButtonDown(0))
	{
		LockCamera();
	}
	
	MoveCamera();
}

function MoveCamera()
{
	Camera.main.transform.position = transform.position + transform.up + transform.forward * 0.01;
	
	if (enemy != null)
	{
		Camera.main.transform.LookAt(enemy);
	}
	else
	{
		Camera.main.transform.eulerAngles.y += Input.GetAxis("Mouse X") * 180 * Time.deltaTime;
		CheckTilt();
	}
	
	transform.eulerAngles.y = Camera.main.transform.eulerAngles.y;
	Camera.main.transform.eulerAngles.x = tilt;
}

function CheckTilt()
{
	tilt -= Input.GetAxis("Mouse Y") * 75 * Time.deltaTime;
	
	tilt = Mathf.Clamp(tilt, -max_tilt, max_tilt);
}

function LockCamera()
{
	if (enemy == null)
	{
		if (Physics.Raycast(transform.position, Camera.main.transform.forward, hit, 100))
		{
			if (hit.collider.gameObject.GetComponent(Attributes))
			{
				enemy = hit.collider.gameObject.transform;
			}
		}
	}
	else
	{
		enemy = null;
	}
}
#pragma strict
private var hit:RaycastHit;
private var enemy:Transform;
var firstperson:boolean = false;
var tilt:float = 0;
var max_tilt:float = 60;

var speed:float = 4;

function Start () 
{
	Screen.lockCursor = true;
}

function Update () 
{
	rigidbody.velocity = transform.right * Input.GetAxis("Horizontal") * speed * 0.5 + transform.forward * Input.GetAxis("Vertical") * speed;
	
	if (Input.GetMouseButtonDown(0))
	{
		LockCamera();
	}
	
	if (Input.GetKeyDown(KeyCode.Q))
	{
		firstperson = !firstperson;
	}
	
	MoveCamera();
}

function MoveCamera()
{
	if (firstperson)
	{
		Camera.main.transform.position = transform.position + transform.up + transform.forward * 0.01;
		Camera.main.nearClipPlane = 0.3555;
	}
	else
	{
		Camera.main.transform.position = transform.position + transform.up * 2 - transform.forward * 2;
		Camera.main.nearClipPlane = 2;
	}
	
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
	
	if (firstperson)
	{
		tilt = Mathf.Clamp(tilt, -max_tilt, max_tilt);
	}
	else
	{
		tilt = Mathf.Clamp(tilt, -max_tilt/2, max_tilt/2);
	}
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

function OnGUI()
{
	GUI.Label(Rect(10, 10, Screen.width, 20), "Q: Toggle first person.");
	GUI.Label(Rect(10, 30, Screen.width, 40), "Click enemy to toggle locked camera.");
}
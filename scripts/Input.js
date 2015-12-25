function Input()
{
  this.pressed = {};

  this.keys = {
    LEFT: 37,
    SPACE: 32,
    RIGHT: 39,
    H: 72,
    P: 80,
    Z: 90,
    X: 88,
    C: 67,
    U: 85,
    V: 86,
    ENTER: 13
  };
}

Input.prototype.isDown = function(keycode)
{
  return input.pressed[keycode];
}

Input.prototype.onKeyDown = function(e)
{
  input.pressed[e.keyCode] = true;
}

Input.prototype.onKeyUp = function(e)
{
  delete input.pressed[e.keyCode];
}
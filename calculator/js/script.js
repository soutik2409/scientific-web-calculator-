

function display(val)
{
    document.getElementById("textval").value+=val;
}

function evaluate1()
{
    let y=evalexp(document.getElementById("textval").value);
    document.getElementById("textval").value = y;
}

function clr()
{
    document.getElementById("textval").value = "";
}

	
function evalexp(expression)
{
    let tokens = expression.split('');

    // Stack for numbers: 'values'
    let values = [];

    // Stack for Operators: 'ops'
    let ops = [];

    for (let i = 0; i < tokens.length; i++)
    {
        
        // Current token is a number,
        // push it to stack for numbers
        if (tokens[i] >= '0' && tokens[i] <= '9')
        {
            let numb = "";
            
            // There may be more than
            // one digits in number
            while (i < tokens.length && ((tokens[i] >= '0' && tokens[i] <= '9')|| tokens[i] == '.'))
            {
                numb = numb + tokens[i++];
            }
            values.push(parseFloat(numb));
            
            i--;
        }

        else if (tokens[i] == 'p')
        {
            values.push(Math.PI);
            i++;
        }

        else if (tokens[i] == 'e')
        {
            values.push(Math.E);
        }

        

        // Current token is an opening
        // brace or unary operators, push it to 'ops'
        else if (tokens[i] == '(')
        {
            ops.push(tokens[i]);
        }

        else if(tokens[i] == 's' || 
           tokens[i] == 'c' || 
           tokens[i] == 't' || 
           tokens[i] == 'l')
        {
            if(tokens[i + 5] == '(')
                ops.push('a'+tokens[i]);
            else
                ops.push(tokens[i]);
            while(tokens[i]!='(')
            {
                i++;
            }
            i--;
        }

        // Closing brace encountered,
        // solve entire brace
        else if (tokens[i] == ')')
        {
            while (ops[ops.length - 1] != '(')
            {
                values.push(applyOp(ops.pop(),values.pop(),values.pop()));
            }
            ops.pop();
            switch(ops[ops.length-1])
            {
                case 's':
                    values.push(Math.sin(values.pop()));
                    ops.pop();
                    break;
                case 'c':
                    values.push(Math.cos(values.pop()));
                    ops.pop();
                    break;
                case 't':
                    values.push(Math.tan(values.pop()));
                    ops.pop();
                    break;
                case 'l':
                    values.push(Math.log(values.pop()));
                    ops.pop();
                    break;
                case 'as' :
                    values.push(Math.asin(values.pop()));
                    ops.pop();
                    break;
                case 'ac' :
                    values.push(Math.acos(values.pop()));
                    ops.pop();
                    break;
                case 'at' :
                    values.push(Math.atan(values.pop()));
                    ops.pop();
                    break;

            }
        }

        else if(tokens[i] == '!')
        {
            values.push(fact(values.pop()));
        }

        // Current token is an operator.
        else if (tokens[i] == '+' ||
                tokens[i] == '-' ||
                tokens[i] == '*' ||
                tokens[i] == '/'||
                tokens[i] == '^')
        {
            
            // While top of 'ops' has same
            // or greater precedence to current
            // token, which is an operator.
            // Apply operator on top of 'ops'
            // to top two elements in values stack
            while (ops.length > 0 && hasPrecedence(tokens[i],ops[ops.length - 1]))
            {
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            }

            // Push current token to 'ops'.
            ops.push(tokens[i]);
        }
    }

    // Entire expression has been
    // parsed at this point, apply remaining
    // ops to remaining values
    while (ops.length > 0)
    {
        values.push(applyOp(ops.pop(),
                        values.pop(),
                        values.pop()));
    }

    // Top of 'values' contains
    // result, return it
    return values.pop();
}

// Returns true if 'op2' has
// higher or same precedence as 'op1',
// otherwise returns false.
function hasPrecedence(op1, op2)
{
    if (op2 == '(' || op2 == ')')
    {
        return false;
    }
    if(op1 == '^')
    {
        return false;
    }
    if ((op1 == '*' || op1 == '/') &&
        (op2 == '+' || op2 == '-'))
    {
        return false;
    }
    else
    {
        return true;
    }
}

// A utility method to apply an
// operator 'op' on operands 'a'
// and 'b'. Return the result.
function applyOp(op, b, a)
{
    switch (op)
    {
    case '+':
        return a + b;
    case '-':
        return a - b;
    case '*':
        return a * b;
    case '/':
        if (b == 0)
        {
            document.write("Cannot divide by zero");
        }
        return a/b;
    case '^':
        return Math.pow(a,b);
    }
    return 0;
}

function fact(x)
{
    if (x == 1)
    {
        return 1;
    }
    else
    {
        return x*fact(x-1);
    }
}

function backspace()
{
    let str = document.getElementById("textval").value;
    str = str.substring(0,str.length-1);
    document.getElementById("textval").value = str;
    
}